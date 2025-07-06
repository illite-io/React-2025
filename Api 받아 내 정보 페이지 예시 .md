React + Axios로 \*\*내 정보(My Page)\*\*를 API로 받아와서 보여주는 간단한 예시를 보여드릴게요.
타입스크립트 없이 진행하며, 모든 코드에 주석을 자세히 달고, 파일 경로도 명시하겠습니다.

---

## ✅ 구조

```
src/
├── pages/
│   └── MyPage.js         ← 내 정보 페이지 컴포넌트
├── api/
│   └── userApi.js        ← 사용자 API 요청 정의
├── App.js
```

---

### 📁 `src/api/userApi.js`

```js
// 사용자 관련 API 정의
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소 설정
  withCredentials: true, // 쿠키 인증 등 필요한 경우
});

// 내 정보 불러오는 API
export const getMyInfo = async () => {
  const response = await api.get('/api/user/me'); // 예: /api/user/me
  return response.data;
};
```

---

### 📁 `src/pages/MyPage.js`

```js
import React, { useEffect, useState } from 'react';
import { getMyInfo } from '../api/userApi';

const MyPage = () => {
  // 사용자 정보 상태 정의
  const [user, setUser] = useState(null);

  // 로딩 여부 및 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 사용자 정보 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyInfo(); // API 호출
        setUser(data);                 // 사용자 정보 저장
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);            // 로딩 종료
      }
    };

    fetchData(); // 함수 실행
  }, []);

  // 로딩 중일 때
  if (loading) return <p>로딩 중...</p>;

  // 에러 발생 시
  if (error) return <p>{error}</p>;

  // 사용자 정보가 없을 경우
  if (!user) return <p>정보가 없습니다.</p>;

  // 사용자 정보 렌더링
  return (
    <div>
      <h1>내 정보</h1>
      <ul>
        <li><strong>이름:</strong> {user.name}</li>
        <li><strong>이메일:</strong> {user.email}</li>
        <li><strong>가입일:</strong> {user.createdAt}</li>
        {/* 필요한 필드 추가 */}
      </ul>
    </div>
  );
};

export default MyPage;
```

---

### 📁 `src/App.js` (라우팅 연결 예시)

```js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

### ✅ 백엔드 API 예시 (참고용)

```json
// GET /api/user/me 응답 예시
{
  "id": 1,
  "name": "홍길동",
  "email": "gildong@example.com",
  "createdAt": "2024-01-01"
}
```

---

원하는 경우:

* React Query 버전도 가능
* 토큰 인증 추가 가능
* 정보 수정 기능도 확장 가능

필요하시면 `"정보 수정 페이지"`나 `"React Query"` 버전도 바로 이어서 알려드릴게요.
계속하려면 **`.`** 눌러주세요.



게시판 글 보기 화면(예: `/board/:id`)에서 데이터 바인딩용으로 `useState`를 사용할 경우, 아래와 같은 네이밍을 추천드립니다. 역할에 따라 직관적이고 확장성 있게 설정하는 것이 좋습니다.

---

## ✅ 추천 네이밍 (변수 + set함수)

| 역할        | `useState` 변수명                | 설명                         |
| --------- | ----------------------------- | -------------------------- |
| 글 상세 데이터  | `post`, `setPost`             | 가장 기본적인 이름 (Post 객체 전체)    |
| 글 상세 데이터  | `postDetail`, `setPostDetail` | `post`보다 명확하게 "상세 정보"임을 표현 |
| API 응답 상태 | `loading`, `setLoading`       | 로딩 여부 처리                   |
| 에러 처리용    | `error`, `setError`           | 에러 메시지 또는 상태               |
| 댓글 리스트    | `comments`, `setComments`     | 글에 달린 댓글들                  |
| 작성자 정보    | `author`, `setAuthor`         | 글쓴이 정보 따로 저장 시             |
| 수정 가능 여부  | `isEditable`, `setIsEditable` | 로그인 사용자와 작성자 비교해서 표시할 때    |

---

## ✅ 예시

```js
const [postDetail, setPostDetail] = useState(null);      // 게시글 상세
const [comments, setComments] = useState([]);            // 댓글 리스트
const [loading, setLoading] = useState(true);            // 로딩 상태
const [error, setError] = useState(null);                // 에러 상태
const [isEditable, setIsEditable] = useState(false);     // 수정 가능 여부
```

---

## 📌 참고 기준

* `post`는 간단하지만 범용적이라 중복될 수 있음 → 상세용이면 `postDetail` 권장
* `boardItem`, `article`, `postData` 같은 네이밍도 가능하지만, 일관성 중요
* 여러 상태를 쓰게 될 경우 `useReducer` 또는 `usePostDetail()` 같은 커스텀 훅도 고려해볼 수 있음

---

원하시면 **게시글 보기 화면 전체 예시 코드**도 만들어 드릴게요. 계속하려면 "." 입력해주세요.



React에서 **컴포넌트에 문자열 props를 전달하고**, 이를 조합해서 출력하는 방식은 매우 흔한 패턴입니다.
간단한 예제를 통해 설명드릴게요.

---

## ✅ 예제: 문자열 Props 조합

### 1. 📁 `components/Greeting.js`

```jsx
import React from 'react';

// props로 name, title을 받아서 문장 조합
const Greeting = ({ name, title }) => {
  return (
    <p>
      {title} {name}님, 환영합니다!
    </p>
  );
};

export default Greeting;
```

### 2. 📁 `pages/Home.js`

```jsx
import React from 'react';
import Greeting from '../components/Greeting';

const Home = () => {
  const name = '홍길동';
  const title = '프론트엔드 개발자';

  return (
    <div>
      <h1>홈페이지</h1>
      <Greeting name={name} title={title} />
    </div>
  );
};

export default Home;
```

---

## ✅ 결과

> 프론트엔드 개발자 홍길동님, 환영합니다!

---

## ✅ 다양한 조합 방법

```jsx
<p>{`${title} ${name}님, 환영합니다!`}</p>              // 템플릿 문자열
<p>{[title, name].join(' ')}님, 환영합니다!</p>          // join으로 조합
<p>{title + ' ' + name + '님, 환영합니다!'}</p>          // 문자열 연산
```

---

## ✅ props 기본값 설정 (옵션)

```jsx
Greeting.defaultProps = {
  title: '고객',
  name: '사용자'
};
```

---

## ✅ TypeScript 사용 시 (선택)

```tsx
type Props = {
  name: string;
  title?: string;
};

const Greeting = ({ name, title = '고객' }: Props) => (
  <p>{title} {name}님, 환영합니다!</p>
);
```

---

필요하시면 `"컴포넌트 내부에서 조합된 문장 다시 분해해서 이벤트 처리"`하는 예제도 만들어드릴게요.
계속하려면 **`.`** 입력해주세요.
