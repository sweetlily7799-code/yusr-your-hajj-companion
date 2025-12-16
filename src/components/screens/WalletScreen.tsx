import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, CreditCard, Plus, Wallet as WalletIcon, Check } from 'lucide-react';

export function WalletScreen() {
  const { t, pilgrimData, setCurrentScreen, updateWalletBalance } = useApp();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [action, setAction] = useState<'pay' | 'charge' | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleAction = (type: 'pay' | 'charge') => {
    setAction(type);
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    if (pinInput === '1234') {
      const numAmount = parseFloat(amount) || 0;
      if (action === 'pay') {
        updateWalletBalance(-numAmount);
      } else {
        updateWalletBalance(numAmount);
      }
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPinModal(false);
        setPinInput('');
        setAmount('');
        setAction(null);
      }, 1500);
    }
  };

  const handlePinDigit = (digit: string) => {
    if (pinInput.length < 4) {
      setPinInput(prev => prev + digit);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
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

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-4 mb-4"
        style={{ background: 'var(--gradient-gold)' }}
      >
        <div className="flex items-center gap-2 mb-3">
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

      {/* Quick Amount Selection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-12 px-4 rounded-xl bg-muted text-center text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-2 mt-2">
          {[50, 100, 200].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.toString())}
              className="flex-1 py-2 rounded-lg bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {val}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3"
      >
        <button
          onClick={() => handleAction('pay')}
          className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-card hover:bg-muted transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{t('pay')}</span>
        </button>
        <button
          onClick={() => handleAction('charge')}
          className="flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-card hover:bg-muted transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Plus className="w-6 h-6 text-success" />
          </div>
          <span className="text-sm font-medium text-foreground">{t('charge')}</span>
        </button>
      </motion.div>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-[50px]"
          >
            {paymentSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-10 h-10 text-success" />
                </div>
                <span className="text-lg font-semibold text-success">{t('confirm')}!</span>
              </motion.div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('enterPin')}</h3>
                
                {/* PIN Display */}
                <div className="flex gap-3 mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-colors ${
                        pinInput.length > i ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((digit, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (digit === 'del') {
                          setPinInput(prev => prev.slice(0, -1));
                        } else if (digit !== null) {
                          handlePinDigit(digit.toString());
                        }
                      }}
                      disabled={digit === null}
                      className={`w-14 h-12 rounded-xl text-lg font-medium transition-colors ${
                        digit === null 
                          ? 'invisible' 
                          : 'bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      {digit === 'del' ? '⌫' : digit}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowPinModal(false);
                      setPinInput('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-muted text-foreground font-medium"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handlePinSubmit}
                    disabled={pinInput.length !== 4}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50"
                  >
                    {t('confirm')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
