import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import QuizResult from './QuizResult';

interface Question {
  id: string;
  question: string;
  subtitle?: string;
  options: { value: string; label: string; icon?: string; description?: string }[];
  type: 'single' | 'multiple';
}

interface UserProfile {
  careLevel: 'light' | 'moderate' | 'intensive';
  services: string[];
  urgency: 'immediate' | 'within_week' | 'within_month';
  location?: string;
}

const PersonalizationQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 'careLevel',
      question: '어르신의 현재 일상생활 수행 능력은 어떠신가요?',
      subtitle: '가장 가까운 상태를 선택해 주세요',
      type: 'single',
      options: [
        { 
          value: 'light', 
          label: '대부분 혼자서 가능', 
          icon: '🚶',
          description: '독립적인 생활이 가능하지만 가끔 도움이 필요해요'
        },
        { 
          value: 'moderate', 
          label: '부분적으로 도움 필요', 
          icon: '🤝',
          description: '일상생활의 일부분에서 도움이 필요해요'
        },
        { 
          value: 'intensive', 
          label: '전반적인 도움 필요', 
          icon: '🏥',
          description: '대부분의 일상생활에서 도움이 필요해요'
        }
      ]
    },
    {
      id: 'services',
      question: '어떤 서비스가 가장 필요하신가요?',
      subtitle: '필요한 서비스를 모두 선택해 주세요 (복수 선택 가능)',
      type: 'multiple',
      options: [
        { 
          value: 'nursing', 
          label: '방문간호', 
          icon: '👩‍⚕️',
          description: '건강관리, 투약관리, 상처처치 등'
        },
        { 
          value: 'care', 
          label: '방문요양', 
          icon: '🏠',
          description: '신체활동 지원, 가사지원, 일상생활 도움'
        },
        { 
          value: 'bathing', 
          label: '방문목욕', 
          icon: '🛁',
          description: '전문 목욕 서비스 및 개인위생 관리'
        },
        { 
          value: 'daycare', 
          label: '주야간보호', 
          icon: '🌅',
          description: '낮시간 또는 야간 돌봄 서비스'
        }
      ]
    },
    {
      id: 'urgency',
      question: '서비스 시작 희망 시기는 언제인가요?',
      subtitle: '상황에 맞는 시기를 선택해 주세요',
      type: 'single',
      options: [
        { 
          value: 'immediate', 
          label: '즉시 필요해요', 
          icon: '🚨',
          description: '응급상황이거나 당장 도움이 필요한 경우'
        },
        { 
          value: 'within_week', 
          label: '1주일 이내', 
          icon: '📅',
          description: '가능한 빠른 시일 내에 시작하고 싶어요'
        },
        { 
          value: 'within_month', 
          label: '1개월 이내', 
          icon: '📆',
          description: '충분한 준비 시간을 두고 시작하고 싶어요'
        }
      ]
    },
    {
      id: 'location',
      question: '서비스 제공 지역은 어디인가요?',
      subtitle: '정확한 서비스 안내를 위해 필요해요',
      type: 'single',
      options: [
        { value: 'seoul', label: '서울특별시', icon: '🏙️' },
        { value: 'gyeonggi', label: '경기도', icon: '🏘️' },
        { value: 'incheon', label: '인천광역시', icon: '✈️' },
        { value: 'other', label: '기타 지역', icon: '📍' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string, isMultiple: boolean) => {
    setAnswers(prev => {
      if (isMultiple) {
        const current = prev[questionId] || [];
        const newAnswers = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [value] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const generateUserProfile = (): UserProfile => {
    return {
      careLevel: (answers.careLevel?.[0] as UserProfile['careLevel']) || 'light',
      services: answers.services || [],
      urgency: (answers.urgency?.[0] as UserProfile['urgency']) || 'within_month',
      location: answers.location?.[0]
    };
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleBookConsultation = () => {
    // 상담 예약 로직 (실제로는 API 호출)
    alert('상담 예약이 접수되었습니다! 24시간 내 연락드리겠습니다.');
  };

  if (showResult) {
    return (
      <QuizResult 
        profile={generateUserProfile()}
        onStartOver={handleStartOver}
        onBookConsultation={handleBookConsultation}
      />
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswers = answers[currentQ.id] || [];
  const isAnswered = currentAnswers.length > 0;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 진행률 표시 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            진행률: {currentQuestion + 1}/{questions.length}
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-secondary-800 rounded-3xl p-8 shadow-xl border border-secondary-200 dark:border-secondary-700"
        >
          {/* 질문 헤더 */}
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl font-bold text-secondary-800 dark:text-secondary-100 mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentQ.question}
            </motion.h2>
            {currentQ.subtitle && (
              <motion.p
                className="text-lg text-secondary-600 dark:text-secondary-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentQ.subtitle}
              </motion.p>
            )}
          </div>

          {/* 선택지들 */}
          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => {
              const isSelected = currentAnswers.includes(option.value);
              
              return (
                <motion.button
                  key={option.value}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-[1.02] ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg'
                      : 'border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, option.value, currentQ.type === 'multiple')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    {option.icon && (
                      <span className="text-3xl flex-shrink-0">{option.icon}</span>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xl font-bold ${
                          isSelected 
                            ? 'text-primary-700 dark:text-primary-300' 
                            : 'text-secondary-800 dark:text-secondary-200'
                        }`}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                      {option.description && (
                        <p className={`text-sm ${
                          isSelected 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-secondary-600 dark:text-secondary-400'
                        }`}>
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* 복수 선택 안내 */}
          {currentQ.type === 'multiple' && (
            <motion.div
              className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-primary-700 dark:text-primary-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">
                  여러 개 선택 가능합니다. 필요한 모든 서비스를 선택해 주세요.
                </span>
              </div>
            </motion.div>
          )}

          {/* 네비게이션 버튼들 */}
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                }
              >
                이전
              </Button>
            </motion.div>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-primary-500 scale-125'
                      : index < currentQuestion
                      ? 'bg-primary-300 dark:bg-primary-700'
                      : 'bg-secondary-200 dark:bg-secondary-600'
                  }`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={nextQuestion}
                disabled={!isAnswered}
                rightIcon={
                  currentQuestion === questions.length - 1 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  )
                }
              >
                {currentQuestion === questions.length - 1 ? '결과 보기' : '다음'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PersonalizationQuiz;