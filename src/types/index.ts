/**
 * 공통 타입 정의
 */

// 기본 Props 타입
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// 컴포넌트 Props export
export * from './components';

// 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

// 공지사항 타입
export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  views: number;
  isImportant?: boolean;
}

// 다운로드 파일 타입
export interface DownloadFile {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  downloadCount: number;
}

// 상담 신청 타입
export interface Application {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

// FAQ 타입
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// 후기/리뷰 타입
export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  serviceType: string;
  createdAt: Date;
}

// 서비스 타입
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  features: string[];
  icon?: string;
}

// 통계 데이터 타입
export interface Statistics {
  totalUsers: number;
  activeServices: number;
  satisfaction: number;
  monthlyRevenue: number;
}

// 차트 데이터 타입
export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

// API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 폼 에러 타입
export interface FormErrors {
  [key: string]: string;
}

// 로딩 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 언어 타입
export type Language = 'ko' | 'en' | 'ja' | 'zh';

// 테마 타입
export type Theme = 'light' | 'dark' | 'system';
