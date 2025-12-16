import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Book, Minus, Plus } from 'lucide-react';

interface LibraryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
}

const adhkarList: LibraryItem[] = [
  {
    id: 'a1',
    titleAr: 'دعاء الطواف',
    titleEn: 'Tawaf Duaa',
    contentAr: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    contentEn: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the torment of the Fire.',
  },
  {
    id: 'a2',
    titleAr: 'التلبية',
    titleEn: 'Talbiyah',
    contentAr: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    contentEn: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty. You have no partner.',
  },
  {
    id: 'a3',
    titleAr: 'دعاء يوم عرفة',
    titleEn: 'Day of Arafat Duaa',
    contentAr: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    contentEn: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and all praise, and He is over all things competent.',
  },
  {
    id: 'a4',
    titleAr: 'دعاء السعي',
    titleEn: "Sa'i Duaa",
    contentAr: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ',
    contentEn: 'Indeed, Safa and Marwa are among the symbols of Allah.',
  },
  {
    id: 'a5',
    titleAr: 'دعاء رمي الجمرات',
    titleEn: 'Stoning Duaa',
    contentAr: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ',
    contentEn: 'Allah is the Greatest, Allah is the Greatest, Allah is the Greatest.',
  },
];

const duaaList: LibraryItem[] = [
  {
    id: 'd1',
    titleAr: 'دعاء السفر',
    titleEn: 'Travel Duaa',
    contentAr: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    contentEn: 'Glory to Him who has subjected this to us, and we could not have [otherwise] subdued it. And indeed we, to our Lord, will [surely] return.',
  },
  {
    id: 'd2',
    titleAr: 'دعاء الاستفتاح',
    titleEn: 'Opening Duaa',
    contentAr: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ',
    contentEn: 'O Allah, distance me from my sins as You have distanced the East from the West.',
  },
];

type TabType = 'adhkar' | 'duaa';

export function LibraryScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('adhkar');
  const [fontSize, setFontSize] = useState(16);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isArabic = language === 'ar';
  const items = activeTab === 'adhkar' ? adhkarList : duaaList;

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
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center">
          {t('library')}
        </h2>
        {/* Font Size Control */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFontSize(s => Math.max(12, s - 2))}
            className="p-1.5 rounded-lg hover:bg-muted"
          >
            <Minus className="w-3 h-3 text-muted-foreground" />
          </button>
          <button
            onClick={() => setFontSize(s => Math.min(24, s + 2))}
            className="p-1.5 rounded-lg hover:bg-muted"
          >
            <Plus className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          {(['adhkar', 'duaa'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full p-3 rounded-xl bg-card text-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Book className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">
                    {isArabic ? item.titleAr : item.titleEn}
                  </span>
                </div>
                
                {expandedId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <p 
                      className="text-foreground leading-relaxed mb-2"
                      style={{ fontSize: `${fontSize}px` }}
                      dir="rtl"
                    >
                      {item.contentAr}
                    </p>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontSize: `${fontSize - 2}px` }}
                      dir="ltr"
                    >
                      {item.contentEn}
                    </p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
