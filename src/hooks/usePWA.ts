import { useState, useEffect } from 'react';

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  isStandalone: boolean;
  updateAvailable: boolean;
}

export const usePWA = () => {
  const [pwaState, setPWAState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    isStandalone: false,
    updateAvailable: false
  });

  const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Service Worker 등록
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          setServiceWorker(registration);
          
          console.log('Service Worker registered successfully:', registration);

          // 업데이트 체크
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setPWAState(prev => ({ ...prev, updateAvailable: true }));
                }
              });
            }
          });

          // 주기적으로 업데이트 체크 (1시간마다)
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();

    // 스탠드얼론 모드 체크
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://');
      
      setPWAState(prev => ({ 
        ...prev, 
        isStandalone: isStandaloneMode,
        isInstalled: isStandaloneMode || localStorage.getItem('pwa-installed') === 'true'
      }));
    };

    checkStandalone();

    // 온라인/오프라인 상태 모니터링
    const handleOnline = () => setPWAState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPWAState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 설치 가능 상태 체크
    const handleBeforeInstallPrompt = () => {
      setPWAState(prev => ({ ...prev, isInstallable: true }));
    };

    const handleAppInstalled = () => {
      setPWAState(prev => ({ 
        ...prev, 
        isInstalled: true,
        isInstallable: false 
      }));
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // 앱 업데이트 적용
  const applyUpdate = () => {
    if (serviceWorker?.waiting) {
      serviceWorker.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  // 푸시 알림 권한 요청
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      return 'not-supported';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  };

  // 푸시 구독 등록
  const subscribeToPush = async () => {
    if (!serviceWorker || !('PushManager' in window)) {
      throw new Error('Push notifications not supported');
    }

    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      throw new Error('Notification permission denied');
    }

    try {
      const subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          'BMqLZs_7GBJQK1QJ0L5l3KV_MWJ4Qd7Xk2B8cL1J4YQM_vKjS8DL3qR4Hm7Yn0pG9FxKtR3Zn8Vm2JdQ5Ls6Qw' // 실제 VAPID 키로 교체 필요
        )
      });

      // 서버에 구독 정보 전송
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      throw error;
    }
  };

  // 백그라운드 동기화 등록
  const registerBackgroundSync = async (tag: string) => {
    if (!serviceWorker || !('sync' in serviceWorker)) {
      throw new Error('Background sync not supported');
    }

    try {
      await serviceWorker.sync.register(tag);
      console.log('Background sync registered:', tag);
    } catch (error) {
      console.error('Background sync registration failed:', error);
      throw error;
    }
  };

  // 오프라인 데이터 저장
  const saveOfflineData = (key: string, data: any) => {
    try {
      localStorage.setItem(`offline_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  // 오프라인 데이터 가져오기
  const getOfflineData = (key: string) => {
    try {
      const stored = localStorage.getItem(`offline_${key}`);
      if (!stored) return null;

      const { data, timestamp } = JSON.parse(stored);
      
      // 24시간 이상 된 데이터는 무효
      if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(`offline_${key}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  };

  return {
    ...pwaState,
    applyUpdate,
    requestNotificationPermission,
    subscribeToPush,
    registerBackgroundSync,
    saveOfflineData,
    getOfflineData
  };
};

// VAPID 키 변환 유틸리티
function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// 네트워크 상태 체크
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // 연결 타입 체크 (Chrome에서만 지원)
    const updateConnectionType = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    updateConnectionType();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateConnectionType);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', updateConnectionType);
      }
    };
  }, []);

  return { isOnline, connectionType };
};