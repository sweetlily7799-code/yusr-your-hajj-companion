import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Hospital, Home, Banknote, UtensilsCrossed, Bath, Shield, MapPin } from 'lucide-react';

const services = [
  { id: 'hospital', icon: Hospital, nameAr: 'مستشفى', nameEn: 'Hospital', distance: '350m', count: 3 },
  { id: 'mosque', icon: Home, nameAr: 'مسجد', nameEn: 'Mosque', distance: '150m', count: 5 },
  { id: 'atm', icon: Banknote, nameAr: 'صراف آلي', nameEn: 'ATM', distance: '200m', count: 8 },
  { id: 'food', icon: UtensilsCrossed, nameAr: 'مطاعم', nameEn: 'Food', distance: '100m', count: 12 },
  { id: 'bathroom', icon: Bath, nameAr: 'دورة مياه', nameEn: 'Bathroom', distance: '50m', count: 15 },
  { id: 'police', icon: Shield, nameAr: 'شرطة', nameEn: 'Police', distance: '400m', count: 2 },
];

export function ServicesScreen() {
  const { t, setCurrentScreen, language } = useApp();
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
          {t('services')}
        </h2>
      </motion.div>

      {/* Services Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card hover:bg-muted transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-medium text-foreground text-sm">
                {isArabic ? service.nameAr : service.nameEn}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{service.distance}</span>
                <span>•</span>
                <span>{service.count} nearby</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
