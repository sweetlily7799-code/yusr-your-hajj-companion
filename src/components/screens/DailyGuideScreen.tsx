import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Check, Circle } from 'lucide-react';

interface Task {
  id: string;
  titleAr: string;
  titleEn: string;
  time?: string;
}

const hajjTasks: Record<number, Task[]> = {
  8: [
    { id: 'd8-1', titleAr: 'الإحرام من الميقات', titleEn: 'Ihram from Miqat', time: '06:00' },
    { id: 'd8-2', titleAr: 'التوجه إلى منى', titleEn: 'Head to Mina', time: '08:00' },
    { id: 'd8-3', titleAr: 'صلاة الظهر في منى', titleEn: 'Dhuhr prayer in Mina', time: '12:30' },
    { id: 'd8-4', titleAr: 'صلاة العصر في منى', titleEn: 'Asr prayer in Mina', time: '15:45' },
    { id: 'd8-5', titleAr: 'صلاة المغرب في منى', titleEn: 'Maghrib prayer in Mina', time: '18:30' },
    { id: 'd8-6', titleAr: 'صلاة العشاء في منى', titleEn: 'Isha prayer in Mina', time: '20:00' },
    { id: 'd8-7', titleAr: 'المبيت في منى', titleEn: 'Stay overnight in Mina' },
  ],
  9: [
    { id: 'd9-1', titleAr: 'صلاة الفجر في منى', titleEn: 'Fajr prayer in Mina', time: '04:45' },
    { id: 'd9-2', titleAr: 'التوجه إلى عرفة', titleEn: 'Head to Arafat', time: '06:00' },
    { id: 'd9-3', titleAr: 'الوقوف بعرفة', titleEn: 'Standing at Arafat', time: '12:00' },
    { id: 'd9-4', titleAr: 'صلاة الظهر والعصر جمعاً', titleEn: 'Combined Dhuhr & Asr', time: '12:30' },
    { id: 'd9-5', titleAr: 'الدعاء والذكر', titleEn: 'Duaa and Dhikr' },
    { id: 'd9-6', titleAr: 'التوجه إلى مزدلفة', titleEn: 'Head to Muzdalifah', time: '18:30' },
    { id: 'd9-7', titleAr: 'المبيت في مزدلفة', titleEn: 'Stay in Muzdalifah' },
  ],
  10: [
    { id: 'd10-1', titleAr: 'صلاة الفجر في مزدلفة', titleEn: 'Fajr in Muzdalifah', time: '04:45' },
    { id: 'd10-2', titleAr: 'جمع الحصى', titleEn: 'Collect pebbles' },
    { id: 'd10-3', titleAr: 'رمي جمرة العقبة', titleEn: 'Stone Jamrat Al-Aqaba', time: '07:00' },
    { id: 'd10-4', titleAr: 'الذبح', titleEn: 'Sacrifice' },
    { id: 'd10-5', titleAr: 'الحلق أو التقصير', titleEn: 'Halq or Taqsir' },
    { id: 'd10-6', titleAr: 'طواف الإفاضة', titleEn: 'Tawaf Al-Ifadah' },
    { id: 'd10-7', titleAr: 'السعي', titleEn: "Sa'i" },
  ],
};

export function DailyGuideScreen() {
  const { t, hajjDay, completedTasks, toggleTask, setCurrentScreen, language } = useApp();
  
  const tasks = hajjTasks[hajjDay] || hajjTasks[8];
  const isArabic = language === 'ar';
  const completedCount = tasks.filter(task => completedTasks.includes(task.id)).length;
  const progress = (completedCount / tasks.length) * 100;

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
          {t('dailyGuide')}
        </h2>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 pb-3"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t('hajjDay')} {hajjDay}
          </span>
          <span className="text-sm font-medium text-primary">
            {completedCount}/{tasks.length} {t('tasks')}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-2">
          {tasks.map((task, index) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isCompleted ? 'bg-success/10' : 'bg-card'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : 'border-2 border-muted-foreground/30'
                }`}>
                  {isCompleted && <Check className="w-4 h-4" />}
                </div>
                <div className="flex-1 text-start">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-success line-through' : 'text-foreground'
                  }`}>
                    {isArabic ? task.titleAr : task.titleEn}
                  </p>
                  {task.time && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {task.time}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
