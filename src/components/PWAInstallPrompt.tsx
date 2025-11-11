import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './common/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // PWAê°€ ?´ë? ?¤ì¹˜?˜ì—ˆ?”ì? ?•ì¸
    const checkInstallation = () => {
      // ?¤íƒ ?œì–¼ë¡?ëª¨ë“œ?¸ì? ?•ì¸
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
      
      // ?¤ì¹˜ ?¬ë? ?•ì¸ (localStorage ?¬ìš©)
      const installed = localStorage.getItem('pwa-installed') === 'true';
      setIsInstalled(installed || isStandaloneMode);
    };

    checkInstallation();

    // beforeinstallprompt ?´ë²¤??ë¦¬ìŠ¤??
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // 5ì´??„ì— ?„ë¡¬?„íŠ¸ ?œì‹œ (?¬ìš©?ê? ?¬ì´?¸ë? ?˜ëŸ¬ë³???
      setTimeout(() => {
        if (!isInstalled && !isStandalone) {
          setShowPrompt(true);
        }
      }, 10000);
    };

    // ?±ì´ ?¤ì¹˜?˜ì—ˆ????
    const handleAppInstalled = () => {
      console.log('PWA installed');
      setIsInstalled(true);
      setShowPrompt(false);
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled, isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
        localStorage.setItem('pwa-installed', 'true');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // 24?œê°„ ?™ì•ˆ ?¤ì‹œ ?œì‹œ?˜ì? ?ŠìŒ
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // ?´ë? ?¤ì¹˜?˜ì—ˆê±°ë‚˜ ?¤íƒ ?œì–¼ë¡?ëª¨ë“œë©??œì‹œ?˜ì? ?ŠìŒ
  if (isInstalled || isStandalone) {
    return null;
  }

  // ìµœê·¼???«ì•˜?¼ë©´ ?œì‹œ?˜ì? ?ŠìŒ
  const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
  if (lastDismissed) {
    const timeSinceDismiss = Date.now() - parseInt(lastDismissed);
    if (timeSinceDismiss < 24 * 60 * 60 * 1000) { // 24?œê°„
      return null;
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:top-4 md:w-96 z-50"
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl border border-secondary-200 dark:border-secondary-700 p-6 backdrop-blur-lg">
            {/* ?¤ë” */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">?“±</span>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-800 dark:text-secondary-200">
                    ?±ìœ¼ë¡??¤ì¹˜?˜ê¸°
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    ???¸ë¦¬???´ìš©???„í•´
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={handleDismiss}
                className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.button>
            </div>

            {/* ?œíƒ ?¤ëª… */}
            <div className="mb-6 space-y-2">
              {[
                { icon: '??, text: 'ë¹ ë¥¸ ë¡œë”© ?ë„' },
                { icon: '?“±', text: '?ˆí™”ë©´ì—??ë°”ë¡œ ?‘ì†' },
                { icon: '?””', text: 'ì¤‘ìš”???Œë¦¼ ë°›ê¸°' },
                { icon: '?“¶', text: '?¤í”„?¼ì¸?ì„œ???´ìš© ê°€?? }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-lg">{benefit.icon}</span>
                  <span className="text-sm text-secondary-700 dark:text-secondary-300">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ?¡ì…˜ ë²„íŠ¼??*/}
            <div className="flex gap-3">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold"
                  onClick={handleInstallClick}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  }
                >
                  ?¤ì¹˜?˜ê¸°
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleDismiss}
                >
                  ?˜ì¤‘??
                </Button>
              </motion.div>
            </div>

            {/* ?¤ì¹˜ ê°€?´ë“œ */}
            <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-600">
              <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
                ?’¡ ë¸Œë¼?°ì??ì„œ "???”ë©´??ì¶”ê?" ?µì…˜??ì°¾ì„ ?˜ë„ ?ˆì–´??
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
