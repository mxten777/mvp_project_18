/**
 * 유효성 검사 유틸리티 함수
 */

import { VALIDATION } from '../constants';

/**
 * 이메일 주소 유효성 검사
 * @param email - 검사할 이메일 주소
 * @returns 유효성 검사 결과
 * @example
 * isValidEmail('test@example.com') // true
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * 전화번호 유효성 검사
 * @param phone - 검사할 전화번호
 * @returns 유효성 검사 결과
 * @example
 * isValidPhone('010-1234-5678') // true
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * 비밀번호 유효성 검사
 * @param password - 검사할 비밀번호
 * @returns 유효성 검사 결과 및 오류 메시지
 * @example
 * isValidPassword('Test1234!') // { valid: true }
 */
export const isValidPassword = (
  password: string
): { valid: boolean; message?: string } => {
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `비밀번호는 최소 ${VALIDATION.PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    };
  }
  
  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    return {
      valid: false,
      message: `비밀번호는 최대 ${VALIDATION.PASSWORD_MAX_LENGTH}자까지 가능합니다.`,
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: '대문자를 포함해야 합니다.' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: '소문자를 포함해야 합니다.' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: '숫자를 포함해야 합니다.' };
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    return { valid: false, message: '특수문자(!@#$%^&*)를 포함해야 합니다.' };
  }
  
  return { valid: true };
};

/**
 * 빈 문자열 검사
 * @param value - 검사할 문자열
 * @returns 빈 문자열 여부
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * URL 유효성 검사
 * @param url - 검사할 URL
 * @returns 유효성 검사 결과
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 숫자 범위 검사
 * @param value - 검사할 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 범위 내 여부
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * 파일 유효성 검사
 * @param file - 검사할 파일
 * @param maxSize - 최대 파일 크기 (바이트)
 * @param allowedTypes - 허용된 MIME 타입 배열
 * @returns 유효성 검사 결과
 */
export const isValidFile = (
  file: File,
  maxSize: number,
  allowedTypes: string[]
): { valid: boolean; message?: string } => {
  if (file.size > maxSize) {
    return {
      valid: false,
      message: `파일 크기는 ${(maxSize / 1024 / 1024).toFixed(2)}MB 이하여야 합니다.`,
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: '지원하지 않는 파일 형식입니다.',
    };
  }
  
  return { valid: true };
};
