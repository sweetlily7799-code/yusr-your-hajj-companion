import React from 'react';
import { WatchFrame } from './WatchFrame';
import { useApp } from '@/contexts/AppContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ModeSelectScreen } from './screens/ModeSelectScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TawafScreen } from './screens/TawafScreen';
import { WalletScreen } from './screens/WalletScreen';
import { DailyGuideScreen } from './screens/DailyGuideScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { NavigationScreen } from './screens/NavigationScreen';
import { ServicesScreen } from './screens/ServicesScreen';
import { SafetyScreen } from './screens/SafetyScreen';
import { SheikhsScreen } from './screens/SheikhsScreen';
import { GroupStatusScreen } from './screens/GroupStatusScreen';
import { AnimatePresence, motion } from 'framer-motion';

const screens: Record<string, React.ComponentType> = {
  welcome: WelcomeScreen,
  modeSelect: ModeSelectScreen,
  login: LoginScreen,
  home: HomeScreen,
  tawaf: TawafScreen,
  wallet: WalletScreen,
  dailyGuide: DailyGuideScreen,
  library: LibraryScreen,
  alerts: AlertsScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
  navigation: NavigationScreen,
  services: ServicesScreen,
  safety: SafetyScreen,
  sheikhs: SheikhsScreen,
  groupStatus: GroupStatusScreen,
};

export function YusrApp() {
  const { currentScreen } = useApp();
  const ScreenComponent = screens[currentScreen] || WelcomeScreen;

  return (
    <WatchFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <ScreenComponent />
        </motion.div>
      </AnimatePresence>
    </WatchFrame>
  );
}
