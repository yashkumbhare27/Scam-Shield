import type { Language } from './types';

export interface Translations {
  appName: string;
  nav: {
    check: string;
    guide: string;
    help: string;
    about: string;
    report: string;
  };
  landing: {
    headlineBefore: string;
    headlineGlow: string;
    headlineAfter: string;
    subhead: string;
    ctaCheck: string;
    ctaHelp: string;
    features: {
      linksTitle: string;
      linksDesc: string;
      langTitle: string;
      langDesc: string;
      privacyTitle: string;
      privacyDesc: string;
    };
    howTitle: string;
    howSteps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
    };
    demoLabel: string;
    demoVerdict: string;
    demoNote: string;
    footerCredit: string;
    liteMode: string;
    liteModeDesc: string;
  };
  check: {
    title: string;
    subtitle: string;
    placeholder: string;
    reminder: string;
    pasteBtn: string;
    pastedFeedback: string;
    clipboardError: string;
    uploadBtn: string;
    imageReady: string;
    removeImage: string;
    imageErrorType: string;
    imageErrorSize: string;
    speakBtn: string;
    stopSpeakBtn: string;
    listeningLabel: string;
    parentToggleTitle: string;
    parentToggleDesc: string;
    samplesLabel: string;
    samples: {
      kyc: string;
      parcel: string;
      electricity: string;
      realBank: string;
    };
    submitBtn: string;
    privacyNote: string;
    emptyWarning: string;
    tooLongWarning: string;
    offlineWarning: string;
  };
  loading: {
    lines: [string, string, string];
    subtext: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
    rateLimit: string;
  };
  result: {
    stamps: {
      likely_scam: string;
      suspicious: string;
      no_red_flags: string;
    };
    meterLabels: {
      clear: string;
      caution: string;
      scam: string;
    };
    meterSummary: {
      likely_scam: string;
      suspicious: string;
      no_red_flags: string;
    };
    messageTitle: string;
    reasonsTitle: string;
    noReasonsText: string;
    linkWarningTitle: string;
    nextStepsTitle: string;
    listenBtn: string;
    stopListenBtn: string;
    parentCardTitle: string;
    parentRevealBtn: string;
    reputationBadge: string;
    feedbackPrompt: string;
    feedbackYes: string;
    feedbackNo: string;
    feedbackThanks: string;
    emergencyCardTitle: string;
    emergencyCardDesc: string;
    emergencyCardBtn: string;
    disclaimer: string;
    checkAnother: string;
    reportLink: string;
  };
  help: {
    title: string;
    subtitle: string;
    lastChecked: string;
    stepOf: string;
    nextStep: string;
    prevStep: string;
    finishBtn: string;
    doneTitle: string;
    doneDesc: string;
    doneReportBtn: string;
    doneHomeBtn: string;
    callNow: string;
    openPortal: string;
    cards: {
      linkTitle: string;
      linkDesc: string;
      otpTitle: string;
      otpDesc: string;
      appTitle: string;
      appDesc: string;
      moneyTitle: string;
      moneyDesc: string;
    };
  };
  guide: {
    title: string;
    subtitle: string;
    scamOfWeekBadge: string;
    allFilter: string;
    seeExample: string;
    closeModal: string;
    exampleMessageTitle: string;
    whyFakeTitle: string;
  };
  report: {
    title: string;
    subtitle: string;
    lastChecked: string;
    helplineLabel: string;
    callBtn: string;
    portalLabel: string;
    openBtn: string;
    bankLabel: string;
    bankDesc: string;
    upiLabel: string;
    upiDesc: string;
    evidenceTitle: string;
    evidenceSubtitle: string;
    evidenceItems: string[];
  };
  about: {
    title: string;
    storyTitle: string;
    storyBody: string;
    howTitle: string;
    howItems: { title: string; desc: string }[];
    privacyTitle: string;
    privacyItems: { title: string; desc: string }[];
    disclaimer: string;
    credit: string;
    reportBtn: string;
  };
  notFound: {
    title: string;
    desc: string;
    homeBtn: string;
    checkBtn: string;
  };
  chat: {
    buttonLabel: string;
    title: string;
    subtitle: string;
    privacyNote: string;
    contextBanner: string;
    welcome: string;
    placeholder: string;
    sendBtn: string;
    clearBtn: string;
    closeBtn: string;
    thinking: string;
    suggestionsLabel: string;
    starterQuestions: string[];
    listenReply: string;
    stopReply: string;
    askPipCta: string;
  };
  suggestions: {
    title: string;
    loading: string;
    familyLabel: string;
    copyBtn: string;
    copiedBtn: string;
    tipsLabel: string;
    askPromptsLabel: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'ScamShield',
    nav: {
      check: 'Check',
      guide: 'Guide',
      help: 'Help',
      about: 'About',
      report: 'Report',
    },
    landing: {
      headlineBefore: 'Strange message? ',
      headlineGlow: 'Check',
      headlineAfter: ' before you trust.',
      subhead: 'Paste an SMS or WhatsApp message, upload a screenshot, or speak it aloud. Get clear answers in seconds.',
      ctaCheck: 'Check a message',
      ctaHelp: 'I already clicked or paid',
      features: {
        linksTitle: 'Spots fake links',
        linksDesc: 'Catches lookalike bank, courier, and electricity websites hiding behind short links.',
        langTitle: 'Speaks Hindi and Marathi',
        langDesc: 'Read or listen to calm explanations in English, हिन्दी, or मराठी.',
        privacyTitle: 'Never saves your messages',
        privacyDesc: 'Your texts, screenshots, and phone numbers are checked once and forgotten.',
      },
      howTitle: 'How it works',
      howSteps: {
        step1Title: '1. Paste or upload',
        step1Desc: 'Drop in the suspicious SMS, WhatsApp text, or screenshot.',
        step2Title: '2. Pip checks for tricks',
        step2Desc: 'ScamShield inspects links, urgency traps, and impersonation.',
        step3Title: '3. Clear next steps',
        step3Desc: 'See highlighted red flags and simple advice you can act on.',
      },
      demoLabel: 'Live example preview',
      demoVerdict: 'LIKELY SCAM',
      demoNote: 'Highlights fake links and urgent threats automatically.',
      footerCredit: 'Built with Gemini and Google Cloud',
      liteMode: 'Lite mode',
      liteModeDesc: 'Turns off blur and background motion for older phones',
    },
    check: {
      title: 'Check a suspicious message',
      subtitle: 'Paste the SMS or WhatsApp text, upload a screenshot, or speak it out.',
      placeholder: 'Paste the message here...',
      reminder: 'Never put your OTP, PIN, or card number in the box.',
      pasteBtn: 'Paste',
      pastedFeedback: 'Pasted from clipboard',
      clipboardError: 'Clipboard access blocked. Please tap inside the box and paste.',
      uploadBtn: 'Upload screenshot',
      imageReady: 'Screenshot ready to check',
      removeImage: 'Remove screenshot',
      imageErrorType: 'Please upload a JPEG, PNG, or WebP screenshot.',
      imageErrorSize: 'Screenshot is too large (max 4 MB).',
      speakBtn: 'Speak',
      stopSpeakBtn: 'Stop listening',
      listeningLabel: 'Listening... speak your message',
      parentToggleTitle: 'Checking for a parent?',
      parentToggleDesc: 'Get a simple explanation to read out to them',
      samplesLabel: 'Or try an example:',
      samples: {
        kyc: 'Bank KYC block',
        parcel: 'Parcel held',
        electricity: 'Electricity cut',
        realBank: 'Real bank alert',
      },
      submitBtn: 'Check this message',
      privacyNote: "We don't save your messages.",
      emptyWarning: 'Please paste a message or upload a screenshot first.',
      tooLongWarning: 'Message is too long. Please keep it under 4,000 characters.',
      offlineWarning: 'You appear to be offline. Please check your internet connection.',
    },
    loading: {
      lines: [
        'Reading your message...',
        'Checking the links...',
        'Looking for scam tricks...',
      ],
      subtext: 'Pip is inspecting every word calmly.',
    },
    error: {
      title: 'Unable to finish check',
      message: "We couldn't check this right now. Be careful: don't click links or share OTPs.",
      retry: 'Try again',
      rateLimit: 'Too many checks right now. Please wait a minute and try again.',
    },
    result: {
      stamps: {
        likely_scam: 'LIKELY SCAM',
        suspicious: 'BE CAREFUL',
        no_red_flags: 'NO RED FLAGS FOUND',
      },
      meterLabels: {
        clear: 'No red flags',
        caution: 'Be careful',
        scam: 'Likely scam',
      },
      meterSummary: {
        likely_scam: 'Trust meter: High scam risk detected.',
        suspicious: 'Trust meter: Caution advised. Some warning signs found.',
        no_red_flags: 'Trust meter: No red flags found in this message.',
      },
      messageTitle: 'Highlighted message',
      reasonsTitle: 'What Pip noticed',
      noReasonsText: 'No common scam tricks or risky links stood out here. Still, never share OTPs or PINs with anyone.',
      linkWarningTitle: 'Risky link detected',
      nextStepsTitle: 'What to do now',
      listenBtn: 'Listen',
      stopListenBtn: 'Stop audio',
      parentCardTitle: 'Read this to your parent',
      parentRevealBtn: 'Explain for my parent',
      reputationBadge: 'Reported by {count} people before',
      feedbackPrompt: 'Was this right?',
      feedbackYes: 'Yes',
      feedbackNo: 'No',
      feedbackThanks: 'Thank you! This helps us make explanations clearer.',
      emergencyCardTitle: 'Already clicked or paid?',
      emergencyCardDesc: 'Stay calm. Follow our step-by-step recovery guide to protect your money right now.',
      emergencyCardBtn: 'Get help now',
      disclaimer: 'ScamShield can be wrong. When in doubt, call your bank on its official number.',
      checkAnother: 'Check another message',
      reportLink: 'Where to report scams',
    },
    help: {
      title: "Don't panic. Let's fix this step by step.",
      subtitle: 'Pick what happened so we can walk through the exact steps right now.',
      lastChecked: 'Last checked: Nov 2026',
      stepOf: 'Step {current} of {total}',
      nextStep: 'Done, next step',
      prevStep: 'Previous step',
      finishBtn: 'Finish all steps',
      doneTitle: 'You did the right thing',
      doneDesc: 'Acting quickly is the strongest protection. Keep your complaint number and screenshots safely.',
      doneReportBtn: 'See all helpline numbers',
      doneHomeBtn: 'Back to ScamShield',
      callNow: 'Tap to call',
      openPortal: 'Open official portal',
      cards: {
        linkTitle: 'I clicked a link',
        linkDesc: 'You tapped a website link from an SMS or WhatsApp message.',
        otpTitle: 'I shared an OTP or PIN',
        otpDesc: 'You read out or typed a bank OTP, UPI PIN, or password.',
        appTitle: 'I installed an app',
        appDesc: 'You downloaded an APK file or screen-sharing app someone sent.',
        moneyTitle: 'I sent money',
        moneyDesc: 'Money left your bank account, card, or UPI app.',
      },
    },
    guide: {
      title: 'Scams to know',
      subtitle: 'Spot the most common tricks targeting families across India.',
      scamOfWeekBadge: 'Scam of the week',
      allFilter: 'All scams',
      seeExample: 'See example',
      closeModal: 'Close',
      exampleMessageTitle: 'Sample scam message',
      whyFakeTitle: 'Red flags in this message',
    },
    report: {
      title: 'Where to report a scam',
      subtitle: 'Act fast if money was taken or if someone tried to trick you.',
      lastChecked: 'Last checked: Nov 2026',
      helplineLabel: 'National Cybercrime Helpline',
      callBtn: 'Call 1930 now',
      portalLabel: 'National Cybercrime Portal',
      openBtn: 'Open cybercrime.gov.in',
      bankLabel: 'Your Bank Fraud Helpline',
      bankDesc: 'Call the official number on the back of your debit/credit card or inside your bank passbook to freeze your card or account.',
      upiLabel: 'Your UPI App Support',
      upiDesc: 'Open PhonePe, Google Pay, Paytm, or BHIM directly -> go to History -> select the transaction -> tap Report / Raise Dispute.',
      evidenceTitle: 'Keep as evidence',
      evidenceSubtitle: 'Tick off what you have saved before filing your report:',
      evidenceItems: [
        'Screenshot of the full SMS or WhatsApp chat',
        'Scammer phone number or sender ID',
        'UPI Transaction ID / UTR / Bank reference number',
        'Date, exact time, and amount debited',
        'The suspicious link URL or app name',
      ],
    },
    about: {
      title: 'About ScamShield',
      storyTitle: 'Why this exists',
      storyBody: 'I built this after my family got a scam message. One scary text about an electricity disconnection or blocked bank KYC can make anyone panic in seconds. ScamShield gives everyone—especially parents and elders—a calm second pair of eyes before they tap or pay.',
      howTitle: 'How ScamShield checks messages',
      howItems: [
        { title: 'Reads the tricks', desc: 'Looks for artificial urgency, threats, fake prizes, and requests for OTPs or screen-sharing apps.' },
        { title: 'Checks every link', desc: 'Compares links against official Indian bank, government, and delivery domains to catch lookalikes.' },
        { title: 'Explains plainly', desc: 'Translates technical clues into short, calm sentences in English, Hindi, or Marathi.' },
      ],
      privacyTitle: 'Your privacy promise',
      privacyItems: [
        { title: "We don't store your messages", desc: 'Your text, screenshots, phone numbers, and links are never saved to any database or log.' },
        { title: 'No login required', desc: 'Open the site and check a message right away without creating an account.' },
        { title: 'Free for everyone', desc: 'Built as a public-interest safety tool you can share with parents and relatives.' },
      ],
      disclaimer: 'ScamShield can be wrong. When in doubt, call your bank on its official number.',
      credit: 'Built with Gemini and Google Cloud',
      reportBtn: 'Where to report scams',
    },
    notFound: {
      title: 'Pip could not find that page',
      desc: 'This link may have moved or does not exist. Let us take you back safely.',
      homeBtn: 'Go home',
      checkBtn: 'Check a message',
    },
    chat: {
      buttonLabel: 'Ask Pip',
      title: 'Ask Pip AI',
      subtitle: 'Calm scam advice in English, हिन्दी, or मराठी',
      privacyNote: 'Chats stay only in this window and are never saved.',
      contextBanner: 'Using your latest message check as context',
      welcome: 'Hi! I am Pip. Tell me about a suspicious call, SMS, or WhatsApp message, or tap a question below.',
      placeholder: 'Ask Pip anything (never share OTPs or PINs)...',
      sendBtn: 'Send',
      clearBtn: 'New chat',
      closeBtn: 'Close chat',
      thinking: 'Pip is thinking...',
      suggestionsLabel: 'AI suggested questions:',
      starterQuestions: [
        'Someone called saying my parcel is stuck. Is it real?',
        'What should I do if someone sent a QR code to receive money?',
        'How do I tell my parents to spot fake KYC messages?',
      ],
      listenReply: 'Listen',
      stopReply: 'Stop',
      askPipCta: 'Not sure? Ask Pip AI',
    },
    suggestions: {
      title: 'AI suggestions for you',
      loading: 'Preparing helpful suggestions...',
      familyLabel: 'Ready-to-send message for parents or family',
      copyBtn: 'Copy message',
      copiedBtn: 'Copied!',
      tipsLabel: 'Smart next-step suggestions',
      askPromptsLabel: 'Ask Pip AI about this',
    },
  },
  hi: {
    appName: 'ScamShield',
    nav: {
      check: 'जाँचें',
      guide: 'गाइड',
      help: 'मदद',
      about: 'जानकारी',
      report: 'रिपोर्ट',
    },
    landing: {
      headlineBefore: 'संदिग्ध संदेश? भरोसा करने से पहले ',
      headlineGlow: 'जाँचें',
      headlineAfter: '।',
      subhead: 'SMS या WhatsApp संदेश पेस्ट करें, स्क्रीनशॉट अपलोड करें या बोलकर सुनाएँ। कुछ सेकंड में साफ जवाब पाएँ।',
      ctaCheck: 'संदेश जाँचें',
      ctaHelp: 'मैंने लिंक दबा दिया या पैसे भेज दिए',
      features: {
        linksTitle: 'नकली लिंक पकड़ता है',
        linksDesc: 'बैंक, कूरियर और बिजली बिल जैसी नकली वेबसाइटों को तुरंत पहचानता है।',
        langTitle: 'हिन्दी और मराठी में मदद',
        langDesc: 'English, हिन्दी या मराठी में आसान शब्दों में पढ़ें या सुनें।',
        privacyTitle: 'आपका संदेश कभी सेव नहीं होता',
        privacyDesc: 'आपके संदेश, स्क्रीनशॉट और नंबर जाँच के बाद तुरंत भुला दिए जाते हैं।',
      },
      howTitle: 'यह कैसे काम करता है',
      howSteps: {
        step1Title: '1. पेस्ट या अपलोड करें',
        step1Desc: 'संदिग्ध SMS, WhatsApp संदेश या स्क्रीनशॉट डालें।',
        step2Title: '2. पिप जाँच करता है',
        step2Desc: 'ScamShield लिंक, घबराहट वाले शब्दों और धोखाधड़ी की चालों को परखता है।',
        step3Title: '3. साफ अगले कदम',
        step3Desc: 'हाइलाइट किए गए खतरे और आसान सलाह तुरंत देखें।',
      },
      demoLabel: 'उदाहरण झलक',
      demoVerdict: 'संभावित धोखाधड़ी',
      demoNote: 'नकली लिंक और धमकी भरे शब्दों को अपने-आप हाइलाइट करता है।',
      footerCredit: 'Gemini और Google Cloud के साथ निर्मित',
      liteMode: 'लाइट मोड',
      liteModeDesc: 'पुराने फोन के लिए ब्लर और एनिमेशन बंद करता है',
    },
    check: {
      title: 'संदिग्ध संदेश की जाँच करें',
      subtitle: 'SMS या WhatsApp टेक्स्ट पेस्ट करें, स्क्रीनशॉट अपलोड करें या बोलें।',
      placeholder: 'यहाँ संदेश पेस्ट करें...',
      reminder: 'बॉक्स में कभी भी अपना OTP, PIN या कार्ड नंबर न डालें।',
      pasteBtn: 'पेस्ट करें',
      pastedFeedback: 'क्लिपबोर्ड से पेस्ट किया गया',
      clipboardError: 'क्लिपबोर्ड अनुमति नहीं मिली। कृपया बॉक्स में दबाकर पेस्ट करें।',
      uploadBtn: 'स्क्रीनशॉट अपलोड करें',
      imageReady: 'स्क्रीनशॉट जाँच के लिए तैयार है',
      removeImage: 'स्क्रीनशॉट हटाएँ',
      imageErrorType: 'कृपया JPEG, PNG या WebP स्क्रीनशॉट अपलोड करें।',
      imageErrorSize: 'स्क्रीनशॉट बहुत बड़ा है (अधिकतम 4 MB)।',
      speakBtn: 'बोलें',
      stopSpeakBtn: 'सुनना बंद करें',
      listeningLabel: 'सुन रहा है... अपना संदेश बोलें',
      parentToggleTitle: 'माता-पिता के लिए जाँच रहे हैं?',
      parentToggleDesc: 'उन्हें पढ़कर सुनाने के लिए बेहद आसान भाषा में जवाब पाएँ',
      samplesLabel: 'या एक उदाहरण आज़माएँ:',
      samples: {
        kyc: 'बैंक KYC ब्लॉक',
        parcel: 'पार्सल रुका है',
        electricity: 'बिजली कनेक्शन कट',
        realBank: 'असली बैंक अलर्ट',
      },
      submitBtn: 'इस संदेश को जाँचें',
      privacyNote: 'हम आपके संदेश सेव नहीं करते।',
      emptyWarning: 'कृपया पहले कोई संदेश पेस्ट करें या स्क्रीनशॉट अपलोड करें।',
      tooLongWarning: 'संदेश बहुत लंबा है। कृपया 4,000 अक्षरों से कम रखें।',
      offlineWarning: 'आप ऑफ़लाइन लग रहे हैं। कृपया इंटरनेट कनेक्शन जाँचें।',
    },
    loading: {
      lines: [
        'आपका संदेश पढ़ा जा रहा है...',
        'लिंक की जाँच हो रही है...',
        'धोखाधड़ी के संकेत देखे जा रहे हैं...',
      ],
      subtext: 'पिप हर शब्द को ध्यान से देख रहा है।',
    },
    error: {
      title: 'जाँच पूरी नहीं हो सकी',
      message: 'हम अभी इसकी जाँच नहीं कर पाए। सावधान रहें: लिंक न दबाएँ और OTP न बताएँ।',
      retry: 'फिर से कोशिश करें',
      rateLimit: 'अभी बहुत अधिक जाँचें हो रही हैं। कृपया एक मिनट रुककर फिर प्रयास करें।',
    },
    result: {
      stamps: {
        likely_scam: 'संभावित धोखाधड़ी',
        suspicious: 'सावधान रहें',
        no_red_flags: 'कोई खतरा नहीं मिला',
      },
      meterLabels: {
        clear: 'कोई खतरा नहीं',
        caution: 'सावधान रहें',
        scam: 'संभावित धोखाधड़ी',
      },
      meterSummary: {
        likely_scam: 'भरोसा मीटर: धोखाधड़ी का बड़ा खतरा पाया गया।',
        suspicious: 'भरोसा मीटर: सावधान रहें। कुछ संदिग्ध संकेत मिले हैं।',
        no_red_flags: 'भरोसा मीटर: इस संदेश में कोई बड़ा खतरा नहीं दिखा।',
      },
      messageTitle: 'हाइलाइट किया गया संदेश',
      reasonsTitle: 'पिप ने क्या देखा',
      noReasonsText: 'इसमें कोई आम धोखाधड़ी या खतरनाक लिंक नहीं दिखा। फिर भी किसी को OTP या PIN कभी न बताएँ।',
      linkWarningTitle: 'खतरनाक लिंक मिला',
      nextStepsTitle: 'अब क्या करें',
      listenBtn: 'सुनें',
      stopListenBtn: 'आवाज़ रोकें',
      parentCardTitle: 'अपने माता-पिता को यह पढ़कर सुनाएँ',
      parentRevealBtn: 'माता-पिता के लिए आसान भाषा',
      reputationBadge: 'पहले {count} लोगों ने रिपोर्ट किया',
      feedbackPrompt: 'क्या यह जाँच सही थी?',
      feedbackYes: 'हाँ',
      feedbackNo: 'नहीं',
      feedbackThanks: 'धन्यवाद! इससे हमें जवाब और साफ बनाने में मदद मिलती है।',
      emergencyCardTitle: 'पहले ही लिंक दबा दिया या पैसे भेज दिए?',
      emergencyCardDesc: 'घबराएँ नहीं। अपने पैसे बचाने के लिए अभी हमारे आसान कदम अपनाएँ।',
      emergencyCardBtn: 'अभी मदद लें',
      disclaimer: 'ScamShield से भी गलती हो सकती है। शक होने पर अपने बैंक के आधिकारिक नंबर पर कॉल करें।',
      checkAnother: 'दूसरा संदेश जाँचें',
      reportLink: 'धोखाधड़ी की शिकायत कहाँ करें',
    },
    help: {
      title: 'घबराएँ नहीं। आइए एक-एक कदम करके इसे संभालें।',
      subtitle: 'जो हुआ उसे चुनें, ताकि हम अभी सही कदम दिखा सकें।',
      lastChecked: 'अंतिम जाँच: नवंबर 2026',
      stepOf: 'कदम {current} / {total}',
      nextStep: 'हो गया, अगला कदम',
      prevStep: 'पिछला कदम',
      finishBtn: 'सभी कदम पूरे हुए',
      doneTitle: 'आपने बिल्कुल सही किया',
      doneDesc: 'जल्दी कदम उठाना ही सबसे बड़ी सुरक्षा है। अपनी शिकायत संख्या और स्क्रीनशॉट संभाल कर रखें।',
      doneReportBtn: 'सभी हेल्पलाइन नंबर देखें',
      doneHomeBtn: 'ScamShield पर वापस जाएँ',
      callNow: 'कॉल करने के लिए दबाएँ',
      openPortal: 'आधिकारिक पोर्टल खोलें',
      cards: {
        linkTitle: 'मैंने लिंक दबा दिया',
        linkDesc: 'आपने SMS या WhatsApp में आए किसी लिंक पर क्लिक कर दिया।',
        otpTitle: 'मैंने OTP या PIN बता दिया',
        otpDesc: 'आपने बैंक OTP, UPI PIN या पासवर्ड बता दिया या भर दिया।',
        appTitle: 'मैंने कोई ऐप इंस्टॉल किया',
        appDesc: 'आपने किसी के भेजने पर कोई APK या स्क्रीन-शेयर ऐप डाउनलोड किया।',
        moneyTitle: 'मैंने पैसे भेज दिए',
        moneyDesc: 'आपके बैंक खाते, कार्ड या UPI ऐप से पैसे कट गए हैं।',
      },
    },
    guide: {
      title: 'इन धोखाधड़ियों को पहचानें',
      subtitle: 'भारत में परिवारों को निशाना बनाने वाली सबसे आम ठगी के तरीके जानें।',
      scamOfWeekBadge: 'इस सप्ताह की मुख्य ठगी',
      allFilter: 'सभी',
      seeExample: 'उदाहरण देखें',
      closeModal: 'बंद करें',
      exampleMessageTitle: 'नकली संदेश का उदाहरण',
      whyFakeTitle: 'इस संदेश में खतरे के संकेत',
    },
    report: {
      title: 'धोखाधड़ी की रिपोर्ट कहाँ करें',
      subtitle: 'यदि पैसे कट गए हैं या किसी ने ठगने की कोशिश की है तो तुरंत रिपोर्ट करें।',
      lastChecked: 'अंतिम जाँच: नवंबर 2026',
      helplineLabel: 'राष्ट्रीय साइबर क्राइम हेल्पलाइन',
      callBtn: 'अभी 1930 पर कॉल करें',
      portalLabel: 'राष्ट्रीय साइबर क्राइम पोर्टल',
      openBtn: 'cybercrime.gov.in खोलें',
      bankLabel: 'आपके बैंक की फ्रॉड हेल्पलाइन',
      bankDesc: 'अपना कार्ड या खाता तुरंत ब्लॉक करने के लिए डेबिट/क्रेडिट कार्ड के पीछे या पासबुक में लिखे आधिकारिक नंबर पर कॉल करें।',
      upiLabel: 'आपके UPI ऐप का सपोर्ट',
      upiDesc: 'सीधे PhonePe, Google Pay, Paytm या BHIM खोलें -> History में जाएँ -> लेनदेन चुनें -> Report / Raise Dispute दबाएँ।',
      evidenceTitle: 'सबूत संभाल कर रखें',
      evidenceSubtitle: 'शिकायत दर्ज करने से पहले जाँच लें कि आपके पास ये चीज़ें हैं:',
      evidenceItems: [
        'पूरे SMS या WhatsApp चैट का स्क्रीनशॉट',
        'ठग का फोन नंबर या सेंडर ID',
        'UPI ट्रांज़ैक्शन ID / UTR / बैंक रेफरेंस नंबर',
        'तारीख, सही समय और कटी हुई रकम',
        'संदिग्ध लिंक या इंस्टॉल किए गए ऐप का नाम',
      ],
    },
    about: {
      title: 'ScamShield के बारे में',
      storyTitle: 'यह क्यों बनाया गया',
      storyBody: 'मेरे परिवार को एक धोखाधड़ी वाला संदेश मिलने के बाद मैंने इसे बनाया। बिजली कटने या बैंक KYC बंद होने का एक डरावना संदेश किसी को भी घबरा सकता है। ScamShield हर किसी—खासकर माता-पिता और बुजुर्गों—को लिंक दबाने या पैसे भेजने से पहले एक शांत सलाह देता है।',
      howTitle: 'ScamShield संदेश कैसे जाँचता है',
      howItems: [
        { title: 'चालें पहचानता है', desc: 'जल्दबाज़ी का दबाव, धमकी, नकली इनाम और OTP या स्क्रीन-शेयर ऐप की माँग पकड़ता है।' },
        { title: 'हर लिंक परखता है', desc: 'नकली वेबसाइट पकड़ने के लिए लिंक की तुलना असली भारतीय बैंकों, सरकारी और डिलीवरी डोमेन से करता है।' },
        { title: 'सीधी भाषा में समझाता है', desc: 'तकनीकी संकेतों को English, हिन्दी या मराठी के छोटे, आसान वाक्यों में बताता है।' },
      ],
      privacyTitle: 'आपकी गोपनीयता का वादा',
      privacyItems: [
        { title: 'हम संदेश सेव नहीं करते', desc: 'आपके संदेश, स्क्रीनशॉट, फोन नंबर और लिंक किसी भी डेटाबेस या लॉग में नहीं रखे जाते।' },
        { title: 'लॉगिन की ज़रूरत नहीं', desc: 'बिना खाता बनाए तुरंत साइट खोलें और संदेश जाँचें।' },
        { title: 'सबके लिए मुफ़्त', desc: 'माता-पिता और रिश्तेदारों के साथ साझा करने के लिए जन-हित सुरक्षा टूल।' },
      ],
      disclaimer: 'ScamShield से भी गलती हो सकती है। शक होने पर अपने बैंक के आधिकारिक नंबर पर कॉल करें।',
      credit: 'Gemini और Google Cloud के साथ निर्मित',
      reportBtn: 'धोखाधड़ी की शिकायत कहाँ करें',
    },
    notFound: {
      title: 'पिप को यह पेज नहीं मिला',
      desc: 'यह लिंक बदल गया है या मौजूद नहीं है। आइए आपको सुरक्षित वापस ले चलें।',
      homeBtn: 'होम पेज पर जाएँ',
      checkBtn: 'संदेश जाँचें',
    },
    chat: {
      buttonLabel: 'पिप से पूछें',
      title: 'पिप AI से पूछें',
      subtitle: 'English, हिन्दी या मराठी में शांत और आसान सलाह',
      privacyNote: 'यह चैट केवल इसी विंडो में रहती है और कभी सेव नहीं होती।',
      contextBanner: 'आपकी पिछली जाँच के संदर्भ के साथ बात हो रही है',
      welcome: 'नमस्ते! मैं पिप हूँ। किसी संदिग्ध कॉल, SMS या WhatsApp संदेश के बारे में पूछें, या नीचे दिया कोई सवाल चुनें।',
      placeholder: 'पिप से पूछें (कभी भी OTP या PIN न लिखें)...',
      sendBtn: 'भेजें',
      clearBtn: 'नई चैट',
      closeBtn: 'चैट बंद करें',
      thinking: 'पिप सोच रहा है...',
      suggestionsLabel: 'AI द्वारा सुझाए गए सवाल:',
      starterQuestions: [
        'किसी ने कॉल करके कहा कि पार्सल रुका है—क्या यह असली है?',
        'पैसे लेने के लिए कोई QR कोड स्कैन करने को कहे तो क्या करें?',
        'माता-पिता को नकली KYC संदेश पहचानना कैसे सिखाएँ?',
      ],
      listenReply: 'सुनें',
      stopReply: 'रोकें',
      askPipCta: 'संदेह है? पिप AI से पूछें',
    },
    suggestions: {
      title: 'आपके लिए AI सुझाव',
      loading: 'मददगार सुझाव तैयार हो रहे हैं...',
      familyLabel: 'माता-पिता या परिवार को भेजने के लिए संदेश',
      copyBtn: 'संदेश कॉपी करें',
      copiedBtn: 'कॉपी हो गया!',
      tipsLabel: 'समझदारी भरे अगले सुझाव',
      askPromptsLabel: 'इसके बारे में पिप AI से पूछें',
    },
  },
  mr: {
    appName: 'ScamShield',
    nav: {
      check: 'तपासा',
      guide: 'माहिती',
      help: 'मदत',
      about: 'आमच्याविषयी',
      report: 'तक्रार',
    },
    landing: {
      headlineBefore: 'संशयास्पद संदेश? विश्वास ठेवण्यापूर्वी ',
      headlineGlow: 'तपासा',
      headlineAfter: '.',
      subhead: 'SMS किंवा WhatsApp संदेश पेस्ट करा, स्क्रीनशॉट अपलोड करा किंवा बोलून सांगा. काही सेकंदांत स्पष्ट उत्तर मिळवा.',
      ctaCheck: 'संदेश तपासा',
      ctaHelp: 'मी आधीच लिंक दाबली किंवा पैसे पाठवले',
      features: {
        linksTitle: 'बनावट लिंक्स ओळखतो',
        linksDesc: 'बँक, कुरिअर आणि वीज बिलाच्या नावाखाली लपलेल्या बनावट वेबसाइट्स पकडतो.',
        langTitle: 'मराठी आणि हिंदीत समजवतो',
        langDesc: 'English, हिन्दी किंवा मराठीमध्ये सोप्या शब्दांत वाचा किंवा ऐका.',
        privacyTitle: 'तुमचा संदेश कधीही सेव्ह होत नाही',
        privacyDesc: 'तुमचे संदेश, स्क्रीनशॉट आणि नंबर तपासणीनंतर लगेच विसरले जातात.',
      },
      howTitle: 'हे कसे काम करते',
      howSteps: {
        step1Title: '१. पेस्ट किंवा अपलोड करा',
        step1Desc: 'संशयास्पद SMS, WhatsApp मजकूर किंवा स्क्रीनशॉट टाका.',
        step2Title: '२. पिप तपासणी करतो',
        step2Desc: 'ScamShield लिंक्स, घाईचा दबाव आणि फसवणुकीच्या युक्त्या तपासतो.',
        step3Title: '३. पुढचे स्पष्ट पाऊल',
        step3Desc: 'हायलाइट केलेले धोके आणि सोपा सल्ला लगेच पहा.',
      },
      demoLabel: 'थेट उदाहरण झलक',
      demoVerdict: 'फसवणुकीची शक्यता',
      demoNote: 'बनावट लिंक्स आणि धमकी देणारे शब्द आपोआप हायलाइट करतो.',
      footerCredit: 'Gemini आणि Google Cloud सह निर्मित',
      liteMode: 'लाइट मोड',
      liteModeDesc: 'जुन्या फोनसाठी ब्लर आणि अ‍ॅनिमेशन बंद करतो',
    },
    check: {
      title: 'संशयास्पद संदेश तपासा',
      subtitle: 'SMS किंवा WhatsApp मजकूर पेस्ट करा, स्क्रीनशॉट अपलोड करा किंवा बोला.',
      placeholder: 'येथे संदेश पेस्ट करा...',
      reminder: 'या बॉक्समध्ये कधीही तुमचा OTP, PIN किंवा कार्ड नंबर टाकू नका.',
      pasteBtn: 'पेस्ट करा',
      pastedFeedback: 'क्लिपबोर्डवरून पेस्ट केले',
      clipboardError: 'क्लिपबोर्ड परवानगी नाही. कृपया बॉक्समध्ये दाबून पेस्ट करा.',
      uploadBtn: 'स्क्रीनशॉट अपलोड करा',
      imageReady: 'स्क्रीनशॉट तपासणीसाठी तयार आहे',
      removeImage: 'स्क्रीनशॉट काढा',
      imageErrorType: 'कृपया JPEG, PNG किंवा WebP स्क्रीनशॉट अपलोड करा.',
      imageErrorSize: 'स्क्रीनशॉट खूप मोठा आहे (कमाल 4 MB).',
      speakBtn: 'बोला',
      stopSpeakBtn: 'ऐकणे थांबवा',
      listeningLabel: 'ऐकत आहे... तुमचा संदेश बोला',
      parentToggleTitle: 'आई-वडिलांसाठी तपासत आहात का?',
      parentToggleDesc: 'त्यांना वाचून दाखवण्यासाठी अत्यंत सोप्या भाषेत स्पष्टीकरण मिळवा',
      samplesLabel: 'किंवा एक उदाहरण वापरून पहा:',
      samples: {
        kyc: 'बँक KYC ब्लॉक',
        parcel: 'पार्सल अडकले आहे',
        electricity: 'वीज कनेक्शन बंद',
        realBank: 'खरा बँक अलर्ट',
      },
      submitBtn: 'हा संदेश तपासा',
      privacyNote: 'आम्ही तुमचे संदेश सेव्ह करत नाही.',
      emptyWarning: 'कृपया आधी संदेश पेस्ट करा किंवा स्क्रीनशॉट अपलोड करा.',
      tooLongWarning: 'संदेश खूप मोठा आहे. कृपया ४,००० अक्षरांपेक्षा कमी ठेवा.',
      offlineWarning: 'तुम्ही ऑफलाइन आहात असे दिसते. कृपया इंटरनेट तपासा.',
    },
    loading: {
      lines: [
        'तुमचा संदेश वाचत आहे...',
        'लिंक्स तपासत आहे...',
        'फसवणुकीचे संकेत शोधत आहे...',
      ],
      subtext: 'पिप प्रत्येक शब्द शांतपणे तपासत आहे.',
    },
    error: {
      title: 'तपासणी पूर्ण होऊ शकली नाही',
      message: 'आम्ही आत्ता हे तपासू शकलो नाही. सावध रहा: लिंक्सवर क्लिक करू नका किंवा OTP सांगू नका.',
      retry: 'पुन्हा प्रयत्न करा',
      rateLimit: 'सध्या खूप तपासण्या सुरू आहेत. कृपया एक मिनिट थांबून पुन्हा प्रयत्न करा.',
    },
    result: {
      stamps: {
        likely_scam: 'फसवणुकीची शक्यता',
        suspicious: 'सावध रहा',
        no_red_flags: 'कोणताही धोका आढळला नाही',
      },
      meterLabels: {
        clear: 'धोका नाही',
        caution: 'सावध रहा',
        scam: 'फसवणुकीची शक्यता',
      },
      meterSummary: {
        likely_scam: 'विश्वास मीटर: फसवणुकीचा मोठा धोका आढळला.',
        suspicious: 'विश्वास मीटर: सावध रहा. काही संशयास्पद संकेत आढळले.',
        no_red_flags: 'विश्वास मीटर: या संदेशात कोणताही मोठा धोका दिसला नाही.',
      },
      messageTitle: 'हायलाइट केलेला संदेश',
      reasonsTitle: 'पिपला काय आढळले',
      noReasonsText: 'यामध्ये नेहमीचे फसवणुकीचे डाव किंवा धोकादायक लिंक दिसली नाही. तरीही कोणालाही OTP किंवा PIN कधीही देऊ नका.',
      linkWarningTitle: 'धोकादायक लिंक आढळली',
      nextStepsTitle: 'आता काय करावे',
      listenBtn: 'ऐका',
      stopListenBtn: 'आवाज थांबवा',
      parentCardTitle: 'तुमच्या आई-वडिलांना हे वाचून दाखवा',
      parentRevealBtn: 'आई-वडिलांसाठी सोपे स्पष्टीकरण',
      reputationBadge: 'यापूर्वी {count} लोकांनी तक्रार केली आहे',
      feedbackPrompt: 'ही तपासणी बरोबर होती का?',
      feedbackYes: 'होय',
      feedbackNo: 'नाही',
      feedbackThanks: 'धन्यवाद! यामुळे आम्हाला उत्तरे अधिक स्पष्ट करण्यात मदत होते.',
      emergencyCardTitle: 'आधीच लिंक दाबली किंवा पैसे पाठवले?',
      emergencyCardDesc: 'घाबरू नका. तुमचे पैसे वाचवण्यासाठी आत्ता आमच्या पायरी-पायरीच्या मदतीचे अनुसरण करा.',
      emergencyCardBtn: 'आत्ता मदत मिळवा',
      disclaimer: 'ScamShield चुकू शकते. शंका असल्यास तुमच्या बँकेच्या अधिकृत नंबरवर कॉल करा.',
      checkAnother: 'दुसरा संदेश तपासा',
      reportLink: 'तक्रार कोठे करावी',
    },
    help: {
      title: 'घाबरू नका. चला एक-एक पाऊल टाकून हे सावरूया.',
      subtitle: 'नेमके काय झाले ते निवडा, म्हणजे आम्ही आत्ता योग्य ती मदत दाखवू.',
      lastChecked: 'शेवटची तपासणी: नोव्हें २०२६',
      stepOf: 'पायरी {current} / {total}',
      nextStep: 'झाले, पुढची पायरी',
      prevStep: 'मागील पायरी',
      finishBtn: 'सर्व पायऱ्या पूर्ण',
      doneTitle: 'तुम्ही अगदी योग्य केले',
      doneDesc: 'वेळेवर पाऊल उचलणे हाच सर्वात मोठा बचाव आहे. तुमचा तक्रार क्रमांक आणि स्क्रीनशॉट जपून ठेवा.',
      doneReportBtn: 'सर्व हेल्पलाइन नंबर पहा',
      doneHomeBtn: 'ScamShield वर परत जा',
      callNow: 'कॉल करण्यासाठी दाबा',
      openPortal: 'अधिकृत पोर्टल उघडा',
      cards: {
        linkTitle: 'मी लिंकवर क्लिक केले',
        linkDesc: 'तुम्ही SMS किंवा WhatsApp मधील वेबसाइट लिंक दाबली.',
        otpTitle: 'मी OTP किंवा PIN सांगितला',
        otpDesc: 'तुम्ही बँक OTP, UPI PIN किंवा पासवर्ड सांगितला किंवा भरला.',
        appTitle: 'मी एक अ‍ॅप इन्स्टॉल केले',
        appDesc: 'तुम्ही कोणीतरी पाठवलेली APK फाईल किंवा स्क्रीन-शेअर अ‍ॅप डाउनलोड केले.',
        moneyTitle: 'मी पैसे पाठवले',
        moneyDesc: 'तुमच्या बँक खात्यातून, कार्डवरून किंवा UPI अ‍ॅपमधून पैसे गेले.',
      },
    },
    guide: {
      title: 'ओळखा या फसवणुकीच्या पद्धती',
      subtitle: 'भारतातील कुटुंबांना लक्ष्य करणाऱ्या सर्वात सामान्य फसवणुकी जाणून घ्या.',
      scamOfWeekBadge: 'या आठवड्याची प्रमुख फसवणूक',
      allFilter: 'सर्व प्रकार',
      seeExample: 'उदाहरण पहा',
      closeModal: 'बंद करा',
      exampleMessageTitle: 'बनावट संदेशाचे उदाहरण',
      whyFakeTitle: 'या संदेशातील धोक्याचे संकेत',
    },
    report: {
      title: 'फसवणुकीची तक्रार कोठे करावी',
      subtitle: 'पैसे गेले असतील किंवा कोणी फसवणुकीचा प्रयत्न केला असेल तर लगेच कळवा.',
      lastChecked: 'शेवटची तपासणी: नोव्हें २०२६',
      helplineLabel: 'राष्ट्रीय सायबर क्राईम हेल्पलाइन',
      callBtn: 'आत्ता 1930 वर कॉल करा',
      portalLabel: 'राष्ट्रीय सायबर क्राईम पोर्टल',
      openBtn: 'cybercrime.gov.in उघडा',
      bankLabel: 'तुमच्या बँकेची फ्रॉड हेल्पलाइन',
      bankDesc: 'कार्ड किंवा खाते त्वरित बंद करण्यासाठी डेबिट/क्रेडिट कार्डच्या मागे किंवा पासबुकमधील अधिकृत नंबरवर कॉल करा.',
      upiLabel: 'तुमच्या UPI अ‍ॅपचा सपोर्ट',
      upiDesc: 'थेट PhonePe, Google Pay, Paytm किंवा BHIM उघडा -> History मध्ये जा -> व्यवहार निवडा -> Report / Raise Dispute दाबा.',
      evidenceTitle: 'पुरावे जपून ठेवा',
      evidenceSubtitle: 'तक्रार नोंदवण्यापूर्वी तुमच्याकडे या गोष्टी आहेत का ते तपासा:',
      evidenceItems: [
        'संपूर्ण SMS किंवा WhatsApp चॅटचा स्क्रीनशॉट',
        'फसवणूक करणाऱ्याचा फोन नंबर किंवा सेंडर ID',
        'UPI ट्रान्झॅक्शन ID / UTR / बँक रेफरन्स नंबर',
        'तारीख, अचूक वेळ आणि गेलेली रक्कम',
        'संशयास्पद लिंक किंवा इन्स्टॉल केलेल्या अ‍ॅपचे नाव',
      ],
    },
    about: {
      title: 'ScamShield विषयी',
      storyTitle: 'हे का तयार केले',
      storyBody: 'माझ्या कुटुंबाला एक फसवणुकीचा संदेश आल्यानंतर मी हे तयार केले. वीज बिल किंवा बँक KYC बंद होण्याचा एक घाबरवणारा मेसेज कोणालाही क्षणात गोंधळात टाकू शकतो. ScamShield सर्वांना—विशेषतः आई-वडिलांना आणि ज्येष्ठांना—क्लिक करण्यापूर्वी शांतपणे तपासणी करण्याची सोय देतो.',
      howTitle: 'ScamShield संदेश कसे तपासतो',
      howItems: [
        { title: 'युक्त्या ओळखतो', desc: 'कृत्रिम घाई, धमक्या, बनावट बक्षिसे आणि OTP किंवा स्क्रीन-शेअर अ‍ॅपची मागणी शोधतो.' },
        { title: 'प्रत्येक लिंक तपासतो', desc: 'बनावट वेबसाइट पकडण्यासाठी लिंकची तुलना अधिकृत भारतीय बँका, सरकारी आणि डिलिव्हरी डोमेनशी करतो.' },
        { title: 'सोप्या भाषेत सांगतो', desc: 'तांत्रिक गोष्टी English, हिन्दी किंवा मराठीतील लहान, शांत वाक्यांत समजावून सांगतो.' },
      ],
      privacyTitle: 'तुमच्या गोपनीयतेचे वचन',
      privacyItems: [
        { title: 'आम्ही संदेश साठवत नाही', desc: 'तुमचे संदेश, स्क्रीनशॉट, फोन नंबर आणि लिंक्स कोणत्याही डेटाबेस किंवा लॉगमध्ये ठेवले जात नाहीत.' },
        { title: 'लॉगिनची गरज नाही', desc: 'खाते न उघडता थेट साइट उघडा आणि संदेश तपासा.' },
        { title: 'सर्वांसाठी मोफत', desc: 'आई-वडील आणि नातेवाईकांसोबत शेअर करता येईल असे जनहिताचे सुरक्षा साधन.' },
      ],
      disclaimer: 'ScamShield चुकू शकते. शंका असल्यास तुमच्या बँकेच्या अधिकृत नंबरवर कॉल करा.',
      credit: 'Gemini आणि Google Cloud सह निर्मित',
      reportBtn: 'तक्रार कोठे करावी',
    },
    notFound: {
      title: 'पिपला हे पान सापडले नाही',
      desc: 'ही लिंक बदलली असावी किंवा अस्तित्वात नाही. चला तुम्हाला सुरक्षित परत नेऊया.',
      homeBtn: 'मुख्य पानावर जा',
      checkBtn: 'संदेश तपासा',
    },
    chat: {
      buttonLabel: 'पिपला विचारा',
      title: 'पिप AI ला विचारा',
      subtitle: 'English, हिन्दी किंवा मराठीमध्ये शांत आणि सोपा सल्ला',
      privacyNote: 'हे संभाषण फक्त या विंडोत राहते आणि कधीही सेव्ह होत नाही.',
      contextBanner: 'तुमच्या मागील तपासणीच्या संदर्भासह बोलत आहे',
      welcome: 'नमस्कार! मी पिप आहे. संशयास्पद कॉल, SMS किंवा WhatsApp संदेशाबद्दल विचारा, किंवा खालीलपैकी एक प्रश्न निवडा.',
      placeholder: 'पिपला विचारा (कधीही OTP किंवा PIN टाकू नका)...',
      sendBtn: 'पाठवा',
      clearBtn: 'नवीन चॅट',
      closeBtn: 'चॅट बंद करा',
      thinking: 'पिप विचार करत आहे...',
      suggestionsLabel: 'AI ने सुचवलेले प्रश्न:',
      starterQuestions: [
        'पार्सल अडकले आहे असा फोन आला—हे खरे असते का?',
        'पैसे मिळवण्यासाठी कोणी QR कोड स्कॅन करायला सांगितले तर काय करावे?',
        'आई-वडिलांना बनावट KYC संदेश कसे ओळखायला शिकवावे?',
      ],
      listenReply: 'ऐका',
      stopReply: 'थांबवा',
      askPipCta: 'शंका आहे का? पिप AI ला विचारा',
    },
    suggestions: {
      title: 'तुमच्यासाठी AI सूचना',
      loading: 'उपयुक्त सूचना तयार होत आहेत...',
      familyLabel: 'आई-वडिलांना किंवा कुटुंबाला पाठवण्यासाठी संदेश',
      copyBtn: 'संदेश कॉपी करा',
      copiedBtn: 'कॉपी झाले!',
      tipsLabel: 'पुढील स्मार्ट सूचना',
      askPromptsLabel: 'याबद्दल पिप AI ला विचारा',
    },
  },
};
