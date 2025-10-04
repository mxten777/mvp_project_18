/**
 * 실시간 시스템 모니터링 컴포넌트
 * CPU, 메모리, 네트워크, 디스크 사용률 실시간 모니터링
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  CircleStackIcon,
  GlobeAltIcon,
  ServerIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature: number;
    processes: number;
  };
  memory: {
    used: number;
    total: number;
    available: number;
    cached: number;
  };
  network: {
    download: number;
    upload: number;
    latency: number;
    connections: number;
  };
  disk: {
    used: number;
    total: number;
    readSpeed: number;
    writeSpeed: number;
  };
  system: {
    uptime: number;
    loadAverage: number[];
    activeUsers: number;
    backgroundTasks: number;
  };
}

interface SystemMonitorProps {
  refreshInterval?: number;
  className?: string;
}

const SystemMonitor: React.FC<SystemMonitorProps> = ({
  refreshInterval = 2000,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [history, setHistory] = useState<SystemMetrics[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring, refreshInterval]);

  const startMonitoring = () => {
    // 초기 데이터 로드
    generateMockMetrics();
    
    intervalRef.current = setInterval(() => {
      generateMockMetrics();
    }, refreshInterval);
  };

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const generateMockMetrics = () => {
    const newMetrics: SystemMetrics = {
      cpu: {
        usage: Math.floor(Math.random() * 40) + 30, // 30-70%
        cores: 8,
        temperature: Math.floor(Math.random() * 20) + 45, // 45-65°C
        processes: Math.floor(Math.random() * 50) + 120
      },
      memory: {
        used: Math.floor(Math.random() * 4000) + 4000, // 4-8GB
        total: 16000,
        available: 0,
        cached: Math.floor(Math.random() * 1000) + 500
      },
      network: {
        download: Math.floor(Math.random() * 100) + 10, // 10-110 Mbps
        upload: Math.floor(Math.random() * 50) + 5, // 5-55 Mbps
        latency: Math.floor(Math.random() * 50) + 10, // 10-60ms
        connections: Math.floor(Math.random() * 200) + 50
      },
      disk: {
        used: Math.floor(Math.random() * 200) + 300, // 300-500GB
        total: 1000,
        readSpeed: Math.floor(Math.random() * 100) + 50, // 50-150 MB/s
        writeSpeed: Math.floor(Math.random() * 80) + 30 // 30-110 MB/s
      },
      system: {
        uptime: Date.now() - Math.floor(Math.random() * 86400000), // Random uptime
        loadAverage: [
          Math.random() * 2,
          Math.random() * 2,
          Math.random() * 2
        ],
        activeUsers: Math.floor(Math.random() * 20) + 1,
        backgroundTasks: Math.floor(Math.random() * 30) + 10
      }
    };

    newMetrics.memory.available = newMetrics.memory.total - newMetrics.memory.used;

    // 알림 체크
    checkAlerts(newMetrics);

    setMetrics(newMetrics);
    
    // 히스토리 업데이트 (최근 60개 데이터 포인트만 유지)
    setHistory(prev => {
      const newHistory = [...prev, newMetrics];
      return newHistory.slice(-60);
    });
  };

  const checkAlerts = (metrics: SystemMetrics) => {
    const newAlerts: string[] = [];

    if (metrics.cpu.usage > 80) {
      newAlerts.push('CPU 사용률이 80%를 초과했습니다.');
    }

    if (metrics.cpu.temperature > 70) {
      newAlerts.push('CPU 온도가 70°C를 초과했습니다.');
    }

    if (metrics.memory.used / metrics.memory.total > 0.9) {
      newAlerts.push('메모리 사용률이 90%를 초과했습니다.');
    }

    if (metrics.network.latency > 100) {
      newAlerts.push('네트워크 지연시간이 100ms를 초과했습니다.');
    }

    if (metrics.disk.used / metrics.disk.total > 0.9) {
      newAlerts.push('디스크 사용률이 90%를 초과했습니다.');
    }

    setAlerts(newAlerts);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatUptime = (timestamp: number): string => {
    const uptime = Date.now() - timestamp;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}일 ${hours}시간 ${minutes}분`;
  };

  const getStatusColor = (value: number, threshold: number): string => {
    if (value > threshold * 0.9) return 'text-red-500';
    if (value > threshold * 0.7) return 'text-yellow-500';
    return 'text-green-500';
  };

  const CircularProgress: React.FC<{ 
    value: number; 
    max: number; 
    size?: number; 
    strokeWidth?: number;
    color?: string;
  }> = ({ value, max, size = 120, strokeWidth = 8, color = 'blue' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = (value / max) * 100;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-600"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`text-${color}-500 transition-all duration-300`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {formatBytes(value * 1024 * 1024)} / {formatBytes(max * 1024 * 1024)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!metrics) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            시스템 모니터링
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            실시간 시스템 성능 및 리소스 사용률
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {alerts.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="text-sm font-medium">{alerts.length}개 알림</span>
            </div>
          )}
          
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

      {/* 알림 패널 */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">시스템 알림</h3>
              <ul className="space-y-1">
                {alerts.map((alert, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-300">
                    • {alert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* 메인 메트릭 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CPU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CpuChipIcon className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CPU</h3>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.cpu.usage, 100)}`}>
              {metrics.cpu.usage}%
            </span>
          </div>
          
          <CircularProgress value={metrics.cpu.usage} max={100} color="blue" />
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">코어:</span>
              <span className="text-gray-900 dark:text-white">{metrics.cpu.cores}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">온도:</span>
              <span className="text-gray-900 dark:text-white">{metrics.cpu.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">프로세스:</span>
              <span className="text-gray-900 dark:text-white">{metrics.cpu.processes}개</span>
            </div>
          </div>
        </motion.div>

        {/* 메모리 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CircleStackIcon className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">메모리</h3>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.memory.used, metrics.memory.total)}`}>
              {Math.round((metrics.memory.used / metrics.memory.total) * 100)}%
            </span>
          </div>
          
          <CircularProgress 
            value={metrics.memory.used} 
            max={metrics.memory.total} 
            color="green"
          />
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">사용 중:</span>
              <span className="text-gray-900 dark:text-white">{formatBytes(metrics.memory.used * 1024 * 1024)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">사용 가능:</span>
              <span className="text-gray-900 dark:text-white">{formatBytes(metrics.memory.available * 1024 * 1024)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">캐시:</span>
              <span className="text-gray-900 dark:text-white">{formatBytes(metrics.memory.cached * 1024 * 1024)}</span>
            </div>
          </div>
        </motion.div>

        {/* 네트워크 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-6 w-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">네트워크</h3>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.network.latency, 100)}`}>
              {metrics.network.latency}ms
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">다운로드</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {metrics.network.download} Mbps
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(metrics.network.download, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">업로드</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {metrics.network.upload} Mbps
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(metrics.network.upload * 2, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="pt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">연결:</span>
                <span className="text-gray-900 dark:text-white">{metrics.network.connections}개</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 디스크 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <ServerIcon className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">디스크</h3>
            </div>
            <span className={`text-sm font-medium ${getStatusColor(metrics.disk.used, metrics.disk.total)}`}>
              {Math.round((metrics.disk.used / metrics.disk.total) * 100)}%
            </span>
          </div>
          
          <CircularProgress 
            value={metrics.disk.used} 
            max={metrics.disk.total} 
            color="orange"
          />
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">읽기:</span>
              <span className="text-gray-900 dark:text-white">{metrics.disk.readSpeed} MB/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">쓰기:</span>
              <span className="text-gray-900 dark:text-white">{metrics.disk.writeSpeed} MB/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">여유 공간:</span>
              <span className="text-gray-900 dark:text-white">
                {formatBytes((metrics.disk.total - metrics.disk.used) * 1024 * 1024 * 1024)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 시스템 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">시스템 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">시스템 가동시간:</span>
              <span className="text-gray-900 dark:text-white">
                {formatUptime(metrics.system.uptime)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">활성 사용자:</span>
              <span className="text-gray-900 dark:text-white">{metrics.system.activeUsers}명</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">백그라운드 작업:</span>
              <span className="text-gray-900 dark:text-white">{metrics.system.backgroundTasks}개</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">로드 평균:</span>
              <span className="text-gray-900 dark:text-white">
                {metrics.system.loadAverage.map(load => load.toFixed(2)).join(', ')}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">성능 트렌드</h3>
          <div className="h-32 flex items-end space-x-1">
            {history.slice(-20).map((data, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${(data.cpu.usage / 100) * 100}%` }}
                title={`CPU: ${data.cpu.usage}%`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            최근 CPU 사용률 (20개 데이터 포인트)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemMonitor;