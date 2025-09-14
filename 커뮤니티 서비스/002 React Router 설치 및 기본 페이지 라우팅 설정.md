좋아요! 😊
이제 React 프로젝트 설치가 완료되었으니, 두 번째 단계로 **라우터 설치 및 기본 세팅**을 진행할게요.

---

## ✅ 2단계: React Router 설치 및 기본 페이지 라우팅 설정

> 커뮤니티 서비스는 보통 여러 페이지(예: 홈, 글 목록, 글 상세, 글 작성 등)가 필요하기 때문에 **React Router DOM**을 먼저 세팅합니다.

---

### 📌 1. React Router DOM 설치

```bash
npm install react-router-dom
```

> 위 명령어를 실행하면 `react-router-dom` 패키지가 `node_modules`에 설치됩니다.

---

### 📁 디렉토리 구조 변경 안내

우리는 페이지 별로 컴포넌트를 구분해서 다음과 같은 구조로 구성할 예정이에요:

```
src/
├── pages/
│   ├── HomePage.js
│   ├── PostListPage.js
│   ├── PostDetailPage.js
│   └── PostWritePage.js
├── App.js
└── index.js
```

---

### 📄 파일: `src/pages/HomePage.js`

```jsx
import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>홈페이지</h1>
      <p>커뮤니티 서비스에 오신 것을 환영합니다.</p>
    </div>
  );
}

export default HomePage;
```

---

### 📄 파일: `src/pages/PostListPage.js`

```jsx
import React from 'react';

function PostListPage() {
  return (
    <div>
      <h1>글 목록</h1>
      <p>여기에 모든 글 목록이 표시됩니다.</p>
    </div>
  );
}

export default PostListPage;
```

---

### 📄 파일: `src/pages/PostDetailPage.js`

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { postId } = useParams(); // URL의 postId 값을 가져옴

  return (
    <div>
      <h1>글 상세 보기</h1>
      <p>현재 글 ID: {postId}</p>
    </div>
  );
}

export default PostDetailPage;
```

---

### 📄 파일: `src/pages/PostWritePage.js`

```jsx
import React from 'react';

function PostWritePage() {
  return (
    <div>
      <h1>글 작성</h1>
      <p>여기에 새 글 작성 폼이 들어갈 예정입니다.</p>
    </div>
  );
}

export default PostWritePage;
```

---

### 📄 파일: `src/App.js` 수정

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="/write" element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### 📄 파일: `src/index.js`는 기본 그대로 사용합니다

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### ✅ 실행 확인

```bash
npm start
```

브라우저에서 아래 주소를 확인해보세요:

* `/` → 홈
* `/posts` → 글 목록
* `/posts/1` → 글 상세 (ID: 1)
* `/write` → 글 작성

---

이제 라우팅이 준비되었어요!
다음 단계로 **원하는 기능을 말해주세요**.

예시:

* “백엔드에서 글 목록 불러오고 싶어”
* “글 작성 폼부터 만들어줘”
* “상단에 메뉴(네비게이션 바) 달아줘”

> 다음 기능을 말해주면 박하가 **코드 + 주석 + 백엔드 요청 코드까지 포함**해서 만들어줄게요!
