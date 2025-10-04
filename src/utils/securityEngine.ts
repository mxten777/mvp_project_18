/**
 * 고급 보안 및 모니터링 엔진
 * 실시간 위협 탐지, 다중 인증, 암호화, 보안 감사 기능 제공
 */

import CryptoJS from 'crypto-js';

// 보안 이벤트 타입
export interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'suspicious_activity' | 'data_access' | 'system_change' | 'threat_detected';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  description: string;
  metadata?: Record<string, any>;
}

// 보안 규칙
export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: (event: SecurityEvent) => boolean;
  action: 'log' | 'alert' | 'block' | 'quarantine';
  threshold?: number;
  timeWindow?: number; // minutes
}

// MFA 설정
export interface MFAConfig {
  enabled: boolean;
  methods: ('sms' | 'email' | 'totp' | 'biometric')[];
  requiredMethods: number;
  trustDevices: boolean;
  trustDuration: number; // days
}

// 암호화 설정
export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  iterations: number;
  saltSize: number;
}

// 보안 정책
export interface SecurityPolicy {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    maxAge: number; // days
    preventReuse: number; // last N passwords
  };
  sessionPolicy: {
    maxDuration: number; // minutes
    maxConcurrentSessions: number;
    idleTimeout: number; // minutes
    requireReauth: boolean;
  };
  accessPolicy: {
    maxFailedAttempts: number;
    lockoutDuration: number; // minutes
    requireMFA: boolean;
    ipWhitelist: string[];
    ipBlacklist: string[];
  };
}

class SecurityEngine {
  private static instance: SecurityEngine;
  private events: SecurityEvent[] = [];
  private rules: SecurityRule[] = [];
  private policy: SecurityPolicy;
  private mfaConfig: MFAConfig;
  private encryptionConfig: EncryptionConfig;
  private eventListeners: Map<string, Function[]> = new Map();
  private threatPatterns: RegExp[] = [];
  private sessionStore: Map<string, any> = new Map();
  private failedAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();

  private constructor() {
    this.initializeDefaultPolicy();
    this.initializeDefaultRules();
    this.initializeThreatPatterns();
    this.startMonitoring();
  }

  public static getInstance(): SecurityEngine {
    if (!SecurityEngine.instance) {
      SecurityEngine.instance = new SecurityEngine();
    }
    return SecurityEngine.instance;
  }

  // 기본 보안 정책 초기화
  private initializeDefaultPolicy(): void {
    this.policy = {
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90,
        preventReuse: 5
      },
      sessionPolicy: {
        maxDuration: 480, // 8 hours
        maxConcurrentSessions: 3,
        idleTimeout: 30,
        requireReauth: true
      },
      accessPolicy: {
        maxFailedAttempts: 5,
        lockoutDuration: 15,
        requireMFA: true,
        ipWhitelist: [],
        ipBlacklist: []
      }
    };

    this.mfaConfig = {
      enabled: true,
      methods: ['email', 'totp'],
      requiredMethods: 1,
      trustDevices: true,
      trustDuration: 30
    };

    this.encryptionConfig = {
      algorithm: 'AES',
      keySize: 256,
      iterations: 10000,
      saltSize: 16
    };
  }

  // 기본 보안 규칙 초기화
  private initializeDefaultRules(): void {
    this.rules = [
      {
        id: 'multiple-failed-logins',
        name: '다중 로그인 실패 탐지',
        description: '짧은 시간 내 다중 로그인 실패 시도 탐지',
        enabled: true,
        condition: (event) => event.type === 'login_attempt' && event.metadata?.success === false,
        action: 'alert',
        threshold: 3,
        timeWindow: 5
      },
      {
        id: 'suspicious-location',
        name: '의심스러운 위치 접근',
        description: '평소와 다른 지역에서의 접근 시도',
        enabled: true,
        condition: (event) => event.type === 'login_attempt' && event.metadata?.locationAnomaly === true,
        action: 'alert'
      },
      {
        id: 'data-exfiltration',
        name: '데이터 유출 시도',
        description: '대량 데이터 다운로드 또는 비정상적 접근 패턴',
        enabled: true,
        condition: (event) => event.type === 'data_access' && event.metadata?.dataSize > 1000000,
        action: 'block'
      },
      {
        id: 'privilege-escalation',
        name: '권한 상승 시도',
        description: '비정상적인 권한 요청 또는 시스템 변경 시도',
        enabled: true,
        condition: (event) => event.type === 'system_change' && event.metadata?.privilegeChange === true,
        action: 'quarantine'
      }
    ];
  }

  // 위협 패턴 초기화
  private initializeThreatPatterns(): void {
    this.threatPatterns = [
      /(\<|%3C)(\/?script|\/?object|\/?applet|\/?embed|\/?form)/gi, // XSS
      /(union|select|insert|delete|update|drop|create|alter|exec|execute)/gi, // SQL Injection
      /(\.\.|\/\.\.|\\\.\.)/gi, // Path Traversal
      /(cmd|command|powershell|bash|sh|eval|system)/gi, // Command Injection
      /(<iframe|<object|<embed|<script|javascript:|vbscript:|data:)/gi, // Malicious Content
    ];
  }

  // 실시간 모니터링 시작
  private startMonitoring(): void {
    // 주기적으로 보안 이벤트 분석
    setInterval(() => {
      this.analyzeSecurityEvents();
      this.cleanupOldEvents();
    }, 10000); // 10초마다

    // 브라우저 이벤트 모니터링
    if (typeof window !== 'undefined') {
      this.monitorBrowserEvents();
    }
  }

  // 브라우저 이벤트 모니터링
  private monitorBrowserEvents(): void {
    // DevTools 열림 감지
    let devtools = false;
    setInterval(() => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          this.logSecurityEvent({
            type: 'suspicious_activity',
            severity: 'medium',
            description: 'Developer tools opened',
            metadata: { devtools: true }
          });
        }
      } else {
        devtools = false;
      }
    }, 500);

    // 비정상적인 네트워크 요청 감지
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const url = args[0]?.toString() || '';
      
      // 의심스러운 패턴 확인
      if (this.containsThreatPattern(url)) {
        this.logSecurityEvent({
          type: 'threat_detected',
          severity: 'high',
          description: 'Suspicious network request detected',
          metadata: { url, type: 'fetch' }
        });
      }

      return originalFetch.apply(window, args);
    };
  }

  // 보안 이벤트 로깅
  public logSecurityEvent(eventData: Partial<SecurityEvent>): void {
    const event: SecurityEvent = {
      id: this.generateId(),
      type: eventData.type || 'suspicious_activity',
      severity: eventData.severity || 'low',
      userId: eventData.userId,
      ip: this.getClientIP(),
      userAgent: navigator.userAgent,
      timestamp: new Date(),
      description: eventData.description || 'Security event',
      metadata: eventData.metadata || {}
    };

    this.events.push(event);
    this.evaluateSecurityRules(event);
    this.emit('securityEvent', event);
  }

  // 보안 규칙 평가
  private evaluateSecurityRules(event: SecurityEvent): void {
    this.rules.forEach(rule => {
      if (!rule.enabled) return;

      if (rule.condition(event)) {
        if (rule.threshold && rule.timeWindow) {
          const recentEvents = this.getRecentEvents(rule.timeWindow);
          const matchingEvents = recentEvents.filter(e => rule.condition(e));
          
          if (matchingEvents.length >= rule.threshold) {
            this.executeSecurityAction(rule, event, matchingEvents);
          }
        } else {
          this.executeSecurityAction(rule, event, [event]);
        }
      }
    });
  }

  // 보안 액션 실행
  private executeSecurityAction(rule: SecurityRule, event: SecurityEvent, events: SecurityEvent[]): void {
    switch (rule.action) {
      case 'log':
        console.log(`Security rule triggered: ${rule.name}`, { rule, event, events });
        break;
      case 'alert':
        this.emit('securityAlert', { rule, event, events });
        break;
      case 'block':
        this.emit('securityBlock', { rule, event, events });
        break;
      case 'quarantine':
        this.emit('securityQuarantine', { rule, event, events });
        break;
    }
  }

  // 암호화
  public encrypt(data: string, key?: string): string {
    try {
      const secretKey = key || this.generateEncryptionKey();
      const salt = CryptoJS.lib.WordArray.random(this.encryptionConfig.saltSize);
      const derivedKey = CryptoJS.PBKDF2(secretKey, salt, {
        keySize: this.encryptionConfig.keySize / 32,
        iterations: this.encryptionConfig.iterations
      });
      
      const encrypted = CryptoJS.AES.encrypt(data, derivedKey.toString());
      return salt.toString() + ':' + encrypted.toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('암호화에 실패했습니다.');
    }
  }

  // 복호화
  public decrypt(encryptedData: string, key?: string): string {
    try {
      const [saltStr, encrypted] = encryptedData.split(':');
      const salt = CryptoJS.enc.Hex.parse(saltStr);
      const secretKey = key || this.generateEncryptionKey();
      
      const derivedKey = CryptoJS.PBKDF2(secretKey, salt, {
        keySize: this.encryptionConfig.keySize / 32,
        iterations: this.encryptionConfig.iterations
      });
      
      const decrypted = CryptoJS.AES.decrypt(encrypted, derivedKey.toString());
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('복호화에 실패했습니다.');
    }
  }

  // 패스워드 해싱
  public hashPassword(password: string): string {
    const salt = CryptoJS.lib.WordArray.random(16);
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: this.encryptionConfig.iterations
    });
    return salt.toString() + ':' + hash.toString();
  }

  // 패스워드 검증
  public verifyPassword(password: string, hashedPassword: string): boolean {
    try {
      const [saltStr, hash] = hashedPassword.split(':');
      const salt = CryptoJS.enc.Hex.parse(saltStr);
      const computedHash = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: this.encryptionConfig.iterations
      });
      return computedHash.toString() === hash;
    } catch (error) {
      return false;
    }
  }

  // 패스워드 정책 검증
  public validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const policy = this.policy.passwordPolicy;

    if (password.length < policy.minLength) {
      errors.push(`비밀번호는 최소 ${policy.minLength}자 이상이어야 합니다.`);
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('대문자를 포함해야 합니다.');
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('소문자를 포함해야 합니다.');
    }

    if (policy.requireNumbers && !/\d/.test(password)) {
      errors.push('숫자를 포함해야 합니다.');
    }

    if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('특수문자를 포함해야 합니다.');
    }

    return { valid: errors.length === 0, errors };
  }

  // MFA 코드 생성
  public generateMFACode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // MFA 코드 검증
  public verifyMFACode(code: string, expectedCode: string): boolean {
    return code === expectedCode;
  }

  // 세션 관리
  public createSession(userId: string): string {
    const sessionId = this.generateId();
    const sessionData = {
      userId,
      createdAt: new Date(),
      lastActivity: new Date(),
      ip: this.getClientIP(),
      userAgent: navigator.userAgent
    };

    this.sessionStore.set(sessionId, sessionData);
    return sessionId;
  }

  // 세션 검증
  public validateSession(sessionId: string): boolean {
    const session = this.sessionStore.get(sessionId);
    if (!session) return false;

    const now = new Date();
    const lastActivity = new Date(session.lastActivity);
    const idleTime = (now.getTime() - lastActivity.getTime()) / (1000 * 60); // minutes

    if (idleTime > this.policy.sessionPolicy.idleTimeout) {
      this.sessionStore.delete(sessionId);
      return false;
    }

    // 활동 시간 업데이트
    session.lastActivity = now;
    this.sessionStore.set(sessionId, session);
    return true;
  }

  // 위협 패턴 검사
  public containsThreatPattern(input: string): boolean {
    return this.threatPatterns.some(pattern => pattern.test(input));
  }

  // 로그인 시도 추적
  public trackLoginAttempt(identifier: string, success: boolean): boolean {
    const key = identifier.toLowerCase();
    const now = new Date();

    if (!success) {
      const attempts = this.failedAttempts.get(key) || { count: 0, lastAttempt: now };
      attempts.count++;
      attempts.lastAttempt = now;
      this.failedAttempts.set(key, attempts);

      // 계정 잠금 확인
      if (attempts.count >= this.policy.accessPolicy.maxFailedAttempts) {
        this.logSecurityEvent({
          type: 'login_attempt',
          severity: 'high',
          description: 'Account locked due to multiple failed attempts',
          metadata: { identifier, attempts: attempts.count, locked: true }
        });
        return false; // 계정 잠금
      }
    } else {
      // 성공한 로그인 시 실패 횟수 초기화
      this.failedAttempts.delete(key);
    }

    this.logSecurityEvent({
      type: 'login_attempt',
      severity: success ? 'low' : 'medium',
      description: success ? 'Successful login' : 'Failed login attempt',
      metadata: { identifier, success }
    });

    return true;
  }

  // 보안 대시보드 데이터 조회
  public getSecurityDashboardData() {
    const recentEvents = this.getRecentEvents(60); // 최근 1시간
    const threatLevels = this.analyzeThreatLevels(recentEvents);
    const topThreats = this.getTopThreats(recentEvents);
    const systemHealth = this.getSystemHealth();

    return {
      summary: {
        totalEvents: this.events.length,
        recentEvents: recentEvents.length,
        activeThreats: recentEvents.filter(e => e.severity === 'high' || e.severity === 'critical').length,
        activeSessions: this.sessionStore.size
      },
      threatLevels,
      topThreats,
      systemHealth,
      recentEvents: recentEvents.slice(0, 10)
    };
  }

  // 유틸리티 메서드들
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateEncryptionKey(): string {
    return 'mvp_security_key_' + Date.now();
  }

  private getClientIP(): string {
    // 실제 환경에서는 서버에서 제공받아야 함
    return '127.0.0.1';
  }

  private getRecentEvents(minutes: number): SecurityEvent[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.events.filter(event => event.timestamp >= cutoff);
  }

  private analyzeSecurityEvents(): void {
    const recentEvents = this.getRecentEvents(5);
    
    // 이상 패턴 감지 로직
    if (recentEvents.length > 50) {
      this.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        description: 'High volume of security events detected',
        metadata: { eventCount: recentEvents.length }
      });
    }
  }

  private cleanupOldEvents(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24시간
    this.events = this.events.filter(event => event.timestamp >= cutoff);
  }

  private analyzeThreatLevels(events: SecurityEvent[]) {
    const levels = { low: 0, medium: 0, high: 0, critical: 0 };
    events.forEach(event => levels[event.severity]++);
    return levels;
  }

  private getTopThreats(events: SecurityEvent[]) {
    const threats = new Map<string, number>();
    events.forEach(event => {
      const count = threats.get(event.type) || 0;
      threats.set(event.type, count + 1);
    });
    
    return Array.from(threats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }

  private getSystemHealth() {
    return {
      securityScore: Math.floor(Math.random() * 20) + 80, // 80-100
      vulnerabilities: Math.floor(Math.random() * 5),
      lastScan: new Date(),
      uptime: '99.9%'
    };
  }

  // 이벤트 리스너 관리
  public on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  public off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // 정책 업데이트
  public updateSecurityPolicy(newPolicy: Partial<SecurityPolicy>): void {
    this.policy = { ...this.policy, ...newPolicy };
    this.logSecurityEvent({
      type: 'system_change',
      severity: 'medium',
      description: 'Security policy updated',
      metadata: { changes: newPolicy }
    });
  }

  // 규칙 관리
  public addSecurityRule(rule: SecurityRule): void {
    this.rules.push(rule);
    this.logSecurityEvent({
      type: 'system_change',
      severity: 'medium',
      description: 'Security rule added',
      metadata: { ruleId: rule.id, ruleName: rule.name }
    });
  }

  public removeSecurityRule(ruleId: string): void {
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
    this.logSecurityEvent({
      type: 'system_change',
      severity: 'medium',
      description: 'Security rule removed',
      metadata: { ruleId }
    });
  }
}

export const securityEngine = SecurityEngine.getInstance();