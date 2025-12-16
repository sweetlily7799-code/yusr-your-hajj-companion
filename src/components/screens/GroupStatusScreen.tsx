import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Users, CheckCircle, AlertTriangle, Bell, User } from 'lucide-react';

const groupMembers = [
  { id: '1', nameAr: 'أحمد خان', nameEn: 'Ahmed Khan', status: 'present' },
  { id: '2', nameAr: 'فاطمة علي', nameEn: 'Fatima Ali', status: 'present' },
  { id: '3', nameAr: 'محمد حسن', nameEn: 'Muhammad Hassan', status: 'present' },
  { id: '4', nameAr: 'عائشة أحمد', nameEn: 'Aisha Ahmed', status: 'separated' },
  { id: '5', nameAr: 'عمر إبراهيم', nameEn: 'Omar Ibrahim', status: 'present' },
  { id: '6', nameAr: 'خديجة محمود', nameEn: 'Khadija Mahmoud', status: 'present' },
];

export function GroupStatusScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const isArabic = language === 'ar';

  const presentCount = groupMembers.filter(m => m.status === 'present').length;
  const separatedCount = groupMembers.filter(m => m.status === 'separated').length;

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
          {t('groupStatus')}
        </h2>
      </motion.div>

      {/* Summary Cards */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-xl bg-success/10"
        >
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-xs text-success">{t('present')}</span>
          </div>
          <p className="text-2xl font-bold text-success">{presentCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className={`p-3 rounded-xl ${separatedCount > 0 ? 'bg-warning/10' : 'bg-muted'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className={`w-4 h-4 ${separatedCount > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
            <span className={`text-xs ${separatedCount > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
              {t('separated')}
            </span>
          </div>
          <p className={`text-2xl font-bold ${separatedCount > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
            {separatedCount}
          </p>
        </motion.div>
      </div>

      {/* Send Alert Button */}
      {separatedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 pb-3"
        >
          <button className="w-full py-3 rounded-xl bg-warning text-warning-foreground font-medium flex items-center justify-center gap-2">
            <Bell className="w-5 h-5" />
            {t('sendAlert')}
          </button>
        </motion.div>
      )}

      {/* Members List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          {t('pilgrims')} ({groupMembers.length})
        </p>
        <div className="space-y-2">
          {groupMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.03 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                member.status === 'separated' ? 'bg-warning/10' : 'bg-card'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                member.status === 'separated' ? 'bg-warning/20' : 'bg-muted'
              }`}>
                <User className={`w-5 h-5 ${
                  member.status === 'separated' ? 'text-warning' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {isArabic ? member.nameAr : member.nameEn}
                </p>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full ${
                member.status === 'present' ? 'bg-success' : 'bg-warning animate-pulse'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
