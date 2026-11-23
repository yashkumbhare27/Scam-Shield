import type { Language, LinkFinding, RedFlag, Verdict } from '../../src/types.ts';

const VERDICT_RANK: Record<Verdict, number> = {
  no_red_flags: 0,
  suspicious: 1,
  likely_scam: 2,
};

export function maxVerdict(a: Verdict, b: Verdict): Verdict {
  return VERDICT_RANK[a] >= VERDICT_RANK[b] ? a : b;
}

export interface RulesEvaluation {
  minVerdict: Verdict;
  ruleFlags: RedFlag[];
}

const SENSITIVE_CREDENTIAL_RE =
  /\b(otp|one[\s-]?time[\s-]?password|upi\s*pin|atm\s*pin|mpin|pin\b|cvv|card\s*(?:number|details|expiry)|netbanking\s*password|password)\b/i;

const URGENCY_OR_THREAT_RE =
  /\b(urgent|immediately|today|within\s+\d+\s*(?:hr|hrs|hour|hours|min|mins|minutes)|tonight|disconnected|disconnect|blocked|block|suspended|suspend|frozen|freeze|deactivated|deactivate|closed|legal\s*action|penalty|fine|expire|last\s*chance)\b/i;

const PAYMENT_TRAP_RE =
  /\b(pay\s*(?:rs\.?|inr|₹)?\s*\d+|processing\s*fee|redelivery\s*fee|registration\s*fee|enter\s*(?:your\s*)?(?:upi\s*)?pin\s*to\s*receive|scan\s*(?:this\s*)?qr)\b/i;

const INSTITUTION_CLAIM_RE =
  /\b(sbi|hdfc|icici|axis|kotak|pnb|bank|rbi|kyc|pan|aadhaar|aadhar|income\s*tax|india\s*post|parcel|courier|electricity|power\s*bill|mahadiscom|bescom|trai|police|cbi|customs)\b/i;

const REMOTE_APP_RE =
  /\b(anydesk|teamviewer|quicksupport|rustdesk|screen\s*share|\.apk\b|install\s*(?:this|the)\s*app|download\s*app)\b/i;

const PERSONAL_MOBILE_RE = /(?:^|[^\d])((?:\+91[\s-]?)?[6-9]\d{9})\b/;

const RULE_TEXT = {
  credUrgency: {
    type: {
      en: 'Secret Code + Urgency Trap',
      hi: 'OTP/PIN और जल्दबाज़ी का जाल',
      mr: 'OTP/PIN आणि घाईचा सापळा',
    },
    explanation: {
      en: 'Asks for an OTP, PIN, CVV, or payment while creating fear or urgency. Real banks never ask for codes.',
      hi: 'डराकर या जल्दी दिखाकर OTP, PIN, CVV या पैसे माँग रहा है। असली बैंक कभी कोड नहीं माँगते।',
      mr: 'भीती किंवा घाई दाखवून OTP, PIN, CVV किंवा पैसे मागत आहे. खऱ्या बँका कधीही कोड मागत नाहीत.',
    },
  },
  highRiskLink: {
    type: {
      en: 'Fake or High-Risk Link',
      hi: 'नकली या खतरनाक लिंक',
      mr: 'बनावट किंवा धोकादायक लिंक',
    },
    explanation: {
      en: 'Contains a suspicious or lookalike link claiming to be a bank, government, or delivery service.',
      hi: 'इसमें बैंक, सरकारी सेवा या डिलीवरी के नाम पर एक संदिग्ध या नकली लिंक है।',
      mr: 'यामध्ये बँक, सरकारी किंवा डिलिव्हरी सेवेच्या नावाखाली संशयास्पद किंवा बनावट लिंक आहे.',
    },
  },
  remoteApp: {
    type: {
      en: 'Dangerous App Request',
      hi: 'खतरनाक ऐप इंस्टॉल करने को कहना',
      mr: 'धोकादायक अ‍ॅप इन्स्टॉल करण्याची विनंती',
    },
    explanation: {
      en: 'Asks you to install an unknown APK or screen-sharing app, which lets scammers watch your OTPs and steal money.',
      hi: 'अनजान APK या स्क्रीन-शेयर ऐप डालने को कहता है, जिससे ठग आपके OTP देख सकते हैं और पैसे निकाल सकते हैं।',
      mr: 'अनोळखी APK किंवा स्क्रीन-शेअर अ‍ॅप इन्स्टॉल करायला सांगतो, ज्यामुळे फसवणूक करणारे तुमचे OTP पाहू शकतात.',
    },
  },
  personalMobileKyc: {
    type: {
      en: 'Personal Mobile Number for Official Help',
      hi: 'आधिकारिक काम के लिए निजी मोबाइल नंबर',
      mr: 'अधिकृत कामासाठी वैयक्तिक मोबाइल नंबर',
    },
    explanation: {
      en: 'Uses a normal 10-digit mobile number for KYC, account block, or electricity disconnection—official helplines do not work like this.',
      hi: 'KYC, खाता बंद या बिजली कटने के नाम पर एक आम 10 अंकों का मोबाइल नंबर दिया गया है—असली हेल्पलाइन ऐसे काम नहीं करती।',
      mr: 'KYC, खाते बंद किंवा वीज कापण्याच्या नावाखाली साधा १० अंकी मोबाइल नंबर दिला आहे—अधिकृत हेल्पलाइन असे करत नाहीत.',
    },
  },
};

export function evaluateRules(
  text: string,
  links: LinkFinding[],
  language: Language,
): RulesEvaluation {
  let minVerdict: Verdict = 'no_red_flags';
  const ruleFlags: RedFlag[] = [];

  if (!text) {
    // Still check links if any
    if (links.some((l) => l.risk === 'high')) {
      minVerdict = 'likely_scam';
    } else if (links.some((l) => l.risk === 'medium')) {
      minVerdict = 'suspicious';
    }
    return { minVerdict, ruleFlags };
  }

  const credMatch = text.match(SENSITIVE_CREDENTIAL_RE);
  const urgencyMatch = text.match(URGENCY_OR_THREAT_RE);
  const paymentMatch = text.match(PAYMENT_TRAP_RE);
  const institutionMatch = text.match(INSTITUTION_CLAIM_RE);
  const appMatch = text.match(REMOTE_APP_RE);
  const mobileMatch = text.match(PERSONAL_MOBILE_RE);

  const hasHighRiskLink = links.some((l) => l.risk === 'high');
  const hasNonOfficialLink = links.some((l) => l.risk !== 'low');

  // Rule 1: OTP/PIN/CVV/password/payment + urgency or threat -> at least suspicious (likely_scam if high risk)
  if ((credMatch || paymentMatch) && urgencyMatch) {
    minVerdict = maxVerdict(minVerdict, 'suspicious');
    if (credMatch && urgencyMatch) {
      minVerdict = maxVerdict(minVerdict, 'likely_scam');
    }
    ruleFlags.push({
      type: RULE_TEXT.credUrgency.type[language],
      evidence: (credMatch?.[0] || paymentMatch?.[0] || urgencyMatch[0]).trim(),
      explanation: RULE_TEXT.credUrgency.explanation[language],
    });
  } else if (paymentMatch && institutionMatch) {
    minVerdict = maxVerdict(minVerdict, 'suspicious');
    ruleFlags.push({
      type: RULE_TEXT.credUrgency.type[language],
      evidence: paymentMatch[0].trim(),
      explanation: RULE_TEXT.credUrgency.explanation[language],
    });
  }

  // Rule 2: Any high-risk link, OR bank/government/delivery claim with a non-official link -> likely_scam
  if (hasHighRiskLink || (institutionMatch && hasNonOfficialLink)) {
    minVerdict = maxVerdict(minVerdict, 'likely_scam');
    const badLink = links.find((l) => l.risk !== 'low');
    if (badLink) {
      ruleFlags.push({
        type: RULE_TEXT.highRiskLink.type[language],
        evidence: badLink.url,
        explanation: badLink.reason || RULE_TEXT.highRiskLink.explanation[language],
      });
    }
  } else if (hasNonOfficialLink) {
    minVerdict = maxVerdict(minVerdict, 'suspicious');
  }

  // Rule 3: Asking to install unknown app / screen share OR call personal mobile about KYC / blocked account
  if (appMatch) {
    minVerdict = maxVerdict(minVerdict, 'likely_scam');
    ruleFlags.push({
      type: RULE_TEXT.remoteApp.type[language],
      evidence: appMatch[0].trim(),
      explanation: RULE_TEXT.remoteApp.explanation[language],
    });
  }

  if (mobileMatch && mobileMatch[1] && (institutionMatch || urgencyMatch)) {
    minVerdict = maxVerdict(minVerdict, 'suspicious');
    ruleFlags.push({
      type: RULE_TEXT.personalMobileKyc.type[language],
      evidence: mobileMatch[1].trim(),
      explanation: RULE_TEXT.personalMobileKyc.explanation[language],
    });
  }

  return { minVerdict, ruleFlags };
}
