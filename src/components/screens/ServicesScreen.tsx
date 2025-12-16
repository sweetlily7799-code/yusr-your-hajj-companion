import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Hospital, Home, Banknote, UtensilsCrossed, Bath, Shield, MapPin, X, Navigation } from 'lucide-react';
import mapKaaba from '@/assets/map-kaaba.jpg';

const services = [
  { id: 'hospital', icon: Hospital, nameAr: 'مستشفى', nameEn: 'Hospital', distance: '350m', count: 3, time: '5 min' },
  { id: 'mosque', icon: Home, nameAr: 'مسجد', nameEn: 'Mosque', distance: '150m', count: 5, time: '2 min' },
  { id: 'atm', icon: Banknote, nameAr: 'صراف آلي', nameEn: 'ATM', distance: '200m', count: 8, time: '3 min' },
  { id: 'food', icon: UtensilsCrossed, nameAr: 'مطاعم', nameEn: 'Food', distance: '100m', count: 12, time: '2 min' },
  { id: 'bathroom', icon: Bath, nameAr: 'دورة مياه', nameEn: 'Bathroom', distance: '50m', count: 15, time: '1 min' },
  { id: 'police', icon: Shield, nameAr: 'شرطة', nameEn: 'Police', distance: '400m', count: 2, time: '5 min' },
];

export function ServicesScreen() {
  const { t, setCurrentScreen, language, setSelectedDestination } = useApp();
  const isArabic = language === 'ar';
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleNavigate = (service: typeof services[0]) => {
    setSelectedDestination({
      nameAr: service.nameAr,
      nameEn: service.nameEn,
      distance: service.distance,
      time: service.time
    });
    setCurrentScreen('route');
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
              onClick={() => setSelectedService(service)}
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
                <span>{service.count}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Service Detail Modal with Map */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background flex flex-col rounded-[50px] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4">
              <button onClick={() => setSelectedService(null)} className="p-2 rounded-full hover:bg-muted touch-target">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              <h3 className="text-lg font-semibold text-foreground">
                {isArabic ? selectedService.nameAr : selectedService.nameEn}
              </h3>
              <div className="w-9" />
            </div>

            {/* Map */}
            <div className="mx-4 rounded-2xl overflow-hidden h-40 relative">
              <img 
                src={mapKaaba} 
                alt="Service Location" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                >
                  <selectedService.icon className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              </div>
            </div>

            {/* Service Info */}
            <div className="flex-1 p-4 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{t('distance')}</span>
                </div>
                <span className="font-semibold text-foreground">{selectedService.distance}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-card">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{t('estimatedTime')}</span>
                </div>
                <span className="font-semibold text-foreground">{selectedService.time}</span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {selectedService.count} {isArabic ? 'مواقع قريبة' : 'nearby locations'}
              </p>

              {/* Navigate Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate(selectedService)}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                {t('navigate')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
