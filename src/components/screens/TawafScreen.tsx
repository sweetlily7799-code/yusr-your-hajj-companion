import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, RotateCcw, Plus } from 'lucide-react';

export function TawafScreen() {
  const { t, tawafCount, incrementTawaf, resetTawaf, setCurrentScreen } = useApp();
  
  const circumference = 2 * Math.PI * 45;
  const progress = (tawafCount / 7) * circumference;
  const isComplete = tawafCount === 7;

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

      {/* Counter Ring */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          {/* Background Ring */}
          <svg width="180" height="180" className="transform -rotate-90">
            <circle
              cx="90"
              cy="90"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
            />
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

        {/* Increment Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={incrementTawaf}
          disabled={isComplete}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed touch-target"
          style={{ boxShadow: 'var(--shadow-button)' }}
        >
          <Plus className="w-8 h-8 text-primary-foreground" />
        </motion.button>

        {/* Spacer for symmetry */}
        <div className="w-14 h-14" />
      </motion.div>
    </div>
  );
}
