import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  MapIcon,
  ChartBarIcon,
  LanguageIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import LanguageSelector from './LanguageSelector';

interface RegionData {
  region: string;
  users: number;
  revenue: number;
  growth: number;
  languages: string[];
  timezone: string;
  currency: string;
}

interface LanguageStats {
  code: string;
  name: string;
  users: number;
  percentage: number;
  flag: string;
}

const GlobalizationDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);

  // 시뮬레이션 데이터 생성
  useEffect(() => {
    const regions: RegionData[] = [
      {
        region: 'Asia Pacific',
        users: 45620,
        revenue: 1250000,
        growth: 23.5,
        languages: ['ko', 'ja', 'zh-CN', 'en'],
        timezone: 'Asia/Seoul',
        currency: 'KRW'
      },
      {
        region: 'North America',
        users: 38940,
        revenue: 2180000,
        growth: 18.2,
        languages: ['en', 'es'],
        timezone: 'America/New_York',
        currency: 'USD'
      },
      {
        region: 'Europe',
        users: 52340,
        revenue: 1890000,
        growth: 15.8,
        languages: ['en', 'de', 'fr', 'es'],
        timezone: 'Europe/London',
        currency: 'EUR'
      },
      {
        region: 'Latin America',
        users: 28750,
        revenue: 650000,
        growth: 42.1,
        languages: ['es', 'pt', 'en'],
        timezone: 'America/Sao_Paulo',
        currency: 'USD'
      }
    ];

    const languages: LanguageStats[] = [
      { code: 'ko', name: '한국어', users: 34520, percentage: 28.5, flag: '🇰🇷' },
      { code: 'en', name: 'English', users: 45680, percentage: 37.8, flag: '🇺🇸' },
      { code: 'ja', name: '日本語', users: 18340, percentage: 15.2, flag: '🇯🇵' },
      { code: 'zh-CN', name: '简体中文', users: 12450, percentage: 10.3, flag: '🇨🇳' },
      { code: 'es', name: 'Español', users: 6890, percentage: 5.7, flag: '🇪🇸' },
      { code: 'de', name: 'Deutsch', users: 3020, percentage: 2.5, flag: '🇩🇪' }
    ];

    setRegionData(regions);
    setLanguageStats(languages);
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: currency,
      notation: 'compact'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(i18n.language, {
      notation: 'compact'
    }).format(num);
  };

  const tabs = [
    { id: 'overview', label: t('globalization.overview'), icon: GlobeAltIcon },
    { id: 'regions', label: t('globalization.regions'), icon: MapIcon },
    { id: 'languages', label: t('globalization.languages'), icon: LanguageIcon },
    { id: 'settings', label: t('globalization.settings'), icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <GlobeAltIcon className="w-8 h-8 text-blue-600" />
              {t('globalization.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {t('globalization.subtitle')}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <LanguageSelector />
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* 전체 사용자 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <UserGroupIcon className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t('globalization.totalUsers')}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {formatNumber(regionData.reduce((sum, region) => sum + region.users, 0))}
                </p>
              </div>

              {/* 총 수익 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t('globalization.totalRevenue')}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(regionData.reduce((sum, region) => sum + region.revenue, 0), 'USD')}
                </p>
              </div>

              {/* 지원 언어 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <LanguageIcon className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t('globalization.supportedLanguages')}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {languageStats.length}
                </p>
              </div>

              {/* 활성 지역 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MapIcon className="w-6 h-6 text-orange-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t('globalization.activeRegions')}
                  </h3>
                </div>
                <p className="text-3xl font-bold text-orange-600">
                  {regionData.length}
                </p>
              </div>
            </div>
          )}

          {selectedTab === 'regions' && (
            <div className="grid gap-6">
              {regionData.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {region.region}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('globalization.users')}
                          </p>
                          <p className="font-semibold text-blue-600">
                            {formatNumber(region.users)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('globalization.revenue')}
                          </p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(region.revenue, region.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('globalization.growth')}
                          </p>
                          <p className="font-semibold text-orange-600">
                            +{region.growth}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('globalization.timezone')}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {region.timezone.split('/')[1]}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {t('globalization.languages')}
                      </p>
                      <div className="flex gap-2">
                        {region.languages.map((lang) => {
                          const langStat = languageStats.find(l => l.code === lang);
                          return langStat ? (
                            <span key={lang} className="text-lg" title={langStat.name}>
                              {langStat.flag}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'languages' && (
            <div className="grid gap-4">
              {languageStats.map((lang, index) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {lang.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatNumber(lang.users)} {t('globalization.users')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <span className="font-semibold text-blue-600 min-w-[3rem]">
                        {lang.percentage}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('globalization.settingsTitle')}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('globalization.defaultLanguage')}
                  </label>
                  <LanguageSelector />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('globalization.dateFormat')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('globalization.timeFormat')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>12-hour</option>
                    <option>24-hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('globalization.currency')}
                  </label>
                  <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>KRW - Korean Won</option>
                    <option>JPY - Japanese Yen</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GlobalizationDashboard;