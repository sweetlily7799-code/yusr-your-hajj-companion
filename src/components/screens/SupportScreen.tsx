import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, Headphones, MessageCircle, Phone, Mail, Check, Send } from 'lucide-react';

const supportOptions = [
  { id: 'call', icon: Phone, nameAr: 'اتصال مباشر', nameEn: 'Direct Call', descAr: 'تحدث مع فريق الدعم', descEn: 'Talk to support team' },
  { id: 'chat', icon: MessageCircle, nameAr: 'محادثة نصية', nameEn: 'Live Chat', descAr: 'راسلنا الآن', descEn: 'Message us now' },
  { id: 'email', icon: Mail, nameAr: 'بريد إلكتروني', nameEn: 'Email Support', descAr: 'support@yusr.sa', descEn: 'support@yusr.sa' },
];

const faqItems = [
  { questionAr: 'كيف أشحن المحفظة؟', questionEn: 'How to charge wallet?', answerAr: 'من خلال الذهاب إلى المحفظة ثم الضغط على شحن', answerEn: 'Go to Wallet and tap Charge' },
  { questionAr: 'كيف أتواصل مع حملتي؟', questionEn: 'How to contact my campaign?', answerAr: 'من خلال صفحة الأمان يمكنك رؤية معلومات حملتك', answerEn: 'Through Safety page you can see your campaign info' },
];

export function SupportScreen() {
  const { t, setCurrentScreen, language } = useApp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const isArabic = language === 'ar';

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
        setSelectedOption(null);
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-4 pb-2"
      >
        <button 
          onClick={() => setCurrentScreen('settings')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('technicalSupport')}
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Support Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-4"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground mb-4">
          {isArabic ? 'نحن هنا لمساعدتك' : 'We\'re here to help you'}
        </p>

        {/* Support Options */}
        <div className="space-y-2 mb-4">
          {supportOptions.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                selectedOption === option.id ? 'bg-primary/10' : 'bg-card'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <option.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-start">
                <p className="font-medium text-foreground text-sm">
                  {isArabic ? option.nameAr : option.nameEn}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? option.descAr : option.descEn}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Chat Interface */}
        {selectedOption === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-3"
                >
                  <Check className="w-8 h-8 text-success" />
                </motion.div>
                <p className="text-sm text-foreground font-medium">
                  {isArabic ? 'تم إرسال رسالتك!' : 'Message sent!'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'سنرد عليك قريباً' : 'We\'ll respond soon'}
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                  className="w-full h-24 p-3 rounded-xl bg-muted text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isArabic ? 'إرسال' : 'Send'}
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* FAQ Section */}
        {!selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-muted-foreground mb-2">
              {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
            </p>
            <div className="space-y-2">
              {faqItems.map((faq, index) => (
                <div key={index} className="p-3 rounded-xl bg-card">
                  <p className="font-medium text-foreground text-sm mb-1">
                    {isArabic ? faq.questionAr : faq.questionEn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isArabic ? faq.answerAr : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
