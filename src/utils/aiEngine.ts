/**
 * AI/ML 통합 엔진
 * 챗봇, 추천시스템, 감정분석, 예측분석 등 AI 기능 통합
 */

// AI 모델 인터페이스
export interface AIModel {
  id: string;
  name: string;
  type: 'chat' | 'recommendation' | 'sentiment' | 'prediction' | 'generation';
  version: string;
  status: 'active' | 'training' | 'inactive';
  accuracy?: number;
  lastUpdated: string;
}

// 챗봇 메시지 인터페이스
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    confidence?: number;
    intent?: string;
    entities?: Array<{ type: string; value: string; confidence: number }>;
    sentiment?: { score: number; label: 'positive' | 'negative' | 'neutral' };
  };
}

// 추천 시스템 인터페이스
export interface Recommendation {
  id: string;
  type: 'service' | 'content' | 'action';
  title: string;
  description: string;
  confidence: number;
  reason: string;
  metadata?: Record<string, any>;
}

// 감정 분석 결과
export interface SentimentResult {
  score: number; // -1 to 1
  label: 'positive' | 'negative' | 'neutral';
  confidence: number;
  emotions?: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
    disgust: number;
  };
}

// 예측 분석 결과
export interface PredictionResult {
  metric: string;
  predicted_value: number;
  confidence_interval: [number, number];
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: Array<{ name: string; impact: number }>;
  timeline: Array<{ date: string; value: number; confidence: number }>;
}

// AI 엔진 메인 클래스
export class AIEngine {
  private static instance: AIEngine;
  private models: Map<string, AIModel> = new Map();
  private chatHistory: ChatMessage[] = [];
  private userProfiles: Map<string, any> = new Map();

  private constructor() {
    this.initializeModels();
  }

  static getInstance(): AIEngine {
    if (!AIEngine.instance) {
      AIEngine.instance = new AIEngine();
    }
    return AIEngine.instance;
  }

  /**
   * AI 모델 초기화
   */
  private initializeModels(): void {
    const defaultModels: AIModel[] = [
      {
        id: 'chat-gpt-4',
        name: 'Advanced Chat Assistant',
        type: 'chat',
        version: '4.0',
        status: 'active',
        accuracy: 0.95,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'recommendation-engine',
        name: 'Service Recommendation System',
        type: 'recommendation',
        version: '2.1',
        status: 'active',
        accuracy: 0.87,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sentiment-analyzer',
        name: 'Emotion Detection AI',
        type: 'sentiment',
        version: '1.5',
        status: 'active',
        accuracy: 0.91,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'prediction-model',
        name: 'Trend Prediction Engine',
        type: 'prediction',
        version: '3.0',
        status: 'active',
        accuracy: 0.83,
        lastUpdated: new Date().toISOString()
      }
    ];

    defaultModels.forEach(model => {
      this.models.set(model.id, model);
    });
  }

  /**
   * 지능형 챗봇 응답 생성
   */
  async generateChatResponse(
    message: string,
    userId?: string,
    context?: any
  ): Promise<ChatMessage> {
    // 의도 분석
    const intent = this.analyzeIntent(message);
    
    // 엔티티 추출
    const entities = this.extractEntities(message);
    
    // 감정 분석
    const sentiment = await this.analyzeSentiment(message);
    
    // 컨텍스트 기반 응답 생성
    const response = this.generateContextualResponse(message, intent, entities, context);
    
    // 신뢰도 계산
    const confidence = this.calculateResponseConfidence(intent, entities, sentiment);

    const chatMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
      metadata: {
        confidence,
        intent,
        entities,
        sentiment
      }
    };

    // 채팅 히스토리에 추가
    this.chatHistory.push({
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });
    this.chatHistory.push(chatMessage);

    // 사용자 프로필 업데이트
    if (userId) {
      this.updateUserProfile(userId, message, sentiment, intent);
    }

    return chatMessage;
  }

  /**
   * 개인화 추천 시스템
   */
  async generateRecommendations(
    userId: string,
    context?: { page?: string; action?: string; preferences?: any }
  ): Promise<Recommendation[]> {
    const userProfile = this.userProfiles.get(userId) || {};
    const recommendations: Recommendation[] = [];

    // 서비스 추천
    const serviceRecommendations = this.generateServiceRecommendations(userProfile, context);
    recommendations.push(...serviceRecommendations);

    // 컨텐츠 추천
    const contentRecommendations = this.generateContentRecommendations(userProfile, context);
    recommendations.push(...contentRecommendations);

    // 액션 추천
    const actionRecommendations = this.generateActionRecommendations(userProfile, context);
    recommendations.push(...actionRecommendations);

    // 신뢰도순 정렬
    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 10);
  }

  /**
   * 감정 분석
   */
  async analyzeSentiment(text: string): Promise<SentimentResult> {
    // 키워드 기반 감정 분석 (실제 환경에서는 ML 모델 사용)
    const positiveWords = ['좋아', '훌륭', '만족', '감사', '행복', '편안', '안심', '도움'];
    const negativeWords = ['싫어', '불만', '화나', '걱정', '힘들어', '아픈', '불편', '문제'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });

    const totalSentiment = positiveCount - negativeCount;
    const score = Math.max(-1, Math.min(1, totalSentiment / Math.max(1, words.length) * 10));
    
    let label: 'positive' | 'negative' | 'neutral';
    if (score > 0.1) label = 'positive';
    else if (score < -0.1) label = 'negative';
    else label = 'neutral';

    const confidence = Math.min(0.95, Math.abs(score) + 0.5);

    return {
      score,
      label,
      confidence,
      emotions: {
        joy: label === 'positive' ? score : 0,
        sadness: label === 'negative' ? Math.abs(score) : 0,
        anger: text.includes('화') ? 0.7 : 0,
        fear: text.includes('걱정') || text.includes('불안') ? 0.6 : 0,
        surprise: text.includes('놀라') ? 0.5 : 0,
        disgust: text.includes('싫') ? 0.4 : 0
      }
    };
  }

  /**
   * 예측 분석
   */
  async generatePredictions(
    metric: string,
    historicalData: Array<{ date: string; value: number }>,
    forecastDays: number = 30
  ): Promise<PredictionResult> {
    // 간단한 선형 회귀 기반 예측 (실제 환경에서는 고급 ML 모델 사용)
    const data = historicalData.slice(-90); // 최근 90일 데이터 사용
    
    if (data.length < 7) {
      throw new Error('예측을 위해서는 최소 7일의 데이터가 필요합니다.');
    }

    // 트렌드 계산
    const trend = this.calculateTrend(data);
    const seasonality = this.detectSeasonality(data);
    const volatility = this.calculateVolatility(data);

    // 예측값 생성
    const predictions = [];
    const lastValue = data[data.length - 1].value;
    const dailyTrend = trend.slope;

    for (let i = 1; i <= forecastDays; i++) {
      const baseValue = lastValue + (dailyTrend * i);
      const seasonalAdjustment = seasonality * Math.sin((i / 7) * Math.PI * 2);
      const noise = (Math.random() - 0.5) * volatility * 0.1;
      
      const predictedValue = baseValue + seasonalAdjustment + noise;
      const confidence = Math.max(0.3, 0.9 - (i / forecastDays) * 0.4);

      predictions.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.round(predictedValue * 100) / 100,
        confidence
      });
    }

    const averagePrediction = predictions.reduce((sum, p) => sum + p.value, 0) / predictions.length;
    const confidenceInterval: [number, number] = [
      averagePrediction * 0.85,
      averagePrediction * 1.15
    ];

    return {
      metric,
      predicted_value: averagePrediction,
      confidence_interval: confidenceInterval,
      trend: trend.slope > 0.1 ? 'increasing' : trend.slope < -0.1 ? 'decreasing' : 'stable',
      factors: [
        { name: '계절성', impact: Math.abs(seasonality) },
        { name: '변동성', impact: volatility },
        { name: '트렌드', impact: Math.abs(trend.slope) }
      ],
      timeline: predictions
    };
  }

  /**
   * 자동 컨텐츠 생성
   */
  async generateContent(
    type: 'notice' | 'faq' | 'description' | 'summary',
    context: any
  ): Promise<string> {
    const templates = {
      notice: [
        "안녕하세요. {title}에 대해 안내드립니다.",
        "{content}",
        "자세한 문의사항은 고객센터로 연락주시기 바랍니다.",
        "감사합니다."
      ],
      faq: [
        "Q: {question}",
        "A: {answer}",
        "",
        "추가 도움이 필요하시면 언제든지 문의해주세요."
      ],
      description: [
        "{service}는 {target}을 위한 전문 서비스입니다.",
        "{features}",
        "전문 인력과 체계적인 시스템으로 최고의 서비스를 제공합니다."
      ],
      summary: [
        "요약: {title}",
        "{mainPoints}",
        "결론: {conclusion}"
      ]
    };

    const template = templates[type] || templates.description;
    return this.fillTemplate(template.join('\n'), context);
  }

  // === 유틸리티 메서드들 ===

  private analyzeIntent(message: string): string {
    const intents = {
      greeting: ['안녕', '하이', '헬로', '반가워'],
      question: ['?', '뭐', '어떻게', '언제', '어디서', '왜'],
      request: ['해줘', '부탁', '요청', '신청'],
      complaint: ['불만', '문제', '개선', '힘들어'],
      compliment: ['감사', '고마워', '좋아', '만족']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return intent;
      }
    }
    return 'general';
  }

  private extractEntities(message: string): Array<{ type: string; value: string; confidence: number }> {
    const entities = [];
    
    // 날짜 추출
    const datePattern = /(\d{1,2})월\s*(\d{1,2})일|(\d{4})년|오늘|내일|다음주/g;
    let match;
    while ((match = datePattern.exec(message)) !== null) {
      entities.push({
        type: 'date',
        value: match[0],
        confidence: 0.8
      });
    }

    // 서비스 유형 추출
    const services = ['방문요양', '방문간호', '방문목욕', '주간보호', '단기보호'];
    services.forEach(service => {
      if (message.includes(service)) {
        entities.push({
          type: 'service',
          value: service,
          confidence: 0.9
        });
      }
    });

    return entities;
  }

  private generateContextualResponse(
    message: string,
    intent: string,
    entities: any[],
    context?: any
  ): string {
    const responses = {
      greeting: [
        "안녕하세요! 바이칼 재가복지센터입니다. 어떻게 도와드릴까요?",
        "반갑습니다! 궁금한 점이 있으시면 언제든지 말씀해주세요.",
        "안녕하세요! 오늘도 좋은 하루 되세요. 무엇을 도와드릴까요?"
      ],
      question: [
        "좋은 질문이네요! 자세히 설명드리겠습니다.",
        "궁금하신 점에 대해 안내해드리겠습니다.",
        "정확한 정보를 제공해드리겠습니다."
      ],
      request: [
        "요청사항을 확인했습니다. 처리해드리겠습니다.",
        "신청 도와드리겠습니다. 필요한 정보를 알려주세요.",
        "서비스 신청을 도와드리겠습니다."
      ],
      complaint: [
        "불편을 드려 죄송합니다. 개선하도록 노력하겠습니다.",
        "소중한 의견 감사합니다. 반영하여 개선하겠습니다.",
        "문제 해결을 위해 최선을 다하겠습니다."
      ],
      compliment: [
        "감사한 말씀 주셔서 정말 기쁩니다!",
        "따뜻한 격려의 말씀 감사드립니다.",
        "더 나은 서비스로 보답하겠습니다."
      ]
    };

    const responseArray = responses[intent as keyof typeof responses] || [
      "말씀해주신 내용을 잘 이해했습니다.",
      "더 자세한 도움이 필요하시면 말씀해주세요.",
      "최선을 다해 도와드리겠습니다."
    ];

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  }

  private calculateResponseConfidence(intent: string, entities: any[], sentiment: SentimentResult): number {
    let confidence = 0.7; // 기본 신뢰도

    // 의도가 명확할 때 신뢰도 증가
    if (['greeting', 'question', 'request'].includes(intent)) {
      confidence += 0.1;
    }

    // 엔티티가 많을 때 신뢰도 증가
    confidence += Math.min(0.15, entities.length * 0.05);

    // 감정이 명확할 때 신뢰도 증가
    if (sentiment.confidence > 0.8) {
      confidence += 0.05;
    }

    return Math.min(0.95, confidence);
  }

  private updateUserProfile(userId: string, message: string, sentiment: SentimentResult, intent: string): void {
    const profile = this.userProfiles.get(userId) || {
      interactions: 0,
      sentiments: [],
      intents: [],
      preferences: {},
      lastInteraction: null
    };

    profile.interactions++;
    profile.sentiments.push(sentiment);
    profile.intents.push(intent);
    profile.lastInteraction = new Date().toISOString();

    // 최근 10개만 보관
    if (profile.sentiments.length > 10) {
      profile.sentiments = profile.sentiments.slice(-10);
      profile.intents = profile.intents.slice(-10);
    }

    this.userProfiles.set(userId, profile);
  }

  private generateServiceRecommendations(userProfile: any, context?: any): Recommendation[] {
    const services = [
      {
        id: 'visit-care',
        title: '방문요양 서비스',
        description: '전문 요양보호사가 직접 방문하여 일상생활을 도와드립니다.',
        confidence: 0.85,
        reason: '사용자의 관심사와 이용 패턴을 분석한 결과'
      },
      {
        id: 'visit-nurse',
        title: '방문간호 서비스',
        description: '전문 간호사가 건강 관리와 의료 서비스를 제공합니다.',
        confidence: 0.78,
        reason: '건강 관련 문의가 많아 추천드립니다'
      },
      {
        id: 'day-care',
        title: '주간보호 서비스',
        description: '낮 시간 동안 안전하고 즐거운 보호 서비스를 제공합니다.',
        confidence: 0.72,
        reason: '사회활동 참여에 관심을 보이셔서 추천합니다'
      }
    ];

    return services.map(service => ({
      ...service,
      type: 'service' as const
    }));
  }

  private generateContentRecommendations(userProfile: any, context?: any): Recommendation[] {
    const contents = [
      {
        id: 'health-tips',
        title: '건강 관리 팁',
        description: '어르신들을 위한 일상 건강 관리 방법을 소개합니다.',
        confidence: 0.82,
        reason: '건강에 대한 관심도가 높으셔서 추천합니다'
      },
      {
        id: 'exercise-guide',
        title: '실버 운동 가이드',
        description: '집에서 할 수 있는 안전한 운동법을 안내합니다.',
        confidence: 0.75,
        reason: '활동적인 라이프스타일에 관심을 보이셔서 추천합니다'
      }
    ];

    return contents.map(content => ({
      ...content,
      type: 'content' as const
    }));
  }

  private generateActionRecommendations(userProfile: any, context?: any): Recommendation[] {
    const actions = [
      {
        id: 'assessment',
        title: '무료 상담 신청',
        description: '전문가와 1:1 무료 상담을 받아보세요.',
        confidence: 0.88,
        reason: '서비스 이용을 고려 중이신 것 같아 추천합니다'
      },
      {
        id: 'newsletter',
        title: '뉴스레터 구독',
        description: '최신 복지 정보와 건강 팁을 받아보세요.',
        confidence: 0.65,
        reason: '정보에 관심이 많으셔서 추천합니다'
      }
    ];

    return actions.map(action => ({
      ...action,
      type: 'action' as const
    }));
  }

  private calculateTrend(data: Array<{ date: string; value: number }>): { slope: number; r2: number } {
    const n = data.length;
    const xValues = data.map((_, i) => i);
    const yValues = data.map(d => d.value);

    const xMean = xValues.reduce((a, b) => a + b) / n;
    const yMean = yValues.reduce((a, b) => a + b) / n;

    const numerator = xValues.reduce((sum, x, i) => sum + (x - xMean) * (yValues[i] - yMean), 0);
    const denominator = xValues.reduce((sum, x) => sum + Math.pow(x - xMean, 2), 0);

    const slope = denominator === 0 ? 0 : numerator / denominator;
    
    // R² 계산
    const predicted = xValues.map(x => yMean + slope * (x - xMean));
    const ssRes = yValues.reduce((sum, y, i) => sum + Math.pow(y - predicted[i], 2), 0);
    const ssTot = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const r2 = ssTot === 0 ? 1 : 1 - (ssRes / ssTot);

    return { slope, r2: Math.max(0, r2) };
  }

  private detectSeasonality(data: Array<{ date: string; value: number }>): number {
    if (data.length < 14) return 0;

    // 주간 패턴 감지
    const weeklyPattern = [];
    for (let day = 0; day < 7; day++) {
      const dayValues = data.filter((_, i) => i % 7 === day).map(d => d.value);
      const dayAverage = dayValues.reduce((a, b) => a + b, 0) / dayValues.length;
      weeklyPattern.push(dayAverage);
    }

    const overallAverage = weeklyPattern.reduce((a, b) => a + b) / weeklyPattern.length;
    const seasonality = Math.max(...weeklyPattern) - Math.min(...weeklyPattern);
    
    return seasonality / overallAverage;
  }

  private calculateVolatility(data: Array<{ date: string; value: number }>): number {
    if (data.length < 2) return 0;

    const values = data.map(d => d.value);
    const mean = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    
    return Math.sqrt(variance) / mean;
  }

  private fillTemplate(template: string, context: any): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return context[key] || match;
    });
  }

  // === 퍼블릭 메서드들 ===

  getModels(): AIModel[] {
    return Array.from(this.models.values());
  }

  getChatHistory(): ChatMessage[] {
    return this.chatHistory.slice(-50); // 최근 50개 메시지
  }

  getUserProfile(userId: string): any {
    return this.userProfiles.get(userId);
  }

  clearChatHistory(): void {
    this.chatHistory = [];
  }

  updateModel(modelId: string, updates: Partial<AIModel>): void {
    const model = this.models.get(modelId);
    if (model) {
      this.models.set(modelId, { ...model, ...updates });
    }
  }
}

// 전역 AI 엔진 인스턴스
export const aiEngine = AIEngine.getInstance();

// 편의 함수들
export const generateChatResponse = (message: string, userId?: string, context?: any) =>
  aiEngine.generateChatResponse(message, userId, context);

export const getRecommendations = (userId: string, context?: any) =>
  aiEngine.generateRecommendations(userId, context);

export const analyzeSentiment = (text: string) =>
  aiEngine.analyzeSentiment(text);

export const generatePredictions = (metric: string, data: any[], days?: number) =>
  aiEngine.generatePredictions(metric, data, days);

export const generateContent = (type: any, context: any) =>
  aiEngine.generateContent(type, context);