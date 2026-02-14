# MVP Project 소개 자료

> 간결하고 보기 좋은 소개자료 초안입니다. 원하시면 색상·이미지·PPT 변환까지 도와드릴게요.

---

## 한줄 소개

사용자 중심의 접근성과 실무 수준의 기능을 갖춘 웹 애플리케이션 MVP입니다. 빠른 설치와 쉬운 확장이 가능한 구조로 제작되었습니다.

---

## 핵심 가치

- 접근성 중심 설계 (ARIA, 키보드 네비게이션 등)
- 확장 가능한 컴포넌트 기반 구조 (React + TypeScript)
- PWA 지원으로 오프라인/설치 경험 제공
- 모듈화된 대시보드 및 보안 기능 포함

---

## 주요 기능

- 반응형 레이아웃: 모바일/PC 전용 컴포넌트(`AppMobile.tsx`, `AppPC.tsx`)
- 접근성 도구: `AccessibilityToolbar`, `LanguageSelector`
- 보안/인증: `MFAComponent`, `PrivacyCenter`, `SecurityDashboard`
- 실시간 기능: `RealtimeChat`, `RealTimeStats`, `VideoCallSystem`
- 퍼포먼스/분석: `PerformanceMonitor`, `SimpleAnalytics`, `CustomAnalytics`

---

## 기술 스택

- 프레임워크: React + Vite
- 언어: TypeScript
- 스타일: TailwindCSS + PostCSS
- 기타: PWA, Service Worker, i18n

---

## 데모 / 실행 방법

1. 레포 클론

```
git clone <repository-url>
cd mvp_project_18
```

2. 의존성 설치 및 개발 서버 실행

```
npm install
npm run dev
```

3. 브라우저에서 열기: `http://localhost:5173` (기본 Vite 포트)

데모용 정적 페이지는 `public/test.html`을 확인하세요.

---

## 스크린샷 / 시연 포인트

- 메인 대시보드(데이터 시각화)
- 접근성 도구(키보드 탐색 데모)
- PWA 설치 흐름
- 실시간 채팅 및 영상 통화

스크린샷을 추가하시려면 `src/assets/` 또는 `public/`에 이미지를 넣으면 됩니다.

---

## 기대 효과 및 적용 사례

- 내부 운영 대시보드로 빠른 도입 가능
- 고객 대상 데모용으로 직관적 전달
- 접근성 준수로 규제 대응 및 사용자 범위 확대

---

## 연락처 / 다음 단계

- 담당자: 프로젝트 소유자 또는 연락처 정보를 여기에 기재
- 요청 가능한 작업: 디자인 개선, PPT 변환, 한글/영문 브로셔 제작, PDF 내보내기

원하시면 제가 이 초안을 PPT로 변환하거나, 색상·로고를 적용해 시각적으로 더 다듬어 드리겠습니다.
