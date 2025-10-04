/**
 * 접근성 도구 모음 컴포넌트
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  screenReader: boolean;
  reduceMotion: boolean;
  focusIndicator: boolean;
}

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    screenReader: false,
    reduceMotion: false,
    focusIndicator: true
  });

  // 설정 로드
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  // 설정 저장 및 적용
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibility_settings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // 글자 크기 적용
    root.style.fontSize = `${settings.fontSize}%`;
    
    // 고대비 모드
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // 애니메이션 감소
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // 포커스 표시기 강화
    if (settings.focusIndicator) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // 스크린 리더 모드
    if (settings.screenReader) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 10, 150);
    updateSetting('fontSize', newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 10, 80);
    updateSetting('fontSize', newSize);
  };

  const resetFontSize = () => {
    updateSetting('fontSize', 100);
  };

  const toggleHighContrast = () => {
    updateSetting('highContrast', !settings.highContrast);
  };

  const toggleScreenReader = () => {
    updateSetting('screenReader', !settings.screenReader);
  };

  const toggleReduceMotion = () => {
    updateSetting('reduceMotion', !settings.reduceMotion);
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
      highContrast: false,
      screenReader: false,
      reduceMotion: false,
      focusIndicator: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('accessibility_settings', JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key) {
          case 'a':
            event.preventDefault();
            setIsOpen(!isOpen);
            break;
          case '+':
          case '=':
            event.preventDefault();
            increaseFontSize();
            break;
          case '-':
            event.preventDefault();
            decreaseFontSize();
            break;
          case '0':
            event.preventDefault();
            resetFontSize();
            break;
          case 'c':
            event.preventDefault();
            toggleHighContrast();
            break;
          case 's':
            event.preventDefault();
            toggleScreenReader();
            break;
          case 'm':
            event.preventDefault();
            toggleReduceMotion();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, settings]);

  return (
    <>
      {/* 접근성 도구 모음 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="접근성 도구 모음 열기/닫기 (Alt+A)"
        title="접근성 도구 모음 (Alt+A)"
      >
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
      </button>

      {/* 접근성 도구 모음 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                접근성 도구
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="접근성 도구 모음 닫기"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* 글자 크기 조절 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                글자 크기 ({settings.fontSize}%)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="글자 크기 줄이기 (Alt+-)"
                  title="글자 크기 줄이기 (Alt+-)"
                  disabled={settings.fontSize <= 80}
                >
                  <MagnifyingGlassMinusIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="글자 크기 초기화 (Alt+0)"
                  title="글자 크기 초기화 (Alt+0)"
                >
                  초기화
                </button>
                <button
                  onClick={increaseFontSize}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="글자 크기 키우기 (Alt+=)"
                  title="글자 크기 키우기 (Alt+=)"
                  disabled={settings.fontSize >= 150}
                >
                  <MagnifyingGlassPlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 접근성 옵션들 */}
            <div className="space-y-4">
              {/* 고대비 모드 */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  {settings.highContrast ? (
                    <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    고대비 모드 (Alt+C)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={toggleHighContrast}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                      settings.highContrast ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </div>
              </label>

              {/* 스크린 리더 모드 */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  {settings.screenReader ? (
                    <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <SpeakerXMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    스크린 리더 모드 (Alt+S)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.screenReader}
                  onChange={toggleScreenReader}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.screenReader ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                      settings.screenReader ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </div>
              </label>

              {/* 애니메이션 감소 */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    애니메이션 감소 (Alt+M)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={toggleReduceMotion}
                  className="sr-only"
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    settings.reduceMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                      settings.reduceMotion ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </div>
              </label>
            </div>

            {/* 설정 초기화 */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={resetSettings}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                모든 설정 초기화
              </button>
            </div>

            {/* 키보드 단축키 안내 */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-2">
                키보드 단축키
              </h4>
              <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
                <div>Alt + A: 접근성 도구 열기/닫기</div>
                <div>Alt + +/-: 글자 크기 조절</div>
                <div>Alt + C: 고대비 모드</div>
                <div>Alt + S: 스크린 리더 모드</div>
                <div>Alt + M: 애니메이션 감소</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}