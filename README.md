# DevHub-frontend

## 🔹 프로젝트 개요

- React 18 기반 SPA (Single Page Application)
- Vite로 빠른 빌드 및 개발 환경 제공
- 주요 기능:

  - JSON Formatter (`JsonPage`)
  - Base64 Encoder/Decoder (`Base64Page`)
  - SHA-256 Crypto Hash Generator (`CryptoPage`)
  - GuestBook API 연동 (`GuestBookPage`)

- 공통 페이지 레이아웃 컴포넌트(`PageLayout`)를 사용하여 일관된 UI 유지

---

## ⚡ 기술 스택

| 구분      | 라이브러리/도구      | 버전   |
| --------- | -------------------- | ------ |
| Frontend  | React                | 18.3.1 |
| Router    | React Router DOM     | 7.9.5  |
| HTTP 요청 | Axios                | 1.13.2 |
| Crypto    | Crypto-js            | 4.2.0  |
| Bundler   | Vite                 | 7.1.7  |
| Lint      | ESLint + React Hooks | 9.x    |

---

## 🏁 설치 및 실행

```bash
# 1. 저장소 클론
git clone <레포지토리 URL>
cd devhub-front

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
# 브라우저에서 http://localhost:5173/ 접속
```

### 🔧 빌드 및 미리보기

```bash
# 1. 빌드
npm run build

# 2. 빌드 결과 미리보기
npm run preview
```

---

## 🗂️ 프로젝트 구조

```
devhub-front/
├─ public/
├─ src/
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ JsonPage.jsx
│  │  ├─ Base64Page.jsx
│  │  ├─ CryptoPage.jsx
│  │  ├─ GuestBookPage.jsx
│  │  └─ PageLayout.jsx
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
├─ package.json
└─ vite.config.js
```

- `pages/PageLayout.jsx`: 모든 페이지에서 공통으로 사용하는 레이아웃 컴포넌트
- `pages/*.jsx`: 각 기능 페이지 (JSON, Base64, Crypto, GuestBook)
- `App.jsx`: 라우터 및 상단 네비게이션 정의
- `App.css`: 글로벌 스타일 및 공통 UI 스타일

---

## 🌐 주요 페이지

| 경로         | 페이지                 | 설명                             |
| ------------ | ---------------------- | -------------------------------- |
| `/`          | Home                   | 프로젝트 소개 및 안내            |
| `/json`      | JSON Formatter         | 입력 JSON 문자열 포맷팅 및 확인  |
| `/base64`    | Base64 Encoder/Decoder | 문자열 인코딩/디코딩             |
| `/crypto`    | Crypto Hash Generator  | SHA-256 해시 생성                |
| `/guestbook` | GuestBook              | API와 연동된 방명록 조회 및 입력 |

---

## 💡 개발 가이드

1. 공통 레이아웃(`PageLayout`)을 사용하여 페이지 UI 통일
2. API 호출 시 `fetch` 사용 -> 추후 변경 예정
3. 스타일은 `App.css` 또는 각 페이지별 inline 스타일/모듈 CSS 사용 가능

---

## 📌 참고

- React Router v7 기준으로 `Routes` 및 `Route` 사용
- Crypto는 브라우저 내장 `crypto.subtle` 또는 `crypto-js` 사용 가능
- Vite는 ES 모듈 기반으로 `type: "module"` 설정 필요

---

## 🛠️ ESLint 및 코드 품질

```bash
# ESLint 검사
npm run lint
```

- `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` 포함
- 코드 일관성 유지 및 오류 예방

---
