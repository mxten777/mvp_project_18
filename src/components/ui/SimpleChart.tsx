import React from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'doughnut';
  height?: number;
  title?: string;
  className?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  type,
  height = 200,
  title,
  className = ''
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];

  const renderBarChart = () => (
    <div className="flex items-end justify-between gap-1 sm:gap-2 h-full px-2 sm:px-4 mobile-chart">
      {data.map((item, index) => {
        const heightPercentage = (item.value / maxValue) * 100;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1 h-full min-w-0">
            <div className="flex-1 flex items-end justify-center w-full">
              <motion.div
                className={`${item.color || colors[index % colors.length]} rounded-t-lg w-full relative group cursor-pointer`}
                style={{ minWidth: '20px', maxWidth: '60px' }}
                initial={{ height: 0 }}
                animate={{ height: `${heightPercentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
              >
                {/* 툴팁 */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-secondary-800 dark:bg-white text-white dark:text-secondary-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {item.value.toLocaleString()}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary-800 dark:border-t-white"></div>
                </div>
              </motion.div>
            </div>
            <div className="text-xs sm:text-sm text-center text-secondary-600 dark:text-secondary-400 mt-1 sm:mt-2 font-medium mobile-text truncate">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80; // 80%까지만 사용해서 여백 확보
      return { x, y, value: item.value, label: item.label };
    });

    const pathData = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    return (
      <div className="relative w-full h-full p-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* 그리드 라인 */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-secondary-300 dark:text-secondary-600"
            />
          ))}
          
          {/* 라인 */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          
          {/* 포인트들 */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="currentColor"
              className="text-primary-600 cursor-pointer hover:text-primary-700"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.5 }}
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </motion.circle>
          ))}
        </svg>
        
        {/* X축 라벨 */}
        <div className="absolute bottom-0 left-4 right-4 flex justify-between">
          {data.map((item, index) => (
            <div
              key={index}
              className="text-xs text-secondary-600 dark:text-secondary-400 font-medium"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDoughnutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    const segments = data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      return {
        ...item,
        percentage,
        angle,
        startAngle,
        color: item.color || colors[index % colors.length]
      };
    });

    const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
      const start = {
        x: centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180),
        y: centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
      };
      const end = {
        x: centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180),
        y: centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)
      };
      
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
      
      return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
    };

    return (
      <div className="flex items-center gap-8 h-full p-4">
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                d={createArcPath(80, 80, 60, segment.startAngle, segment.startAngle + segment.angle)}
                fill="currentColor"
                className={segment.color.replace('bg-', 'text-')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                style={{ transformOrigin: '80px 80px' }}
              />
            ))}
            {/* 중앙 원 */}
            <circle cx="80" cy="80" r="25" fill="currentColor" className="text-white dark:text-secondary-800" />
          </svg>
          
          {/* 중앙 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xl font-bold text-secondary-800 dark:text-secondary-200">
              {total.toLocaleString()}
            </div>
            <div className="text-xs text-secondary-600 dark:text-secondary-400">
              총합
            </div>
          </div>
        </div>
        
        {/* 범례 */}
        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className={`w-4 h-4 rounded-full ${segment.color}`} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                    {segment.label}
                  </span>
                  <span className="text-xs text-secondary-600 dark:text-secondary-400">
                    {segment.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-secondary-500 dark:text-secondary-500">
                  {segment.value.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700 shadow-lg mobile-safe ${className}`}>
      {title && (
        <div className="p-3 sm:p-4 border-b border-secondary-200 dark:border-secondary-700">
          <h3 className="text-base sm:text-lg font-semibold text-secondary-800 dark:text-secondary-200 mobile-text">
            {title}
          </h3>
        </div>
      )}
      
      <div style={{ height: `${Math.max(150, height)}px` }} className="relative mobile-chart">
        {type === 'bar' && renderBarChart()}
        {type === 'line' && renderLineChart()}
        {type === 'doughnut' && renderDoughnutChart()}
      </div>
    </div>
  );
};

export default SimpleChart;