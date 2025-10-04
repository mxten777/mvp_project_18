import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIChatbotService } from '../services/AIChatbotService';
import type { ChatMessage, QuickReply } from '../services/AIChatbotService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatbotService = new AIChatbotService();

  useEffect(() => {
    // 초기 인사 메시지
    const welcomeResponse = chatbotService.generateResponse('안녕하세요');
    setMessages([welcomeResponse.message]);
    setQuickReplies(welcomeResponse.quickReplies || []);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, isQuickReply = false) => {
    if (!content.trim()) return;

    // 사용자 메시지 추가
    if (!isQuickReply) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, userMessage]);
    }

    setInputValue('');
    setIsTyping(true);
    setQuickReplies([]);

    // AI 응답 시뮬레이션 (타이핑 지연)
    setTimeout(() => {
      const response = chatbotService.generateResponse(content);
      setMessages(prev => [...prev, response.message]);
      setQuickReplies(response.quickReplies || []);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    // 퀵 리플라이를 사용자 메시지로 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: reply.text,
      sender: 'user',
      timestamp: new Date(),
      type: 'quick_reply'
    };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    setQuickReplies([]);

    // AI 응답
    setTimeout(() => {
      const response = chatbotService.handleQuickReply(reply.action);
      setMessages(prev => [...prev, response.message]);
      setQuickReplies(response.quickReplies || []);
      setIsTyping(false);
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isBot = message.sender === 'bot';
    const urgency = message.metadata?.urgency;
    
    return (
      <motion.div
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex items-end gap-2 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
          {isBot && (
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              🤖
            </motion.div>
          )}
          
          <div className="flex flex-col">
            <motion.div
              className={`px-4 py-3 rounded-2xl ${
                isBot
                  ? `bg-white dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 shadow-sm ${
                      urgency === 'high' ? 'border-red-300 dark:border-red-600' : ''
                    }`
                  : 'bg-primary-500 text-white shadow-md'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`text-sm leading-relaxed ${
                isBot ? 'text-secondary-800 dark:text-secondary-200' : 'text-white'
              }`}>
                {message.content.split('\n').map((line, index) => {
                  // 볼드 텍스트 처리
                  if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <div key={index} className="mb-1">
                        {parts.map((part, partIndex) => 
                          partIndex % 2 === 1 ? (
                            <strong key={partIndex} className="font-bold">{part}</strong>
                          ) : (
                            <span key={partIndex}>{part}</span>
                          )
                        )}
                      </div>
                    );
                  }
                  return <div key={index} className="mb-1">{line}</div>;
                })}
              </div>
              
              {message.type === 'service_info' && (
                <div className="mt-2 pt-2 border-t border-secondary-200 dark:border-secondary-600">
                  <div className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>서비스 정보</span>
                  </div>
                </div>
              )}
            </motion.div>
            
            <div className={`text-xs text-secondary-500 dark:text-secondary-400 mt-1 px-2 ${
              isBot ? 'text-left' : 'text-right'
            }`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const TypingIndicator: React.FC = () => (
    <motion.div
      className="flex justify-start mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          🤖
        </div>
        <div className="bg-white dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 rounded-2xl px-4 py-3">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-secondary-400 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (!isVisible) {
    return (
      <motion.button
        data-chat-trigger
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-50 hover:shadow-xl transition-shadow"
        onClick={() => setIsVisible(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        💬
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${
        isMinimized ? 'w-80' : 'w-96'
      } ${isMinimized ? 'h-16' : 'h-[500px]'} bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl border border-secondary-200 dark:border-secondary-700 overflow-hidden`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
            🤖
          </div>
          <div>
            <div className="text-white font-semibold text-sm">AI 상담사 소피아</div>
            <div className="text-white/80 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              온라인
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/80 hover:text-white p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              {isMinimized ? (
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              ) : (
                <path d="M6 9l6 6 6-6"/>
              )}
            </svg>
          </motion.button>
          
          <motion.button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </motion.button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 h-[340px] bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/50">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>

          {/* 퀵 리플라이 */}
          <AnimatePresence>
            {quickReplies.length > 0 && (
              <motion.div
                className="px-4 py-2 border-t border-secondary-200 dark:border-secondary-700"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 text-sm border border-secondary-300 dark:border-secondary-600 rounded-xl bg-white dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isTyping}
              />
              
              <motion.button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="px-3 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChatInterface;