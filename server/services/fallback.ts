import type {
  AnalyzeResponse,
  CheckMode,
  Language,
  LinkFinding,
  RedFlag,
  Verdict,
} from '../../src/types.ts';
import { REPORT_INFO_BY_LANG } from '../config/helplines.ts';
import { evaluateRules } from './rules.ts';

const FALLBACK_COPY = {
  unavailableNote: {
    en: 'Our AI check was temporarily unavailable, so this result is based on our link and keyword safety rules.',
    hi: 'हमारी AI जाँच अभी उपलब्ध नहीं थी, इसलिए यह परिणाम हमारे लिंक और कीवर्ड सुरक्षा नियमों पर आधारित है।',
    mr: 'आमची AI तपासणी सध्या उपलब्ध नव्हती, त्यामुळे हा निकाल आमच्या लिंक आणि कीवर्ड सुरक्षा नियमांवर आधारित आहे.',
  },
  nextSteps: {
    likely_scam: {
      en: [
        'Do not click any link or call any number inside this message.',
        'Never share an OTP, UPI PIN, CVV, or card detail with anyone.',
        'Delete the message and warn family members if they received it too.',
      ],
      hi: [
        'इस संदेश में दिए किसी भी लिंक को न दबाएँ और न किसी नंबर पर कॉल करें।',
        'किसी को भी OTP, UPI PIN, CVV या कार्ड की जानकारी कभी न दें।',
        'इस संदेश को हटा दें और परिवार के लोगों को भी सावधान करें।',
      ],
      mr: [
        'या संदेशातील कोणत्याही लिंकवर क्लिक करू नका किंवा नंबरवर कॉल करू नका.',
        'कोणालाही OTP, UPI PIN, CVV किंवा कार्ड माहिती कधीही सांगू नका.',
        'हा संदेश डिलीट करा आणि कुटुंबातील इतरांनाही सावध करा.',
      ],
    },
    suspicious: {
      en: [
        'Pause before tapping any link or replying to the sender.',
        'Check directly inside your official bank or service app instead.',
        'Never share an OTP or PIN over phone, SMS, or WhatsApp.',
      ],
      hi: [
        'किसी भी लिंक को दबाने या जवाब देने से पहले रुकें और सोचें।',
        'संदेश के बजाय सीधे अपने आधिकारिक बैंक या सेवा ऐप में जाँचें।',
        'फोन, SMS या WhatsApp पर कभी भी OTP या PIN न बताएँ।',
      ],
      mr: [
        'कोणत्याही लिंकवर क्लिक करण्यापूर्वी किंवा उत्तर देण्यापूर्वी थोडा वेळ थांबा.',
        'संदेशाऐवजी थेट तुमच्या अधिकृत बँक किंवा सेवा अ‍ॅपमध्ये तपासा.',
        'फोन, SMS किंवा WhatsApp वर कधीही OTP किंवा PIN देऊ नका.',
      ],
    },
    no_red_flags: {
      en: [
        'No obvious scam links or code requests stood out in our quick rules check.',
        'Still verify unexpected requests inside your official app before acting.',
        'Never share OTPs, PINs, or passwords with anyone.',
      ],
      hi: [
        'हमारी शुरुआती नियम जाँच में कोई स्पष्ट नकली लिंक या कोड की माँग नहीं मिली।',
        'फिर भी किसी अनपेक्षित संदेश पर कदम उठाने से पहले आधिकारिक ऐप में जाँच लें।',
        'किसी के भी साथ OTP, PIN या पासवर्ड कभी साझा न करें।',
      ],
      mr: [
        'आमच्या प्राथमिक नियम तपासणीत कोणतीही स्पष्ट बनावट लिंक किंवा कोडची मागणी आढळली नाही.',
        'तरीही अनपेक्षित संदेशावर कृती करण्यापूर्वी अधिकृत अ‍ॅपमध्ये खात्री करा.',
        'कोणाशीही OTP, PIN किंवा पासवर्ड कधीही शेअर करू नका.',
      ],
    },
  },
  simpleExplanation: {
    likely_scam: {
      en: 'This looks like a scam message trying to trick you with a risky link or urgent request. Please do not click anything or share any OTP or PIN.',
      hi: 'यह एक धोखाधड़ी वाला संदेश लग रहा है जो नकली लिंक या घबराहट दिखाकर आपको फँसाने की कोशिश कर रहा है। कृपया कुछ भी न दबाएँ और OTP या PIN न बताएँ।',
      mr: 'हा फसवणुकीचा संदेश दिसत आहे जो धोकादायक लिंक किंवा घाई दाखवून फसवण्याचा प्रयत्न करत आहे. कृपया कशावरही क्लिक करू नका आणि OTP किंवा PIN देऊ नका.',
    },
    suspicious: {
      en: 'This message has warning signs and should not be trusted right away. Please verify inside your official bank or service app first.',
      hi: 'इस संदेश में कुछ संदिग्ध संकेत हैं, इसलिए इस पर तुरंत भरोसा न करें। पहले अपने आधिकारिक बैंक या सेवा ऐप में जाँच करें।',
      mr: 'या संदेशात काही संशयास्पद चिन्हे आहेत, त्यामुळे लगेच विश्वास ठेवू नका. आधी तुमच्या अधिकृत बँक किंवा सेवा अ‍ॅपमध्ये तपासा.',
    },
    no_red_flags: {
      en: 'No red flags were found by our quick rules check, though you should still avoid sharing OTPs or PINs.',
      hi: 'हमारी त्वरित जाँच में कोई खतरा नहीं मिला, फिर भी किसी के साथ OTP या PIN साझा न करें।',
      mr: 'आमच्या त्वरित तपासणीत कोणताही धोका आढळला नाही, तरीही कोणालाही OTP किंवा PIN सांगू नका.',
    },
  },
  imageOnlyFallbackNote: {
    en: 'We could not read the screenshot text automatically right now. Be careful: do not click links, scan QR codes, or share OTPs.',
    hi: 'हम अभी स्क्रीनशॉट का टेक्स्ट अपने-आप नहीं पढ़ पाए। सावधान रहें: लिंक न दबाएँ और OTP साझा न करें।',
    mr: 'आम्ही आत्ता स्क्रीनशॉटमधील मजकूर आपोआप वाचू शकलो नाही. सावध रहा: लिंक्सवर क्लिक करू नका आणि OTP देऊ नका.',
  },
};

export function buildFallbackResponse(params: {
  text: string | null;
  hasImage: boolean;
  links: LinkFinding[];
  language: Language;
  mode: CheckMode;
}): AnalyzeResponse {
  const { text, hasImage, links, language, mode } = params;
  const cleanText = (text || '').trim();

  if (!cleanText && hasImage) {
    const verdict: Verdict = 'suspicious';
    return {
      verdict,
      confidence: 'low',
      red_flags: [],
      links: [],
      next_steps: FALLBACK_COPY.nextSteps.suspicious[language],
      report_info: REPORT_INFO_BY_LANG[language],
      simple_explanation: `${FALLBACK_COPY.imageOnlyFallbackNote[language]} ${FALLBACK_COPY.unavailableNote[language]}`,
      spoken_text: FALLBACK_COPY.imageOnlyFallbackNote[language],
    };
  }

  const rulesEval = evaluateRules(cleanText, links, language);
  let verdict: Verdict = rulesEval.minVerdict;

  // Extra simple keyword rules for common Indian scams when Gemini is unavailable
  const flags: RedFlag[] = [...rulesEval.ruleFlags];
  if (
    /\b(kyc|pan\s*card|account\s*block|suspended|disconnected|lottery|won\s*rs|lucky\s*draw|electricity\s*power)\b/i.test(
      cleanText,
    )
  ) {
    if (verdict === 'no_red_flags') {
      verdict = 'suspicious';
    }
    if (flags.length === 0) {
      const m = cleanText.match(
        /\b(kyc|account\s*block|suspended|disconnected|lottery|lucky\s*draw|electricity\s*power)\b/i,
      );
      if (m) {
        flags.push({
          type:
            language === 'hi'
              ? 'संदिग्ध शब्द'
              : language === 'mr'
                ? 'संशयास्पद शब्द'
                : 'Suspicious Warning Phrase',
          evidence: m[0],
          explanation: FALLBACK_COPY.simpleExplanation[verdict][language],
        });
      }
    }
  }

  const baseExplanation = FALLBACK_COPY.simpleExplanation[verdict][language];
  const note = FALLBACK_COPY.unavailableNote[language];
  const simpleExplanation =
    mode === 'parent' ? `${baseExplanation} (${note})` : `${baseExplanation} ${note}`;

  return {
    verdict,
    confidence: flags.length > 0 ? 'medium' : 'low',
    red_flags: flags,
    links,
    next_steps: FALLBACK_COPY.nextSteps[verdict][language],
    report_info: REPORT_INFO_BY_LANG[language],
    simple_explanation: simpleExplanation,
    spoken_text: baseExplanation,
  };
}
