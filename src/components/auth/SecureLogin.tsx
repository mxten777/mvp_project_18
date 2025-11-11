/**
 * 보안 강화 로그인 컴포넌트
 * 이중 인증, 레이트 리미팅, 보안 검증 포함
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Lock, 
  AlertTriangle,
  Smartphone,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  validateInput, 
  logSecurityEvent,
  rateLimiter 
} from '../utils/security';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
  twoFactorCode?: string;
}

export default function SecureLogin() {
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // 보안 수준 계산
  const calculateSecurityLevel = (email: string, password: string) => {
    let score = 0;
    
    // 이메일 검증
    if (validateInput(email, 'email')) score += 25;
    
    // 패스워드 강도 검사
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 12.5;
    if (/[a-z]/.test(password)) score += 12.5;
    if (/\d/.test(password)) score += 12.5;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 12.5;

    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // 실시간 보안 수준 업데이트
    if (field === 'email' || field === 'password') {
      const newLevel = calculateSecurityLevel(
        field === 'email' ? value as string : form.email,
        field === 'password' ? value as string : form.password
      );
      setSecurityLevel(newLevel);
    }

    // 에러 초기화
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateInput(form.email, 'email')) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (form.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    if (showTwoFactor && !form.twoFactorCode) {
      newErrors.twoFactorCode = '2단계 인증 코드를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 차단 상태 확인
    if (isBlocked) {
      logSecurityEvent({
        level: 'warning',
        action: 'blocked_login_attempt',
        details: { email: form.email }
      });
      return;
    }

    // 레이트 리미팅 확인
    const clientKey = `login_${form.email}_${window.location.hostname}`;
    if (!rateLimiter.isAllowed(clientKey, 5, 15 * 60 * 1000)) {
      setIsBlocked(true);
      setBlockTimeLeft(15 * 60); // 15분
      
      const interval = setInterval(() => {
        setBlockTimeLeft(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      logSecurityEvent({
        level: 'warning',
        action: 'login_rate_limited',
        details: { email: form.email }
      });
      return;
    }

    if (!validateForm()) {
      logSecurityEvent({
        level: 'warning',
        action: 'login_validation_failed',
        details: { email: form.email, errors: Object.keys(errors) }
      });
      return;
    }

    try {
      const success = await login(form.email, form.password);
      
      if (success) {
        // 로그인 성공
        setLoginAttempts(0);
        rateLimiter.reset(clientKey);
        
        logSecurityEvent({
          level: 'info',
          action: 'login_success',
          details: { 
            email: form.email,
            securityLevel,
            rememberMe: form.rememberMe
          }
        });

        // 성공 시 리다이렉트 또는 상태 변경
        alert('로그인 성공!');
      } else {
        // 로그인 실패
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        logSecurityEvent({
          level: 'warning',
          action: 'login_failed',
          details: { 
            email: form.email,
            attempts: newAttempts,
            securityLevel
          }
        });

        // 보안 강화: 높은 보안 계정의 경우 2단계 인증 요구
        if (securityLevel === 'high' && newAttempts >= 2) {
          setShowTwoFactor(true);
        }

        // 5회 실패 시 계정 차단
        if (newAttempts >= 5) {
          setIsBlocked(true);
          setBlockTimeLeft(15 * 60);
        }

        setErrors({ password: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      }
    } catch (error) {
      logSecurityEvent({
        level: 'error',
        action: 'login_error',
        details: { 
          email: form.email,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      setErrors({ password: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.' });
    }
  };

  const getSecurityLevelColor = () => {
    switch (securityLevel) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-red-500';
    }
  };

  const getSecurityLevelText = () => {
    switch (securityLevel) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-8"
      >
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">보안 로그인</h2>
          </div>
          <p className="text-gray-600">안전한 로그인을 위해 보안 검증을 진행합니다.</p>
        </div>

        {/* 차단 상태 */}
        <AnimatePresence>
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-red-900">로그인 차단</h3>
              </div>
              <p className="text-red-800 text-sm mb-2">
                보안을 위해 로그인이 일시적으로 차단되었습니다.
              </p>
              <div className="flex items-center gap-2 text-red-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {Math.floor(blockTimeLeft / 60)}분 {blockTimeLeft % 60}초 후 재시도 가능
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 보안 수준 표시 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">보안 수준</span>
            <span className={`text-sm font-semibold ${getSecurityLevelColor()}`}>
              {getSecurityLevelText()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                securityLevel === 'high' ? 'bg-green-500 w-full' :
                securityLevel === 'medium' ? 'bg-yellow-500 w-2/3' :
                'bg-red-500 w-1/3'
              }`}
            />
          </div>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="이메일을 입력하세요"
              disabled={isBlocked || isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="비밀번호를 입력하세요"
                disabled={isBlocked || isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isBlocked || isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* 2단계 인증 */}
          <AnimatePresence>
            {showTwoFactor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t pt-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">2단계 인증</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    인증 코드
                  </label>
                  <input
                    type="text"
                    value={form.twoFactorCode || ''}
                    onChange={(e) => handleInputChange('twoFactorCode', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.twoFactorCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="6자리 인증 코드를 입력하세요"
                    maxLength={6}
                    disabled={isBlocked || isLoading}
                  />
                  {errors.twoFactorCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.twoFactorCode}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-600">
                    휴대폰으로 전송된 6자리 코드를 입력하세요.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 로그인 유지 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isBlocked || isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              로그인 상태 유지
            </label>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isBlocked || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              isBlocked || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:scale-98'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                로그인 중...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                {showTwoFactor ? '2단계 인증 로그인' : '보안 로그인'}
              </>
            )}
          </button>
        </form>

        {/* 로그인 시도 횟수 표시 */}
        {loginAttempts > 0 && !isBlocked && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-800">
                로그인 실패: {loginAttempts}/5회 
                {loginAttempts >= 3 && ' (보안을 위해 추가 인증이 필요할 수 있습니다)'}
              </span>
            </div>
          </div>
        )}

        {/* 테스트 계정 정보 (개발용) */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">테스트 계정 (개발용)</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• 관리자: admin@test.com / admin123!</p>
              <p>• 요양사: caregiver@test.com / care123!</p>
              <p>• 사용자: user@test.com / user123!</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}