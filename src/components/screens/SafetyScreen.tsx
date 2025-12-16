import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Shield, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';

export function SafetyScreen() {
  const { t, pilgrimData, setCurrentScreen, language } = useApp();
  const isArabic = language === 'ar';

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
          {t('safety')}
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl bg-success/10 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-success">
                {isArabic ? 'ضمن نطاق الحملة' : 'Within Campaign Range'}
              </h3>
              <p className="text-sm text-success/80">
                {isArabic ? 'موقعك آمن' : 'Your location is safe'}
              </p>
            </div>
          </div>
          
          {/* GPS Indicator */}
          <div className="flex items-center gap-2 pt-3 border-t border-success/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success/80">GPS Active</span>
            <span className="text-xs text-muted-foreground ms-auto">
              Last update: 2 min ago
            </span>
          </div>
        </motion.div>

        {/* Campaign Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-card mb-4"
        >
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            {t('campaign')}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ID</span>
              <span className="font-medium text-foreground">{pilgrimData?.campaignId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{pilgrimData?.campaignName}</span>
            </div>
          </div>
        </motion.div>

        {/* Location Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl bg-muted aspect-square flex flex-col items-center justify-center"
        >
          <MapPin className="w-12 h-12 text-primary mb-2" />
          <span className="text-sm text-muted-foreground">
            {isArabic ? 'خريطة الموقع' : 'Location Map'}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            (Demo placeholder)
          </span>
        </motion.div>

        {/* SOS Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 p-4 rounded-2xl bg-destructive text-destructive-foreground font-semibold flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-5 h-5" />
          {isArabic ? 'طلب مساعدة طارئة' : 'Request Emergency Help'}
        </motion.button>
      </div>
    </div>
  );
}
