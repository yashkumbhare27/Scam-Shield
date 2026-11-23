import type { Language, LinkFinding, RedFlag } from '../types';

export type ScamCategoryId =
  | 'kyc'
  | 'parcel'
  | 'job'
  | 'lottery'
  | 'upi_collect'
  | 'fake_qr'
  | 'electricity';

export interface ScamGuideItem {
  id: ScamCategoryId;
  isScamOfWeek?: boolean;
  title: Record<Language, string>;
  warning: Record<Language, string>;
  sampleMessage: string;
  redFlags: RedFlag[];
  links: LinkFinding[];
}

export const SCAM_GUIDE_ITEMS: ScamGuideItem[] = [
  {
    id: 'kyc',
    isScamOfWeek: true,
    title: {
      en: 'Fake KYC / Bank Message',
      hi: 'नकली KYC / बैंक संदेश',
      mr: 'बनावट KYC / बँक संदेश',
    },
    warning: {
      en: 'Threatens that your bank account or SIM will be blocked today unless you tap a link.',
      hi: 'धमकी देता है कि लिंक न दबाने पर आज ही आपका बैंक खाता या SIM बंद हो जाएगा।',
      mr: 'लिंक न दाबल्यास आजच तुमचे बँक खाते किंवा SIM बंद होईल अशी धमकी देतो.',
    },
    sampleMessage:
      'Dear Customer, your SBI YONO account will be BLOCKED today due to pending PAN KYC. Update immediately at http://sbi-kyc-update.xyz or call 9810012345.',
    redFlags: [
      {
        type: 'Urgency & Block Threat',
        evidence: 'BLOCKED today',
        explanation: 'Real banks do not shut down accounts within hours over an SMS link.',
      },
      {
        type: 'Fake Lookalike Link',
        evidence: 'http://sbi-kyc-update.xyz',
        explanation: 'Uses a suspicious .xyz domain instead of the official sbi.co.in site.',
      },
      {
        type: 'Personal Mobile Number',
        evidence: '9810012345',
        explanation: 'Asks you to call a 10-digit personal mobile number instead of an official helpline.',
      },
    ],
    links: [
      {
        url: 'http://sbi-kyc-update.xyz',
        risk: 'high',
        reason: 'Lookalike bank KYC link using an unencrypted .xyz domain.',
      },
    ],
  },
  {
    id: 'parcel',
    title: {
      en: 'Parcel Held Link',
      hi: 'पार्सल रुका होने का लिंक',
      mr: 'पार्सल अडकल्याची लिंक',
    },
    warning: {
      en: 'Claims a courier or India Post package is stuck and asks for a small Rs. 20–50 re-delivery fee.',
      hi: 'दावा करता है कि आपका कूरियर या डाक पार्सल रुका है और 20-50 रुपये शुल्क माँगता है।',
      mr: 'तुमचे कुरिअर किंवा इंडिया पोस्ट पार्सल अडकल्याचे सांगून २०-५० रुपये शुल्क मागतो.',
    },
    sampleMessage:
      'India Post: Your parcel IN892341 could not be delivered due to incomplete address. Pay Rs 25 redelivery fee within 12 hrs: https://indiapost-track.top/pay',
    redFlags: [
      {
        type: 'Small Fee Trap',
        evidence: 'Pay Rs 25 redelivery fee',
        explanation: 'Asks for a tiny card payment to steal your card details and OTP.',
      },
      {
        type: 'Fake Delivery Domain',
        evidence: 'https://indiapost-track.top/pay',
        explanation: 'Official India Post uses indiapost.gov.in, never .top domains.',
      },
    ],
    links: [
      {
        url: 'https://indiapost-track.top/pay',
        risk: 'high',
        reason: 'Fake India Post lookalike on a .top domain.',
      },
    ],
  },
  {
    id: 'electricity',
    title: {
      en: 'Electricity Bill Disconnection',
      hi: 'बिजली कनेक्शन कटने की धमकी',
      mr: 'वीज कनेक्शन बंद करण्याची धमकी',
    },
    warning: {
      en: 'Says your power will be cut tonight at 9:30 PM and tells you to call a personal mobile number.',
      hi: 'कहता है कि आज रात 9:30 बजे बिजली कट जाएगी और एक मोबाइल नंबर पर कॉल करने को कहता है।',
      mr: 'आज रात्री ९:३० वाजता वीज कापली जाईल असे सांगून एका वैयक्तिक मोबाइल नंबरवर कॉल करायला लावतो.',
    },
    sampleMessage:
      'Dear Consumer, your electricity power will be disconnected tonight at 9.30 PM from electricity office because previous month bill was not updated. Immediately call officer 9820099112.',
    redFlags: [
      {
        type: 'Night Disconnection Panic',
        evidence: 'disconnected tonight at 9.30 PM',
        explanation: 'Power companies do not send sudden late-night disconnection threats via personal SMS.',
      },
      {
        type: 'Personal Officer Number',
        evidence: '9820099112',
        explanation: 'Calling this number leads scammers to ask you to install screen-sharing apps.',
      },
    ],
    links: [],
  },
  {
    id: 'job',
    title: {
      en: 'Fake Job Offer',
      hi: 'नकली नौकरी का ऑफर',
      mr: 'बनावट नोकरीची ऑफर',
    },
    warning: {
      en: 'Promises high daily pay for liking videos or part-time tasks, then demands a registration deposit.',
      hi: 'वीडियो लाइक करने जैसे आसान काम के लिए रोज़ मोटी कमाई का लालच देकर पैसे जमा करवाता है।',
      mr: 'व्हिडिओ लाइक करण्यासारख्या सोप्या कामासाठी रोज मोठ्या पगाराचे आमिष दाखवून पैसे भरण्यास सांगतो.',
    },
    sampleMessage:
      'Part-time Work From Home! Earn Rs 3,500 to Rs 8,000 daily just by liking YouTube videos. No experience needed. Message on Telegram bit.ly/hr-task-join now!',
    redFlags: [
      {
        type: 'Unrealistic Easy Money',
        evidence: 'Earn Rs 3,500 to Rs 8,000 daily',
        explanation: 'High daily pay for simple clicks is a classic prepaid task scam.',
      },
      {
        type: 'Shortened Link',
        evidence: 'bit.ly/hr-task-join',
        explanation: 'Hides the real destination using a URL shortener.',
      },
    ],
    links: [
      {
        url: 'bit.ly/hr-task-join',
        risk: 'medium',
        reason: 'Shortened link hiding where the chat really goes.',
      },
    ],
  },
  {
    id: 'lottery',
    title: {
      en: 'Lottery or Prize',
      hi: 'लॉटरी या इनाम का लालच',
      mr: 'लॉटरी किंवा बक्षिसाचे आमिष',
    },
    warning: {
      en: 'Says you won a KBC, WhatsApp, or lucky draw prize and asks for processing fees or taxes.',
      hi: 'कहता है आपने KBC या लकी ड्रॉ में इनाम जीता है और प्रोसेसिंग फीस या टैक्स माँगता है।',
      mr: 'तुम्ही KBC किंवा लकी ड्रॉमध्ये बक्षीस जिंकल्याचे सांगून प्रोसेसिंग फी किंवा टॅक्स मागतो.',
    },
    sampleMessage:
      'CONGRATULATIONS! Your WhatsApp number has won Rs 25,00,000 in KBC Lucky Draw 2026. Pay Rs 4,500 processing fee to claim via WhatsApp +92300112233.',
    redFlags: [
      {
        type: 'Surprise Lottery Win',
        evidence: 'won Rs 25,00,000 in KBC Lucky Draw',
        explanation: 'You cannot win a lottery or lucky draw you never entered.',
      },
      {
        type: 'Upfront Processing Fee',
        evidence: 'Pay Rs 4,500 processing fee',
        explanation: 'Legitimate prizes never ask you to pay money first to receive winnings.',
      },
    ],
    links: [],
  },
  {
    id: 'upi_collect',
    title: {
      en: 'UPI Collect Request',
      hi: 'UPI कलेक्ट रिक्वेस्ट ठगी',
      mr: 'UPI कलेक्ट रिक्वेस्ट फसवणूक',
    },
    warning: {
      en: 'Sends a "Pay" request claiming you need to enter your UPI PIN to receive money or a refund.',
      hi: 'पैसे या रिफंड भेजने के बहाने "Pay" रिक्वेस्ट भेजकर आपसे UPI PIN डलवाता है।',
      mr: 'पैसे किंवा रिफंड मिळवण्याच्या नावाखाली "Pay" रिक्वेस्ट पाठवून तुमचा UPI PIN टाकायला लावतो.',
    },
    sampleMessage:
      'OLX Buyer: I have sent Rs 12,000 payment request on PhonePe. Open notification, click PAY and enter your UPI PIN to receive the amount in your bank.',
    redFlags: [
      {
        type: 'PIN to Receive Trick',
        evidence: 'click PAY and enter your UPI PIN to receive',
        explanation: 'You NEVER need to enter your UPI PIN to receive money—entering PIN always sends money out.',
      },
    ],
    links: [],
  },
  {
    id: 'fake_qr',
    title: {
      en: 'Fake QR Code',
      hi: 'नकली QR कोड ठगी',
      mr: 'बनावट QR कोड फसवणूक',
    },
    warning: {
      en: 'Asks you to scan a QR code on WhatsApp to "verify" your account or receive a payment.',
      hi: 'खाता "वेरिफाई" करने या पैसे लेने के नाम पर WhatsApp पर भेजा QR कोड स्कैन करने को कहता है।',
      mr: 'खाते "व्हेरिफाय" करण्यासाठी किंवा पैसे मिळवण्यासाठी WhatsApp वरील QR कोड स्कॅन करायला सांगतो.',
    },
    sampleMessage:
      'Scan this QR code in Google Pay and enter PIN 4520 to receive your Rs 4,500 cashback reward immediately.',
    redFlags: [
      {
        type: 'Scan QR to Receive',
        evidence: 'Scan this QR code in Google Pay and enter PIN',
        explanation: 'Scanning a QR code and entering your PIN always pays money out, never puts money in.',
      },
    ],
    links: [],
  },
];

export interface CheckerSample {
  id: 'kyc' | 'parcel' | 'electricity' | 'realBank';
  text: string;
}

export const CHECKER_SAMPLES: CheckerSample[] = [
  {
    id: 'kyc',
    text: 'URGENT: Your SBI Bank account will be suspended today due to incomplete KYC. Verify PAN immediately at http://sbi-kyc-update.xyz to avoid block.',
  },
  {
    id: 'parcel',
    text: 'India Post: Your package could not be delivered due to invalid address. Update address and pay Rs 20 fee within 24 hours: https://indiapost-track.top/pay',
  },
  {
    id: 'electricity',
    text: 'Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM because your last bill is not updated. Call electricity officer 9820099112 immediately.',
  },
  {
    id: 'realBank',
    text: 'HDFC Bank: Rs 1,250.00 debited from A/c **4821 on 22-11-26 at DMart Retail via UPI. Avl Bal: Rs 18,420.50. Not you? Call 18002026161.',
  },
];
