import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, User, Heart, Phone, Droplet, AlertCircle, Utensils } from 'lucide-react';

type TabType = 'personal' | 'health';

export function ProfileScreen() {
  const { t, pilgrimData, setCurrentScreen, language } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const isArabic = language === 'ar';

  if (!pilgrimData) return null;

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
          {t('profile')}
        </h2>
      </motion.div>

      {/* User Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center px-4 pb-3"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">
          {isArabic ? pilgrimData.nameAr : pilgrimData.name}
        </h3>
        <p className="text-xs text-muted-foreground">{pilgrimData.id}</p>
      </motion.div>

      {/* Tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          {(['personal', 'health'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {t(tab === 'personal' ? 'personalInfo' : 'healthInfo')}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {activeTab === 'personal' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <InfoRow icon={User} label={t('name')} value={pilgrimData.name} />
            <InfoRow icon={User} label={t('passport')} value={pilgrimData.passportNumber} />
            <InfoRow icon={User} label={t('nationality')} value={pilgrimData.nationality} />
            <InfoRow icon={User} label={t('campaign')} value={pilgrimData.campaignName} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <InfoRow icon={Droplet} label={t('bloodType')} value={pilgrimData.bloodType} highlight />
            <InfoRow icon={AlertCircle} label={t('diseases')} value={pilgrimData.chronicDiseases.join(', ') || 'None'} />
            <InfoRow icon={Utensils} label={t('allergies')} value={pilgrimData.allergies.join(', ') || 'None'} />
            <InfoRow icon={Phone} label={t('emergency')} value={pilgrimData.emergencyContact} />
            <InfoRow icon={Phone} label="" value={pilgrimData.emergencyPhone} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${highlight ? 'bg-destructive/10' : 'bg-card'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${highlight ? 'bg-destructive/20' : 'bg-muted'}`}>
        <Icon className={`w-4 h-4 ${highlight ? 'text-destructive' : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-muted-foreground">{label}</p>}
        <p className={`text-sm font-medium ${highlight ? 'text-destructive' : 'text-foreground'}`}>{value}</p>
      </div>
    </div>
  );
}
