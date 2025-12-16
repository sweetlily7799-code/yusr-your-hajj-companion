import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserMode = 'pilgrim' | 'organizer';
export type Language = 'ar' | 'en' | 'ur' | 'id' | 'tr' | 'fr' | 'ms' | 'bn' | 'fa' | 'ps' | 'zh' | 'ru';

interface PilgrimData {
  id: string;
  name: string;
  nameAr: string;
  nationality: string;
  passportNumber: string;
  campaignId: string;
  campaignName: string;
  bloodType: string;
  chronicDiseases: string[];
  allergies: string[];
  emergencyContact: string;
  emergencyPhone: string;
  walletBalance: number;
  originalCurrency: string;
  originalBalance: number;
  exchangeRate: number;
}

interface AppState {
  isOnboarded: boolean;
  userMode: UserMode | null;
  language: Language;
  isDarkMode: boolean;
  currentScreen: string;
  pilgrimData: PilgrimData | null;
  hajjDay: number;
  tawafCount: number;
  tawafActive: boolean;
  completedTasks: string[];
  pin: string;
  globalFontSize: number;
  selectedDestination: { nameAr: string; nameEn: string; distance: string; time: string } | null;
}

interface AppContextType extends AppState {
  setIsOnboarded: (value: boolean) => void;
  setUserMode: (mode: UserMode) => void;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
  setCurrentScreen: (screen: string) => void;
  setPilgrimData: (data: PilgrimData) => void;
  incrementTawaf: () => void;
  resetTawaf: () => void;
  toggleTawafActive: () => void;
  toggleTask: (taskId: string) => void;
  setPin: (pin: string) => void;
  updateWalletBalance: (amount: number) => void;
  setGlobalFontSize: (size: number) => void;
  setSelectedDestination: (dest: { nameAr: string; nameEn: string; distance: string; time: string } | null) => void;
  t: (key: string) => string;
}

const baseTranslations: Record<string, string> = {
  welcome: 'Welcome to Yusr',
  subtitle: 'Your Smart Hajj Companion',
  selectMode: 'Select Usage Mode',
  pilgrimMode: 'Pilgrim Mode',
  organizerMode: 'Organizer Mode',
  pilgrimDesc: 'For honored pilgrims',
  organizerDesc: 'For campaign organizers',
  login: 'Login',
  username: 'Username',
  password: 'Password',
  signIn: 'Sign In',
  home: 'Home',
  hajjDay: 'Hajj Day',
  dailyGuide: 'Daily Guide',
  tawafCounter: 'Tawaf Counter',
  wallet: 'Wallet',
  library: 'Library',
  alerts: 'Alerts',
  profile: 'Profile',
  settings: 'Settings',
  safety: 'Safety',
  navigation: 'Navigation',
  services: 'Services',
  sheikhs: 'Ask Sheikh',
  rounds: 'rounds',
  completed: 'Completed',
  remaining: 'Remaining',
  reset: 'Reset',
  balance: 'Balance',
  sar: 'SAR',
  pay: 'Pay',
  charge: 'Charge',
  enterPin: 'Enter PIN',
  confirm: 'Confirm',
  cancel: 'Cancel',
  adhkar: 'Adhkar',
  duaa: 'Duaa',
  quran: 'Quran',
  tasks: 'Tasks',
  campaign: 'Campaign',
  groupStatus: 'Group Status',
  allPresent: 'All Present',
  language: 'Language',
  darkMode: 'Dark Mode',
  fontSize: 'Font Size',
  personalInfo: 'Personal Info',
  healthInfo: 'Health Info',
  bloodType: 'Blood Type',
  diseases: 'Chronic Diseases',
  allergies: 'Allergies',
  emergency: 'Emergency',
  name: 'Name',
  passport: 'Passport',
  nationality: 'Nationality',
  today: 'Today',
  ihram: 'Ihram',
  tawaf: 'Tawaf',
  sai: 'Sa\'i',
  arafat: 'Arafat',
  muzdalifah: 'Muzdalifah',
  mina: 'Mina',
  stoning: 'Stoning',
  sacrifice: 'Sacrifice',
  halq: 'Halq/Taqsir',
  tawafIfadah: 'Tawaf Al-Ifadah',
  farewell: 'Farewell Tawaf',
  ministryAlert: 'Ministry Alert',
  safetyAlert: 'Safety Alert',
  nearbyServices: 'Nearby Services',
  hospital: 'Hospital',
  mosque: 'Mosque',
  atm: 'ATM',
  food: 'Food',
  bathroom: 'Bathroom',
  police: 'Police',
  callSheikh: 'Call Sheikh',
  available: 'Available',
  busy: 'Busy',
  pilgrims: 'Pilgrims',
  present: 'Present',
  separated: 'Separated',
  sendAlert: 'Send Alert',
  groupList: 'Group List',
  back: 'Back',
  support: 'Support',
  startTawaf: 'Start Tawaf',
  stopTawaf: 'Stop',
  autoTracking: 'Auto Tracking',
  navigate: 'Navigate',
  routeGuidance: 'Route Guidance',
  estimatedTime: 'Est. Time',
  distance: 'Distance',
  morning: 'Morning',
  evening: 'Evening',
  sleep: 'Sleep',
  general: 'General',
  hajjSpecific: 'Hajj Specific',
  yourCurrency: 'Your Currency',
  converting: 'Converting to SAR',
  callConnected: 'Call Connected',
  endCall: 'End Call',
  connecting: 'Connecting...',
  technicalSupport: 'Technical Support',
};

const translations: Record<Language, Record<string, string>> = {
  ar: {
    welcome: 'مرحباً بك في يُسر',
    subtitle: 'رفيقك الذكي في رحلة الحج',
    selectMode: 'اختر وضع الاستخدام',
    pilgrimMode: 'وضع الحاج',
    organizerMode: 'وضع المنظم',
    pilgrimDesc: 'للحجاج الكرام',
    organizerDesc: 'لمنظمي الحملات',
    login: 'تسجيل الدخول',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    signIn: 'دخول',
    home: 'الرئيسية',
    hajjDay: 'يوم الحج',
    dailyGuide: 'الدليل اليومي',
    tawafCounter: 'عداد الطواف',
    wallet: 'المحفظة',
    library: 'المكتبة',
    alerts: 'التنبيهات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    safety: 'الأمان',
    navigation: 'الملاحة',
    services: 'الخدمات',
    sheikhs: 'استشارة الشيوخ',
    rounds: 'أشواط',
    completed: 'مكتمل',
    remaining: 'متبقي',
    reset: 'إعادة',
    balance: 'الرصيد',
    sar: 'ريال',
    pay: 'الدفع',
    charge: 'الشحن',
    enterPin: 'أدخل الرقم السري',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    adhkar: 'الأذكار',
    duaa: 'الدعاء',
    quran: 'القرآن',
    tasks: 'المهام',
    campaign: 'الحملة',
    groupStatus: 'حالة المجموعة',
    allPresent: 'الجميع حاضر',
    language: 'اللغة',
    darkMode: 'الوضع الليلي',
    fontSize: 'حجم الخط',
    personalInfo: 'المعلومات الشخصية',
    healthInfo: 'المعلومات الصحية',
    bloodType: 'فصيلة الدم',
    diseases: 'الأمراض المزمنة',
    allergies: 'الحساسية',
    emergency: 'الطوارئ',
    name: 'الاسم',
    passport: 'رقم الجواز',
    nationality: 'الجنسية',
    today: 'اليوم',
    ihram: 'الإحرام',
    tawaf: 'الطواف',
    sai: 'السعي',
    arafat: 'عرفة',
    muzdalifah: 'مزدلفة',
    mina: 'منى',
    stoning: 'رمي الجمرات',
    sacrifice: 'الذبح',
    halq: 'الحلق أو التقصير',
    tawafIfadah: 'طواف الإفاضة',
    farewell: 'طواف الوداع',
    ministryAlert: 'تنبيه من الوزارة',
    safetyAlert: 'تنبيه أمان',
    nearbyServices: 'الخدمات القريبة',
    hospital: 'مستشفى',
    mosque: 'مسجد',
    atm: 'صراف آلي',
    food: 'طعام',
    bathroom: 'دورة مياه',
    police: 'شرطة',
    callSheikh: 'اتصل بشيخ',
    available: 'متاح',
    busy: 'مشغول',
    pilgrims: 'حجاج',
    present: 'حاضر',
    separated: 'منفصل',
    sendAlert: 'إرسال تنبيه',
    groupList: 'قائمة المجموعة',
    back: 'رجوع',
    support: 'الدعم',
    startTawaf: 'ابدأ الطواف',
    stopTawaf: 'إيقاف',
    autoTracking: 'تتبع تلقائي',
    navigate: 'توجيه',
    routeGuidance: 'إرشاد المسار',
    estimatedTime: 'الوقت المقدر',
    distance: 'المسافة',
    morning: 'الصباح',
    evening: 'المساء',
    sleep: 'النوم',
    general: 'عام',
    hajjSpecific: 'خاص بالحج',
    yourCurrency: 'عملتك',
    converting: 'التحويل إلى ريال',
    callConnected: 'المكالمة متصلة',
    endCall: 'إنهاء المكالمة',
    connecting: 'جاري الاتصال...',
    technicalSupport: 'الدعم الفني',
  },
  en: baseTranslations,
  ur: {
    welcome: 'یُسر میں خوش آمدید',
    subtitle: 'آپ کا سمارٹ حج ساتھی',
    selectMode: 'موڈ منتخب کریں',
    pilgrimMode: 'حاجی موڈ',
    organizerMode: 'منتظم موڈ',
    pilgrimDesc: 'معزز حجاج کے لیے',
    organizerDesc: 'مہم کے منتظمین کے لیے',
    login: 'لاگ ان',
    username: 'صارف نام',
    password: 'پاس ورڈ',
    signIn: 'داخل ہوں',
    home: 'ہوم',
    hajjDay: 'حج کا دن',
    dailyGuide: 'روزانہ گائیڈ',
    tawafCounter: 'طواف کاؤنٹر',
    wallet: 'بٹوہ',
    library: 'لائبریری',
    alerts: 'الرٹس',
    profile: 'پروفائل',
    settings: 'ترتیبات',
    safety: 'حفاظت',
    navigation: 'نیویگیشن',
    services: 'خدمات',
    sheikhs: 'شیخ سے پوچھیں',
    rounds: 'چکر',
    completed: 'مکمل',
    remaining: 'باقی',
    reset: 'ری سیٹ',
    balance: 'بیلنس',
    sar: 'ریال',
    pay: 'ادائیگی',
    charge: 'چارج',
    enterPin: 'پن درج کریں',
    confirm: 'تصدیق',
    cancel: 'منسوخ',
    adhkar: 'اذکار',
    duaa: 'دعا',
    tasks: 'کام',
    back: 'واپس',
    support: 'مدد',
    startTawaf: 'طواف شروع کریں',
    technicalSupport: 'ٹیکنیکل سپورٹ',
  },
  id: {
    welcome: 'Selamat datang di Yusr',
    subtitle: 'Pendamping Haji Pintar Anda',
    selectMode: 'Pilih Mode',
    pilgrimMode: 'Mode Jamaah',
    organizerMode: 'Mode Penyelenggara',
    login: 'Masuk',
    home: 'Beranda',
    hajjDay: 'Hari Haji',
    dailyGuide: 'Panduan Harian',
    tawafCounter: 'Penghitung Tawaf',
    wallet: 'Dompet',
    library: 'Perpustakaan',
    alerts: 'Peringatan',
    settings: 'Pengaturan',
    back: 'Kembali',
    support: 'Dukungan',
    technicalSupport: 'Dukungan Teknis',
  },
  tr: {
    welcome: 'Yusr\'a Hoş Geldiniz',
    subtitle: 'Akıllı Hac Yardımcınız',
    selectMode: 'Mod Seçin',
    pilgrimMode: 'Hacı Modu',
    organizerMode: 'Organizatör Modu',
    login: 'Giriş',
    home: 'Ana Sayfa',
    hajjDay: 'Hac Günü',
    dailyGuide: 'Günlük Rehber',
    tawafCounter: 'Tavaf Sayacı',
    wallet: 'Cüzdan',
    library: 'Kütüphane',
    alerts: 'Uyarılar',
    settings: 'Ayarlar',
    back: 'Geri',
    support: 'Destek',
    technicalSupport: 'Teknik Destek',
  },
  fr: {
    welcome: 'Bienvenue sur Yusr',
    subtitle: 'Votre Compagnon de Hajj Intelligent',
    selectMode: 'Sélectionner le Mode',
    pilgrimMode: 'Mode Pèlerin',
    organizerMode: 'Mode Organisateur',
    login: 'Connexion',
    home: 'Accueil',
    hajjDay: 'Jour du Hajj',
    dailyGuide: 'Guide Quotidien',
    tawafCounter: 'Compteur de Tawaf',
    wallet: 'Portefeuille',
    library: 'Bibliothèque',
    alerts: 'Alertes',
    settings: 'Paramètres',
    back: 'Retour',
    support: 'Support',
    technicalSupport: 'Support Technique',
  },
  ms: {
    welcome: 'Selamat datang ke Yusr',
    subtitle: 'Teman Haji Pintar Anda',
    selectMode: 'Pilih Mod',
    pilgrimMode: 'Mod Jemaah',
    organizerMode: 'Mod Penganjur',
    login: 'Log Masuk',
    home: 'Utama',
    hajjDay: 'Hari Haji',
    dailyGuide: 'Panduan Harian',
    tawafCounter: 'Pengira Tawaf',
    wallet: 'Dompet',
    library: 'Perpustakaan',
    alerts: 'Amaran',
    settings: 'Tetapan',
    back: 'Kembali',
    support: 'Sokongan',
    technicalSupport: 'Sokongan Teknikal',
  },
  bn: {
    welcome: 'ইউসরে স্বাগতম',
    subtitle: 'আপনার স্মার্ট হজ সঙ্গী',
    selectMode: 'মোড নির্বাচন করুন',
    pilgrimMode: 'হাজী মোড',
    organizerMode: 'সংগঠক মোড',
    login: 'লগইন',
    home: 'হোম',
    hajjDay: 'হজের দিন',
    dailyGuide: 'দৈনিক গাইড',
    tawafCounter: 'তাওয়াফ কাউন্টার',
    wallet: 'ওয়ালেট',
    library: 'লাইব্রেরি',
    alerts: 'সতর্কতা',
    settings: 'সেটিংস',
    back: 'ফিরে',
    support: 'সাহায্য',
    technicalSupport: 'প্রযুক্তিগত সহায়তা',
  },
  fa: {
    welcome: 'به یُسر خوش آمدید',
    subtitle: 'همراه هوشمند حج شما',
    selectMode: 'انتخاب حالت',
    pilgrimMode: 'حالت حاجی',
    organizerMode: 'حالت سازمان‌دهنده',
    login: 'ورود',
    home: 'خانه',
    hajjDay: 'روز حج',
    dailyGuide: 'راهنمای روزانه',
    tawafCounter: 'شمارنده طواف',
    wallet: 'کیف پول',
    library: 'کتابخانه',
    alerts: 'هشدارها',
    settings: 'تنظیمات',
    back: 'بازگشت',
    support: 'پشتیبانی',
    technicalSupport: 'پشتیبانی فنی',
  },
  ps: {
    welcome: 'یُسر ته ښه راغلاست',
    subtitle: 'ستاسو هوښیار حج ملګری',
    selectMode: 'حالت غوره کړئ',
    pilgrimMode: 'حاجي حالت',
    organizerMode: 'تنظیم کوونکی حالت',
    login: 'ننوتل',
    home: 'کور',
    hajjDay: 'د حج ورځ',
    dailyGuide: 'ورځنی لارښود',
    tawafCounter: 'د طواف شمیرونکی',
    wallet: 'بټوه',
    library: 'کتابتون',
    alerts: 'خبرتیاوې',
    settings: 'ترتیبات',
    back: 'شاته',
    support: 'ملاتړ',
    technicalSupport: 'تخنیکي ملاتړ',
  },
  zh: {
    welcome: '欢迎来到Yusr',
    subtitle: '您的智能朝觐伴侣',
    selectMode: '选择模式',
    pilgrimMode: '朝觐者模式',
    organizerMode: '组织者模式',
    login: '登录',
    home: '主页',
    hajjDay: '朝觐日',
    dailyGuide: '每日指南',
    tawafCounter: '绕行计数器',
    wallet: '钱包',
    library: '图书馆',
    alerts: '警报',
    settings: '设置',
    back: '返回',
    support: '支持',
    technicalSupport: '技术支持',
  },
  ru: {
    welcome: 'Добро пожаловать в Yusr',
    subtitle: 'Ваш умный спутник Хаджа',
    selectMode: 'Выберите режим',
    pilgrimMode: 'Режим паломника',
    organizerMode: 'Режим организатора',
    login: 'Вход',
    home: 'Главная',
    hajjDay: 'День Хаджа',
    dailyGuide: 'Ежедневный гид',
    tawafCounter: 'Счётчик Тавафа',
    wallet: 'Кошелёк',
    library: 'Библиотека',
    alerts: 'Оповещения',
    settings: 'Настройки',
    back: 'Назад',
    support: 'Поддержка',
    technicalSupport: 'Техническая поддержка',
  },
};

const mockPilgrimData: PilgrimData = {
  id: 'PK-2024-001234',
  name: 'Ahmed Khan',
  nameAr: 'أحمد خان',
  nationality: 'Pakistan',
  passportNumber: 'AB1234567',
  campaignId: 'CAMP-PK-045',
  campaignName: 'Al-Noor Hajj Group',
  bloodType: 'O+',
  chronicDiseases: ['Diabetes Type 2'],
  allergies: ['Penicillin'],
  emergencyContact: 'Fatima Khan',
  emergencyPhone: '+92-300-1234567',
  walletBalance: 2500,
  originalCurrency: 'PKR',
  originalBalance: 185000,
  exchangeRate: 74,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isOnboarded: false,
    userMode: null,
    language: 'ar',
    isDarkMode: false,
    currentScreen: 'welcome',
    pilgrimData: null,
    hajjDay: 8,
    tawafCount: 0,
    tawafActive: false,
    completedTasks: [],
    pin: '1234',
    globalFontSize: 14,
    selectedDestination: null,
  });

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  useEffect(() => {
    const isRtl = ['ar', 'ur', 'fa', 'ps'].includes(state.language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [state.language]);

  useEffect(() => {
    document.documentElement.style.setProperty('--global-font-size', `${state.globalFontSize}px`);
  }, [state.globalFontSize]);

  const setIsOnboarded = (value: boolean) => setState(s => ({ ...s, isOnboarded: value }));
  const setUserMode = (mode: UserMode) => setState(s => ({ ...s, userMode: mode, pilgrimData: mockPilgrimData }));
  const setLanguage = (lang: Language) => setState(s => ({ ...s, language: lang }));
  const toggleDarkMode = () => setState(s => ({ ...s, isDarkMode: !s.isDarkMode }));
  const setCurrentScreen = (screen: string) => setState(s => ({ ...s, currentScreen: screen }));
  const setPilgrimData = (data: PilgrimData) => setState(s => ({ ...s, pilgrimData: data }));
  const incrementTawaf = () => setState(s => ({ ...s, tawafCount: Math.min(s.tawafCount + 1, 7) }));
  const resetTawaf = () => setState(s => ({ ...s, tawafCount: 0, tawafActive: false }));
  const toggleTawafActive = () => setState(s => ({ ...s, tawafActive: !s.tawafActive }));
  const toggleTask = (taskId: string) => setState(s => ({
    ...s,
    completedTasks: s.completedTasks.includes(taskId)
      ? s.completedTasks.filter(t => t !== taskId)
      : [...s.completedTasks, taskId]
  }));
  const setPin = (pin: string) => setState(s => ({ ...s, pin }));
  const updateWalletBalance = (amount: number) => setState(s => ({
    ...s,
    pilgrimData: s.pilgrimData ? { ...s.pilgrimData, walletBalance: s.pilgrimData.walletBalance + amount } : null
  }));
  const setGlobalFontSize = (size: number) => setState(s => ({ ...s, globalFontSize: size }));
  const setSelectedDestination = (dest: { nameAr: string; nameEn: string; distance: string; time: string } | null) => 
    setState(s => ({ ...s, selectedDestination: dest }));

  const t = (key: string): string => {
    return translations[state.language]?.[key] || translations.en[key] || key;
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setIsOnboarded,
      setUserMode,
      setLanguage,
      toggleDarkMode,
      setCurrentScreen,
      setPilgrimData,
      incrementTawaf,
      resetTawaf,
      toggleTawafActive,
      toggleTask,
      setPin,
      updateWalletBalance,
      setGlobalFontSize,
      setSelectedDestination,
      t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
