/**
 * 보안 유틸리티 모듈
 * 데이터 암호화, 해시, 토큰 관리 등 보안 관련 기능 제공
 */

import { AES, enc, SHA256, lib } from 'crypto-js';

// 환경 변수에서 키를 가져오거나 기본값 사용 (실제 운영에서는 환경 변수 필수)
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key-change-in-production';

/**
 * 데이터 암호화
 */
export const encryptData = (data: string): string => {
  try {
    const encrypted = AES.encrypt(data, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('암호화 실패:', error);
    throw new Error('데이터 암호화에 실패했습니다.');
  }
};

/**
 * 데이터 복호화
 */
export const decryptData = (encryptedData: string): string => {
  try {
    const decrypted = AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    console.error('복호화 실패:', error);
    throw new Error('데이터 복호화에 실패했습니다.');
  }
};

/**
 * 패스워드 해시 생성
 */
export const hashPassword = (password: string): string => {
  const salt = lib.WordArray.random(256/8);
  const hash = SHA256(password + salt.toString()).toString();
  return `${salt.toString()}:${hash}`;
};

/**
 * 패스워드 검증
 */
export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  try {
    const [salt, hash] = hashedPassword.split(':');
    const newHash = SHA256(password + salt).toString();
    return hash === newHash;
  } catch (error) {
    console.error('패스워드 검증 실패:', error);
    return false;
  }
};

/**
 * 세션 토큰 생성
 */
export const generateSessionToken = (): string => {
  const timestamp = Date.now().toString();
  const randomBytes = lib.WordArray.random(256/8).toString();
  return `${timestamp}.${randomBytes}`;
};

/**
 * 토큰 유효성 검사
 */
export const validateToken = (token: string, maxAge: number = 24 * 60 * 60 * 1000): boolean => {
  try {
    const [timestamp] = token.split('.');
    const tokenAge = Date.now() - parseInt(timestamp);
    return tokenAge <= maxAge;
  } catch (error) {
    console.error('토큰 검증 실패:', error);
    return false;
  }
};

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * SQL 인젝션 방지를 위한 입력 검증
 */
export const sanitizeInput = (input: string): string => {
  // SQL 키워드 및 특수 문자 제거
  return input
    .replace(/['"`;\\]/g, '')
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|OR|AND)\b/gi, '')
    .trim();
};

/**
 * CSRF 토큰 생성
 */
export const generateCSRFToken = (): string => {
  return lib.WordArray.random(256/8).toString();
};

/**
 * 개인정보 마스킹
 */
export const maskPersonalInfo = (value: string, type: 'phone' | 'email' | 'name' | 'address'): string => {
  switch (type) {
    case 'phone':
      return value.replace(/(\d{3})-?(\d{4})-?(\d{4})/, '$1-****-$3');
    case 'email': {
      const [username, domain] = value.split('@');
      const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
      return `${maskedUsername}@${domain}`;
    }
    case 'name':
      if (value.length <= 2) return value.charAt(0) + '*';
      return value.charAt(0) + '*'.repeat(value.length - 2) + value.charAt(value.length - 1);
    case 'address':
      return value.replace(/\d+/g, '***');
    default:
      return value;
  }
};

/**
 * 보안 로그 인터페이스
 */
export interface SecurityLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  action: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}

/**
 * 보안 이벤트 로깅
 */
export const logSecurityEvent = (log: Omit<SecurityLog, 'timestamp'>): void => {
  const securityLog: SecurityLog = {
    ...log,
    timestamp: new Date().toISOString(),
  };

  // 개발 환경에서는 콘솔에 출력
  if (import.meta.env.DEV) {
    console.log('[보안 로그]', securityLog);
  }

  // 실제 운영에서는 서버로 전송하거나 보안 로그 서비스에 저장
  try {
    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    logs.push(securityLog);
    
    // 최대 1000개 로그만 유지
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(logs));
  } catch (error) {
    console.error('보안 로그 저장 실패:', error);
  }
};

/**
 * 입력 검증 규칙
 */
export const ValidationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[가-힣a-zA-Z\s]{2,50}$/,
};

/**
 * 입력값 검증
 */
export const validateInput = (value: string, type: keyof typeof ValidationRules): boolean => {
  return ValidationRules[type].test(value);
};

/**
 * 레이트 리미팅
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    const keyAttempts = this.attempts.get(key)!;
    
    // 윈도우 시간 이전의 시도들 제거
    const validAttempts = keyAttempts.filter(timestamp => timestamp > windowStart);
    this.attempts.set(key, validAttempts);
    
    if (validAttempts.length >= maxAttempts) {
      logSecurityEvent({
        level: 'warning',
        action: 'rate_limit_exceeded',
        details: { key, attempts: validAttempts.length }
      });
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();