import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Phone, PhoneCall, Clock, User } from 'lucide-react';

const sheikhs = [
  { id: '1', nameAr: 'الشيخ أحمد العلي', nameEn: 'Sheikh Ahmad Al-Ali', langAr: 'العربية', langEn: 'Arabic', available: true },
  { id: '2', nameAr: 'الشيخ محمد الفقيه', nameEn: 'Sheikh Muhammad Al-Faqih', langAr: 'العربية، الإنجليزية', langEn: 'Arabic, English', available: true },
  { id: '3', nameAr: 'الشيخ عبدالله الحنفي', nameEn: 'Sheikh Abdullah Al-Hanafi', langAr: 'الأردية', langEn: 'Urdu', available: false },
  { id: '4', nameAr: 'الشيخ يوسف الشافعي', nameEn: 'Sheikh Yusuf Al-Shafii', langAr: 'الإندونيسية', langEn: 'Indonesian', available: true },
];

export function SheikhsScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const [calling, setCalling] = useState<string | null>(null);
  const isArabic = language === 'ar';

  const handleCall = (sheikhId: string) => {
    setCalling(sheikhId);
    setTimeout(() => setCalling(null), 3000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-4 pb-2"
      >
        <button 
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('sheikhs')}
        </h2>
      </motion.div>

      {/* Time Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-3 p-3 rounded-xl bg-primary/10"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <p className="text-xs text-foreground">
            {isArabic 
              ? 'الخدمة متاحة من 8 صباحاً حتى 10 مساءً (خارج أوقات الذروة)'
              : 'Service available 8 AM - 10 PM (off-peak hours)'}
          </p>
        </div>
      </motion.div>

      {/* Sheikhs List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-3">
          {sheikhs.map((sheikh, index) => (
            <motion.div
              key={sheikh.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-4 rounded-2xl bg-card"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">
                    {isArabic ? sheikh.nameAr : sheikh.nameEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isArabic ? sheikh.langAr : sheikh.langEn}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-2 h-2 rounded-full ${sheikh.available ? 'bg-success' : 'bg-muted-foreground'}`} />
                    <span className={`text-xs ${sheikh.available ? 'text-success' : 'text-muted-foreground'}`}>
                      {sheikh.available ? t('available') : t('busy')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCall(sheikh.id)}
                  disabled={!sheikh.available || calling !== null}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    sheikh.available 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  } disabled:opacity-50`}
                >
                  {calling === sheikh.id ? (
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Phone className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calling Modal */}
      {calling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-[50px]"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4"
          >
            <PhoneCall className="w-10 h-10 text-success" />
          </motion.div>
          <p className="text-lg font-semibold text-foreground">
            {isArabic ? 'جاري الاتصال...' : 'Connecting...'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isArabic ? sheikhs.find(s => s.id === calling)?.nameAr : sheikhs.find(s => s.id === calling)?.nameEn}
          </p>
        </motion.div>
      )}
    </div>
  );
}
