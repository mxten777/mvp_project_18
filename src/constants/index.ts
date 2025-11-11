/**
 * 애플리케이션 전역 상수
 */

// 연락처 정보
export const CONTACT = {
  PHONE: '1588-0000',
  EMAIL: 'contact@careservice.co.kr',
  KAKAO: '@돌봄서비스',
  KAKAO_URL: 'https://pf.kakao.com/_xoLxoGT',
  ADDRESS: '서울특별시 강남구',
  BUSINESS_HOURS: '평일 09:00 - 18:00',
} as const;

// 서비스 가격 정보
export const PRICING = {
  VISITING_CARE: {
    ORIGINAL: 500000,
    DISCOUNTED: 75000,
    DISCOUNT_RATE: 0.85,
  },
  VISITING_NURSING: {
    ORIGINAL: 800000,
    DISCOUNTED: 120000,
    DISCOUNT_RATE: 0.85,
  },
  VISITING_BATH: {
    ORIGINAL: 150000,
    DISCOUNTED: 22000,
    DISCOUNT_RATE: 0.85,
  },
} as const;

// 브레이크포인트
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE: 1536,
} as const;

// 애니메이션 지속 시간
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// 색상 테마
export const COLORS = {
  PRIMARY: '#2563eb',
  SECONDARY: '#10b981',
  ACCENT: '#f59e0b',
  DANGER: '#ef4444',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
} as const;

// 라우트 경로
export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  FAQ: '/faq',
  CONTACT: '/contact',
  AI_DASHBOARD: '/ai-dashboard',
  SECURITY_CENTER: '/security-center',
  ANALYTICS: '/analytics',
  COLLABORATION: '/collaboration',
  ADMIN: '/admin',
  LOGIN: '/login',
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
  USER_PREFERENCES: 'user_preferences',
  AUTH_TOKEN: 'auth_token',
} as const;

// API 엔드포인트 (추후 사용)
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.careservice.co.kr',
  NOTICES: '/api/notices',
  APPLICATIONS: '/api/applications',
  USERS: '/api/users',
  DOWNLOADS: '/api/downloads',
} as const;

// 페이지네이션
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// 파일 업로드
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
} as const;

// 유효성 검사
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  USERNAME_MIN_LENGTH: 2,
  USERNAME_MAX_LENGTH: 20,
  PHONE_REGEX: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// 메시지
export const MESSAGES = {
  SUCCESS: {
    SAVE: '저장되었습니다.',
    UPDATE: '수정되었습니다.',
    DELETE: '삭제되었습니다.',
    SUBMIT: '제출되었습니다.',
  },
  ERROR: {
    NETWORK: '네트워크 오류가 발생했습니다.',
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
    INVALID_INPUT: '입력값이 올바르지 않습니다.',
    UNAUTHORIZED: '권한이 없습니다.',
  },
  CONFIRM: {
    DELETE: '정말 삭제하시겠습니까?',
    SUBMIT: '제출하시겠습니까?',
    CANCEL: '취소하시겠습니까?',
  },
} as const;

// 타임아웃
export const TIMEOUT = {
  API_REQUEST: 30000, // 30초
  DEBOUNCE: 300,
  THROTTLE: 1000,
} as const;

export default {
  CONTACT,
  PRICING,
  BREAKPOINTS,
  ANIMATION_DURATION,
  COLORS,
  ROUTES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  PAGINATION,
  FILE_UPLOAD,
  VALIDATION,
  MESSAGES,
  TIMEOUT,
};
