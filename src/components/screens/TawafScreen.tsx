import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, RotateCcw, Play, Square, Locate } from 'lucide-react';

export function TawafScreen() {
  const { t, tawafCount, tawafActive, incrementTawaf, resetTawaf, toggleTawafActive, setCurrentScreen, language } = useApp();
  const isArabic = language === 'ar';
  
  const circumference = 2 * Math.PI * 45;
  const progress = (tawafCount / 7) * circumference;
  const isComplete = tawafCount === 7;

  // Auto-increment simulation when active (every 8 seconds for demo)
  useEffect(() => {
    if (tawafActive && !isComplete) {
      const timer = setInterval(() => {
        incrementTawaf();
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [tawafActive, isComplete, incrementTawaf]);

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-2"
      >
        <button 
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('tawafCounter')}
        </h2>
      </motion.div>

      {/* Auto Tracking Status */}
      {tawafActive && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-success"
          />
          <span className="text-xs text-success font-medium">
            {t('autoTracking')}
          </span>
          <Locate className="w-3 h-3 text-success" />
        </motion.div>
      )}

      {/* Counter Ring */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          {/* Kaaba Icon in Center */}
          <svg width="180" height="180" className="transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="90"
              cy="90"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
            />
            {/* Progress Ring */}
            <motion.circle
              cx="90"
              cy="90"
              r="45"
              fill="none"
              stroke={isComplete ? "hsl(var(--success))" : "hsl(var(--primary))"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Moving Dot when active */}
            {tawafActive && !isComplete && (
              <motion.circle
                cx="90"
                cy="45"
                r="6"
                fill="hsl(var(--primary))"
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: '90px 90px' }}
              />
            )}
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={tawafCount}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-5xl font-bold ${isComplete ? 'text-success' : 'text-foreground'}`}
            >
              {tawafCount}
            </motion.span>
            <span className="text-sm text-muted-foreground">/ 7 {t('rounds')}</span>
          </div>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center"
        >
          {isComplete ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
              ✓ {t('completed')}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {7 - tawafCount} {t('remaining')}
            </span>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-4 pb-4"
      >
        {/* Reset Button */}
        <button
          onClick={resetTawaf}
          className="w-14 h-14 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors touch-target"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Start/Stop Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleTawafActive}
          disabled={isComplete}
          className={`w-20 h-20 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed touch-target ${
            tawafActive ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ boxShadow: 'var(--shadow-button)' }}
        >
          {tawafActive ? (
            <Square className="w-8 h-8 text-destructive-foreground" />
          ) : (
            <Play className="w-8 h-8 text-primary-foreground ms-1" />
          )}
        </motion.button>

        {/* Spacer for symmetry */}
        <div className="w-14 h-14" />
      </motion.div>

      {/* Instructions */}
      <p className="text-xs text-center text-muted-foreground pb-2">
        {isArabic 
          ? 'اضغط للبدء - العداد يتتبع موقعك تلقائياً'
          : 'Tap to start - Counter auto-tracks your location'}
      </p>
    </div>
  );
}
