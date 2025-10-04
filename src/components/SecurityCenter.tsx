/**
 * 통합 보안 센터 대시보드
 * 모든 보안 기능을 통합한 중앙 관리 센터
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  KeyIcon,
  CpuChipIcon,
  BellIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

import AdvancedSecurityDashboard from './AdvancedSecurityDashboard';
import SystemMonitor from './SystemMonitor';
import MFAComponent from './MFAComponent';
import { securityEngine } from '../utils/securityEngine';

interface AlertData {
  severity: string;
  description?: string;
  rule?: { name: string };
  timestamp?: Date;
}

interface SecurityEvent {
  severity: string;
  description?: string;
  timestamp?: Date;
}

interface SecurityCenterProps {
  userId?: string;
  className?: string;
}

const SecurityCenter: React.FC<SecurityCenterProps> = ({
  userId = 'demo-user',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [securityStatus, setSecurityStatus] = useState<'secure' | 'warning' | 'danger'>('secure');
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    networkActivity: 23,
    activeThreats: 0,
    securityScore: 95,
    lastScan: new Date(),
    activeSessions: 3
  });
  const [recentAlerts, setRecentAlerts] = useState<AlertData[]>([]);
  const [showMFA, setShowMFA] = useState(false);

  const tabs = [
    { id: 'dashboard', label: '보안 대시보드', icon: ShieldCheckIcon },
    { id: 'monitoring', label: '시스템 모니터링', icon: CpuChipIcon },
    { id: 'threats', label: '위협 탐지', icon: ExclamationTriangleIcon },
    { id: 'authentication', label: '인증 관리', icon: KeyIcon },
    { id: 'settings', label: '보안 설정', icon: Cog6ToothIcon }
  ];

  useEffect(() => {
    const initializeSecurityCenter = () => {
      // 보안 엔진 초기화
      securityEngine.on('securityAlert', handleSecurityAlert);
      securityEngine.on('securityEvent', handleSecurityEvent);
      
      // 초기 보안 상태 확인
      updateSecurityStatus();
    };

    const startRealTimeMonitoring = () => {
      const interval = setInterval(() => {
        if (isMonitoring) {
          updateSystemMetrics();
          updateSecurityStatus();
        }
      }, 3000);

      return () => clearInterval(interval);
    };

    initializeSecurityCenter();
    const cleanup = startRealTimeMonitoring();
    
    return cleanup;
  }, [isMonitoring, updateSecurityStatus, updateSystemMetrics]);

  const initializeSecurityCenter = () => {
    // 보안 엔진 초기화
    securityEngine.on('securityAlert', handleSecurityAlert);
    securityEngine.on('securityEvent', handleSecurityEvent);
    
    // 초기 보안 상태 확인
    updateSecurityStatus();
  };

  const startRealTimeMonitoring = () => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        updateSystemMetrics();
        updateSecurityStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const updateSystemMetrics = useCallback(() => {
    setSystemMetrics(prev => ({
      ...prev,
      cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
      memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
      networkActivity: Math.max(5, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 15)),
      activeThreats: Math.max(0, prev.activeThreats + Math.floor((Math.random() - 0.8) * 2)),
      activeSessions: Math.max(1, Math.min(10, prev.activeSessions + Math.floor((Math.random() - 0.5) * 2)))
    }));
  }, []);

  const updateSecurityStatus = useCallback(() => {
    const threats = systemMetrics.activeThreats;
    const cpuUsage = systemMetrics.cpuUsage;
    
    if (threats > 3 || cpuUsage > 90) {
      setSecurityStatus('danger');
    } else if (threats > 0 || cpuUsage > 80) {
      setSecurityStatus('warning');
    } else {
      setSecurityStatus('secure');
    }
  }, [systemMetrics.activeThreats, systemMetrics.cpuUsage]);

  const handleSecurityAlert = (alertData: AlertData) => {
    setRecentAlerts(prev => [alertData, ...prev.slice(0, 4)]);
  };

  const handleSecurityEvent = (event: SecurityEvent) => {
    if (event.severity === 'high' || event.severity === 'critical') {
      setRecentAlerts(prev => [event, ...prev.slice(0, 4)]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'danger': return '위험';
      case 'warning': return '주의';
      default: return '안전';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 전체 보안 상태 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">보안 센터</h2>
            <p className="text-blue-100">
              실시간 보안 모니터링 및 위협 탐지 시스템
            </p>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(securityStatus)} text-gray-800`}>
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="font-medium">시스템 {getStatusText(securityStatus)}</span>
            </div>
            <p className="text-sm text-blue-100 mt-2">
              보안 점수: {systemMetrics.securityScore}/100
            </p>
          </div>
        </div>
      </motion.div>

      {/* 주요 메트릭 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">활성 위협</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.activeThreats}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              systemMetrics.activeThreats > 0 
                ? 'bg-red-100 dark:bg-red-900/20' 
                : 'bg-green-100 dark:bg-green-900/20'
            }`}>
              <ExclamationTriangleIcon className={`h-6 w-6 ${
                systemMetrics.activeThreats > 0 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400'
              }`} />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-xs ${
              systemMetrics.activeThreats > 0 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-green-600 dark:text-green-400'
            }`}>
              {systemMetrics.activeThreats > 0 ? '즉시 조치 필요' : '시스템 안전'}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">CPU 사용률</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.cpuUsage}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <CpuChipIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">활성 세션</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.activeSessions}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">실시간 모니터링</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">네트워크</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.networkActivity}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <EyeIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-purple-600 dark:text-purple-400">
              정상 범위 내
            </span>
          </div>
        </motion.div>
      </div>

      {/* 최근 알림 및 빠른 액션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 보안 알림 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">최근 보안 알림</h3>
            <BellIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {recentAlerts.length > 0 ? recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'high' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.description || alert.rule?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(alert.timestamp || Date.now()).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  최근 보안 알림이 없습니다
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 빠른 액션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">빠른 작업</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('threats')}
              className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">위협 검사</p>
            </button>

            <button
              onClick={() => setActiveTab('monitoring')}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <CpuChipIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">시스템 모니터</p>
            </button>

            <button
              onClick={() => setShowMFA(true)}
              className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <KeyIcon className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">MFA 설정</p>
            </button>

            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              {isMonitoring ? (
                <PauseIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              ) : (
                <PlayIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              )}
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {isMonitoring ? '모니터링 정지' : '모니터링 시작'}
              </p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              보안 센터
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              고급 보안 모니터링 및 위협 탐지 시스템
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${getStatusColor(securityStatus)}`}>
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="font-medium">시스템 {getStatusText(securityStatus)}</span>
            </div>
            
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isMonitoring
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isMonitoring ? '모니터링 중' : '모니터링 정지'}</span>
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderOverview()}
            {activeTab === 'monitoring' && <SystemMonitor />}
            {activeTab === 'threats' && <AdvancedSecurityDashboard userId={userId} />}
            {activeTab === 'authentication' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">인증 관리</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    다중 인증(MFA)을 설정하여 계정 보안을 강화하세요.
                  </p>
                  <button
                    onClick={() => setShowMFA(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    MFA 설정하기
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">보안 설정</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    보안 정책 및 시스템 설정을 관리합니다.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* MFA 모달 */}
        {showMFA && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full mx-4">
              <MFAComponent
                userId={userId}
                onSuccess={() => setShowMFA(false)}
                onCancel={() => setShowMFA(false)}
                requiredMethods={1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityCenter;