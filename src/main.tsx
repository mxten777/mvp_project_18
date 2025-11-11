import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/accessibility.css'
import './i18n'
import App from './App.tsx'

// 다크모드 초기화
const initDarkMode = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 다크모드 초기화 실행
initDarkMode();

// 전역 에러 핸들링
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// DOM 요소 확인 및 안전한 렌더링
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error('Failed to render app:', error);
  // 폴백 UI 표시
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
      <h1>로딩 중 문제가 발생했습니다</h1>
      <p>페이지를 새로고침해주세요</p>
      <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px;">새로고침</button>
    </div>
  `;
}
