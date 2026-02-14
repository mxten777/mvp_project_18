# 프로젝트 개요: 기쁨글로리 재가복지센터 홈페이지

## 프로젝트 성격
  # 프로젝트 개요: 바이칼 재가복지센터

  ## 프로젝트 성격
  - **목적:** 재가복지센터(시니어 대상) 공식 홈페이지 및 관리자 시스템 제공
  - **대상:** 어르신(시니어), 보호자, 센터 관리자
  - **주요 특징:** 접근성 중심 디자인, 모바일 최적화, 관리자·일반 사용자 분리, 상담신청/자료실/공지 등

  ## 기술 스택
  - **Frontend:** Vite + React + TypeScript + Tailwind CSS
  - **Backend:** Firebase (인증, DB, 파일 스토리지) — 로컬/모의 데이터 포함
  - **배포:** Vercel(또는 원하는 호스팅)

  ## 폴더/파일 구조 (주요)
  ```
  src/
    components/
      Header.tsx
      Footer.tsx
      Hero.tsx
      Features.tsx
      FAQList.tsx
      AdminDashboard.tsx
    pages/
    App.tsx
    main.tsx
  public/
    test.html
    icons/
  ```

  ## 주요 기능
  - 메인/서비스 소개/이용 절차/비용/공지/자료실/후기/FAQ/연락처/상담신청
  - 관리자 기능: 공지·자료·회원·상담신청 관리 대시보드
  - 접근성: 키보드 네비게이션, ARIA, 고대비/큰 글씨 지원
  - 실시간 기능: 챗봇, 실시간 통계, 영상 통화(옵션)

  ## 향후 작업(권장)
  1. Firebase 실제 연동 및 시드 데이터 적용
  2. 도메인 연결 및 Vercel 재배포
  3. SEO/OG 태그·파비콘 보강
  4. 접근성 최종 점검 및 사용자 테스트
  5. 운영 문서(README/배포 가이드) 정리

  ## 참고 문서
  - `PROJECT_INTRO.md`, `PROJECT_FINAL_REPORT.md`, `중간진행보고서.md`
