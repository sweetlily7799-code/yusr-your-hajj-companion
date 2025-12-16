import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Book, Minus, Plus, Sun, Moon, Bed } from 'lucide-react';

interface LibraryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  category: string;
}

const adhkarCategories = ['morning', 'evening', 'sleep', 'general'];
const duaaCategories = ['hajjSpecific', 'general'];

const adhkarList: LibraryItem[] = [
  // Morning Adhkar
  { id: 'a1', category: 'morning', titleAr: 'أذكار الصباح - آية الكرسي', titleEn: 'Morning - Ayat Al-Kursi', contentAr: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...', contentEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...' },
  { id: 'a2', category: 'morning', titleAr: 'سيد الاستغفار', titleEn: 'Master of Forgiveness', contentAr: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ', contentEn: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant.' },
  { id: 'a3', category: 'morning', titleAr: 'التحصين الصباحي', titleEn: 'Morning Protection', contentAr: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ', contentEn: 'In the name of Allah with whose name nothing can cause harm in the earth or heaven.' },
  // Evening Adhkar
  { id: 'a4', category: 'evening', titleAr: 'أذكار المساء - المعوذات', titleEn: 'Evening - Al-Muawwidhat', contentAr: 'قُلْ هُوَ اللَّهُ أَحَدٌ • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • قُلْ أَعُوذُ بِرَبِّ النَّاسِ', contentEn: 'Say: He is Allah, the One • Say: I seek refuge in the Lord of daybreak • Say: I seek refuge in the Lord of mankind' },
  { id: 'a5', category: 'evening', titleAr: 'دعاء المساء', titleEn: 'Evening Supplication', contentAr: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ', contentEn: 'We have entered the evening and the dominion belongs to Allah, and all praise is for Allah.' },
  // Sleep Adhkar
  { id: 'a6', category: 'sleep', titleAr: 'دعاء النوم', titleEn: 'Sleep Duaa', contentAr: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', contentEn: 'In Your name O Allah, I die and I live.' },
  { id: 'a7', category: 'sleep', titleAr: 'التسبيح قبل النوم', titleEn: 'Tasbeeh Before Sleep', contentAr: 'سُبْحَانَ اللَّهِ (33) الْحَمْدُ لِلَّهِ (33) اللَّهُ أَكْبَرُ (34)', contentEn: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (34)' },
  // General Adhkar
  { id: 'a8', category: 'general', titleAr: 'الاستغفار', titleEn: 'Seeking Forgiveness', contentAr: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ', contentEn: 'I seek forgiveness from Allah, the Magnificent, there is no god but He, the Living, the Self-Subsisting, and I turn to Him in repentance.' },
  { id: 'a9', category: 'general', titleAr: 'الصلاة على النبي', titleEn: 'Salawat on Prophet', contentAr: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', contentEn: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad.' },
];

const duaaList: LibraryItem[] = [
  // Hajj Specific
  { id: 'd1', category: 'hajjSpecific', titleAr: 'التلبية', titleEn: 'Talbiyah', contentAr: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ', contentEn: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise and blessings are Yours, and all sovereignty.' },
  { id: 'd2', category: 'hajjSpecific', titleAr: 'دعاء الطواف', titleEn: 'Tawaf Duaa', contentAr: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', contentEn: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the torment of the Fire.' },
  { id: 'd3', category: 'hajjSpecific', titleAr: 'دعاء يوم عرفة', titleEn: 'Day of Arafat', contentAr: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', contentEn: 'There is no god but Allah alone, with no partner. To Him belongs the dominion and all praise, and He is over all things competent.' },
  { id: 'd4', category: 'hajjSpecific', titleAr: 'دعاء السعي', titleEn: "Sa'i Duaa", contentAr: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ', contentEn: 'Indeed, Safa and Marwa are among the symbols of Allah.' },
  { id: 'd5', category: 'hajjSpecific', titleAr: 'دعاء رمي الجمرات', titleEn: 'Stoning Duaa', contentAr: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، اللهُ أَكْبَرُ', contentEn: 'Allah is the Greatest (3x)' },
  { id: 'd6', category: 'hajjSpecific', titleAr: 'عند شرب زمزم', titleEn: 'When Drinking Zamzam', contentAr: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ', contentEn: 'O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every disease.' },
  // General Duaa
  { id: 'd7', category: 'general', titleAr: 'دعاء السفر', titleEn: 'Travel Duaa', contentAr: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ', contentEn: 'Glory to Him who has subjected this to us, and we could not have [otherwise] subdued it.' },
  { id: 'd8', category: 'general', titleAr: 'دعاء الاستفتاح', titleEn: 'Opening Duaa', contentAr: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ', contentEn: 'O Allah, distance me from my sins as You have distanced the East from the West.' },
  { id: 'd9', category: 'general', titleAr: 'دعاء الهم والحزن', titleEn: 'Worry & Sadness', contentAr: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ', contentEn: 'O Allah, I seek refuge in You from worry and grief.' },
];

type TabType = 'adhkar' | 'duaa';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'morning': return Sun;
    case 'evening': return Moon;
    case 'sleep': return Bed;
    default: return Book;
  }
};

export function LibraryScreen() {
  const { t, setCurrentScreen, language, globalFontSize } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('adhkar');
  const [fontSize, setFontSize] = useState(globalFontSize);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isArabic = language === 'ar';
  const items = activeTab === 'adhkar' ? adhkarList : duaaList;
  const categories = activeTab === 'adhkar' ? adhkarCategories : duaaCategories;
  
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

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
      <div className="px-4 pb-2">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          {(['adhkar', 'duaa'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedCategory('all');
              }}
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

      {/* Category Filter */}
      <div className="px-4 pb-2">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary/20 text-primary'
                : 'bg-card text-muted-foreground'
            }`}
          >
            {isArabic ? 'الكل' : 'All'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary/20 text-primary'
                  : 'bg-card text-muted-foreground'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        <div className="space-y-2">
          {filteredItems.map((item, index) => {
            const CategoryIcon = getCategoryIcon(item.category);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full p-3 rounded-xl bg-card text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-sm flex-1">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
