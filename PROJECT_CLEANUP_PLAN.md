# 🗂️ 프로젝트 정비 실행 계획

**계획일**: 2026-02-14  
**원칙**: 
1. 기존 동작을 절대 깨지 않도록 한다
2. UI/기능 변경 없이 구조만 개선한다
3. 삭제 전 반드시 사용 여부를 분석한다  
4. 단계별로 정리한다 (한 번에 대량 삭제 금지)

---

## 📊 Phase별 작업 개요

| Phase | 목표 | 작업량 | 위험도 | 소요 시간 |
|-------|-----|--------|--------|----------|
| Phase 1 | 안전 정리 | ~50개 파일 | 🟢 Low | 10분 |
| Phase 2 | 구조 정리 | ~17개 파일 | 🟡 Medium | 15분 |
| Phase 3 | 유지보수 준비 | ~15개 파일 | 🟢 Low | 10분 |

**총 작업 시간**: 약 35분  
**총 파일 변경**: ~82개 파일

---

## 🟢 Phase 1: 안전 정리 (미사용 파일 제거)

### 목표
- 확실히 사용되지 않는 파일만 삭제
- import가 없는 컴포넌트 제거
- 빌드에 영향 없음을 보장

### 작업 목록

#### 1-1. 미사용 Hero 변형 삭제 (2개)
```bash
❌ DELETE src/components/sections/Hero.simple.tsx
❌ DELETE src/components/sections/Hero.complex.tsx
```
**안전성**: ✅ 100% 안전 (import 없음)  
**영향**: 없음

#### 1-2. 미사용 대시보드 컴포넌트 삭제 (10개)
```bash
❌ DELETE src/components/Dashboard.tsx
❌ DELETE src/components/AIDashboard.tsx
❌ DELETE src/components/SecurityDashboard.tsx
❌ DELETE src/components/AnalyticsDashboard.tsx
❌ DELETE src/components/CollaborationDashboard.tsx
❌ DELETE src/components/GlobalizationDashboard.tsx
❌ DELETE src/components/CustomAnalytics.tsx
❌ DELETE src/components/SimpleAnalytics.tsx
❌ DELETE src/components/RealTimeStats.tsx
❌ DELETE src/components/PredictionAnalytics.tsx
```
**안전성**: ✅ 100% 안전 (AppPC 인라인 페이지 사용 중)  
**영향**: 없음

#### 1-3. 미사용 고급 기능 컴포넌트 삭제 (15개)
```bash
❌ DELETE src/components/SystemMonitor.tsx
❌ DELETE src/components/PerformanceMonitor.tsx
❌ DELETE src/components/BundleAnalyzer.tsx
❌ DELETE src/components/VideoCallSystem.tsx
❌ DELETE src/components/RealtimeChat.tsx
❌ DELETE src/components/ChatInterface.tsx
❌ DELETE src/components/SmartChatbot.tsx
❌ DELETE src/components/AIChatbotSection.tsx
❌ DELETE src/components/MFAComponent.tsx
❌ DELETE src/components/NotificationSystem.tsx
❌ DELETE src/components/CollaborationSection.tsx
❌ DELETE src/components/AIFeaturesSection.tsx
❌ DELETE src/components/SecurityFeaturesSection.tsx
❌ DELETE src/components/PersonalizationQuiz.tsx
❌ DELETE src/components/QuizSection.tsx
❌ DELETE src/components/QuizResult.tsx
```
**안전성**: ✅ 100% 안전 (모두 미구현 Phase 5 기능)  
**영향**: 없음

#### 1-4. 미사용 접근성/고급 UI 컴포넌트 삭제 (8개)
```bash
❌ DELETE src/components/AccessibilityToolbar.tsx
❌ DELETE src/components/AccessibleHero.tsx
❌ DELETE src/components/AccessibleNavigation.tsx
❌ DELETE src/components/AdvancedHero.tsx
❌ DELETE src/components/FloatingParticles.tsx
❌ DELETE src/components/ScrollProgress.tsx
❌ DELETE src/components/BackToTop.tsx
❌ DELETE src/components/LazyWrapper.tsx
```
**안전성**: ✅ 100% 안전 (프리미엄 리뉴얼로 대체)  
**영향**: 없음

#### 1-5. 미사용 센터/페이지 컴포넌트 삭제 (4개)
```bash
❌ DELETE src/components/PrivacyCenter.tsx
❌ DELETE src/components/SecurityCenter.tsx
❌ DELETE src/components/AdvancedSecurityDashboard.tsx
❌ DELETE src/components/MyPage.tsx
```
**안전성**: ⚠️ 주의 (SecurityCenter는 AppPC에서 참조하나 미사용)  
**영향**: AppPC.tsx의 SecurityCenterPage 라우트 제거 필요 (인라인 코드)

#### 1-6. Admin 폴더 전체 삭제 (1폴더 + 5파일)
```bash
❌ DELETE src/components/admin/ (폴더 전체)
  - AdminDashboard.tsx
  - AdminApplication.tsx
  - AdminDownload.tsx
  - AdminNotice.tsx
  - AdminUser.tsx
```
**안전성**: ✅ 100% 안전 (완전 미사용)  
**영향**: 없음

#### 1-7. Auth 폴더 전체 삭제 (1폴더 + 3파일)
```bash
❌ DELETE src/components/auth/ (폴더 전체)
  - Login.tsx
  - SecureLogin.tsx
  - SignUp.tsx
```
**안전성**: ✅ 100% 안전 (UI 미연결)  
**영향**: 없음

#### 1-8. Contact 폴더 전체 삭제 (1폴더 + 3파일)
```bash
❌ DELETE src/components/contact/ (폴더 전체)
  - ContactForm.tsx  (상위에 동일 파일 존재)
  - ContactInfoCard.tsx
  - ContactInfoList.tsx
```
**안전성**: ✅ 100% 안전 (상위 폴더 사용 중)  
**영향**: 없음

#### 1-9. 기타 미사용 컴포넌트 삭제 (3개)
```bash
❌ DELETE src/components/NotFound.tsx (pages/NotFoundPage.tsx 사용)
❌ DELETE src/components/MapSection.tsx
❌ DELETE src/components/TestimonialList.tsx
```
**안전성**: ✅ 100% 안전  
**영향**: 없음

#### 1-10. 미사용 레이아웃 삭제 (1개)
```bash
❌ DELETE src/layouts/AdminLayout.tsx
```
**안전성**: ✅ 100% 안전 (import 없음)  
**영향**: src/layouts/index.ts에서 export 제거 필요

### Phase 1 요약
```
❌ 삭제 파일: 51개
❌ 삭제 폴더: 3개 (admin, auth, contact)
📝 수정 파일: 2개 (AppPC.tsx, layouts/index.ts)
✅ 안전성: 높음
⏱️ 예상 시간: 10분
```

---

## 🟡 Phase 2: 구조 정리 (폴더 재배치 & 통합)

### 목표
- 컴포넌트를 기능별 폴더로 재분류
- import 경로 일괄 수정
- index.ts 파일 작성

### 작업 목록

#### 2-1. layout 폴더 생성 및 파일 이동 (3개)
```bash
📁 CREATE src/components/layout/

🔄 MOVE src/components/Header.tsx 
       → src/components/layout/Header.tsx
       
🔄 MOVE src/components/Footer.tsx
       → src/components/layout/Footer.tsx
       
🔄 MOVE src/components/MobileNav.tsx
       → src/components/layout/MobileNav.tsx

📝 CREATE src/components/layout/index.ts
```

**영향 받는 파일**:
```
- src/layouts/MainLayout.tsx (import 경로 수정)
- src/layouts/MobileLayout.tsx (import 경로 수정)
```

#### 2-2. ui 폴더 생성 및 파일 이동 (14개)
```bash
📁 CREATE src/components/ui/

🔄 MOVE src/components/SEOHead.tsx → src/components/ui/
🔄 MOVE src/components/DarkModeToggle.tsx → src/components/ui/
🔄 MOVE src/components/ThemeToggle.tsx → src/components/ui/
🔄 MOVE src/components/LanguageSelector.tsx → src/components/ui/
🔄 MOVE src/components/ScrollToTop.tsx → src/components/ui/
🔄 MOVE src/components/FAQList.tsx → src/components/ui/
🔄 MOVE src/components/NoticeList.tsx → src/components/ui/
🔄 MOVE src/components/ServiceDetailList.tsx → src/components/ui/
🔄 MOVE src/components/ContactForm.tsx → src/components/ui/
🔄 MOVE src/components/ContactInfo.tsx → src/components/ui/
🔄 MOVE src/components/StatCard.tsx → src/components/ui/
🔄 MOVE src/components/SimpleChart.tsx → src/components/ui/
🔄 MOVE src/components/DownloadList.tsx → src/components/ui/
🔄 MOVE src/components/FadeInView.tsx → src/components/ui/

📝 CREATE src/components/ui/index.ts
```

**영향 받는 파일**:
```
- src/layouts/MainLayout.tsx
- src/layouts/MobileLayout.tsx
- src/AppPC.tsx
- src/AppMobile.tsx
- src/pages/HomePage.tsx
- src/components/sections/*.tsx
```

#### 2-3. PWA 컴포넌트 처리 (2개 - 옵션)
```bash
⚠️ OPTION 1: ui 폴더로 이동
🔄 MOVE src/components/PWAInstallPrompt.tsx → src/components/ui/
🔄 MOVE src/components/PWAStatusIndicator.tsx → src/components/ui/

⚠️ OPTION 2: 삭제 (현재 미사용)
❌ DELETE src/components/PWAInstallPrompt.tsx
❌ DELETE src/components/PWAStatusIndicator.tsx
```
**권장**: OPTION 2 (삭제) - 현재 미사용  
**안전성**: ✅ 안전 (import 없음)

#### 2-4. OptimizedImage 처리
```bash
🔄 MOVE src/components/OptimizedImage.tsx → src/components/ui/
```
**안전성**: ✅ 안전 (미사용이나 향후 활용 가능)

### Phase 2 요약
```
📁 생성 폴더: 2개 (layout, ui)
🔄 이동 파일: 17개
📝 생성 index.ts: 2개
📝 수정 import: ~15개 파일
✅ 안전성: 중간 (import 경로 수정 필요)
⏱️ 예상 시간: 15분
```

---

## 🟢 Phase 3: 유지보수 준비 (문서 & 구조 최적화)

### 목표
- 문서 정리 및 보관
- index.ts 파일 작성
- 코드 품질 개선

### 작업 목록

#### 3-1. docs 폴더 생성 및 문서 이동
```bash
📁 CREATE docs/
📁 CREATE docs/archive/
📁 CREATE docs/technical/

# 구버전 문서들 이동
🔄 MOVE PROJECT_INTRO.md → docs/archive/
🔄 MOVE STEP_BY_STEP_GUIDE.md → docs/archive/
🔄 MOVE REFACTORING_PROGRESS.md → docs/archive/
🔄 MOVE DESIGN_IMPROVEMENT_PLAN.md → docs/archive/
🔄 MOVE PROJECT_COMPLETION_REPORT.md → docs/archive/
🔄 MOVE PROJECT_FINAL_REPORT.md → docs/archive/
🔄 MOVE 중간진행보고서.md → docs/archive/

# 기술 문서 이동
🔄 MOVE TECHNICAL_IMPLEMENTATION.md → docs/technical/
🔄 MOVE TAILWIND_POSTCSS_NOTE.md → docs/technical/
🔄 MOVE MVP_PROJECT_DOCUMENTATION.md → docs/technical/

# 중복 파일 삭제
❌ DELETE 중간진행보고서.txt (중간진행보고서.md와 중복)
```

**루트에 남길 문서**:
```
✅ README.md (메인)
✅ PROJECT_OVERVIEW.md (개요)
✅ PREMIUM_RENEWAL_COMPLETE.md (최신 리뉴얼)
✅ PROJECT_CLEANUP_DIAGNOSIS.md (진단)
✅ PROJECT_CLEANUP_STRUCTURE.md (구조)
✅ PROJECT_CLEANUP_PLAN.md (이 문서)
```

#### 3-2. index.ts 파일 작성/개선

**src/components/common/index.ts**
```typescript
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Textarea } from './Textarea';
export { default as LazyImage } from './LazyImage';
export { default as SectionTitle } from './SectionTitle';
```

**src/components/layout/index.ts** (신규)
```typescript
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as MobileNav } from './MobileNav';
```

**src/components/ui/index.ts** (신규)
```typescript
export { default as SEOHead } from './SEOHead';
export { default as DarkModeToggle } from './DarkModeToggle';
export { default as ThemeToggle } from './ThemeToggle';
export { default as LanguageSelector } from './LanguageSelector';
export { default as ScrollToTop } from './ScrollToTop';
export { default as FAQList } from './FAQList';
export { default as NoticeList } from './NoticeList';
export { default as ServiceDetailList } from './ServiceDetailList';
export { default as ContactForm } from './ContactForm';
export { default as ContactInfo } from './ContactInfo';
export { default as StatCard } from './StatCard';
export { default as SimpleChart } from './SimpleChart';
export { default as DownloadList } from './DownloadList';
export { default as FadeInView } from './FadeInView';
export { default as OptimizedImage } from './OptimizedImage';
```

**src/components/sections/index.ts** (기존 개선)
```typescript
export { default as Hero } from './Hero';
export { default as Features } from './Features';
export { default as Services } from './Services';
export { default as Steps } from './Steps';
export { default as CTA } from './CTA';
export { default as Contact } from './Contact';
```

**src/layouts/index.ts** (수정)
```typescript
export { default as MainLayout } from './MainLayout';
export { default as MobileLayout } from './MobileLayout';
// AdminLayout 삭제됨
```

#### 3-3. console.log 제거 (전체 검색)
```bash
# 검색 패턴
console\.(log|warn|debug|info)\(

# 제거 대상
- 디버깅용 console.log
- 주석 처리된 console
```
**예외**: console.error는 유지 (에러 로깅)

#### 3-4. 미사용 import 정리
```bash
# TypeScript unused import 검색
# ESLint로 자동 탐지 가능
```

#### 3-5. README.md 업데이트
```markdown
# 추가할 섹션
- 📁 프로젝트 구조 설명
- 🏗️ 폴더별 역할
- 📦 컴포넌트 계층 구조
- 🔧 개발 가이드
```

### Phase 3 요약
```
📁 생성 폴더: 3개 (docs, docs/archive, docs/technical)
🔄 이동 문서: 10개
❌ 삭제 문서: 1개
📝 생성/수정 index.ts: 5개
🧹 코드 정리: console.log, unused imports
📝 README 업데이트: 1개
✅ 안전성: 높음
⏱️ 예상 시간: 10분
```

---

## 📊 전체 작업 요약

### 작업량
```
❌ 삭제 파일: 52개 (컴포넌트 51 + 문서 1)
❌ 삭제 폴더: 3개 (admin, auth, contact)
📁 생성 폴더: 5개 (layout, ui, docs, docs/archive, docs/technical)
🔄 이동 파일: 27개 (컴포넌트 17 + 문서 10)
📝 생성/수정: 7개 (index.ts 5 + README 1 + AppPC 1)
📝 import 수정: ~15개 파일
```

### 파일 개수 변화
```
Before: components/ 폴더에 ~70개 파일
After:  components/ 폴더에 ~20개 파일 (폴더별로 분산)
  - common/: 6개
  - premium/: 3개
  - layout/: 3개
  - ui/: 15개
  - sections/: 6개
```

### 예상 번들 크기 감소
```
삭제 예상: ~500KB (미사용 코드)
실제 영향: Tree-shaking으로 이미 제외됨
효과: 코드베이스 명확성 증가
```

---

## 🎯 작업 순서 (중요!)

### 단계적 실행
```
1. ✅ Phase 1 실행
2. ✅ npm run build (빌드 확인)
3. ✅ npm run dev (로컬 테스트)
4. ✅ Phase 2 실행
5. ✅ npm run build (빌드 확인)
6. ✅ npm run dev (기능 확인)
7. ✅ Phase 3 실행
8. ✅ 최종 검증
```

### Rollback 계획
- Git commit을 phase별로 분리
- 문제 발생 시 즉시 rollback
- 각 단계별 백업 권장

---

## ⚠️ 주의사항

### DO (해야 할 것)
```
✅ Phase별로 순차 진행
✅ 각 단계마다 빌드 확인
✅ import 경로 정확히 수정
✅ Git commit 분리
✅ 백업 필수
```

### DON'T (하지 말아야 할 것)
```
❌ 한 번에 모두 삭제
❌ 빌드 확인 없이 진행
❌ import 수정 누락
❌ Git commit 하나로 통합
❌ 백업 없이 진행
```

---

## 🔧 자동화 스크립트 (옵션)

### Phase 1: 삭제 스크립트
```powershell
# cleanup-phase1.ps1
# Phase 1 파일 일괄 삭제
# (실제 코드 정리 단계에서 제공)
```

### Phase 2: 이동 스크립트
```powershell
# cleanup-phase2.ps1
# 파일 이동 및 import 경로 수정
# (실제 코드 정리 단계에서 제공)
```

---

## 🎯 성공 기준

### Phase 1 성공
```
✅ 빌드 성공
✅ 기존 페이지 모두 정상 작동
✅ 라우팅 정상
✅ 애니메이션 정상
```

### Phase 2 성공
```
✅ 빌드 성공
✅ import 경로 모두 정상
✅ 컴포넌트 렌더링 정상
✅ 레이아웃 깨짐 없음
```

### Phase 3 성공
```
✅ 문서 정리 완료
✅ index.ts 동작 확인
✅ ESLint 오류 없음
✅ TypeScript 오류 없음
```

---

**다음 단계**: Phase 1 실행
