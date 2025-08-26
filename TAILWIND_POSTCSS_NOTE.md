# ⚠️ Tailwind/PostCSS 중요 설정 및 오류 주의사항

## 필수 설정
- `postcss.config.cjs`의 plugins는 반드시 아래와 같이 작성해야 합니다:
  ```js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  ```
- 플러그인 이름이 `@tailwindcss/postcss` 등으로 잘못되면 Tailwind가 적용되지 않습니다.

## 적용이 안 될 때 점검 순서
1. `postcss.config.cjs`의 plugins 이름이 정확한지 확인
2. `src/index.css`에 Tailwind 지시문(@tailwind base; 등) 포함 여부 확인
3. `src/main.tsx`에서 `import './index.css'`가 있는지 확인
4. 설정 변경 후 반드시 아래 명령으로 캐시/빌드 산출물 삭제 및 재설치/재빌드
   ```powershell
   rm -r node_modules .vite dist
   pnpm install
   pnpm dev
   ```
5. 브라우저에서 "캐시 비우고 강력 새로고침"

## 실무 팁
- 중요한 설정/오류 포인트는 이 파일이나 README.md에 반드시 기록
- 커밋 메시지에도 주요 설정 변경 사항을 명확히 남길 것
- 신규 개발자나 본인이 재설치할 때 이 체크리스트를 꼭 확인

---

> 이 문서는 Tailwind, Vite, PostCSS 환경에서 발생할 수 있는 주요 오류와 예방을 위해 작성되었습니다.
