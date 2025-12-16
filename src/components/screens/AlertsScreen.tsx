import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, AlertTriangle, Bell, Info, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: 'ministry' | 'safety' | 'info';
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  time: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'ministry',
    titleAr: 'إعلان من وزارة الحج',
    titleEn: 'Ministry Announcement',
    messageAr: 'يُرجى التوجه إلى مخيماتكم في منى قبل الساعة 8 مساءً',
    messageEn: 'Please return to your tents in Mina before 8 PM',
    time: '14:30',
  },
  {
    id: '2',
    type: 'safety',
    titleAr: 'تنبيه الطقس',
    titleEn: 'Weather Alert',
    messageAr: 'درجة الحرارة مرتفعة - يُرجى شرب الماء بكثرة',
    messageEn: 'High temperature - Please drink plenty of water',
    time: '12:00',
  },
  {
    id: '3',
    type: 'info',
    titleAr: 'تذكير',
    titleEn: 'Reminder',
    messageAr: 'موعد صلاة الظهر الساعة 12:30',
    messageEn: 'Dhuhr prayer time is at 12:30',
    time: '12:15',
  },
];

const alertIcons = {
  ministry: Bell,
  safety: AlertTriangle,
  info: Info,
};

const alertColors = {
  ministry: 'bg-primary/10 text-primary',
  safety: 'bg-warning/10 text-warning',
  info: 'bg-muted text-muted-foreground',
};

export function AlertsScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const isArabic = language === 'ar';

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
          {t('alerts')}
        </h2>
      </motion.div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-3">
          {mockAlerts.map((alert, index) => {
            const Icon = alertIcons[alert.type];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${alertColors[alert.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">
                        {isArabic ? alert.titleAr : alert.titleEn}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{alert.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isArabic ? alert.messageAr : alert.messageEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
