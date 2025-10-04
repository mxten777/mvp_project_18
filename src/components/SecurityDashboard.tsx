/**
 * 보안 대시보드 컴포넌트
 * 보안 상태 모니터링, 로그 분석, 위협 탐지
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Eye,
  Users,
  Clock,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react';
import { logSecurityEvent } from '../utils/security';
import type { SecurityLog } from '../utils/security';

interface SecurityMetrics {
  totalLogs: number;
  criticalEvents: number;
  warningEvents: number;
  infoEvents: number;
  failedLogins: number;
  successfulLogins: number;
  activeUsers: number;
  lastUpdate: string;
}

interface ThreatLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  description: string;
  color: string;
}

export default function SecurityDashboard() {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalLogs: 0,
    criticalEvents: 0,
    warningEvents: 0,
    infoEvents: 0,
    failedLogins: 0,
    successfulLogins: 0,
    activeUsers: 0,
    lastUpdate: new Date().toISOString()
  });
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>({
    level: 'low',
    score: 15,
    description: '정상 수준의 보안 상태입니다.',
    color: 'text-green-500'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadSecurityData();
    
    // 자동 새로고침 설정
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(loadSecurityData, 30000); // 30초마다 갱신
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadSecurityData = async () => {
    try {
      setIsLoading(true);
      
      // 보안 로그 불러오기
      const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      setSecurityLogs(logs.slice(-50)); // 최근 50개만 표시

      // 메트릭 계산
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const recentLogs = logs.filter((log: SecurityLog) => 
        new Date(log.timestamp) > oneDayAgo
      );

      const newMetrics: SecurityMetrics = {
        totalLogs: recentLogs.length,
        criticalEvents: recentLogs.filter((log: SecurityLog) => log.level === 'critical').length,
        warningEvents: recentLogs.filter((log: SecurityLog) => log.level === 'warning').length,
        infoEvents: recentLogs.filter((log: SecurityLog) => log.level === 'info').length,
        failedLogins: recentLogs.filter((log: SecurityLog) => log.action === 'login_failed').length,
        successfulLogins: recentLogs.filter((log: SecurityLog) => log.action === 'login_success').length,
        activeUsers: new Set(recentLogs.map((log: SecurityLog) => log.userId).filter(Boolean)).size,
        lastUpdate: now.toISOString()
      };

      setMetrics(newMetrics);

      // 위협 수준 계산
      calculateThreatLevel(newMetrics);

      // 대시보드 접근 로그
      logSecurityEvent({
        level: 'info',
        action: 'security_dashboard_accessed'
      });

    } catch (error) {
      console.error('보안 데이터 로드 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'dashboard_load_failed',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateThreatLevel = (metrics: SecurityMetrics) => {
    let score = 0;
    
    // 실패한 로그인 시도 가중치
    score += metrics.failedLogins * 5;
    
    // 경고 이벤트 가중치
    score += metrics.warningEvents * 3;
    
    // 중요 이벤트 가중치
    score += metrics.criticalEvents * 10;

    let level: ThreatLevel['level'] = 'low';
    let description = '정상 수준의 보안 상태입니다.';
    let color = 'text-green-500';

    if (score >= 50) {
      level = 'critical';
      description = '즉시 조치가 필요한 보안 위협이 감지되었습니다.';
      color = 'text-red-600';
    } else if (score >= 30) {
      level = 'high';
      description = '높은 수준의 보안 위협이 감지되었습니다.';
      color = 'text-red-500';
    } else if (score >= 15) {
      level = 'medium';
      description = '중간 수준의 보안 이벤트가 감지되었습니다.';
      color = 'text-yellow-500';
    }

    setThreatLevel({ level, score, description, color });
  };

  const exportSecurityReport = () => {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        metrics,
        threatLevel,
        recentLogs: securityLogs,
        summary: {
          reportPeriod: '24시간',
          totalEvents: metrics.totalLogs,
          securityScore: 100 - threatLevel.score
        }
      };

      const dataBlob = new Blob([JSON.stringify(report, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `security_report_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      logSecurityEvent({
        level: 'info',
        action: 'security_report_exported'
      });

    } catch (error) {
      console.error('보안 리포트 내보내기 실패:', error);
      
      logSecurityEvent({
        level: 'error',
        action: 'security_report_export_failed',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    color: string; 
    trend?: number; 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 mr-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </motion.div>
  );

  const SecurityLogItem = ({ log }: { log: SecurityLog }) => {
    const getLevelIcon = (level: SecurityLog['level']) => {
      switch (level) {
        case 'critical':
          return <XCircle className="w-5 h-5 text-red-500" />;
        case 'error':
          return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case 'warning':
          return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        case 'info':
          return <CheckCircle className="w-5 h-5 text-blue-500" />;
        default:
          return <Activity className="w-5 h-5 text-gray-500" />;
      }
    };

    const getLevelColor = (level: SecurityLog['level']) => {
      switch (level) {
        case 'critical':
        case 'error':
          return 'border-red-200 bg-red-50';
        case 'warning':
          return 'border-yellow-200 bg-yellow-50';
        case 'info':
          return 'border-blue-200 bg-blue-50';
        default:
          return 'border-gray-200 bg-gray-50';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`border rounded-lg p-4 ${getLevelColor(log.level)}`}
      >
        <div className="flex items-start gap-3">
          {getLevelIcon(log.level)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-900 capitalize">
                {log.action.replace(/_/g, ' ')}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            
            {log.userId && (
              <p className="text-sm text-gray-600 mb-1">
                사용자: {log.userId}
              </p>
            )}
            
            {log.ip && (
              <p className="text-sm text-gray-600 mb-1">
                IP: {log.ip}
              </p>
            )}
            
            {log.details && (
              <details className="text-sm text-gray-600">
                <summary className="cursor-pointer hover:text-gray-800">
                  상세 정보
                </summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-x-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </details>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              보안 대시보드
            </h1>
            <p className="text-gray-600">
              실시간 보안 상태 모니터링 및 위협 분석
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${autoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              자동 갱신 {autoRefresh ? 'ON' : 'OFF'}
            </button>
            
            <button
              onClick={exportSecurityReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              리포트 내보내기
            </button>
          </div>
        </div>
      </div>

      {/* 위협 수준 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className={`
          rounded-lg border-2 p-6
          ${threatLevel.level === 'critical' ? 'border-red-500 bg-red-50' :
            threatLevel.level === 'high' ? 'border-red-400 bg-red-50' :
            threatLevel.level === 'medium' ? 'border-yellow-400 bg-yellow-50' :
            'border-green-400 bg-green-50'
          }
        `}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                현재 위협 수준: 
                <span className={`ml-2 capitalize ${threatLevel.color}`}>
                  {threatLevel.level}
                </span>
              </h2>
              <p className="text-gray-700">{threatLevel.description}</p>
              <p className="text-sm text-gray-600 mt-1">
                보안 점수: {Math.max(0, 100 - threatLevel.score)}/100
              </p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${threatLevel.color}`}>
                {threatLevel.score}
              </div>
              <div className="text-sm text-gray-600">위험 점수</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 메트릭 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="총 이벤트"
          value={metrics.totalLogs}
          icon={Activity}
          color="text-blue-500"
        />
        <MetricCard
          title="로그인 성공"
          value={metrics.successfulLogins}
          icon={CheckCircle}
          color="text-green-500"
        />
        <MetricCard
          title="로그인 실패"
          value={metrics.failedLogins}
          icon={XCircle}
          color="text-red-500"
        />
        <MetricCard
          title="활성 사용자"
          value={metrics.activeUsers}
          icon={Users}
          color="text-purple-500"
        />
      </div>

      {/* 상세 메트릭 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="중요 이벤트"
          value={metrics.criticalEvents}
          icon={AlertTriangle}
          color="text-red-600"
        />
        <MetricCard
          title="경고 이벤트"
          value={metrics.warningEvents}
          icon={AlertTriangle}
          color="text-yellow-500"
        />
        <MetricCard
          title="정보 이벤트"
          value={metrics.infoEvents}
          icon={CheckCircle}
          color="text-blue-500"
        />
      </div>

      {/* 최근 보안 로그 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            최근 보안 이벤트
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            마지막 업데이트: {new Date(metrics.lastUpdate).toLocaleTimeString()}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">보안 데이터 로드 중...</span>
          </div>
        ) : securityLogs.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {securityLogs.map((log, index) => (
              <SecurityLogItem key={`${log.timestamp}-${index}`} log={log} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>보안 이벤트가 없습니다.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}