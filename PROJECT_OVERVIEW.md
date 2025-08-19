# 프로젝트 개요: 호수바이칼 재가복지센터 홈페이지

## 프로젝트 성격
- **목적:** 재가복지센터(실버대상) 공식 홈페이지 및 관리자 시스템
- **대상:** 시니어(실버) 사용자 및 보호자, 센터 관리자
- **주요 특징:**
  - 접근성/가독성/모바일 최적화
  - 시니어 친화적, 고급스러운 UI/UX
  - 관리자/일반 사용자 분리
  - 공지, 자료실, 상담신청, 마이페이지, 서비스 소개 등 제공
  - Firebase 백엔드, Vercel 배포, GitHub 연동

## 기술 스택
- **Frontend:** Vite + React + TypeScript + Tailwind CSS v4
- **Routing:** React Router v6
- **State/Logic:** React Hooks, 컴포넌트 기반 구조
- **Backend:** Firebase (인증, DB, 파일)
- **배포:** Vercel
- **버전관리:** Git, GitHub

## 폴더/파일 구조 (주요)
```
src/
  components/
    Header.tsx         // 상단 네비게이션, 로고, 메뉴
    Footer.tsx         // 하단 정보, 연락처, 저작권
    Hero.tsx           // 메인 인트로 섹션
    Features.tsx       // 주요 서비스/특장점
    Steps.tsx          // 이용 절차 안내
    TestimonialList.tsx// 후기/리뷰 리스트
    FAQList.tsx        // 자주 묻는 질문
    Button.tsx         // 공통 버튼 컴포넌트
    Card.tsx           // 공통 카드 컴포넌트
    AdminDashboard.tsx // 관리자 대시보드
    AdminNotice.tsx    // 관리자 공지 CRUD
    AdminDownload.tsx  // 관리자 자료실 CRUD
    AdminUser.tsx      // 관리자 회원 관리
    AdminApplication.tsx// 관리자 상담신청 관리
  pages/               // 라우트별 페이지
  App.tsx              // 라우터/전체 레이아웃
  main.tsx             // 진입점
public/
  ...                  // 정적 파일, 파비콘 등
```

## 주요 기능
- **메인/소개/서비스/비용/공지/자료실/후기/FAQ/연락처/상담신청/마이페이지**
- **관리자:** 대시보드, 공지/자료실/회원/상담신청 관리
- **접근성:** 폰트, 명도, 키보드, aria, 반응형
- **시니어 친화적 UI/UX:** 큰 글씨, 명확한 버튼, 고대비, 직관적 구조

---

# 추가 진행사항 (To-Do)
1. 관리자 기능별 상세 테스트 및 버그 수정
2. Firebase 연동(인증, DB, 파일) 실제 데이터 적용
3. Vercel 재배포 및 도메인 연결
4. SEO/OG 태그, 파비콘 등 메타데이터 보강
5. 접근성(웹표준) 최종 점검
6. 사용자 피드백 반영(시니어/관리자)
7. (선택) 알림/푸시, 챗봇 등 부가 기능
8. README.md, 운영/배포 문서화
