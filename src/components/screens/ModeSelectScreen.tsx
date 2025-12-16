import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { User, Users, ChevronLeft } from 'lucide-react';

export function ModeSelectScreen() {
  const { t, setCurrentScreen, setUserMode } = useApp();

  const handleModeSelect = (mode: 'pilgrim' | 'organizer') => {
    setUserMode(mode);
    setCurrentScreen('login');
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <button 
          onClick={() => setCurrentScreen('welcome')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('selectMode')}
        </h2>
      </motion.div>

      {/* Mode Options */}
      <div className="flex-1 flex flex-col justify-center gap-4 px-2">
        {/* Pilgrim Mode */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeSelect('pilgrim')}
          className="watch-card flex items-center gap-4 text-start"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base">
              {t('pilgrimMode')}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t('pilgrimDesc')}
            </p>
          </div>
        </motion.button>

        {/* Organizer Mode */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeSelect('organizer')}
          className="watch-card flex items-center gap-4 text-start"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base">
              {t('organizerMode')}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t('organizerDesc')}
            </p>
          </div>
        </motion.button>
      </div>

      {/* Ministry Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-xs text-muted-foreground mt-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          Ministry of Hajj & Umrah
        </div>
      </motion.div>
    </div>
  );
}
