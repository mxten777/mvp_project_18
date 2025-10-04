/**
 * 고급 AI 챗봇 컴포넌트
 * 음성 인식, 감정 분석, 컨텍스트 이해 기능 포함
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  HeartIcon,
  SparklesIcon,
  UserIcon,
  CpuChipIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import { aiEngine, type ChatMessage, type SentimentResult } from '../utils/aiEngine';

interface SmartChatbotProps {
  userId?: string;
  onMessageSent?: (message: ChatMessage) => void;
  className?: string;
}

const SmartChatbot: React.FC<SmartChatbotProps> = ({ 
  userId = 'user', 
  onMessageSent,
  className = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState<SentimentResult | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // 음성 인식 초기화
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ko-KR';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    // 음성 합성 초기화
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // 초기 환영 메시지
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! 👋 바이칼 재가복지센터 AI 어시스턴트입니다. 궁금한 점이 있으시면 언제든지 말씀해 주세요!',
      timestamp: new Date().toISOString(),
      metadata: {
        confidence: 1.0,
        intent: 'greeting',
        entities: [],
        sentiment: { score: 0.8, label: 'positive', confidence: 0.9 }
      }
    };
    
    setMessages([welcomeMessage]);
    generateSuggestions();
  }, []);

  // 메시지 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateSuggestions = () => {
    const commonQuestions = [
      "서비스 이용 방법이 궁금해요",
      "비용은 얼마나 드나요?",
      "신청은 어떻게 하나요?",
      "어떤 서비스가 있나요?",
      "상담 예약을 하고 싶어요"
    ];
    setSuggestions(commonQuestions.slice(0, 3));
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || currentMessage.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // 감정 분석
      const sentiment = await aiEngine.analyzeSentiment(text);
      setCurrentSentiment(sentiment);

      // AI 응답 생성
      const response = await aiEngine.generateChatResponse(text, userId, {
        sentiment,
        previousMessages: messages.slice(-5)
      });

      // 타이핑 효과 시뮬레이션
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, response]);
        
        // 음성으로 응답 읽기 (선택적)
        if (response.content.length < 100) {
          speakMessage(response.content);
        }

        onMessageSent?.(response);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setIsTyping(false);
      
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if (synthRef.current && !isSpeaking) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentColor = (sentiment?: { score: number; label: string }) => {
    if (!sentiment) return 'text-gray-400';
    
    switch (sentiment.label) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getSentimentEmoji = (sentiment?: { score: number; label: string }) => {
    if (!sentiment) return '😐';
    
    switch (sentiment.label) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      default: return '😐';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CpuChipIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI 어시스턴트</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              지금 온라인 • 
              {currentSentiment && (
                <span className={`ml-1 ${getSentimentColor(currentSentiment)}`}>
                  {getSentimentEmoji(currentSentiment)}
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* 음성 제어 버튼 */}
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="음성 중지"
            >
              <StopIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => speakMessage("안녕하세요! 무엇을 도와드릴까요?")}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="음성으로 인사"
            >
              <SpeakerWaveIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {/* 아바타 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'user' ? (
                    <UserIcon className="h-4 w-4 text-white" />
                  ) : (
                    <SparklesIcon className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* 메시지 버블 */}
                <div className={`rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* 메타데이터 */}
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{formatTimestamp(message.timestamp)}</span>
                    {message.metadata && (
                      <div className="flex items-center space-x-2">
                        {message.metadata.sentiment && (
                          <span className="flex items-center">
                            <HeartIcon className="h-3 w-3 mr-1" />
                            {getSentimentEmoji(message.metadata.sentiment)}
                          </span>
                        )}
                        {message.metadata.confidence && (
                          <span>
                            {(message.metadata.confidence * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 타이핑 인디케이터 */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 제안 메시지 */}
      {suggestions.length > 0 && messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 입력 영역 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {/* 음성 입력 버튼 */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={isListening ? "음성 입력 중지" : "음성 입력 시작"}
            disabled={isLoading}
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>

          {/* 텍스트 입력 */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder={isListening ? "음성을 듣고 있습니다..." : "메시지를 입력하세요..."}
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              disabled={isLoading || isListening}
            />
            
            {/* 음성 입력 인디케이터 */}
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* 전송 버튼 */}
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !currentMessage.trim() || isListening}
            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="메시지 전송"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 상태 표시 */}
        {(isListening || isSpeaking) && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            {isListening && (
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                음성 입력 중...
              </span>
            )}
            {isSpeaking && (
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                음성 출력 중...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartChatbot;