const CACHE_NAME = 'baikal-center-v1.0.0';
const STATIC_CACHE_NAME = 'baikal-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'baikal-dynamic-v1.0.0';

// 캐시할 정적 파일들
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  // CSS와 JS 파일들은 빌드 시 자동으로 추가됨
];

// 동적 캐시 대상 (API 호출, 이미지 등)
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
];

// 오프라인 페이지
const OFFLINE_PAGE = '/offline.html';

// 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    Promise.all([
      // 정적 파일 캐싱
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      }),
      // 즉시 활성화
      self.skipWaiting()
    ])
  );
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    Promise.all([
      // 이전 캐시 정리
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName.startsWith('baikal-')
            ) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 모든 클라이언트 제어
      self.clients.claim()
    ])
  );
});

// Fetch 이벤트 (네트워크 요청 가로채기)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 네비게이션 요청 처리 (페이지 로드)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // 정적 리소스 처리
  if (url.origin === self.location.origin) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // 외부 리소스 처리 (폰트, 이미지 등)
  if (shouldCacheDynamically(request)) {
    event.respondWith(handleDynamicRequest(request));
    return;
  }

  // 기본 네트워크 요청
  event.respondWith(fetch(request));
});

// 네비게이션 요청 처리 (캐시 우선, 오프라인 폴백)
async function handleNavigationRequest(request) {
  try {
    // 네트워크 우선 시도
    const networkResponse = await fetch(request);
    
    // 성공하면 캐시에 저장하고 반환
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('[SW] Network failed, trying cache');
    
    // 네트워크 실패 시 캐시에서 찾기
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 캐시에도 없으면 오프라인 페이지
    const offlineResponse = await caches.match(OFFLINE_PAGE);
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // 마지막 폴백
    return new Response(
      createOfflineHTML(),
      { 
        headers: { 'Content-Type': 'text/html' },
        status: 200 
      }
    );
  }
}

// 정적 리소스 처리 (캐시 우선)
async function handleStaticRequest(request) {
  // 캐시에서 먼저 찾기
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    // 캐시에 없으면 네트워크에서 가져와서 캐시에 저장
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Failed to fetch static resource:', request.url);
    throw error;
  }
}

// 동적 리소스 처리 (네트워크 우선, 캐시 폴백)
async function handleDynamicRequest(request) {
  try {
    // 네트워크에서 먼저 시도
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // 성공하면 동적 캐시에 저장
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // 네트워크 실패 시 캐시에서 찾기
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// 동적 캐싱 대상인지 확인
function shouldCacheDynamically(request) {
  return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

// 오프라인 HTML 생성
function createOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>오프라인 - 바이칼 재가복지센터</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          max-width: 400px;
        }
        h1 { margin-bottom: 20px; }
        p { margin-bottom: 30px; opacity: 0.9; }
        button {
          background: white;
          color: #667eea;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover { transform: scale(1.05); }
        .icon { font-size: 48px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📱</div>
        <h1>오프라인 상태</h1>
        <p>인터넷 연결을 확인해주세요.<br>연결되면 자동으로 업데이트됩니다.</p>
        <button onclick="window.location.reload()">다시 시도</button>
      </div>
      
      <script>
        // 온라인 상태 복구 시 자동 새로고침
        window.addEventListener('online', () => {
          window.location.reload();
        });
      </script>
    </body>
    </html>
  `;
}

// 푸시 알림 처리
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received');
  
  const options = {
    body: '새로운 상담 요청이 있습니다.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'consultation-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: '확인하기',
        icon: '/icons/view-action.png'
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/icons/close-action.png'
      }
    ],
    data: {
      url: '/?notification=consultation'
    }
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('바이칼 재가복지센터', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click event');
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      self.clients.openWindow(event.notification.data?.url || '/')
    );
  }
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'consultation-sync') {
    event.waitUntil(syncConsultationData());
  }
});

// 상담 데이터 동기화
async function syncConsultationData() {
  try {
    // IndexedDB나 localStorage에서 대기 중인 데이터 가져오기
    const pendingData = await getPendingConsultationData();
    
    if (pendingData && pendingData.length > 0) {
      // 서버에 데이터 전송
      for (const data of pendingData) {
        await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      // 성공적으로 전송된 데이터 제거
      await clearPendingConsultationData();
    }
  } catch (error) {
    console.error('[SW] Sync failed:', error);
    throw error; // 재시도를 위해 에러를 다시 던짐
  }
}

// 대기 중인 상담 데이터 가져오기 (실제 구현에서는 IndexedDB 사용)
async function getPendingConsultationData() {
  // 실제로는 IndexedDB에서 데이터를 가져옴
  return [];
}

// 대기 중인 데이터 제거
async function clearPendingConsultationData() {
  // 실제로는 IndexedDB에서 데이터를 제거
  return;
}