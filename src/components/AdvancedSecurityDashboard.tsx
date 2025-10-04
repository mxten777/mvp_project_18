/**
 * 고급 보안 대시보드
 * 실시간 위협 탐지, 보안 모니터링, 시스템 상태 관리
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  KeyIcon,
  LockClosedIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  GlobeAltIcon,
  CpuChipIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { securityEngine, SecurityEvent } from '../utils/securityEngine';

interface SecurityDashboardProps {
  userId?: string;
  className?: string;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  userId = 'demo-user',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [securityData, setSecurityData] = useState<any>(null);
  const [realtimeEvents, setRealtimeEvents] = useState<SecurityEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [threatLevel, setThreatLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

  const tabs = [
    { id: 'overview', label: '보안 개요', icon: ShieldCheckIcon },
    { id: 'threats', label: '위협 탐지', icon: ExclamationTriangleIcon },
    { id: 'monitoring', label: '실시간 모니터링', icon: EyeIcon },
    { id: 'authentication', label: '인증 관리', icon: KeyIcon },
    { id: 'encryption', label: '암호화', icon: LockClosedIcon },
    { id: 'analytics', label: '보안 분석', icon: ChartBarIcon }
  ];

  useEffect(() => {
    initializeSecurity();
    startRealTimeMonitoring();
  }, []);

  const initializeSecurity = async () => {
    try {
      // 보안 엔진 초기화
      const dashboardData = securityEngine.getSecurityDashboardData();
      setSecurityData(dashboardData);
      
      // 위협 레벨 계산
      calculateThreatLevel(dashboardData);
      
      // 보안 이벤트 리스너 등록
      securityEngine.on('securityEvent', handleSecurityEvent);
      securityEngine.on('securityAlert', handleSecurityAlert);
      
    } catch (error) {
      console.error('보안 시스템 초기화 실패:', error);
    }
  };

  const startRealTimeMonitoring = () => {
    const interval = setInterval(() => {
      if (isMonitoring) {
        const dashboardData = securityEngine.getSecurityDashboardData();
        setSecurityData(dashboardData);
        calculateThreatLevel(dashboardData);
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  const handleSecurityEvent = (event: SecurityEvent) => {
    setRealtimeEvents(prev => [event, ...prev.slice(0, 9)]);
  };

  const handleSecurityAlert = (alertData: any) => {
    // 중요한 보안 알림 처리
    console.warn('Security Alert:', alertData);
  };

  const calculateThreatLevel = (data: any) => {
    if (!data) return;
    
    const { activeThreats, threatLevels } = data;
    
    if (threatLevels.critical > 0) {
      setThreatLevel('critical');
    } else if (threatLevels.high > 2) {
      setThreatLevel('high');
    } else if (threatLevels.medium > 5) {
      setThreatLevel('medium');
    } else {
      setThreatLevel('low');
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getThreatLevelText = (level: string) => {
    switch (level) {
      case 'critical': return '치명적';
      case 'high': return '높음';
      case 'medium': return '보통';
      default: return '낮음';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 보안 상태 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">보안 점수</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {securityData?.systemHealth?.securityScore || 95}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-green-600 dark:text-green-400">+2.3% 개선</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">위협 레벨</p>
              <p className={`text-sm font-medium px-2 py-1 rounded-full ${getThreatLevelColor(threatLevel)}`}>
                {getThreatLevelText(threatLevel)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {securityData?.summary?.activeThreats || 0}개 활성 위협
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
              <p className="text-sm text-gray-600 dark:text-gray-400">활성 세션</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {securityData?.summary?.activeSessions || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-blue-600 dark:text-blue-400">실시간 모니터링</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">시스템 가동률</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {securityData?.systemHealth?.uptime || '99.9%'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <CpuChipIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">시스템 정상</span>
          </div>
        </motion.div>
      </div>

      {/* 위협 레벨 차트 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">위협 분포</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {securityData?.threatLevels && Object.entries(securityData.threatLevels).map(([level, count]: [string, any]) => (
            <div key={level} className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
                level === 'critical' ? 'bg-red-100 dark:bg-red-900/20' :
                level === 'high' ? 'bg-orange-100 dark:bg-orange-900/20' :
                level === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                'bg-green-100 dark:bg-green-900/20'
              }`}>
                <span className={`text-xl font-bold ${
                  level === 'critical' ? 'text-red-600 dark:text-red-400' :
                  level === 'high' ? 'text-orange-600 dark:text-orange-400' :
                  level === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {count}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 보안 이벤트 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">최근 보안 이벤트</h3>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              isMonitoring 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isMonitoring ? '모니터링 중' : '모니터링 정지'}</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {(realtimeEvents.length > 0 ? realtimeEvents : securityData?.recentEvents || []).slice(0, 5).map((event: SecurityEvent, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  event.severity === 'critical' ? 'bg-red-500' :
                  event.severity === 'high' ? 'bg-orange-500' :
                  event.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {event.type} • {event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : '방금 전'}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                event.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                event.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {event.severity}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThreats = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">위협 탐지 현황</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 상위 위협 유형 */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">주요 위협 유형</h4>
            <div className="space-y-3">
              {securityData?.topThreats?.map(([type, count]: [string, number], index: number) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {type.replace('_', ' ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 보안 규칙 상태 */}
          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">보안 규칙 상태</h4>
            <div className="space-y-3">
              {[
                { name: '다중 로그인 실패 탐지', status: 'active', triggered: 3 },
                { name: '의심스러운 위치 접근', status: 'active', triggered: 0 },
                { name: '데이터 유출 시도', status: 'active', triggered: 1 },
                { name: '권한 상승 시도', status: 'active', triggered: 0 }
              ].map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${rule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-900 dark:text-white">{rule.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {rule.triggered > 0 ? `${rule.triggered}회 발동` : '정상'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">실시간 시스템 모니터링</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CPU 사용률 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                        className="text-gray-200 dark:text-gray-600" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="125.6"
                        className="text-blue-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">65%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">CPU 사용률</p>
          </div>

          {/* 메모리 사용률 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                        className="text-gray-200 dark:text-gray-600" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="175.84"
                        className="text-green-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">30%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">메모리 사용률</p>
          </div>

          {/* 네트워크 활동 */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                        className="text-gray-200 dark:text-gray-600" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                        strokeDasharray="251.2" strokeDashoffset="200.96"
                        className="text-purple-500" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">20%</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">네트워크 활동</p>
          </div>
        </div>
      </div>

      {/* 실시간 로그 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">실시간 로그</h3>
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
          {realtimeEvents.map((event, index) => (
            <div key={index} className="mb-1">
              [{new Date(event.timestamp).toISOString()}] {event.type.toUpperCase()}: {event.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAuthentication = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">다중 인증 (MFA) 설정</h3>
        
        <div className="space-y-4">
          {[
            { method: 'SMS', enabled: true, description: '휴대폰 SMS 인증' },
            { method: 'Email', enabled: true, description: '이메일 인증 코드' },
            { method: 'TOTP', enabled: false, description: 'Google Authenticator' },
            { method: 'Biometric', enabled: false, description: '생체 인증 (지문/얼굴)' }
          ].map((auth, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  auth.enabled ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-600'
                }`}>
                  <KeyIcon className={`h-5 w-5 ${
                    auth.enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{auth.method}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{auth.description}</p>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                auth.enabled 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300'
              }`}>
                {auth.enabled ? '활성화됨' : '비활성화됨'}
              </button>
            </div>
          ))}
        </div>
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
              고급 보안 센터
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              실시간 위협 탐지 및 보안 모니터링
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${getThreatLevelColor(threatLevel)}`}>
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="font-medium">위협 레벨: {getThreatLevelText(threatLevel)}</span>
            </div>
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
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'threats' && renderThreats()}
            {activeTab === 'monitoring' && renderMonitoring()}
            {activeTab === 'authentication' && renderAuthentication()}
            {activeTab === 'encryption' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">암호화 설정</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AES-256 암호화가 활성화되어 모든 데이터가 안전하게 보호됩니다.
                </p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">보안 분석</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AI 기반 보안 분석으로 패턴을 분석하고 미래 위협을 예측합니다.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecurityDashboard;