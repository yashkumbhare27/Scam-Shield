export interface BrandRule {
  brand: string;
  keywords: string[];
  officialDomains: string[];
}

export const BRAND_ALLOWLISTS: BrandRule[] = [
  // Indian Banks
  { brand: 'SBI', keywords: ['sbi', 'yono', 'statebank'], officialDomains: ['sbi.co.in', 'onlinesbi.sbi', 'yonosbi.com', 'sbicard.com'] },
  { brand: 'HDFC Bank', keywords: ['hdfc'], officialDomains: ['hdfcbank.com', 'hdfc.com'] },
  { brand: 'ICICI Bank', keywords: ['icici'], officialDomains: ['icicibank.com', 'icicidirect.com'] },
  { brand: 'Axis Bank', keywords: ['axisbank', 'axis'], officialDomains: ['axisbank.com'] },
  { brand: 'Kotak Bank', keywords: ['kotak'], officialDomains: ['kotak.com', 'kotakbank.com'] },
  { brand: 'PNB', keywords: ['pnb', 'punjabnational'], officialDomains: ['pnbindia.in', 'netpnb.com'] },
  { brand: 'Bank of Baroda', keywords: ['bob', 'bankofbaroda', 'baroda'], officialDomains: ['bankofbaroda.in'] },
  { brand: 'Canara Bank', keywords: ['canara'], officialDomains: ['canarabank.com'] },
  { brand: 'Union Bank', keywords: ['unionbank'], officialDomains: ['unionbankofindia.co.in'] },
  { brand: 'IndusInd Bank', keywords: ['indusind'], officialDomains: ['indusind.com'] },
  { brand: 'IDFC First', keywords: ['idfc'], officialDomains: ['idfcfirstbank.com'] },
  { brand: 'Yes Bank', keywords: ['yesbank'], officialDomains: ['yesbank.in'] },
  { brand: 'Federal Bank', keywords: ['federalbank'], officialDomains: ['federalbank.co.in'] },

  // UPI & Payment Apps
  { brand: 'PhonePe', keywords: ['phonepe'], officialDomains: ['phonepe.com'] },
  { brand: 'Google Pay', keywords: ['gpay', 'googlepay'], officialDomains: ['pay.google.com', 'google.com', 'g.co'] },
  { brand: 'Paytm', keywords: ['paytm'], officialDomains: ['paytm.com', 'paytmbank.com'] },
  { brand: 'BHIM / NPCI', keywords: ['bhim', 'npci', 'upi'], officialDomains: ['bhimupi.org.in', 'npci.org.in'] },
  { brand: 'CRED', keywords: ['cred'], officialDomains: ['cred.club'] },

  // Government & Utilities
  { brand: 'Government of India', keywords: ['uidai', 'aadhaar', 'aadhar', 'pan', 'incometax', 'epfo', 'parivahan', 'echallan', 'pmkisan', 'cybercrime', 'rbi'], officialDomains: ['gov.in', 'nic.in', 'uidai.gov.in', 'incometax.gov.in', 'epfindia.gov.in', 'parivahan.gov.in', 'cybercrime.gov.in', 'rbi.org.in'] },
  { brand: 'Electricity Utility', keywords: ['mahadiscom', 'mseb', 'bescom', 'tatapower', 'adanielectricity', 'bses', 'uppcl', 'tneb'], officialDomains: ['mahadiscom.in', 'bescom.karnataka.gov.in', 'tatapower.com', 'adanielectricity.com', 'bsesdelhi.com', 'uppcl.org', 'tangedco.org'] },

  // Delivery & Telecom
  { brand: 'India Post', keywords: ['indiapost', 'speedpost', 'dak'], officialDomains: ['indiapost.gov.in'] },
  { brand: 'Blue Dart', keywords: ['bluedart'], officialDomains: ['bluedart.com'] },
  { brand: 'Delhivery', keywords: ['delhivery'], officialDomains: ['delhivery.com'] },
  { brand: 'DTDC', keywords: ['dtdc'], officialDomains: ['dtdc.in', 'dtdc.com'] },
  { brand: 'Amazon', keywords: ['amazon', 'amzn'], officialDomains: ['amazon.in', 'amazon.com', 'amzn.in', 'amzn.to'] },
  { brand: 'Flipkart', keywords: ['flipkart'], officialDomains: ['flipkart.com'] },
  { brand: 'Jio', keywords: ['jio', 'myjio'], officialDomains: ['jio.com'] },
  { brand: 'Airtel', keywords: ['airtel'], officialDomains: ['airtel.in', 'airtel.com'] },
  { brand: 'Vi / Vodafone', keywords: ['myvi', 'vodafone'], officialDomains: ['myvi.in'] },
  { brand: 'BSNL', keywords: ['bsnl'], officialDomains: ['bsnl.co.in', 'bsnl.in'] },
];

export const OFFICIAL_DOMAINS: string[] = Array.from(
  new Set(BRAND_ALLOWLISTS.flatMap((b) => b.officialDomains)),
);

export const URL_SHORTENERS = [
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'rb.gy',
  'cutt.ly',
  'is.gd',
  'shorturl.at',
  'tiny.cc',
  'ow.ly',
  'surl.li',
  'clck.ru',
  'rebrand.ly',
  'bitly.com',
  't.ly',
  'v.gd',
  'u.to',
];

export const SUSPICIOUS_TLDS = [
  '.xyz',
  '.top',
  '.icu',
  '.click',
  '.buzz',
  '.club',
  '.online',
  '.site',
  '.website',
  '.shop',
  '.vip',
  '.work',
  '.live',
  '.tk',
  '.ml',
  '.ga',
  '.cf',
  '.gq',
  '.cc',
  '.ws',
  '.rest',
  '.cfd',
  '.sbs',
  '.loan',
];

export const SENSITIVE_PATHS = [
  'login',
  'signin',
  'kyc',
  'verify',
  'update',
  'pan',
  'aadhaar',
  'aadhar',
  'refund',
  'claim',
  'reward',
  'pay',
  'bill',
  'block',
  'unblock',
  'reactivate',
  'apk',
];
