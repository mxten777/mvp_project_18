import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Theme Hook
 * @description ThemeContext를 사용하는 커스텀 훅
 * @throws {Error} ThemeProvider 외부에서 사용 시 에러
 * @returns theme과 toggleTheme 함수
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useThemeContext();
 * ```
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
};
