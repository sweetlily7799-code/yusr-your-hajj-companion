import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Phone, PhoneCall, Clock, User, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';

const sheikhs = [
  { id: '1', nameAr: 'الشيخ أحمد العلي', nameEn: 'Sheikh Ahmad Al-Ali', langAr: 'العربية', langEn: 'Arabic', available: true },
  { id: '2', nameAr: 'الشيخ محمد الفقيه', nameEn: 'Sheikh Muhammad Al-Faqih', langAr: 'العربية، الإنجليزية', langEn: 'Arabic, English', available: true },
  { id: '3', nameAr: 'الشيخ عبدالله الحنفي', nameEn: 'Sheikh Abdullah Al-Hanafi', langAr: 'الأردية', langEn: 'Urdu', available: false },
  { id: '4', nameAr: 'الشيخ يوسف الشافعي', nameEn: 'Sheikh Yusuf Al-Shafii', langAr: 'الإندونيسية', langEn: 'Indonesian', available: true },
  { id: '5', nameAr: 'الشيخ علي البنغالي', nameEn: 'Sheikh Ali Al-Bengali', langAr: 'البنغالية', langEn: 'Bengali', available: true },
  { id: '6', nameAr: 'الشيخ خان الفارسي', nameEn: 'Sheikh Khan Al-Farsi', langAr: 'الفارسية', langEn: 'Persian', available: true },
];

type CallState = 'idle' | 'connecting' | 'connected';

export function SheikhsScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const [callState, setCallState] = useState<CallState>('idle');
  const [callingSheikh, setCallingSheikh] = useState<typeof sheikhs[0] | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const isArabic = language === 'ar';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const handleCall = (sheikh: typeof sheikhs[0]) => {
    setCallingSheikh(sheikh);
    setCallState('connecting');
    setTimeout(() => setCallState('connected'), 2000);
  };

  const handleEndCall = () => {
    setCallState('idle');
    setCallingSheikh(null);
    setCallDuration(0);
    setIsMuted(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Active Call Screen
  if (callState !== 'idle' && callingSheikh) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-primary/20 to-background">
        {/* Call Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center p-6"
        >
          {/* Sheikh Avatar */}
          <motion.div
            animate={callState === 'connecting' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: callState === 'connecting' ? Infinity : 0 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative"
          >
            <User className="w-12 h-12 text-primary" />
            {callState === 'connected' && (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-success"
              />
            )}
          </motion.div>

          {/* Sheikh Name */}
          <h2 className="text-lg font-semibold text-foreground mb-1">
            {isArabic ? callingSheikh.nameAr : callingSheikh.nameEn}
          </h2>
          
          {/* Call Status */}
          <p className={`text-sm ${callState === 'connected' ? 'text-success' : 'text-muted-foreground'}`}>
            {callState === 'connecting' 
              ? t('connecting')
              : t('callConnected')
            }
          </p>

          {/* Call Duration */}
          {callState === 'connected' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-mono text-foreground mt-4"
            >
              {formatDuration(callDuration)}
            </motion.p>
          )}

          {/* Audio Visualizer */}
          {callState === 'connected' && (
            <motion.div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [8, 20 + Math.random() * 15, 8] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-primary rounded-full"
                  style={{ height: 8 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Call Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 pb-8"
        >
          <div className="flex items-center justify-center gap-6">
            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? 'bg-destructive/20 text-destructive' : 'bg-muted text-foreground'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* End Call Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
            >
              <PhoneOff className="w-7 h-7 text-destructive-foreground" />
            </motion.button>

            {/* Speaker Button */}
            <button className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-foreground">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
              ? 'الخدمة متاحة من 8 صباحاً حتى 10 مساءً'
              : 'Available 8 AM - 10 PM (off-peak)'}
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
                  onClick={() => handleCall(sheikh)}
                  disabled={!sheikh.available}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    sheikh.available 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  } disabled:opacity-50`}
                >
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
