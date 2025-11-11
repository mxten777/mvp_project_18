/**
 * 포맷팅 유틸리티 함수
 */

/**
 * 숫자를 통화 형식으로 포맷팅
 * @param amount - 포맷팅할 금액
 * @param currency - 통화 코드 (기본값: 'KRW')
 * @returns 포맷팅된 통화 문자열
 * @example
 * formatCurrency(1000000) // "₩1,000,000"
 */
export const formatCurrency = (amount: number, currency: string = 'KRW'): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * 숫자를 천단위 구분자로 포맷팅
 * @param value - 포맷팅할 숫자
 * @returns 포맷팅된 문자열
 * @example
 * formatNumber(1000000) // "1,000,000"
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

/**
 * 전화번호를 포맷팅
 * @param phone - 포맷팅할 전화번호
 * @returns 포맷팅된 전화번호
 * @example
 * formatPhone('01012345678') // "010-1234-5678"
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * 날짜를 포맷팅
 * @param date - 포맷팅할 날짜
 * @param format - 포맷 형식 ('short' | 'long' | 'time')
 * @returns 포맷팅된 날짜 문자열
 * @example
 * formatDate(new Date(), 'short') // "2025.11.11"
 * formatDate(new Date(), 'long') // "2025년 11월 11일"
 */
export const formatDate = (
  date: Date | string,
  format: 'short' | 'long' | 'time' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'long':
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    case 'time':
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    default:
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(dateObj).replace(/\. /g, '.').replace(/\.$/, '');
  }
};

/**
 * 상대 시간을 포맷팅 (예: "3분 전", "2일 전")
 * @param date - 포맷팅할 날짜
 * @returns 상대 시간 문자열
 * @example
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "1시간 전"
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  
  return formatDate(dateObj);
};

/**
 * 파일 크기를 읽기 쉬운 형식으로 포맷팅
 * @param bytes - 바이트 단위 파일 크기
 * @returns 포맷팅된 파일 크기 문자열
 * @example
 * formatFileSize(1048576) // "1.00 MB"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 퍼센트를 포맷팅
 * @param value - 퍼센트 값 (0-1 또는 0-100)
 * @param decimals - 소수점 자리수
 * @returns 포맷팅된 퍼센트 문자열
 * @example
 * formatPercent(0.8567) // "85.67%"
 * formatPercent(85.67, 1) // "85.7%"
 */
export const formatPercent = (value: number, decimals: number = 2): string => {
  const percent = value > 1 ? value : value * 100;
  return `${percent.toFixed(decimals)}%`;
};

/**
 * 텍스트를 특정 길이로 자르고 말줄임표 추가
 * @param text - 자를 텍스트
 * @param maxLength - 최대 길이
 * @returns 잘린 텍스트
 * @example
 * truncateText('Long text here', 10) // "Long text..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
