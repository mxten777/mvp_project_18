/**
 * 다중 인증 (MFA) 컴포넌트
 * SMS, Email, TOTP, 생체인증 등 다양한 인증 방법 지원
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  QrCodeIcon,
  FingerPrintIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { securityEngine } from '../utils/securityEngine';

interface MFAProps {
  userId: string;
  onSuccess: (verified: boolean) => void;
  onCancel?: () => void;
  requiredMethods?: number;
  className?: string;
}

interface AuthMethod {
  id: string;
  type: 'sms' | 'email' | 'totp' | 'biometric';
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  verified: boolean;
  setupRequired: boolean;
}

const MFAComponent: React.FC<MFAProps> = ({
  userId,
  onSuccess,
  onCancel,
  requiredMethods = 1,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState<'select' | 'verify' | 'setup'>('select');
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5분
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifiedMethods, setVerifiedMethods] = useState<string[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [authMethods, setAuthMethods] = useState<AuthMethod[]>([
    {
      id: 'sms',
      type: 'sms',
      name: 'SMS 인증',
      description: '휴대폰으로 인증 코드를 받습니다',
      icon: DevicePhoneMobileIcon,
      enabled: true,
      verified: false,
      setupRequired: false
    },
    {
      id: 'email',
      type: 'email',
      name: '이메일 인증',
      description: '이메일로 인증 코드를 받습니다',
      icon: EnvelopeIcon,
      enabled: true,
      verified: false,
      setupRequired: false
    },
    {
      id: 'totp',
      type: 'totp',
      name: 'TOTP 인증',
      description: 'Google Authenticator 등의 앱을 사용합니다',
      icon: QrCodeIcon,
      enabled: false,
      verified: false,
      setupRequired: true
    },
    {
      id: 'biometric',
      type: 'biometric',
      name: '생체 인증',
      description: '지문 또는 얼굴 인식을 사용합니다',
      icon: FingerPrintIcon,
      enabled: false,
      verified: false,
      setupRequired: true
    }
  ]);

  useEffect(() => {
    if (currentStep === 'verify' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      setError('인증 시간이 만료되었습니다.');
    }
  }, [currentStep, timeRemaining]);

  useEffect(() => {
    // 필요한 인증 방법 수만큼 검증이 완료되면 성공 처리
    if (verifiedMethods.length >= requiredMethods) {
      onSuccess(true);
    }
  }, [verifiedMethods, requiredMethods, onSuccess]);

  const startVerification = async (method: AuthMethod) => {
    if (method.setupRequired && !method.enabled) {
      setSelectedMethod(method);
      setCurrentStep('setup');
      return;
    }

    setIsLoading(true);
    setError('');
    setSelectedMethod(method);

    try {
      // 인증 코드 생성 시뮬레이션
      const code = securityEngine.generateMFACode();
      setGeneratedCode(code);
      
      // 실제 환경에서는 SMS/Email 전송 API 호출
      if (method.type === 'sms') {
        console.log(`SMS로 인증 코드 전송: ${code}`);
        alert(`SMS 시뮬레이션: 인증 코드는 ${code}입니다`);
      } else if (method.type === 'email') {
        console.log(`이메일로 인증 코드 전송: ${code}`);
        alert(`이메일 시뮬레이션: 인증 코드는 ${code}입니다`);
      }
      
      setCurrentStep('verify');
      setTimeRemaining(300);
      
    } catch (error) {
      setError('인증 코드 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!selectedMethod || !verificationCode) return;

    setIsLoading(true);
    setError('');

    try {
      let isValid = false;

      if (selectedMethod.type === 'sms' || selectedMethod.type === 'email') {
        isValid = securityEngine.verifyMFACode(verificationCode, generatedCode);
      } else if (selectedMethod.type === 'totp') {
        // TOTP 검증 로직
        isValid = verificationCode === '123456'; // 데모용
      } else if (selectedMethod.type === 'biometric') {
        // 생체인증 검증 로직
        isValid = await requestBiometricAuth();
      }

      if (isValid) {
        setVerifiedMethods(prev => [...prev, selectedMethod.id]);
        setAuthMethods(prev => 
          prev.map(method => 
            method.id === selectedMethod.id 
              ? { ...method, verified: true }
              : method
          )
        );
        
        if (verifiedMethods.length + 1 >= requiredMethods) {
          // 필요한 인증 완료
          setCurrentStep('select');
        } else {
          // 추가 인증 필요
          setCurrentStep('select');
          setVerificationCode('');
          setSelectedMethod(null);
        }
      } else {
        setError('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      setError('인증 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const setupTOTP = async () => {
    try {
      // TOTP 설정을 위한 QR 코드 생성 시뮬레이션
      const secret = 'JBSWY3DPEHPK3PXP'; // 데모용 시크릿
      const issuer = 'MVP Security';
      const accountName = `${userId}@mvp.com`;
      const qrUrl = `otpauth://totp/${issuer}:${accountName}?secret=${secret}&issuer=${issuer}`;
      
      setQrCodeUrl(qrUrl);
      
      // 실제로는 QR 코드 라이브러리를 사용해야 함
      console.log('TOTP QR Code URL:', qrUrl);
      
    } catch (error) {
      setError('TOTP 설정에 실패했습니다.');
    }
  };

  const requestBiometricAuth = async (): Promise<boolean> => {
    try {
      // 웹 생체인증 API 사용 (실제 구현)
      if ('credentials' in navigator) {
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: "MVP Security" },
            user: {
              id: new TextEncoder().encode(userId),
              name: userId,
              displayName: userId,
            },
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required"
            },
            timeout: 60000,
            attestation: "direct"
          }
        });
        
        return !!credential;
      }
    } catch (error) {
      console.log('생체인증 사용 불가:', error);
    }
    
    // 데모용 시뮬레이션
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.random() > 0.2); // 80% 성공률
      }, 2000);
    });
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = verificationCode.split('');
    newCode[index] = value;
    const updatedCode = newCode.join('');
    
    setVerificationCode(updatedCode);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderMethodSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          다중 인증
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          보안을 위해 {requiredMethods}개의 추가 인증이 필요합니다
        </p>
        {verifiedMethods.length > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            {verifiedMethods.length}/{requiredMethods} 인증 완료
          </p>
        )}
      </div>

      <div className="grid gap-4">
        {authMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => startVerification(method)}
            disabled={!method.enabled || method.verified || isLoading}
            className={`p-4 border-2 rounded-xl transition-all duration-200 ${
              method.verified
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : method.enabled
                  ? 'border-gray-200 dark:border-gray-700 hover:border-blue-500 bg-white dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  method.verified
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-blue-100 dark:bg-blue-900/30'
                }`}>
                  {method.verified ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <method.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </div>
              
              {method.verified && (
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  인증 완료
                </span>
              )}
              
              {method.setupRequired && !method.enabled && (
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  설정 필요
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {onCancel && (
        <button
          onClick={onCancel}
          className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          취소
        </button>
      )}
    </motion.div>
  );

  const renderVerification = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          {selectedMethod && <selectedMethod.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {selectedMethod?.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {selectedMethod?.type === 'sms' && '휴대폰으로 전송된 6자리 인증 코드를 입력하세요'}
          {selectedMethod?.type === 'email' && '이메일로 전송된 6자리 인증 코드를 입력하세요'}
          {selectedMethod?.type === 'totp' && 'Google Authenticator 앱의 6자리 코드를 입력하세요'}
          {selectedMethod?.type === 'biometric' && '생체 인증을 진행하세요'}
        </p>
      </div>

      {selectedMethod?.type !== 'biometric' && (
        <div>
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={verificationCode[index] || ''}
                onChange={(e) => handleCodeInput(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <ClockIcon className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={() => startVerification(selectedMethod!)}
              disabled={isLoading}
              className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50"
            >
              {isLoading ? '전송 중...' : '재전송'}
            </button>
          </div>
        </div>
      )}

      {selectedMethod?.type === 'biometric' && (
        <div className="text-center">
          <button
            onClick={async () => {
              setIsLoading(true);
              const success = await requestBiometricAuth();
              if (success) {
                setVerificationCode('verified');
                verifyCode();
              } else {
                setError('생체 인증에 실패했습니다.');
              }
              setIsLoading(false);
            }}
            disabled={isLoading}
            className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <ArrowPathIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin" />
            ) : (
              <FingerPrintIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            )}
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? '생체 인증 중...' : '터치하여 생체 인증을 시작하세요'}
          </p>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <XCircleIcon className="h-5 w-5 text-red-500" />
          <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
        </motion.div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => {
            setCurrentStep('select');
            setVerificationCode('');
            setError('');
          }}
          className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          뒤로
        </button>
        
        {selectedMethod?.type !== 'biometric' && (
          <button
            onClick={verifyCode}
            disabled={verificationCode.length !== 6 || isLoading}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '확인 중...' : '확인'}
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderSetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {selectedMethod?.name} 설정
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          보안을 강화하기 위해 추가 인증 방법을 설정하세요
        </p>
      </div>

      {selectedMethod?.type === 'totp' && (
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <QrCodeIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Google Authenticator 앱으로 QR 코드를 스캔하세요
            </p>
            <button
              onClick={setupTOTP}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              QR 코드 생성
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep('select')}
          className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          나중에 설정
        </button>
        
        <button
          onClick={() => {
            // 설정 완료 후 인증 방법 활성화
            setAuthMethods(prev =>
              prev.map(method =>
                method.id === selectedMethod?.id
                  ? { ...method, enabled: true, setupRequired: false }
                  : method
              )
            );
            startVerification(selectedMethod!);
          }}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          설정 완료
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={`max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      <AnimatePresence mode="wait">
        {currentStep === 'select' && renderMethodSelection()}
        {currentStep === 'verify' && renderVerification()}
        {currentStep === 'setup' && renderSetup()}
      </AnimatePresence>
    </div>
  );
};

export default MFAComponent;