import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Navigation, Clock, MapPin, ArrowUp, CornerUpRight, ArrowUpRight } from 'lucide-react';
import mapRoute from '@/assets/map-route.jpg';

const routeSteps = [
  { direction: 'straight', distanceAr: '200 متر للأمام', distanceEn: '200m straight ahead' },
  { direction: 'right', distanceAr: 'انعطف يمينًا', distanceEn: 'Turn right' },
  { direction: 'straight', distanceAr: '500 متر للأمام', distanceEn: '500m straight' },
  { direction: 'left', distanceAr: 'انعطف يسارًا عند المسجد', distanceEn: 'Turn left at mosque' },
];

export function RouteGuidanceScreen() {
  const { t, setCurrentScreen, language, selectedDestination } = useApp();
  const isArabic = language === 'ar';

  if (!selectedDestination) {
    setCurrentScreen('navigation');
    return null;
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
          onClick={() => setCurrentScreen('navigation')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('routeGuidance')}
        </h2>
      </motion.div>

      {/* Map with Route */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-3 rounded-2xl overflow-hidden h-36 relative"
      >
        <img 
          src={mapRoute} 
          alt="Route Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Destination Info Overlay */}
        <div className="absolute bottom-2 left-3 right-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">
                {isArabic ? selectedDestination.nameAr : selectedDestination.nameEn}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-primary flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedDestination.distance}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedDestination.time}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Current Direction - Large */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-3 p-4 rounded-2xl bg-primary/10"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center"
          >
            <ArrowUp className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <div>
            <p className="text-xl font-bold text-foreground">200m</p>
            <p className="text-sm text-muted-foreground">
              {isArabic ? 'استمر للأمام' : 'Continue straight'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Route Steps */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <p className="text-xs text-muted-foreground mb-2">
          {isArabic ? 'الخطوات التالية' : 'Next Steps'}
        </p>
        <div className="space-y-2">
          {routeSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-3 p-2 rounded-xl bg-card"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                {step.direction === 'right' ? (
                  <CornerUpRight className="w-4 h-4 text-foreground" />
                ) : step.direction === 'left' ? (
                  <CornerUpRight className="w-4 h-4 text-foreground transform scale-x-[-1]" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-foreground rotate-[-45deg]" />
                )}
              </div>
              <span className="text-sm text-foreground">
                {isArabic ? step.distanceAr : step.distanceEn}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
