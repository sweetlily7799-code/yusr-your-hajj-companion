import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, CreditCard, Plus, Wallet as WalletIcon, Check, X, ArrowRightLeft } from 'lucide-react';

export function WalletScreen() {
  const { t, pilgrimData, setCurrentScreen, updateWalletBalance, language } = useApp();
  const [showPayModal, setShowPayModal] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [amount, setAmount] = useState('100');
  const [userCurrencyAmount, setUserCurrencyAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const isArabic = language === 'ar';

  const exchangeRate = pilgrimData?.exchangeRate || 74;
  const userCurrency = pilgrimData?.originalCurrency || 'PKR';

  // Calculate SAR from user currency
  const sarFromUserCurrency = useMemo(() => {
    const userAmount = parseFloat(userCurrencyAmount) || 0;
    return Math.round(userAmount / exchangeRate);
  }, [userCurrencyAmount, exchangeRate]);

  const handlePaySubmit = () => {
    if (pinInput === '1234') {
      const numAmount = parseFloat(amount) || 0;
      updateWalletBalance(-numAmount);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPayModal(false);
        setPinInput('');
        setAmount('100');
      }, 1200);
    }
  };

  const handleChargeSubmit = () => {
    if (pinInput === '1234') {
      const numAmount = sarFromUserCurrency || parseFloat(amount) || 0;
      updateWalletBalance(numAmount);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowChargeModal(false);
        setPinInput('');
        setAmount('100');
        setUserCurrencyAmount('');
      }, 1200);
    }
  };

  const handlePinDigit = (digit: string) => {
    if (pinInput.length < 4) {
      setPinInput(prev => prev + digit);
    }
  };

  const closeModals = () => {
    setShowPayModal(false);
    setShowChargeModal(false);
    setPinInput('');
    setPaymentSuccess(false);
    setUserCurrencyAmount('');
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
          onClick={() => setCurrentScreen('home')}
          className="p-2 rounded-full hover:bg-muted transition-colors touch-target"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-lg font-semibold text-foreground flex-1 text-center pe-8">
          {t('wallet')}
        </h2>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-4 mb-4"
          style={{ background: 'var(--gradient-gold)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <WalletIcon className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-sm text-primary-foreground/80">{t('balance')}</span>
          </div>
          <div className="text-3xl font-bold text-primary-foreground mb-1">
            {pilgrimData?.walletBalance.toLocaleString()} {t('sar')}
          </div>
          <div className="text-sm text-primary-foreground/70">
            ≈ {pilgrimData?.originalBalance.toLocaleString()} {pilgrimData?.originalCurrency}
          </div>
        </motion.div>

        {/* Big Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {/* Pay Button */}
          <button
            onClick={() => setShowPayModal(true)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card hover:bg-muted transition-colors touch-target"
          >
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center" style={{ boxShadow: 'var(--shadow-button)' }}>
              <CreditCard className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1 text-start">
              <p className="font-semibold text-foreground text-lg">{t('pay')}</p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'اضغط للدفع اللاتلامسي' : 'Tap to pay contactless'}
              </p>
            </div>
          </button>

          {/* Charge/Add Money Button */}
          <button
            onClick={() => setShowChargeModal(true)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card hover:bg-muted transition-colors touch-target"
          >
            <div className="w-14 h-14 rounded-xl bg-success flex items-center justify-center" style={{ boxShadow: '0 4px 12px -2px hsla(142, 72%, 40%, 0.4)' }}>
              <Plus className="w-7 h-7 text-success-foreground" />
            </div>
            <div className="flex-1 text-start">
              <p className="font-semibold text-foreground text-lg">{t('charge')}</p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'أضف رصيد بعملتك' : `Add money in ${userCurrency}`}
              </p>
            </div>
          </button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-xs text-muted-foreground mb-2">{isArabic ? 'الأخيرة' : 'Recent'}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">{isArabic ? 'مطعم' : 'Food Court'}</span>
              <span className="text-sm text-destructive">-50 SAR</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">{isArabic ? 'شحن رصيد' : 'Top Up'}</span>
              <span className="text-sm text-success">+500 SAR</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pay Modal */}
      <AnimatePresence>
        {showPayModal && (
          <PayModal
            amount={amount}
            setAmount={setAmount}
            pinInput={pinInput}
            handlePinDigit={handlePinDigit}
            setPinInput={setPinInput}
            onSubmit={handlePaySubmit}
            onClose={closeModals}
            paymentSuccess={paymentSuccess}
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Charge Modal with Currency Conversion */}
      <AnimatePresence>
        {showChargeModal && (
          <ChargeModal
            userCurrency={userCurrency}
            userCurrencyAmount={userCurrencyAmount}
            setUserCurrencyAmount={setUserCurrencyAmount}
            sarAmount={sarFromUserCurrency}
            exchangeRate={exchangeRate}
            pinInput={pinInput}
            handlePinDigit={handlePinDigit}
            setPinInput={setPinInput}
            onSubmit={handleChargeSubmit}
            onClose={closeModals}
            paymentSuccess={paymentSuccess}
            t={t}
            isArabic={isArabic}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PayModal({ 
  amount, setAmount, pinInput, handlePinDigit, setPinInput, onSubmit, onClose, paymentSuccess, t 
}: {
  amount: string;
  setAmount: (v: string) => void;
  pinInput: string;
  handlePinDigit: (d: string) => void;
  setPinInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  paymentSuccess: boolean;
  t: (k: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background flex flex-col rounded-[50px] overflow-hidden"
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted touch-target">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground">{t('pay')}</h3>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {paymentSuccess ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <span className="text-lg font-semibold text-primary">{t('confirm')}!</span>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Amount (SAR)</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-14 px-4 rounded-xl bg-muted text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex gap-2 mt-2">
                {[50, 100, 200].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      amount === val.toString() ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <PinEntry pinInput={pinInput} handlePinDigit={handlePinDigit} setPinInput={setPinInput} t={t} />

            <button
              onClick={onSubmit}
              disabled={pinInput.length !== 4}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all disabled:opacity-40"
            >
              {t('confirm')} {amount} SAR
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ChargeModal({ 
  userCurrency, userCurrencyAmount, setUserCurrencyAmount, sarAmount, exchangeRate,
  pinInput, handlePinDigit, setPinInput, onSubmit, onClose, paymentSuccess, t, isArabic
}: {
  userCurrency: string;
  userCurrencyAmount: string;
  setUserCurrencyAmount: (v: string) => void;
  sarAmount: number;
  exchangeRate: number;
  pinInput: string;
  handlePinDigit: (d: string) => void;
  setPinInput: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  paymentSuccess: boolean;
  t: (k: string) => string;
  isArabic: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background flex flex-col rounded-[50px] overflow-hidden"
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted touch-target">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground">{t('charge')}</h3>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {paymentSuccess ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-success" />
            </div>
            <span className="text-lg font-semibold text-success">{t('confirm')}!</span>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {/* User Currency Input */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">{t('yourCurrency')} ({userCurrency})</p>
              <input
                type="number"
                value={userCurrencyAmount}
                onChange={(e) => setUserCurrencyAmount(e.target.value)}
                placeholder={`0 ${userCurrency}`}
                className="w-full h-14 px-4 rounded-xl bg-muted text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-success/50"
              />
              <div className="flex gap-2 mt-2">
                {[5000, 10000, 20000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setUserCurrencyAmount(val.toString())}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      userCurrencyAmount === val.toString() ? 'bg-success text-success-foreground' : 'bg-card text-foreground'
                    }`}
                  >
                    {val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Display */}
            <div className="flex items-center justify-center gap-2 py-2">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">1 SAR = {exchangeRate} {userCurrency}</span>
            </div>

            {/* SAR Result */}
            <div className="p-4 rounded-xl bg-success/10 text-center">
              <p className="text-xs text-muted-foreground mb-1">{t('converting')}</p>
              <p className="text-2xl font-bold text-success">
                {sarAmount.toLocaleString()} SAR
              </p>
            </div>

            <PinEntry pinInput={pinInput} handlePinDigit={handlePinDigit} setPinInput={setPinInput} t={t} />

            <button
              onClick={onSubmit}
              disabled={pinInput.length !== 4 || sarAmount <= 0}
              className="w-full py-4 rounded-xl bg-success text-success-foreground font-semibold text-base transition-all disabled:opacity-40"
            >
              {t('confirm')} {sarAmount} SAR
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PinEntry({ pinInput, handlePinDigit, setPinInput, t }: {
  pinInput: string;
  handlePinDigit: (d: string) => void;
  setPinInput: (v: string) => void;
  t: (k: string) => string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-2">{t('enterPin')}</p>
      <div className="flex justify-center gap-3 mb-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-colors ${
              pinInput.length > i ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((digit, i) => (
          <button
            key={i}
            onClick={() => {
              if (digit === 'del') {
                setPinInput(pinInput.slice(0, -1));
              } else if (digit !== null) {
                handlePinDigit(digit.toString());
              }
            }}
            disabled={digit === null}
            className={`h-10 rounded-xl text-base font-medium transition-colors ${
              digit === null 
                ? 'invisible' 
                : 'bg-card hover:bg-muted text-foreground active:bg-muted'
            }`}
          >
            {digit === 'del' ? '⌫' : digit}
          </button>
        ))}
      </div>
    </div>
  );
}
