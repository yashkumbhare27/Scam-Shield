import type { Language } from '../types';

// VERIFY BEFORE LAUNCH: Confirm helpline numbers and portal URLs for current Indian cybercrime guidance.
export const EMERGENCY_CONTACTS = {
  cybercrimeHelpline: '1930', // VERIFY BEFORE LAUNCH
  cybercrimePortalUrl: 'https://cybercrime.gov.in', // VERIFY BEFORE LAUNCH
  cybercrimePortalLabel: 'cybercrime.gov.in', // VERIFY BEFORE LAUNCH
  rbiSachetUrl: 'https://sachet.rbi.org.in', // VERIFY BEFORE LAUNCH
  lastChecked: {
    en: 'Nov 2026',
    hi: 'नवंबर 2026',
    mr: 'नोव्हें २०२६',
  } as Record<Language, string>,
};

export type EmergencyType = 'link' | 'otp' | 'app' | 'money';

export interface EmergencyStep {
  title: Record<Language, string>;
  description: Record<Language, string>;
  actionType?: 'call' | 'portal';
}

export const EMERGENCY_FLOWS: Record<EmergencyType, EmergencyStep[]> = {
  money: [
    {
      title: {
        en: 'Stop talking to the scammer',
        hi: 'ठग से बात करना तुरंत बंद करें',
        mr: 'फसवणूक करणाऱ्याशी बोलणे लगेच थांबवा',
      },
      description: {
        en: 'Hang up the call and stop replying on WhatsApp or SMS, even if they promise a refund.',
        hi: 'कॉल काट दें और WhatsApp या SMS पर जवाब देना बंद करें, भले ही वे पैसे लौटाने का वादा करें।',
        mr: 'फोन कट करा आणि WhatsApp किंवा SMS वर उत्तर देणे थांबवा, जरी ते पैसे परत देण्याचे आमिष दाखवत असतील.',
      },
    },
    {
      title: {
        en: 'Call your bank or UPI app support',
        hi: 'अपने बैंक या UPI ऐप सपोर्ट को कॉल करें',
        mr: 'तुमच्या बँक किंवा UPI अ‍ॅप सपोर्टला कॉल करा',
      },
      description: {
        en: 'Use the official number on the back of your card or inside your bank app to freeze your card, account, or UPI ID.',
        hi: 'अपना कार्ड, खाता या UPI ID ब्लॉक करने के लिए कार्ड के पीछे या बैंक ऐप में दिए आधिकारिक नंबर पर कॉल करें।',
        mr: 'तुमचे कार्ड, खाते किंवा UPI ID ब्लॉक करण्यासाठी कार्डच्या मागे किंवा बँक अ‍ॅपमधील अधिकृत नंबरवर कॉल करा.',
      },
    },
    {
      title: {
        en: 'Report on 1930 and the cybercrime portal',
        hi: '1930 और साइबर क्राइम पोर्टल पर रिपोर्ट करें',
        mr: '1930 आणि सायबर क्राईम पोर्टलवर तक्रार नोंदवा',
      },
      description: {
        en: 'Call 1930 immediately (the first hour matters most) and file the complaint on cybercrime.gov.in.',
        hi: 'तुरंत 1930 पर कॉल करें (पहला घंटा सबसे ज़रूरी है) और cybercrime.gov.in पर शिकायत दर्ज करें।',
        mr: 'लगेच 1930 वर कॉल करा (पहिला तास सर्वात महत्त्वाचा असतो) आणि cybercrime.gov.in वर तक्रार नोंदवा.',
      },
      actionType: 'call',
    },
    {
      title: {
        en: 'Change passwords and PINs',
        hi: 'पासवर्ड और PIN बदलें',
        mr: 'पासवर्ड आणि PIN बदला',
      },
      description: {
        en: 'Update your netbanking password, UPI PIN, and email password from a clean device.',
        hi: 'किसी सुरक्षित डिवाइस से अपना नेटबैंकिंग पासवर्ड, UPI PIN और ईमेल पासवर्ड बदलें।',
        mr: 'सुरक्षित डिव्हाइसवरून तुमचा नेटबँकिंग पासवर्ड, UPI PIN आणि ईमेल पासवर्ड बदला.',
      },
      actionType: 'portal',
    },
    {
      title: {
        en: 'Save screenshots, numbers, and transaction IDs',
        hi: 'स्क्रीनशॉट, नंबर और ट्रांज़ैक्शन ID संभालें',
        mr: 'स्क्रीनशॉट, नंबर आणि ट्रान्झॅक्शन ID जपून ठेवा',
      },
      description: {
        en: 'Keep photos of the chat, the caller phone number, and your UTR or bank reference number.',
        hi: 'चैट के स्क्रीनशॉट, कॉल करने वाले का नंबर और UTR या बैंक रेफरेंस नंबर सुरक्षित रखें।',
        mr: 'चॅटचे स्क्रीनशॉट, कॉलरचा नंबर आणि UTR किंवा बँक रेफरेंस नंबर जपून ठेवा.',
      },
    },
    {
      title: {
        en: 'Warn your family',
        hi: 'अपने परिवार को सावधान करें',
        mr: 'तुमच्या कुटुंबाला सावध करा',
      },
      description: {
        en: 'Let family members know about the scammer number so they do not trust follow-up calls.',
        hi: 'परिवार के लोगों को उस नंबर के बारे में बता दें ताकि वे किसी दूसरे कॉल पर भरोसा न करें।',
        mr: 'कुटुंबातील सदस्यांना त्या नंबरची माहिती द्या जेणेकरून ते पुढच्या कॉल्सवर विश्वास ठेवणार नाहीत.',
      },
    },
  ],
  otp: [
    {
      title: {
        en: 'Call your bank immediately to block access',
        hi: 'तुरंत अपने बैंक को कॉल करके खाता या कार्ड ब्लॉक कराएँ',
        mr: 'खाते किंवा कार्ड ब्लॉक करण्यासाठी लगेच बँकेला कॉल करा',
      },
      description: {
        en: 'Tell them you shared an OTP or PIN by mistake and ask to temporarily freeze debit cards and netbanking.',
        hi: 'उन्हें बताएँ कि गलती से OTP या PIN साझा हो गया है और डेबिट कार्ड व नेटबैंकिंग अस्थायी रूप से बंद करने को कहें।',
        mr: 'चुकून OTP किंवा PIN दिला गेल्याचे सांगा आणि डेबिट कार्ड व नेटबँकिंग तात्पुरते बंद करण्याची विनंती करा.',
      },
    },
    {
      title: {
        en: 'Change your UPI PIN and banking passwords',
        hi: 'अपना UPI PIN और बैंकिंग पासवर्ड बदलें',
        mr: 'तुमचा UPI PIN आणि बँकिंग पासवर्ड बदला',
      },
      description: {
        en: 'Open your official bank or UPI app and set a completely new PIN you have never used before.',
        hi: 'अपना आधिकारिक बैंक या UPI ऐप खोलें और एक नया PIN सेट करें जो पहले कभी इस्तेमाल न किया हो।',
        mr: 'तुमचे अधिकृत बँक किंवा UPI अ‍ॅप उघडा आणि कधीही न वापरलेला नवीन PIN सेट करा.',
      },
    },
    {
      title: {
        en: 'Check your latest bank statement',
        hi: 'अपना ताज़ा बैंक स्टेटमेंट जाँचें',
        mr: 'तुमचे ताजे बँक स्टेटमेंट तपासा',
      },
      description: {
        en: 'Look for any unexpected transactions or newly added beneficiaries in your account.',
        hi: 'देखें कि खाते से कोई अनजान लेनदेन तो नहीं हुआ या कोई नया बेनिफिशियरी तो नहीं जोड़ा गया।',
        mr: 'खात्यातून कोणताही अनोळखी व्यवहार झाला आहे का किंवा नवीन बेनिफिशियरी जोडला आहे का ते पहा.',
      },
    },
    {
      title: {
        en: 'Call 1930 if any money was taken',
        hi: 'यदि कोई पैसा कटा है तो 1930 पर कॉल करें',
        mr: 'काही पैसे गेले असल्यास 1930 वर कॉल करा',
      },
      description: {
        en: 'Even a small test deduction should be reported right away on 1930 and cybercrime.gov.in.',
        hi: 'अगर छोटी रकम भी कटी है तो तुरंत 1930 और cybercrime.gov.in पर रिपोर्ट करें।',
        mr: 'अगदी छोटी रक्कम जरी कापली गेली असेल तर लगेच 1930 आणि cybercrime.gov.in वर तक्रार करा.',
      },
      actionType: 'call',
    },
    {
      title: {
        en: 'Save the message and caller number',
        hi: 'संदेश और कॉल करने वाले का नंबर सहेजें',
        mr: 'संदेश आणि कॉलरचा नंबर जपून ठेवा',
      },
      description: {
        en: 'Take screenshots before blocking the sender so your bank or police can trace it.',
        hi: 'नंबर ब्लॉक करने से पहले स्क्रीनशॉट ले लें ताकि बैंक या पुलिस जाँच कर सके।',
        mr: 'नंबर ब्लॉक करण्यापूर्वी स्क्रीनशॉट घ्या जेणेकरून बँक किंवा पोलिसांना तपास करता येईल.',
      },
    },
  ],
  link: [
    {
      title: {
        en: 'Close the browser page right now',
        hi: 'उस वेबसाइट पेज को तुरंत बंद करें',
        mr: 'ती वेबसाइट आत्ताच बंद करा',
      },
      description: {
        en: 'Do not enter your phone number, bank details, card info, or password on that page.',
        hi: 'उस पेज पर अपना फोन नंबर, बैंक जानकारी, कार्ड नंबर या पासवर्ड बिल्कुल न डालें।',
        mr: 'त्या पानावर तुमचा फोन नंबर, बँकेची माहिती, कार्ड तपशील किंवा पासवर्ड अजिबात टाकू नका.',
      },
    },
    {
      title: {
        en: 'Check if any file was downloaded',
        hi: 'देखें कि कोई फाइल डाउनलोड तो नहीं हुई',
        mr: 'कोणतीही फाईल डाउनलोड झाली का ते तपासा',
      },
      description: {
        en: 'Open your browser Downloads folder and delete any unknown .apk file without opening it.',
        hi: 'ब्राउज़र के Downloads फ़ोल्डर में जाएँ और किसी भी अनजान .apk फाइल को खोले बिना डिलीट कर दें।',
        mr: 'ब्राउझरच्या Downloads फोल्डरमध्ये जा आणि कोणतीही अनोळखी .apk फाईल न उघडता डिलीट करा.',
      },
    },
    {
      title: {
        en: 'If you typed a password, change it',
        hi: 'यदि आपने पासवर्ड डाला था, तो उसे बदलें',
        mr: 'तुम्ही पासवर्ड टाकला असल्यास तो बदला',
      },
      description: {
        en: 'Change that password and any other account where you reused the same password.',
        hi: 'वह पासवर्ड और जहाँ भी आपने वही पासवर्ड इस्तेमाल किया है, उसे तुरंत बदल दें।',
        mr: 'तो पासवर्ड आणि तुम्ही जिथे तोच पासवर्ड वापरला आहे, ती सर्व खाती लगेच बदला.',
      },
    },
    {
      title: {
        en: 'Turn on bank SMS alerts and watch activity',
        hi: 'बैंक SMS अलर्ट चालू रखें और खाते पर नज़र रखें',
        mr: 'बँक SMS अलर्ट सुरू ठेवा आणि व्यवहारांवर लक्ष ठेवा',
      },
      description: {
        en: 'If you notice any suspicious deduction, call your bank and 1930 immediately.',
        hi: 'अगर कोई संदिग्ध कटौती दिखे तो तुरंत अपने बैंक और 1930 पर कॉल करें।',
        mr: 'कोणताही संशयास्पद व्यवहार दिसल्यास लगेच बँकेला आणि 1930 वर कॉल करा.',
      },
      actionType: 'call',
    },
  ],
  app: [
    {
      title: {
        en: 'Turn off mobile data and Wi-Fi right now',
        hi: 'अपने फोन का मोबाइल डेटा और Wi-Fi तुरंत बंद करें',
        mr: 'तुमच्या फोनचा मोबाइल डेटा आणि Wi-Fi आत्ताच बंद करा',
      },
      description: {
        en: 'Put your phone in Airplane mode so the unknown app cannot read messages or control your screen.',
        hi: 'फोन को Airplane मोड पर डालें ताकि अनजान ऐप आपके संदेश न पढ़ सके या स्क्रीन न चला सके।',
        mr: 'फोन Airplane मोडवर ठेवा जेणेकरून ते अनोळखी अ‍ॅप तुमचे संदेश वाचू किंवा स्क्रीन नियंत्रित करू शकणार नाही.',
      },
    },
    {
      title: {
        en: 'Uninstall the unknown or screen-share app',
        hi: 'अनजान या स्क्रीन-शेयर ऐप को अनइंस्टॉल करें',
        mr: 'अनोळखी किंवा स्क्रीन-शेअर अ‍ॅप अनइन्स्टॉल करा',
      },
      description: {
        en: 'Remove any app you just installed from a link (such as an APK or AnyDesk/QuickSupport).',
        hi: 'लिंक से इंस्टॉल किया गया कोई भी ऐप (जैसे कोई APK या AnyDesk/QuickSupport) तुरंत हटाएँ।',
        mr: 'लिंकवरून इन्स्टॉल केलेले कोणतेही अ‍ॅप (जसे की APK किंवा AnyDesk/QuickSupport) काढून टाका.',
      },
    },
    {
      title: {
        en: 'Use another phone to call your bank',
        hi: 'दूसरे फोन से अपने बैंक को कॉल करें',
        mr: 'दुसऱ्या फोनवरून तुमच्या बँकेला कॉल करा',
      },
      description: {
        en: 'Ask your bank to freeze online transactions temporarily while you secure your phone.',
        hi: 'अपने फोन को सुरक्षित करने तक बैंक से ऑनलाइन लेनदेन अस्थायी रूप से रोकने को कहें।',
        mr: 'तुमचा फोन सुरक्षित होईपर्यंत बँकेला ऑनलाइन व्यवहार तात्पुरते थांबवण्यास सांगा.',
      },
    },
    {
      title: {
        en: 'Turn internet back on and run Play Protect',
        hi: 'इंटरनेट चालू करके Play Protect स्कैन चलाएँ',
        mr: 'इंटरनेट सुरू करून Play Protect स्कॅन करा',
      },
      description: {
        en: 'Open Google Play Store -> profile icon -> Play Protect -> Scan to make sure no hidden app remains.',
        hi: 'Google Play Store -> प्रोफ़ाइल आइकन -> Play Protect -> Scan चलाएँ ताकि कोई छिपा ऐप न बचे।',
        mr: 'Google Play Store -> प्रोफाइल आयकॉन -> Play Protect -> Scan चालवा जेणेकरून कोणतेही लपलेले अ‍ॅप राहणार नाही.',
      },
    },
    {
      title: {
        en: 'Report on 1930 if money left or OTPs were seen',
        hi: 'पैसे कटने या OTP दिखने पर 1930 पर रिपोर्ट करें',
        mr: 'पैसे गेले असतील किंवा OTP दिसला असल्यास 1930 वर तक्रार करा',
      },
      description: {
        en: 'Report the caller number and app link on 1930 and cybercrime.gov.in.',
        hi: 'कॉल करने वाले का नंबर और ऐप लिंक 1930 और cybercrime.gov.in पर रिपोर्ट करें।',
        mr: 'कॉलरचा नंबर आणि अ‍ॅप लिंकची तक्रार 1930 आणि cybercrime.gov.in वर नोंदवा.',
      },
      actionType: 'call',
    },
  ],
};
