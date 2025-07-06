좋아요! 😊
이번 단계에서는 **상단 네비게이션 바(Navigation Bar)** 를 추가하겠습니다.
이 네비게이션 바를 통해 사용자가 **홈, 글 목록, 글 작성 페이지**로 쉽게 이동할 수 있도록 만들게요.

---

## ✅ 8단계: 상단 네비게이션 바 (Navigation Bar) 추가

---

### ✅ 목표

* 모든 페이지에 **공통으로 보여지는 네비게이션 바** 추가
* 메뉴: 🏠 홈 / 📄 글 목록 / ✍️ 글 작성
* 클릭 시 각각의 경로로 이동

---

### 📁 구조

```
src/
├── components/
│   └── Navbar.js      ✅ 새로 추가할 컴포넌트
├── App.js             ✅ 수정하여 Navbar 포함
```

---

### 📄 파일 생성: `src/components/Navbar.js`

```jsx
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
  };

  return (
    <nav style={navStyle}>
      <Link to="/">🏠 홈</Link>
      <Link to="/posts">📄 글 목록</Link>
      <Link to="/write">✍️ 글 작성</Link>
    </nav>
  );
};

export default Navbar;
```

---

### 📄 파일 수정: `src/App.js`

> 페이지마다 공통적으로 Navbar를 상단에 포함시킵니다.

```jsx
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostWritePage from './pages/PostWritePage';
import PostEditPage from './pages/PostEditPage';
import Navbar from './components/Navbar'; // ✅ 네비게이션 바 추가

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ 항상 보이는 메뉴바 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="/edit/:postId" element={<PostEditPage />} />
        <Route path="/write" element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## ✅ 실행 결과

* 페이지 상단에 항상 아래 메뉴가 표시됩니다:

```
🏠 홈 | 📄 글 목록 | ✍️ 글 작성
```

* 클릭하면 해당 경로로 이동
* 사용자는 더 이상 브라우저 “뒤로 가기” 버튼 없이도 자유롭게 이동 가능

---

## 🎁 보너스: 메뉴 스타일 더 이쁘게 하고 싶다면?

나중에 원하시면 Tailwind CSS나 Material UI, styled-components를 사용할 수도 있어요.
원하시면 그때 적용 방법도 자세히 알려드릴게요!

---

## ✅ 다음 기능 추천

이제 네비게이션도 잘 붙었어요!
다음은 아래 중에서 고르실 수 있어요:

* 💬 “댓글 기능 추가해줘 (글마다 댓글 여러 개 작성 가능)”
* 🎨 “전체 페이지에 간단한 스타일 적용해줘”
* ⚠️ “빈칸 막는 유효성 검사 넣어줘”
* 📦 “서버 없이 브라우저에 저장하는 방식도 알려줘 (localStorage)”

> 원하시는 기능 말씀해 주세요!
> 박하가 **파일명/경로/전체 코드 + 주석 포함**해서 이어서 자세히 만들어드릴게요!
