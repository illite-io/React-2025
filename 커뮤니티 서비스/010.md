좋아요! 😄
이번 단계에서는 **전체 UI를 간단하게 스타일링**해서 보기 좋게 바꾸겠습니다.

---

## ✅ 10단계: 전체 UI 스타일링 (기본 CSS)

> Tailwind, Bootstrap 같은 라이브러리를 쓰기 전, 먼저 **간단한 CSS로 기본 스타일**을 적용해볼게요.
> 공통 스타일 파일을 만들고, 각 페이지에 적용해봅니다.

---

### 📁 파일 구조

```
src/
├── styles/
│   └── Global.css      ✅ 전체 공통 스타일 정의
├── index.js            ✅ 글로벌 스타일 적용
├── components/
├── pages/
```

---

## 📄 1. 파일 생성: `src/styles/Global.css`

```css
/* src/styles/Global.css */

body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

a {
  text-decoration: none;
  color: #0070f3;
}

a:hover {
  text-decoration: underline;
}

nav {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

h1, h2, h3 {
  color: #222;
}

form input, form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px 16px;
  background-color: #0070f3;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #005bb5;
}

ul {
  padding-left: 20px;
}

button {
  margin-right: 8px;
}
```

---

## 📄 2. 파일 수정: `src/index.js`

> 전체 앱에 `Global.css`를 적용합니다.

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Global.css'; // ✅ 글로벌 스타일 적용

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## ✅ 반영 결과

* 버튼, 입력창, 텍스트 기본 스타일 적용
* 메뉴바, 타이틀, 글 내용, 댓글 목록 모두 보기 좋게 정돈됨

---

## 💡 선택적으로 적용 가능한 라이브러리

추후 더 나은 디자인을 원하시면 아래도 도입할 수 있어요:

| 라이브러리        | 설명                |
| ------------ | ----------------- |
| Tailwind CSS | 유틸리티 기반 빠른 커스터마이징 |
| Material UI  | 구글 스타일의 UI 컴포넌트   |
| Bootstrap    | 고전적이지만 안정적인 디자인   |

필요하시면 설치부터 적용까지 단계별로 알려드릴게요.

---

## ✅ 다음 기능 제안

이제 커뮤니티 UI도 깔끔해졌어요!
이어서 어떤 기능을 추가할까요?

* ⚠️ “입력값 유효성 검사 추가해줘 (빈칸 체크 등)”
* 🔍 “글 제목 검색 기능 추가해줘”
* 🕐 “글 작성일/수정일을 표시해줘 (timestamp)”
* 📦 “localStorage에 저장하는 예시도 보여줘”

> 원하시는 기능 말씀해주세요.
> 박하가 또 다음 단계로 깔끔하게 만들어드릴게요!
