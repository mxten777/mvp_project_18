/**
 * 접근성 개선된 영웅 섹션 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function AccessibleHero() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // 비디오 컨트롤
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 키보드 네비게이션을 위한 스킵 링크
  const skipToContent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 자동재생 설정 (접근성 고려)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.autoplay = false;
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* 스킵 링크 */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        onKeyDown={skipToContent}
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t('accessibility.skip_to_content')}
      </a>

      {/* 배경 비디오 */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          aria-label={t('hero.videoTitle')}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <p>귀하의 브라우저는 비디오를 지원하지 않습니다.</p>
        </video>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* 제목 */}
          <div>
            <h1 
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              <span className="block text-blue-600 dark:text-blue-400">
                {t('hero.title')}
              </span>
              <span className="block mt-2">
                {t('hero.subtitle')}
              </span>
            </h1>
          </div>

          {/* 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA 버튼들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              aria-describedby="cta-description"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </Link>
            <div id="cta-description" className="sr-only">
              무료 상담 신청 페이지로 이동합니다
            </div>

            {/* 비디오 컨트롤 */}
            {videoLoaded && (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVideo}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  aria-label={isVideoPlaying ? '비디오 일시정지' : '비디오 재생'}
                >
                  {isVideoPlaying ? (
                    <PauseIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <PlayIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">
                    {isVideoPlaying ? '일시정지' : t('hero.videoTitle')}
                  </span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  aria-label={isMuted ? '음소거 해제' : '음소거'}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {/* 접근성 정보 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400 space-y-2"
          >
            <p>키보드 사용자: Tab 키로 네비게이션, Enter/Space로 선택</p>
            <p>스크린 리더 사용자: 헤딩 레벨 1부터 순차적으로 탐색 가능</p>
          </motion.div>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              아래로 스크롤
            </span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full p-1">
              <motion.div
                className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full opacity-20 blur-3xl" />
      </div>
    </section>
  );
}