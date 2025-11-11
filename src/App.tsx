import React, { useState, useEffect } from 'react';
import AppPC from './AppPC';
import AppMobile from './AppMobile';

/**
 * 디바이스 감지 커스텀 훅
 */
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isLoading };
};

/**
 * 메인 App 컴포넌트
 * 디바이스 감지 후 PC/Mobile 버전 분기
 */
function App() {
  const { isMobile, isLoading } = useDeviceDetection();

  // 로딩 중 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">💚</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">돌봄서비스</div>
          <div className="text-sm text-gray-500">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 디바이스에 따라 적절한 버전 렌더링
  return isMobile ? <AppMobile /> : <AppPC />;
}

export default App;