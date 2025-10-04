import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWA, useNetworkStatus } from '../hooks/usePWA';
import Button from './Button';

const PWAStatusIndicator: React.FC = () => {
  const { 
    updateAvailable, 
    isStandalone, 
    applyUpdate,
    requestNotificationPermission 
  } = usePWA();
  
  const { isOnline, connectionType } = useNetworkStatus();

  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission | 'not-supported'>(Notification.permission);
  const [showUpdatePrompt, setShowUpdatePrompt] = React.useState(updateAvailable);
  const [showNotificationPrompt, setShowNotificationPrompt] = React.useState(false);

  React.useEffect(() => {
    setShowUpdatePrompt(updateAvailable);
  }, [updateAvailable]);

  React.useEffect(() => {
    // 스탠드얼론 모드에서 알림 권한이 없으면 프롬프트 표시
    if (isStandalone && notificationPermission === 'default') {
      setTimeout(() => setShowNotificationPrompt(true), 5000);
    }
  }, [isStandalone, notificationPermission]);

  const handleUpdateApp = () => {
    applyUpdate();
    setShowUpdatePrompt(false);
  };

  const handleEnableNotifications = async () => {
    try {
      const permission = await requestNotificationPermission();
      setNotificationPermission(permission);
      setShowNotificationPrompt(false);
      
      if (permission === 'granted') {
        // 알림 허용 시 환영 알림 표시
        new Notification('바이칼 재가복지센터', {
          body: '알림이 활성화되었습니다! 중요한 상담 정보를 놓치지 마세요.',
          icon: '/icons/icon-192x192.png'
        });
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    }
  };

  const getConnectionIcon = () => {
    if (!isOnline) return '📶';
    
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return '📶';
      case '3g':
        return '📶';
      case '4g':
        return '📶';
      default:
        return '📶';
    }
  };

  const getConnectionColor = () => {
    if (!isOnline) return 'text-red-500';
    
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return 'text-yellow-500';
      case '3g':
        return 'text-orange-500';
      case '4g':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <>
      {/* 네트워크 상태 표시 */}
      <motion.div
        className="fixed top-4 left-4 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm px-3 py-2 rounded-full border border-secondary-200 dark:border-secondary-700 shadow-lg">
          <span className={`text-lg ${getConnectionColor()}`}>
            {getConnectionIcon()}
          </span>
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            {isOnline ? (
              connectionType !== 'unknown' ? connectionType.toUpperCase() : '온라인'
            ) : (
              '오프라인'
            )}
          </span>
          
          {isStandalone && (
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" title="앱 모드" />
          )}
        </div>
      </motion.div>

      {/* 업데이트 알림 */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-700 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🔄</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-800 dark:text-primary-200 mb-1">
                    업데이트 사용 가능
                  </h4>
                  <p className="text-sm text-primary-700 dark:text-primary-300 mb-3">
                    새로운 기능과 개선사항이 준비되었습니다.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleUpdateApp}
                      className="text-xs"
                    >
                      업데이트
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowUpdatePrompt(false)}
                      className="text-xs"
                    >
                      나중에
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 알림 권한 요청 */}
      <AnimatePresence>
        {showNotificationPrompt && (
          <motion.div
            className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <div className="bg-accent-50 dark:bg-accent-900/30 border-2 border-accent-200 dark:border-accent-700 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🔔</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-accent-800 dark:text-accent-200 mb-1">
                    알림 허용하기
                  </h4>
                  <p className="text-sm text-accent-700 dark:text-accent-300 mb-3">
                    중요한 상담 정보와 업데이트를 놓치지 마세요.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleEnableNotifications}
                      className="text-xs"
                    >
                      허용하기
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotificationPrompt(false)}
                      className="text-xs"
                    >
                      나중에
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 오프라인 배너 */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-yellow-900 px-4 py-2"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <span>📶</span>
              <span>오프라인 모드 • 연결을 확인해주세요</span>
              <motion.div
                className="w-2 h-2 bg-yellow-700 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA 정보 (개발 모드에서만) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          className="fixed bottom-4 left-4 bg-secondary-800/90 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm border border-secondary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
        >
          PWA: {isStandalone ? '앱 모드' : '브라우저 모드'} | {connectionType}
        </motion.div>
      )}
    </>
  );
};

export default PWAStatusIndicator;