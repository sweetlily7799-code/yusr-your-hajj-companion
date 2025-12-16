import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserMode = 'pilgrim' | 'organizer';
export type Language = 'ar' | 'en' | 'ur' | 'id' | 'tr' | 'fr';

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
  completedTasks: string[];
  pin: string;
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
  toggleTask: (taskId: string) => void;
  setPin: (pin: string) => void;
  updateWalletBalance: (amount: number) => void;
  t: (key: string) => string;
}

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
  },
  en: {
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
  },
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
    quran: 'قرآن',
    tasks: 'کام',
    campaign: 'مہم',
    groupStatus: 'گروپ کی حیثیت',
    allPresent: 'سب موجود',
    language: 'زبان',
    darkMode: 'ڈارک موڈ',
    fontSize: 'فونٹ سائز',
    personalInfo: 'ذاتی معلومات',
    healthInfo: 'صحت کی معلومات',
    bloodType: 'خون کی قسم',
    diseases: 'دائمی بیماریاں',
    allergies: 'الرجی',
    emergency: 'ایمرجنسی',
    name: 'نام',
    passport: 'پاسپورٹ',
    nationality: 'قومیت',
    today: 'آج',
    back: 'واپس',
  },
  id: {
    welcome: 'Selamat datang di Yusr',
    subtitle: 'Pendamping Haji Pintar Anda',
    selectMode: 'Pilih Mode',
    pilgrimMode: 'Mode Jamaah',
    organizerMode: 'Mode Penyelenggara',
    pilgrimDesc: 'Untuk jamaah haji',
    organizerDesc: 'Untuk penyelenggara',
    login: 'Masuk',
    username: 'Nama Pengguna',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    home: 'Beranda',
    hajjDay: 'Hari Haji',
    dailyGuide: 'Panduan Harian',
    tawafCounter: 'Penghitung Tawaf',
    wallet: 'Dompet',
    library: 'Perpustakaan',
    alerts: 'Peringatan',
    profile: 'Profil',
    settings: 'Pengaturan',
    safety: 'Keamanan',
    navigation: 'Navigasi',
    services: 'Layanan',
    sheikhs: 'Tanya Syekh',
    rounds: 'putaran',
    completed: 'Selesai',
    remaining: 'Tersisa',
    reset: 'Reset',
    balance: 'Saldo',
    sar: 'SAR',
    pay: 'Bayar',
    charge: 'Isi',
    enterPin: 'Masukkan PIN',
    confirm: 'Konfirmasi',
    cancel: 'Batal',
    adhkar: 'Dzikir',
    duaa: 'Doa',
    quran: 'Quran',
    tasks: 'Tugas',
    campaign: 'Kampanye',
    groupStatus: 'Status Grup',
    allPresent: 'Semua Hadir',
    language: 'Bahasa',
    darkMode: 'Mode Gelap',
    fontSize: 'Ukuran Font',
    personalInfo: 'Info Pribadi',
    healthInfo: 'Info Kesehatan',
    bloodType: 'Golongan Darah',
    diseases: 'Penyakit Kronis',
    allergies: 'Alergi',
    emergency: 'Darurat',
    name: 'Nama',
    passport: 'Paspor',
    nationality: 'Kebangsaan',
    today: 'Hari ini',
    back: 'Kembali',
  },
  tr: {
    welcome: 'Yusr\'a Hoş Geldiniz',
    subtitle: 'Akıllı Hac Yardımcınız',
    selectMode: 'Mod Seçin',
    pilgrimMode: 'Hacı Modu',
    organizerMode: 'Organizatör Modu',
    pilgrimDesc: 'Hacılar için',
    organizerDesc: 'Organizatörler için',
    login: 'Giriş',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    signIn: 'Giriş Yap',
    home: 'Ana Sayfa',
    hajjDay: 'Hac Günü',
    dailyGuide: 'Günlük Rehber',
    tawafCounter: 'Tavaf Sayacı',
    wallet: 'Cüzdan',
    library: 'Kütüphane',
    alerts: 'Uyarılar',
    profile: 'Profil',
    settings: 'Ayarlar',
    safety: 'Güvenlik',
    navigation: 'Navigasyon',
    services: 'Hizmetler',
    sheikhs: 'Şeyhe Sor',
    rounds: 'tur',
    completed: 'Tamamlandı',
    remaining: 'Kalan',
    reset: 'Sıfırla',
    balance: 'Bakiye',
    sar: 'SAR',
    pay: 'Öde',
    charge: 'Yükle',
    enterPin: 'PIN Girin',
    confirm: 'Onayla',
    cancel: 'İptal',
    adhkar: 'Zikirler',
    duaa: 'Dua',
    quran: 'Kuran',
    tasks: 'Görevler',
    campaign: 'Kampanya',
    groupStatus: 'Grup Durumu',
    allPresent: 'Herkes Mevcut',
    language: 'Dil',
    darkMode: 'Karanlık Mod',
    fontSize: 'Yazı Boyutu',
    personalInfo: 'Kişisel Bilgi',
    healthInfo: 'Sağlık Bilgisi',
    bloodType: 'Kan Grubu',
    diseases: 'Kronik Hastalıklar',
    allergies: 'Alerjiler',
    emergency: 'Acil',
    name: 'Ad',
    passport: 'Pasaport',
    nationality: 'Uyruk',
    today: 'Bugün',
    back: 'Geri',
  },
  fr: {
    welcome: 'Bienvenue sur Yusr',
    subtitle: 'Votre Compagnon de Hajj Intelligent',
    selectMode: 'Sélectionner le Mode',
    pilgrimMode: 'Mode Pèlerin',
    organizerMode: 'Mode Organisateur',
    pilgrimDesc: 'Pour les pèlerins',
    organizerDesc: 'Pour les organisateurs',
    login: 'Connexion',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    home: 'Accueil',
    hajjDay: 'Jour du Hajj',
    dailyGuide: 'Guide Quotidien',
    tawafCounter: 'Compteur de Tawaf',
    wallet: 'Portefeuille',
    library: 'Bibliothèque',
    alerts: 'Alertes',
    profile: 'Profil',
    settings: 'Paramètres',
    safety: 'Sécurité',
    navigation: 'Navigation',
    services: 'Services',
    sheikhs: 'Consulter Sheikh',
    rounds: 'tours',
    completed: 'Terminé',
    remaining: 'Restant',
    reset: 'Réinitialiser',
    balance: 'Solde',
    sar: 'SAR',
    pay: 'Payer',
    charge: 'Recharger',
    enterPin: 'Entrer le PIN',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    adhkar: 'Adhkar',
    duaa: 'Doua',
    quran: 'Coran',
    tasks: 'Tâches',
    campaign: 'Campagne',
    groupStatus: 'Statut du Groupe',
    allPresent: 'Tous Présents',
    language: 'Langue',
    darkMode: 'Mode Sombre',
    fontSize: 'Taille de Police',
    personalInfo: 'Info Personnelle',
    healthInfo: 'Info Santé',
    bloodType: 'Groupe Sanguin',
    diseases: 'Maladies Chroniques',
    allergies: 'Allergies',
    emergency: 'Urgence',
    name: 'Nom',
    passport: 'Passeport',
    nationality: 'Nationalité',
    today: 'Aujourd\'hui',
    back: 'Retour',
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
    completedTasks: [],
    pin: '1234',
  });

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  useEffect(() => {
    const isRtl = ['ar', 'ur'].includes(state.language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [state.language]);

  const setIsOnboarded = (value: boolean) => setState(s => ({ ...s, isOnboarded: value }));
  const setUserMode = (mode: UserMode) => setState(s => ({ ...s, userMode: mode, pilgrimData: mockPilgrimData }));
  const setLanguage = (lang: Language) => setState(s => ({ ...s, language: lang }));
  const toggleDarkMode = () => setState(s => ({ ...s, isDarkMode: !s.isDarkMode }));
  const setCurrentScreen = (screen: string) => setState(s => ({ ...s, currentScreen: screen }));
  const setPilgrimData = (data: PilgrimData) => setState(s => ({ ...s, pilgrimData: data }));
  const incrementTawaf = () => setState(s => ({ ...s, tawafCount: Math.min(s.tawafCount + 1, 7) }));
  const resetTawaf = () => setState(s => ({ ...s, tawafCount: 0 }));
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
      toggleTask,
      setPin,
      updateWalletBalance,
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
