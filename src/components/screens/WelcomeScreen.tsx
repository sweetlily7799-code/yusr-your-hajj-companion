import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight } from 'lucide-react';

export function WelcomeScreen() {
  const { t, setCurrentScreen } = useApp();

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <span className="text-4xl font-bold text-primary-foreground">يُسر</span>
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t('welcome')}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-8 left-8 w-16 h-16 opacity-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2Z" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-20 right-8 w-12 h-12 opacity-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2Z" />
        </svg>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentScreen('modeSelect')}
        className="watch-button w-14 h-14 animate-pulse-gold"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
