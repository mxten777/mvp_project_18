# 🏗️ 권장 표준 폴더 구조

**제안일**: 2026-02-14  
**기준**: React + Vite + TypeScript 프로덕션 베스트 프랙티스

---

## 📂 최종 목표 구조

```
mvp_project_18/
├─ public/
│   ├─ icons/
│   ├─ manifest.json
│   └─ sw.js
│
├─ src/
│   ├─ assets/              # 정적 리소스
│   │   ├─ images/
│   │   └─ fonts/
│   │
│   ├─ components/          # 재사용 컴포넌트
│   │   ├─ common/          # 공통 기본 컴포넌트
│   │   │   ├─ Button.tsx
│   │   │   ├─ Card.tsx
│   │   │   ├─ Input.tsx
│   │   │   ├─ Textarea.tsx
│   │   │   ├─ LazyImage.tsx
│   │   │   └─ SectionTitle.tsx
│   │   │
│   │   ├─ premium/         # 프리미엄 UI 라이브러리
│   │   │   ├─ GlassCard.tsx
│   │   │   ├─ PremiumButton.tsx
│   │   │   └─ index.ts
│   │   │
│   │   ├─ layout/          # 레이아웃 컴포넌트
│   │   │   ├─ Header.tsx
│   │   │   ├─ Footer.tsx
│   │   │   └─ MobileNav.tsx
│   │   │
│   │   ├─ ui/              # UI 특화 컴포넌트
│   │   │   ├─ SEOHead.tsx
│   │   │   ├─ DarkModeToggle.tsx
│   │   │   ├─ ThemeToggle.tsx
│   │   │   ├─ LanguageSelector.tsx
│   │   │   ├─ ScrollToTop.tsx
│   │   │   ├─ FAQList.tsx
│   │   │   ├─ NoticeList.tsx
│   │   │   ├─ ServiceDetailList.tsx
│   │   │   ├─ ContactForm.tsx
│   │   │   ├─ ContactInfo.tsx
│   │   │   ├─ StatCard.tsx
│   │   │   ├─ SimpleChart.tsx
│   │   │   ├─ DownloadList.tsx
│   │   │   ├─ FadeInView.tsx
│   │   │   └─ OptimizedImage.tsx
│   │   │
│   │   └─ sections/        # 페이지 섹션
│   │       ├─ Hero.tsx
│   │       ├─ Features.tsx
│   │       ├─ Services.tsx
│   │       ├─ Steps.tsx
│   │       ├─ CTA.tsx
│   │       └─ Contact.tsx
│   │
│   ├─ constants/           # 상수 정의
│   │   └─ index.ts
│   │
│   ├─ contexts/            # React Context
│   │   └─ AuthContext.tsx
│   │
│   ├─ hooks/               # Custom Hooks
│   │   └─ (비어있음 - 향후 추가)
│   │
│   ├─ i18n/                # 국제화
│   │   ├─ i18n.ts
│   │   └─ locales/
│   │
│   ├─ layouts/             # 페이지 레이아웃
│   │   ├─ MainLayout.tsx
│   │   ├─ MobileLayout.tsx
│   │   └─ index.ts
│   │
│   ├─ pages/               # 라우트 페이지
│   │   ├─ HomePage.tsx
│   │   ├─ ServicesPage.tsx
│   │   ├─ FAQPage.tsx
│   │   ├─ ContactPage.tsx
│   │   ├─ NotFoundPage.tsx
│   │   └─ index.ts
│   │
│   ├─ services/            # API/비즈니스 로직
│   │   └─ (향후 추가)
│   │
│   ├─ styles/              # 전역 스타일
│   │   └─ (비어있음)
│   │
│   ├─ types/               # TypeScript 타입
│   │   └─ (향후 추가)
│   │
│   ├─ utils/               # 유틸리티 함수
│   │   └─ cn.ts            # Tailwind class merger
│   │
│   ├─ App.tsx              # 디바이스 감지 & 분기
│   ├─ AppPC.tsx            # PC 버전 라우터
│   ├─ AppMobile.tsx        # Mobile 버전 라우터
│   ├─ main.tsx             # 진입점
│   ├─ index.css            # 전역 CSS
│   └─ vite-env.d.ts        # Vite 타입
│
├─ docs/                   # 📚 문서 보관 (신규 폴더)
│   ├─ archive/            # 구버전 문서
│   │   ├─ PROJECT_INTRO.md
│   │   ├─ STEP_BY_STEP_GUIDE.md
│   │   ├─ REFACTORING_PROGRESS.md
│   │   ├─ DESIGN_IMPROVEMENT_PLAN.md
│   │   ├─ PROJECT_COMPLETION_REPORT.md
│   │   ├─ PROJECT_FINAL_REPORT.md
│   │   └─ 중간진행보고서.md
│   │
│   └─ technical/          # 기술 문서
│       ├─ TECHNICAL_IMPLEMENTATION.md
│       ├─ TAILWIND_POSTCSS_NOTE.md
│       └─ MVP_PROJECT_DOCUMENTATION.md
│
├─ README.md               # 메인 README
├─ PREMIUM_RENEWAL_COMPLETE.md  # 최신 리뉴얼 보고서
├─ PROJECT_CLEANUP_DIAGNOSIS.md # 진단 리포트
├─ PROJECT_OVERVIEW.md     # 프로젝트 개요
│
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ postcss.config.cjs
└─ eslint.config.js
```

---

## 📊 구조 변경 요약

### 🗑️ 삭제할 폴더 (3개)
```
❌ src/components/admin/        → 완전 미사용
❌ src/components/auth/         → 완전 미사용
❌ src/components/contact/      → 상위 폴더로 통합
```

### 🗑️ 삭제할 파일 (~50개)
상세 목록은 진단 리포트 참조

### ➕ 새로 생성할 폴더 (2개)
```
+ docs/               → 문서 정리
+ docs/archive/       → 구버전 문서
+ docs/technical/     → 기술 문서
```

### 📦 재분류할 컴포넌트

#### `components/layout/` (신규 폴더)
```
src/components/Header.tsx         → src/components/layout/Header.tsx
src/components/Footer.tsx         → src/components/layout/Footer.tsx
src/components/MobileNav.tsx      → src/components/layout/MobileNav.tsx
```

#### `components/ui/` (신규 폴더)
```
src/components/SEOHead.tsx                → src/components/ui/SEOHead.tsx
src/components/DarkModeToggle.tsx         → src/components/ui/DarkModeToggle.tsx
src/components/ThemeToggle.tsx            → src/components/ui/ThemeToggle.tsx
src/components/LanguageSelector.tsx       → src/components/ui/LanguageSelector.tsx
src/components/ScrollToTop.tsx            → src/components/ui/ScrollToTop.tsx
src/components/FAQList.tsx                → src/components/ui/FAQList.tsx
src/components/NoticeList.tsx             → src/components/ui/NoticeList.tsx
src/components/ServiceDetailList.tsx      → src/components/ui/ServiceDetailList.tsx
src/components/ContactForm.tsx            → src/components/ui/ContactForm.tsx
src/components/ContactInfo.tsx            → src/components/ui/ContactInfo.tsx
src/components/StatCard.tsx               → src/components/ui/StatCard.tsx
src/components/SimpleChart.tsx            → src/components/ui/SimpleChart.tsx
src/components/DownloadList.tsx           → src/components/ui/DownloadList.tsx
src/components/FadeInView.tsx             → src/components/ui/FadeInView.tsx
src/components/OptimizedImage.tsx         → src/components/ui/OptimizedImage.tsx
src/components/PWAInstallPrompt.tsx       → src/components/ui/PWAInstallPrompt.tsx (옵션)
src/components/PWAStatusIndicator.tsx     → src/components/ui/PWAStatusIndicator.tsx (옵션)
```

---

## 🎯 폴더별 역할 정의

### `/components/common/`
**역할**: 가장 기본적인 UI 빌딩 블록  
**특징**: 
- props로 모든 동작 제어
- 비즈니스 로직 없음
- 재사용성 최대
- Storybook 대상

**예시**: Button, Card, Input, Textarea

### `/components/premium/`
**역할**: 프리미엄 디자인 시스템 컴포넌트  
**특징**:
- Glassmorphism 스타일
- CVA 기반 variants
- 고급 애니메이션
- 디자인 토큰 활용

**예시**: GlassCard, PremiumButton

### `/components/layout/`
**역할**: 페이지 레이아웃 구성 요소  
**특징**:
- 전역 네비게이션
- 헤더/푸터
- 레이아웃 구조

**예시**: Header, Footer, MobileNav

### `/components/ui/`
**역할**: 도메인 특화 UI 컴포넌트  
**특징**:
- 특정 기능 담당
- 약간의 비즈니스 로직 포함 가능
- 중간 수준 재사용성

**예시**: SEOHead, FAQList, ContactForm

### `/components/sections/`
**역할**: 페이지 섹션 (Hero, Features 등)  
**특징**:
- 페이지 구성 단위
- 여러 UI 컴포넌트 조합
- i18n 통합

**예시**: Hero, Features, Services

### `/layouts/`
**역할**: 페이지 전체 레이아웃 래퍼  
**특징**:
- Header + Content + Footer 조합
- 라우트별 레이아웃 변경

**예시**: MainLayout, MobileLayout

### `/pages/`
**역할**: 라우트별 페이지 컴포넌트  
**특징**:
- React Router 연결
- Sections 조합
- SEO 설정
- Lazy loading

**예시**: HomePage, ServicesPage

### `/docs/`
**역할**: 프로젝트 문서 보관  
**특징**:
- 버전별 보고서
- 기술 문서
- 아카이브

---

## 📏 컴포넌트 분류 기준

### Level 1: Common (최하위)
```typescript
// 순수 UI, 비즈니스 로직 없음
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

### Level 2: Premium (디자인 시스템)
```typescript
// 고급 스타일링, 디자인 토큰
<GlassCard variant="gradient" hover="lift">
  Premium content
</GlassCard>
```

### Level 3: UI (기능성)
```typescript
// 특정 기능 담당
<FAQList items={faqs} />
<ContactForm onSubmit={handleSubmit} />
```

### Level 4: Layout (구조)
```typescript
// 네비게이션, 레이아웃
<Header />
<Footer />
```

### Level 5: Sections (페이지 구성)
```typescript
// 페이지 섹션
<Hero />
<Features />
```

### Level 6: Pages (라우트)
```typescript
// 전체 페이지
<HomePage />
<ServicesPage />
```

---

## 🔄 Import 경로 변경 예시

### Before (현재)
```typescript
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQList from '../components/FAQList';
import SEOHead from '../components/SEOHead';
import Button from '../components/common/Button';
```

### After (정리 후)
```typescript
import { Header, Footer } from '../components/layout';
import { FAQList, SEOHead } from '../components/ui';
import { Button } from '../components/common';
```

또는 절대 경로 (권장):
```typescript
import { Header, Footer } from '@/components/layout';
import { FAQList, SEOHead } from '@/components/ui';
import { Button } from '@/components/common';
```

---

## 🎨 디렉토리 색상 코드 (IDE 설정 권장)

```
📁 common/    - 🟦 파란색 (기초)
📁 premium/   - 🟪 보라색 (프리미엄)
📁 layout/    - 🟩 초록색 (구조)
📁 ui/        - 🟨 노란색 (기능)
📁 sections/  - 🟧 주황색 (섹션)
📁 pages/     - 🟥 빨간색 (페이지)
```

---

## 📋 Export 패턴 (index.ts 활용)

### `/components/layout/index.ts`
```typescript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as MobileNav } from './MobileNav';
```

### `/components/ui/index.ts`
```typescript
export { default as SEOHead } from './SEOHead';
export { default as FAQList } from './FAQList';
export { default as ContactForm } from './ContactForm';
export { default as ContactInfo } from './ContactInfo';
// ... 기타
```

### `/components/common/index.ts`
```typescript
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Textarea } from './Textarea';
export { default as LazyImage } from './LazyImage';
export { default as SectionTitle } from './SectionTitle';
```

---

## ✅ 장점

### 1. 명확한 계층 구조
- 컴포넌트 역할이 명확
- 파일 찾기 쉬움
- 신규 개발자 이해 쉬움

### 2. 확장성
- 새 컴포넌트 추가 위치 명확
- 폴더별 독립성 유지
- 모듈화 용이

### 3. 유지보수성
- 폴더당 파일 수 적절 (5~15개)
- import 경로 일관성
- 의존성 추적 쉬움

### 4. 협업 친화적
- 컨벤션 명확
- 충돌 최소화
- 코드 리뷰 용이

### 5. 빌드 최적화
- 폴더별 code splitting 가능
- tree-shaking 최적화
- lazy loading 구조화

---

## 🚀 다음 단계

이 구조를 바탕으로:
1. ✅ 미사용 파일 삭제 계획 수립
2. ✅ 파일 이동 스크립트 작성
3. ✅ import 경로 일괄 수정
4. ✅ 빌드 & 테스트
5. ✅ 문서 업데이트

**다음 문서**: 정리 계획 수립
