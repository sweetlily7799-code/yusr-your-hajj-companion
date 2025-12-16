import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { 
  Calendar, 
  BookOpen, 
  Compass, 
  Wallet, 
  Bell, 
  User, 
  Settings,
  CircleDot,
  Map,
  Shield,
  Phone,
  Users
} from 'lucide-react';

const menuItems = [
  { id: 'dailyGuide', icon: Calendar, screen: 'dailyGuide' },
  { id: 'tawafCounter', icon: CircleDot, screen: 'tawaf' },
  { id: 'wallet', icon: Wallet, screen: 'wallet' },
  { id: 'library', icon: BookOpen, screen: 'library' },
  { id: 'navigation', icon: Compass, screen: 'navigation' },
  { id: 'services', icon: Map, screen: 'services' },
  { id: 'safety', icon: Shield, screen: 'safety' },
  { id: 'sheikhs', icon: Phone, screen: 'sheikhs' },
  { id: 'alerts', icon: Bell, screen: 'alerts' },
  { id: 'profile', icon: User, screen: 'profile' },
  { id: 'settings', icon: Settings, screen: 'settings' },
];

const organizerItems = [
  { id: 'groupStatus', icon: Users, screen: 'groupStatus' },
];

export function HomeScreen() {
  const { t, pilgrimData, hajjDay, setCurrentScreen, userMode } = useApp();
  
  const allItems = userMode === 'organizer' 
    ? [...organizerItems, ...menuItems]
    : menuItems;

  const hajjDayNames: Record<number, string> = {
    8: 'يوم التروية',
    9: 'يوم عرفة',
    10: 'يوم النحر',
    11: 'أيام التشريق',
    12: 'أيام التشريق',
    13: 'أيام التشريق',
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 px-5 pb-3"
      >
        {/* Greeting & Day */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">{t('hajjDay')}</p>
            <h1 className="text-2xl font-bold text-primary">{hajjDay}</h1>
          </div>
          <div className="text-end">
            <p className="text-sm font-medium text-foreground">
              {pilgrimData?.nameAr || pilgrimData?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {pilgrimData?.campaignName}
            </p>
          </div>
        </div>

        {/* Day Name Badge */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((hajjDay - 7) / 6) * 100}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <span className="text-xs font-medium text-primary">
            {hajjDayNames[hajjDay] || `Day ${hajjDay}`}
          </span>
        </div>
      </motion.div>

      {/* Menu Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6">
        <div className="grid grid-cols-3 gap-2.5">
          {allItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen(item.screen)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                {t(item.id)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 pb-4"
      >
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-success/10">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-success">
            {userMode === 'organizer' ? t('allPresent') : t('campaign')}: {pilgrimData?.campaignId}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
