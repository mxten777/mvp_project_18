import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './common/Button';
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
      question: '?´ë¥´? ì˜ ?„ì¬ ?¼ìƒ?í™œ ?˜í–‰ ?¥ë ¥?€ ?´ë– ? ê???',
      subtitle: 'ê°€??ê°€ê¹Œìš´ ?íƒœë¥?? íƒ??ì£¼ì„¸??,
      type: 'single',
      options: [
        { 
          value: 'light', 
          label: '?€ë¶€ë¶??¼ì??ê°€??, 
          icon: '?š¶',
          description: '?…ë¦½?ì¸ ?í™œ??ê°€?¥í•˜ì§€ë§?ê°€???„ì????„ìš”?´ìš”'
        },
        { 
          value: 'moderate', 
          label: 'ë¶€ë¶„ì ?¼ë¡œ ?„ì? ?„ìš”', 
          icon: '?¤',
          description: '?¼ìƒ?í™œ???¼ë?ë¶„ì—???„ì????„ìš”?´ìš”'
        },
        { 
          value: 'intensive', 
          label: '?„ë°˜?ì¸ ?„ì? ?„ìš”', 
          icon: '?¥',
          description: '?€ë¶€ë¶„ì˜ ?¼ìƒ?í™œ?ì„œ ?„ì????„ìš”?´ìš”'
        }
      ]
    },
    {
      id: 'services',
      question: '?´ë–¤ ?œë¹„?¤ê? ê°€???„ìš”?˜ì‹ ê°€??',
      subtitle: '?„ìš”???œë¹„?¤ë? ëª¨ë‘ ? íƒ??ì£¼ì„¸??(ë³µìˆ˜ ? íƒ ê°€??',
      type: 'multiple',
      options: [
        { 
          value: 'nursing', 
          label: 'ë°©ë¬¸ê°„í˜¸', 
          icon: '?‘©?âš•ï¸?,
          description: 'ê±´ê°•ê´€ë¦? ?¬ì•½ê´€ë¦? ?ì²˜ì²˜ì¹˜ ??
        },
        { 
          value: 'care', 
          label: 'ë°©ë¬¸?”ì–‘', 
          icon: '? ',
          description: '? ì²´?œë™ ì§€?? ê°€?¬ì??? ?¼ìƒ?í™œ ?„ì?'
        },
        { 
          value: 'bathing', 
          label: 'ë°©ë¬¸ëª©ìš•', 
          icon: '?›',
          description: '?„ë¬¸ ëª©ìš• ?œë¹„??ë°?ê°œì¸?„ìƒ ê´€ë¦?
        },
        { 
          value: 'daycare', 
          label: 'ì£¼ì•¼ê°„ë³´??, 
          icon: '?Œ…',
          description: '??‹œê°??ëŠ” ?¼ê°„ ?Œë´„ ?œë¹„??
        }
      ]
    },
    {
      id: 'urgency',
      question: '?œë¹„???œì‘ ?¬ë§ ?œê¸°???¸ì œ?¸ê???',
      subtitle: '?í™©??ë§ëŠ” ?œê¸°ë¥?? íƒ??ì£¼ì„¸??,
      type: 'single',
      options: [
        { 
          value: 'immediate', 
          label: 'ì¦‰ì‹œ ?„ìš”?´ìš”', 
          icon: '?š¨',
          description: '?‘ê¸‰?í™©?´ê±°???¹ì¥ ?„ì????„ìš”??ê²½ìš°'
        },
        { 
          value: 'within_week', 
          label: '1ì£¼ì¼ ?´ë‚´', 
          icon: '?“…',
          description: 'ê°€?¥í•œ ë¹ ë¥¸ ?œì¼ ?´ì— ?œì‘?˜ê³  ?¶ì–´??
        },
        { 
          value: 'within_month', 
          label: '1ê°œì›” ?´ë‚´', 
          icon: '?“†',
          description: 'ì¶©ë¶„??ì¤€ë¹??œê°„???ê³  ?œì‘?˜ê³  ?¶ì–´??
        }
      ]
    },
    {
      id: 'location',
      question: '?œë¹„???œê³µ ì§€??? ?´ë””?¸ê???',
      subtitle: '?•í™•???œë¹„???ˆë‚´ë¥??„í•´ ?„ìš”?´ìš”',
      type: 'single',
      options: [
        { value: 'seoul', label: '?œìš¸?¹ë³„??, icon: '?™ï¸? },
        { value: 'gyeonggi', label: 'ê²½ê¸°??, icon: '?˜ï¸? },
        { value: 'incheon', label: '?¸ì²œê´‘ì—­??, icon: '?ˆï¸' },
        { value: 'other', label: 'ê¸°í? ì§€??, icon: '?“' }
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
    // ?ë‹´ ?ˆì•½ ë¡œì§ (?¤ì œë¡œëŠ” API ?¸ì¶œ)
    alert('?ë‹´ ?ˆì•½???‘ìˆ˜?˜ì—ˆ?µë‹ˆ?? 24?œê°„ ???°ë½?œë¦¬ê² ìŠµ?ˆë‹¤.');
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
      {/* ì§„í–‰ë¥??œì‹œ */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            ì§„í–‰ë¥? {currentQuestion + 1}/{questions.length}
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
          {/* ì§ˆë¬¸ ?¤ë” */}
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

          {/* ? íƒì§€??*/}
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

          {/* ë³µìˆ˜ ? íƒ ?ˆë‚´ */}
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
                  ?¬ëŸ¬ ê°?? íƒ ê°€?¥í•©?ˆë‹¤. ?„ìš”??ëª¨ë“  ?œë¹„?¤ë? ? íƒ??ì£¼ì„¸??
                </span>
              </div>
            </motion.div>
          )}

          {/* ?¤ë¹„ê²Œì´??ë²„íŠ¼??*/}
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
                ?´ì „
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
                {currentQuestion === questions.length - 1 ? 'ê²°ê³¼ ë³´ê¸°' : '?¤ìŒ'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PersonalizationQuiz;
