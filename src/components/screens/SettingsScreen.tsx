import React from 'react';
import { motion } from 'framer-motion';
import { useApp, Language } from '@/contexts/AppContext';
import { ChevronLeft, Globe, Moon, Sun, Check, Type, Headphones } from 'lucide-react';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

export function SettingsScreen() {
  const { t, language, setLanguage, isDarkMode, toggleDarkMode, setCurrentScreen, globalFontSize, setGlobalFontSize } = useApp();

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
          {t('settings')}
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Dark Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3"
        >
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
              </div>
              <span className="font-medium text-foreground">{t('darkMode')}</span>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-muted'}`}>
              <motion.div
                animate={{ x: isDarkMode ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-card"
              />
            </div>
          </button>
        </motion.div>

        {/* Font Size Control */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-3"
        >
          <div className="p-4 rounded-2xl bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Type className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{t('fontSize')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">A</span>
              <input
                type="range"
                min="12"
                max="20"
                value={globalFontSize}
                onChange={(e) => setGlobalFontSize(parseInt(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              <span className="text-lg text-muted-foreground">A</span>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              {globalFontSize}px
            </p>
          </div>
        </motion.div>

        {/* Technical Support */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <button
            onClick={() => setCurrentScreen('support')}
            className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card hover:bg-muted transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium text-foreground">{t('technicalSupport')}</span>
          </button>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{t('language')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.02 }}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                  language === lang.code ? 'bg-primary/10' : 'bg-card'
                }`}
              >
                <span className="font-medium text-foreground text-sm">{lang.nativeName}</span>
                {language === lang.code && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
