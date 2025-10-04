/**
 * AI/ML 통합 대시보드
 * 챗봇, 추천시스템, 감정분석, 예측분석 등 AI 기능 통합 관리
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  HeartIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CpuChipIcon,
  BoltIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import {
  aiEngine,
  type ChatMessage,
  type Recommendation,
  type SentimentResult,
  type PredictionResult,
  type AIModel
} from '../utils/aiEngine';

interface AIDashboardProps {
  userId?: string;
}

const AIDashboard: React.FC<AIDashboardProps> = ({ userId = 'demo-user' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentResult | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'AI 개요', icon: CpuChipIcon },
    { id: 'chatbot', label: '지능형 챗봇', icon: ChatBubbleLeftRightIcon },
    { id: 'recommendations', label: '개인화 추천', icon: SparklesIcon },
    { id: 'sentiment', label: '감정 분석', icon: HeartIcon },
    { id: 'predictions', label: '예측 분석', icon: ChartBarIcon },
    { id: 'content', label: '컨텐츠 생성', icon: DocumentTextIcon }
  ];

  // 데이터 로딩
  useEffect(() => {
    loadAIData();
  }, [userId]);

  const loadAIData = async () => {
    setIsLoading(true);
    try {
      // AI 모델 정보 로드
      const models = aiEngine.getModels();
      setAiModels(models);

      // 추천 시스템 로드
      const recs = await aiEngine.generateRecommendations(userId, {
        page: 'dashboard',
        preferences: { health: true, social: true }
      });
      setRecommendations(recs);

      // 채팅 히스토리 로드
      const history = aiEngine.getChatHistory();
      setChatMessages(history);

      // 예측 데이터 생성 (샘플)
      const sampleData = generateSampleData();
      const pred = await aiEngine.generatePredictions('사용자_만족도', sampleData, 30);
      setPredictions([pred]);

    } catch (error) {
      console.error('AI 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSampleData = () => {
    const data = [];
    const baseDate = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toISOString().split('T')[0],
        value: 85 + Math.random() * 10 + Math.sin(i / 7) * 5
      });
    }
    return data;
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await aiEngine.generateChatResponse(
        currentMessage,
        userId,
        { source: 'dashboard' }
      );

      setChatMessages(prev => [...prev.slice(-20), {
        id: `user_${Date.now()}`,
        role: 'user',
        content: currentMessage,
        timestamp: new Date().toISOString()
      }, response]);

      // 감정 분석 업데이트
      const sentiment = await aiEngine.analyzeSentiment(currentMessage);
      setSentimentData(sentiment);

      setCurrentMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateContent = async (type: string) => {
    setIsLoading(true);
    try {
      const content = await aiEngine.generateContent(type as any, {
        title: '새로운 공지사항',
        content: '중요한 업데이트 내용입니다.',
        service: '방문요양',
        target: '어르신과 가족',
        features: '24시간 전문 케어, 개인 맞춤 서비스, 합리적 비용'
      });
      
      // 생성된 컨텐츠를 채팅에 표시
      setChatMessages(prev => [...prev, {
        id: `generated_${Date.now()}`,
        role: 'assistant',
        content: `생성된 ${type} 컨텐츠:\n\n${content}`,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('컨텐츠 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI 모델 상태 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiModels.map((model) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                {model.name}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                model.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {model.status}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>정확도</span>
                <span>{((model.accuracy || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: `${(model.accuracy || 0) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI 기능 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              지능형 챗봇
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            자연어 처리 기반 대화형 AI로 24시간 고객 상담 서비스를 제공합니다.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {chatMessages.length}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">총 대화</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              개인화 추천
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            사용자 행동 패턴을 분석하여 맞춤형 서비스와 컨텐츠를 추천합니다.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {recommendations.length}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">활성 추천</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <HeartIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              감정 분석
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            텍스트와 음성에서 감정을 인식하여 고객 만족도를 실시간 모니터링합니다.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {sentimentData ? (sentimentData.score * 100).toFixed(0) : '--'}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">긍정도</span>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderChatbot = () => (
    <div className="space-y-6">
      {/* 채팅 인터페이스 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <BoltIcon className="h-5 w-5 mr-2 text-blue-500" />
            AI 어시스턴트
          </h3>
        </div>
        
        {/* 메시지 목록 */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>AI 어시스턴트와 대화를 시작해보세요!</p>
            </div>
          ) : (
            chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.metadata && (
                    <div className="mt-2 text-xs opacity-70">
                      신뢰도: {(message.metadata.confidence * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* 메시지 입력 */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !currentMessage.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {rec.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {rec.description}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                rec.type === 'service' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : rec.type === 'content'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              }`}>
                {rec.type}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">신뢰도</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {(rec.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${rec.confidence * 100}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                추천 이유: {rec.reason}
              </p>
              
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                자세히 보기
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSentiment = () => (
    <div className="space-y-6">
      {sentimentData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 전체 감정 점수 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              전체 감정 분석
            </h4>
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${
                sentimentData.label === 'positive' ? 'text-green-500' :
                sentimentData.label === 'negative' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {(sentimentData.score * 100).toFixed(0)}
              </div>
              <div className="text-gray-500 dark:text-gray-400 mb-4">감정 점수</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                sentimentData.label === 'positive' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : sentimentData.label === 'negative'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {sentimentData.label === 'positive' ? '긍정적' : 
                 sentimentData.label === 'negative' ? '부정적' : '중립적'}
              </div>
            </div>
          </div>

          {/* 세부 감정 분석 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              세부 감정 분석
            </h4>
            {sentimentData.emotions && (
              <div className="space-y-3">
                {Object.entries(sentimentData.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {emotion}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <HeartIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>감정 분석 데이터가 없습니다. 메시지를 보내보세요!</p>
        </div>
      )}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-6">
      {predictions.map((prediction) => (
        <div key={prediction.metric} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {prediction.metric} 예측
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {prediction.predicted_value.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">예측값</div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                prediction.trend === 'increasing' ? 'text-green-500' :
                prediction.trend === 'decreasing' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {prediction.trend === 'increasing' ? '↗' :
                 prediction.trend === 'decreasing' ? '↘' : '→'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">트렌드</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {((prediction.confidence_interval[1] - prediction.confidence_interval[0]) / 2).toFixed(1)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">변동폭</div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 dark:text-white">주요 영향 요인</h5>
            {prediction.factors.map((factor) => (
              <div key={factor.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {factor.name}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${factor.impact * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {(factor.impact * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContentGeneration = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI 컨텐츠 생성
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'notice', label: '공지사항', icon: DocumentTextIcon, color: 'blue' },
            { type: 'faq', label: 'FAQ', icon: EyeIcon, color: 'green' },
            { type: 'description', label: '서비스 설명', icon: SparklesIcon, color: 'purple' },
            { type: 'summary', label: '요약', icon: ChartBarIcon, color: 'orange' }
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => handleGenerateContent(item.type)}
              disabled={isLoading}
              className={`p-4 rounded-lg border-2 border-dashed border-${item.color}-300 dark:border-${item.color}-600 hover:border-${item.color}-500 dark:hover:border-${item.color}-400 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <item.icon className={`h-8 w-8 mx-auto mb-2 text-${item.color}-500 group-hover:text-${item.color}-600`} />
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {item.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                AI 생성
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 <strong>팁:</strong> 위 버튼을 클릭하면 AI가 해당 유형의 컨텐츠를 자동으로 생성합니다. 
            생성된 컨텐츠는 채팅 창에서 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI/ML 통합 대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            인공지능과 머신러닝 기술로 스마트한 서비스를 제공합니다
          </p>
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
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-900 dark:text-white">AI 처리 중...</span>
            </div>
          </div>
        )}

        {/* 탭 컨텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'chatbot' && renderChatbot()}
            {activeTab === 'recommendations' && renderRecommendations()}
            {activeTab === 'sentiment' && renderSentiment()}
            {activeTab === 'predictions' && renderPredictions()}
            {activeTab === 'content' && renderContentGeneration()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIDashboard;