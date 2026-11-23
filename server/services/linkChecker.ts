import type { Language, LinkFinding, LinkRisk } from '../../src/types.ts';
import {
  BRAND_ALLOWLISTS,
  OFFICIAL_DOMAINS,
  SENSITIVE_PATHS,
  SUSPICIOUS_TLDS,
  URL_SHORTENERS,
} from '../config/links.ts';

const REASONS = {
  official: {
    en: 'Matches an official Indian domain ({domain}). Still check that you expected this message.',
    hi: 'यह एक आधिकारिक भारतीय डोमेन ({domain}) से मेल खाता है। फिर भी जाँचें कि क्या यह संदेश अपेक्षित था।',
    mr: 'ही अधिकृत भारतीय डोमेनशी ({domain}) जुळते. तरीही हा संदेश अपेक्षित होता का ते तपासा.',
  },
  ipUrl: {
    en: 'Uses a raw numeric IP address instead of a real company website name.',
    hi: 'असली कंपनी वेबसाइट के नाम की जगह सीधे नंबर वाले IP पते का उपयोग करता है।',
    mr: 'खऱ्या कंपनीच्या वेबसाइटऐवजी थेट अंकांच्या IP पत्त्याचा वापर केला आहे.',
  },
  shortener: {
    en: 'Uses a link shortener ({domain}) that hides the real destination website.',
    hi: 'यह एक शॉर्ट लिंक ({domain}) है जो असली वेबसाइट का पता छिपाता है।',
    mr: 'ही शॉर्ट लिंक ({domain}) खरी वेबसाइट लपवते.',
  },
  suspiciousTld: {
    en: 'Uses a high-risk website ending ({tld}) often seen in phishing messages.',
    hi: 'इसमें एक जोखिम भरा वेबसाइट एक्सटेंशन ({tld}) है जो अक्सर नकली संदेशों में होता है।',
    mr: 'यामध्ये संशयास्पद वेबसाइट शेवट ({tld}) आहे जो सहसा बनावट संदेशांत असतो.',
  },
  lookalike: {
    en: 'Pretends to be {brand}, but "{host}" is NOT an official {brand} website.',
    hi: '{brand} होने का दिखावा करता है, लेकिन "{host}" {brand} की आधिकारिक वेबसाइट नहीं है।',
    mr: '{brand} असल्याचे भासवते, पण "{host}" ही {brand} ची अधिकृत वेबसाइट नाही.',
  },
  insecureLogin: {
    en: 'Uses unencrypted http:// for a login, KYC, or payment page on an unknown domain.',
    hi: 'अनजान वेबसाइट पर लॉगिन, KYC या पेमेंट के लिए असुरक्षित http:// लिंक का उपयोग करता है।',
    mr: 'अनोळखी वेबसाइटवर लॉगिन, KYC किंवा पेमेंटसाठी असुरक्षित http:// वापरले आहे.',
  },
  sensitivePath: {
    en: 'Asks for KYC, login, verification, or payment on an unverified domain ({host}).',
    hi: 'असत्यापित वेबसाइट ({host}) पर KYC, लॉगिन, वेरिफिकेशन या पेमेंट करने को कहता है।',
    mr: 'अप्रमाणीत वेबसाइटवर ({host}) KYC, लॉगिन किंवा पेमेंट करण्याची विनंती करते.',
  },
  unknownDomain: {
    en: 'Unverified website ({host}). Do not enter passwords, OTPs, or bank details here.',
    hi: 'असत्यापित वेबसाइट ({host})। यहाँ पासवर्ड, OTP या बैंक विवरण न डालें।',
    mr: 'अप्रमाणीत वेबसाइट ({host}). येथे पासवर्ड, OTP किंवा बँक माहिती टाकू नका.',
  },
};

function matchesDomain(host: string, allowed: string): boolean {
  return host === allowed || host.endsWith(`.${allowed}`);
}

function isOfficialHost(host: string): string | null {
  for (const official of OFFICIAL_DOMAINS) {
    if (matchesDomain(host, official)) {
      return official;
    }
  }
  return null;
}

function isIpHost(host: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}(:\d+)?$/.test(host);
}

function normalizeCandidateUrl(raw: string): string {
  return raw
    .replace(/^hxxps?:\/\//i, (m) => m.toLowerCase().replace('hxxp', 'http'))
    .replace(/\[\.\]/g, '.')
    .replace(/[),.;!?]+$/, '');
}

export function extractUrls(text: string): string[] {
  if (!text) return [];
  const found = new Set<string>();

  // 1. Explicit http(s) or hxxp(s) URLs
  const protocolRegex = /(?:https?|hxxps?):\/\/[^\s<>"']+/gi;
  for (const m of text.matchAll(protocolRegex)) {
    const clean = m[0].replace(/[),.;!?]+$/, '');
    if (clean.length >= 8) found.add(clean);
  }

  // 2. Bare domains (e.g. sbi-kyc.xyz/login or bit.ly/abc or www.example.com)
  const bareRegex =
    /(?:^|[\s(])((?:www\.)?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\[\.\]|\.)(?:com|in|co\.in|org\.in|gov\.in|nic\.in|org|net|xyz|top|icu|click|buzz|club|online|site|website|shop|vip|work|live|tk|ml|ga|cf|gq|ly|to|gl|gd|at|cc|ws|info|me|io|app|apk)(?:\/[^\s<>"']*)?)/gi;

  for (const m of text.matchAll(bareRegex)) {
    const raw = (m[1] || '').replace(/[),.;!?]+$/, '');
    if (!raw || raw.length < 4) continue;
    // Skip amounts like Rs.500 or decimals
    if (/^\d+\.\d+$/.test(raw)) continue;
    const alreadyCovered = Array.from(found).some((existing) =>
      existing.toLowerCase().includes(raw.toLowerCase()),
    );
    if (!alreadyCovered) {
      found.add(raw);
    }
  }

  return Array.from(found);
}

export function checkLinks(text: string, language: Language): LinkFinding[] {
  const candidates = extractUrls(text);
  const results: LinkFinding[] = [];

  for (const rawUrl of candidates) {
    const normalized = normalizeCandidateUrl(rawUrl);
    const hasHttp = /^http:\/\//i.test(normalized);
    const withScheme = /^https?:\/\//i.test(normalized)
      ? normalized
      : `https://${normalized}`;

    let host = '';
    let pathname = '';
    try {
      const parsed = new URL(withScheme);
      host = parsed.hostname.toLowerCase().replace(/^www\./, '');
      pathname = parsed.pathname.toLowerCase() + parsed.search.toLowerCase();
    } catch {
      continue;
    }

    if (!host) continue;

    // 1. Official domain check first
    const matchedOfficial = isOfficialHost(host);
    if (matchedOfficial) {
      results.push({
        url: rawUrl,
        risk: 'low',
        reason: REASONS.official[language].replace('{domain}', matchedOfficial),
      });
      continue;
    }

    // 2. IP-address URL
    if (isIpHost(host)) {
      results.push({
        url: rawUrl,
        risk: 'high',
        reason: REASONS.ipUrl[language],
      });
      continue;
    }

    // 3. Brand lookalike check (e.g., sbi-kyc.com, hdfc-update.in, indiapost-track.top)
    const lookalikeBrand = BRAND_ALLOWLISTS.find((rule) =>
      rule.keywords.some(
        (kw) =>
          host.includes(kw) &&
          !rule.officialDomains.some((official) => matchesDomain(host, official)),
      ),
    );
    if (lookalikeBrand) {
      results.push({
        url: rawUrl,
        risk: 'high',
        reason: REASONS.lookalike[language]
          .replace(/\{brand\}/g, lookalikeBrand.brand)
          .replace('{host}', host),
      });
      continue;
    }

    // 4. Suspicious TLD
    const badTld = SUSPICIOUS_TLDS.find((tld) => host.endsWith(tld));
    if (badTld) {
      results.push({
        url: rawUrl,
        risk: 'high',
        reason: REASONS.suspiciousTld[language].replace('{tld}', badTld),
      });
      continue;
    }

    // 5. URL shortener
    const isShortener = URL_SHORTENERS.some((s) => matchesDomain(host, s));
    const hasSensitivePath = SENSITIVE_PATHS.some(
      (p) => pathname.includes(p) || host.includes(p),
    );

    if (isShortener) {
      results.push({
        url: rawUrl,
        risk: hasSensitivePath ? 'high' : 'medium',
        reason: REASONS.shortener[language].replace('{domain}', host),
      });
      continue;
    }

    // 6. Non-HTTPS login/kyc/verify/update
    if (hasHttp && hasSensitivePath) {
      results.push({
        url: rawUrl,
        risk: 'high',
        reason: REASONS.insecureLogin[language],
      });
      continue;
    }

    // 7. Sensitive path on non-official domain
    if (hasSensitivePath) {
      results.push({
        url: rawUrl,
        risk: 'high',
        reason: REASONS.sensitivePath[language].replace('{host}', host),
      });
      continue;
    }

    // 8. Unknown non-official domain
    const risk: LinkRisk = hasHttp ? 'medium' : 'medium';
    results.push({
      url: rawUrl,
      risk,
      reason: REASONS.unknownDomain[language].replace('{host}', host),
    });
  }

  return results;
}
