import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, MapPin, ArrowUp, Clock, Navigation as NavIcon } from 'lucide-react';
import mapKaaba from '@/assets/map-kaaba.jpg';

const destinations = [
  { id: 'kaaba', nameAr: 'الكعبة المشرفة', nameEn: 'Holy Kaaba', distance: '1.2 km', time: '15 min' },
  { id: 'mina', nameAr: 'منى', nameEn: 'Mina', distance: '5.4 km', time: '45 min' },
  { id: 'arafat', nameAr: 'عرفة', nameEn: 'Arafat', distance: '14.2 km', time: '25 min (bus)' },
  { id: 'muzdalifah', nameAr: 'مزدلفة', nameEn: 'Muzdalifah', distance: '9.1 km', time: '20 min (bus)' },
  { id: 'jamarat', nameAr: 'الجمرات', nameEn: 'Jamarat', distance: '5.2 km', time: '40 min' },
  { id: 'camp', nameAr: 'المخيم', nameEn: 'My Camp', distance: '0.8 km', time: '10 min' },
];

export function NavigationScreen() {
  const { t, setCurrentScreen, language, setSelectedDestination } = useApp();
  const isArabic = language === 'ar';

  const handleNavigate = (dest: typeof destinations[0]) => {
    setSelectedDestination({
      nameAr: dest.nameAr,
      nameEn: dest.nameEn,
      distance: dest.distance,
      time: dest.time
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
          {t('navigation')}
        </h2>
      </motion.div>

      {/* Map Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-3 rounded-2xl overflow-hidden h-28 relative"
      >
        <img 
          src={mapKaaba} 
          alt="Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-2 left-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-foreground font-medium">
            {isArabic ? 'موقعك الحالي' : 'Your Location'}
          </span>
        </div>
      </motion.div>

      {/* Destinations */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-2">
          {destinations.map((dest, index) => (
            <motion.button
              key={dest.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => handleNavigate(dest)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-start">
                <p className="font-medium text-foreground text-sm">
                  {isArabic ? dest.nameAr : dest.nameEn}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    {dest.distance}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dest.time}
                  </span>
                </div>
              </div>
              <NavIcon className="w-5 h-5 text-primary" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
