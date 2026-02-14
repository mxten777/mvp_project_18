# 디자인 개선 계획

## 현재 문제점 분석

### 1. 레이아웃 구조
- Hero 섹션이 너무 길고 정보 밀도가 낮음
- 섹션 간 여백이 불규칙 (py-12, py-16, py-20 등 혼재)
- 배경색 패턴이 불규칙 (흰색 → 회색 → 흰색)

### 2. 타이포그래피
- 제목 크기가 섹션마다 다름 (text-2xl, text-3xl, text-4xl 혼재)
- 폰트 굵기 일관성 부족 (font-semibold, font-bold 혼재)
- 행간과 자간이 최적화되지 않음

### 3. 색상 시스템
- 파란색 톤이 일관되지 않음 (blue-500, blue-600 등)
- 그라데이션 사용이 과도함
- 강조 색상이 명확하지 않음

## 개선 방안

### Phase 1: 디자인 시스템 정립 (즉시 적용 가능)

1. **섹션 레이아웃 표준화**
   ```
   - 모든 섹션: py-20 (모바일 py-12)
   - 최대 너비: max-w-7xl
   - 좌우 패딩: px-4 sm:px-6
   - 배경색 패턴: 흰색 → 회색(50) → 흰색 반복
   ```

2. **타이포그래피 시스템**
   ```
   - 섹션 제목(H2): text-3xl md:text-4xl, font-bold
   - 섹션 부제: text-lg md:text-xl, text-gray-600
   - 카드 제목(H3): text-xl md:text-2xl, font-semibold
   - 본문: text-base, leading-relaxed
   ```

3. **색상 팔레트 통일**
   ```
   - Primary: blue-600 (버튼, 링크, 강조)
   - Secondary: gray-800 (제목)
   - Text: gray-700 (본문)
   - Background: white, gray-50
   - Accent: green-500 (CTA, 긍정적 요소)
   ```

4. **간격 시스템**
   ```
   - 섹션 간: mb-20
   - 제목-부제: mb-4
   - 부제-콘텐츠: mb-12
   - 카드 간격: gap-8
   ```

### Phase 2: 컴포넌트 재설계 (선택 적용)

1. **Hero 섹션 최적화**
   - 높이 축소 (현재 py-32 → py-20)
   - 신뢰 지표를 별도 섹션으로 분리
   - 핵심 메시지만 남기기

2. **Features 섹션 강화**
   - 아이콘 크기 통일
   - 카드 그림자 일관성
   - 호버 효과 통일

3. **Services 섹션 개선**
   - 가격 표시 방식 통일
   - 서비스 설명 길이 제한
   - 특징 목록 일관성

4. **CTA 버튼 최적화**
   - 크기와 여백 통일
   - 색상과 호버 효과 일관성
   - 배치 위치 최적화

### Phase 3: 반응형 최적화 (권장)

1. **모바일 우선 디자인**
   - 텍스트 크기 최적화
   - 터치 영역 확대 (최소 44px)
   - 스크롤 경험 개선

2. **브레이크포인트 정리**
   ```
   - sm: 640px (모바일 가로)
   - md: 768px (태블릿)
   - lg: 1024px (데스크톱)
   - xl: 1280px (대형 화면)
   ```

## 즉시 적용 가능한 개선 작업

### 1. 섹션 여백 통일
- 모든 섹션에 `py-20` 적용
- 섹션 간 `space-y-0` (배경색으로 구분)

### 2. 제목 스타일 통일
- 모든 섹션 제목: `text-3xl md:text-4xl font-bold text-gray-800`
- 모든 부제: `text-lg md:text-xl text-gray-600`

### 3. 배경색 패턴 적용
```
Hero: bg-gradient-to-br from-blue-50
Features: bg-gray-50
Services: bg-white
Steps: bg-gray-50
FAQ: bg-white
Contact: bg-gray-50
```

### 4. 카드 스타일 통일
```
className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
```

## 적용 여부 결정

선택해주세요:
1. **A안: 전체 재설계** (시간 많이 소요, 완전히 새로운 느낌)
2. **B안: 점진적 개선** (현재 구조 유지, 일관성만 개선) ⭐ 추천
3. **C안: 핵심만 수정** (가장 눈에 띄는 부분만)

B안을 추천드립니다. 현재 구조를 유지하면서 일관성을 높이는 것이 가장 효율적입니다.
