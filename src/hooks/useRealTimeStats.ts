import { useState, useEffect, useCallback } from 'react';

export interface RealTimeStats {
  activeUsers: number;
  consultationsToday: number;
  servicesInProgress: number;
  satisfactionRate: number;
  totalServiceHours: number;
  emergencyRequests: number;
  regionalStats: {
    region: string;
    activeServices: number;
    growth: number;
  }[];
  hourlyConsultations: {
    hour: string;
    count: number;
  }[];
}

export const useRealTimeStats = () => {
  const [stats, setStats] = useState<RealTimeStats>({
    activeUsers: 247,
    consultationsToday: 32,
    servicesInProgress: 156,
    satisfactionRate: 97.8,
    totalServiceHours: 2847,
    emergencyRequests: 3,
    regionalStats: [
      { region: '서울특별시', activeServices: 89, growth: 12.5 },
      { region: '경기도', activeServices: 67, growth: 8.3 },
      { region: '인천광역시', activeServices: 23, growth: 15.2 },
      { region: '기타 지역', activeServices: 18, growth: 6.8 }
    ],
    hourlyConsultations: [
      { hour: '09:00', count: 5 },
      { hour: '10:00', count: 8 },
      { hour: '11:00', count: 12 },
      { hour: '12:00', count: 7 },
      { hour: '13:00', count: 4 },
      { hour: '14:00', count: 9 },
      { hour: '15:00', count: 11 },
      { hour: '16:00', count: 6 }
    ]
  });

  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // 실시간 데이터 업데이트 시뮬레이션
  const updateStats = useCallback(() => {
    setStats(prevStats => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // 랜덤 변화량 생성 (실제 환경에서는 API 호출)
      const getRandomChange = (current: number, maxChange: number = 5) => {
        const change = Math.floor(Math.random() * maxChange * 2) - maxChange;
        return Math.max(0, current + change);
      };

      // 만족도는 작은 변화만
      const getSatisfactionChange = (current: number) => {
        const change = (Math.random() - 0.5) * 0.5; // ±0.25
        return Math.min(100, Math.max(90, current + change));
      };

      // 시간별 상담 데이터 업데이트
      const updateHourlyData = (hourlyData: typeof prevStats.hourlyConsultations) => {
        return hourlyData.map(item => {
          const hour = parseInt(item.hour.split(':')[0]);
          if (hour === currentHour) {
            return { ...item, count: getRandomChange(item.count, 2) };
          }
          return item;
        });
      };

      // 지역별 통계 업데이트
      const updateRegionalData = (regionalData: typeof prevStats.regionalStats) => {
        return regionalData.map(region => ({
          ...region,
          activeServices: getRandomChange(region.activeServices, 3),
          growth: Math.max(0, region.growth + (Math.random() - 0.5) * 2)
        }));
      };

      return {
        activeUsers: getRandomChange(prevStats.activeUsers, 10),
        consultationsToday: getRandomChange(prevStats.consultationsToday, 3),
        servicesInProgress: getRandomChange(prevStats.servicesInProgress, 8),
        satisfactionRate: parseFloat(getSatisfactionChange(prevStats.satisfactionRate).toFixed(1)),
        totalServiceHours: getRandomChange(prevStats.totalServiceHours, 15),
        emergencyRequests: getRandomChange(prevStats.emergencyRequests, 1),
        regionalStats: updateRegionalData(prevStats.regionalStats),
        hourlyConsultations: updateHourlyData(prevStats.hourlyConsultations)
      };
    });
    
    setLastUpdate(new Date());
  }, []);

  // 초기 로딩 시뮬레이션
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // 실시간 업데이트 (5초마다)
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, [updateStats, isLoading]);

  // 활성 사용자 수는 더 자주 업데이트 (2초마다)
  useEffect(() => {
    if (isLoading) return;

    const activeUsersInterval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: Math.max(200, prev.activeUsers + Math.floor(Math.random() * 10) - 5)
      }));
    }, 2000);

    return () => clearInterval(activeUsersInterval);
  }, [isLoading]);

  return {
    stats,
    isLoading,
    lastUpdate,
    refreshStats: updateStats
  };
};