React와 Axios를 활용한 **기본 게시판 예제**를 다음과 같이 구성할 수 있습니다. 이 예시는 다음 기능을 포함합니다:

* 글 목록(List)
* 검색 기능(Search)
* 글 보기(View)
* 글 작성(Create)

---

## ✅ 전체 구조

```
/board-app
├── public/
├── src/
│   ├── api/
│   │   └── boardApi.js       // Axios 요청 모음
│   ├── components/
│   │   ├── BoardList.js      // 글 목록 + 검색
│   │   ├── BoardView.js      // 글 상세 보기
│   │   └── BoardForm.js      // 글 쓰기
│   ├── App.js                // 라우팅 설정
│   └── index.js
└── db.json                  // json-server용 데이터
```

---

## 📦 설치 준비

```bash
npm install axios react-router-dom json-server
```

---

## 📁 `db.json` (루트에 위치)

```json
{
  "posts": [
    { "id": 1, "title": "첫 글", "content": "안녕하세요", "author": "박하" },
    { "id": 2, "title": "두 번째 글", "content": "반가워요", "author": "홍길동" }
  ]
}
```

```bash
npx json-server --watch db.json --port 3001
```

---

## 📁 `src/api/boardApi.js`

```js
// 게시판 관련 axios 요청 정의
import axios from 'axios';

const API = 'http://localhost:3001/posts';

export const fetchPosts = (q = '') =>
  axios.get(`${API}?q=${q}`); // 검색도 처리

export const fetchPostById = (id) =>
  axios.get(`${API}/${id}`);

export const createPost = (post) =>
  axios.post(API, post);
```

---

## 📁 `src/components/BoardList.js`

```jsx
// 게시판 리스트 및 검색 컴포넌트
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/boardApi';

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');

  const loadPosts = async () => {
    const res = await fetchPosts(keyword);
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, [keyword]);

  return (
    <div>
      <h2>게시판</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
      />
      <Link to="/write">글쓰기</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/view/${post.id}`}>{post.title} - {post.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
```

---

## 📁 `src/components/BoardView.js`

```jsx
// 게시글 상세보기
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../api/boardApi';

function BoardView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(id).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.author}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default BoardView;
```

---

## 📁 `src/components/BoardForm.js`

```jsx
// 게시글 작성 폼
import React, { useState } from 'react';
import { createPost } from '../api/boardApi';
import { useNavigate } from 'react-router-dom';

function BoardForm() {
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글쓰기</h2>
      <input
        type="text"
        placeholder="제목"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="작성자"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <textarea
        placeholder="내용"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default BoardForm;
```

---

## 📁 `src/App.js`

```jsx
// 라우팅 설정
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardView from './components/BoardView';
import BoardForm from './components/BoardForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/view/:id" element={<BoardView />} />
        <Route path="/write" element={<BoardForm />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## ✅ 실행 순서

```bash
# 1. json-server 실행
npx json-server --watch db.json --port 3001

# 2. React 앱 실행
npm start
```

---

원하는 기능이 "수정", "삭제", "페이징", "정렬"까지 포함된다면 이어서 확장해드릴게요.
필요하시면 `작성된 예시 전체 zip` 파일도 제공해드릴 수 있어요. 원하시나요?

---

좋아요! 이어서 **수정 및 삭제 기능 추가 예시**를 설명드릴게요.

---

## 📁 `src/api/boardApi.js` (수정 & 삭제 API 추가)

```js
// 기존 코드 아래에 아래 두 줄 추가

export const updatePost = (id, post) =>
  axios.put(`${API}/${id}`, post); // 글 수정

export const deletePost = (id) =>
  axios.delete(`${API}/${id}`); // 글 삭제
```

---

## 📁 `src/components/BoardView.js` (수정/삭제 버튼 추가)

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../api/boardApi';

function BoardView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(id).then(res => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost(id);
      navigate('/');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.author}</p>
      <p>{post.content}</p>
      <Link to={`/edit/${id}`}>수정</Link>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default BoardView;
```

---

## 📁 `src/components/BoardEdit.js` (글 수정 폼)

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../api/boardApi';

function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    fetchPostById(id).then(res => setForm(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, form);
    navigate(`/view/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글 수정</h2>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <textarea
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit">수정 완료</button>
    </form>
  );
}

export default BoardEdit;
```

---

## 📁 `src/App.js` (라우터 수정 추가)

```jsx
import BoardEdit from './components/BoardEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/view/:id" element={<BoardView />} />
        <Route path="/write" element={<BoardForm />} />
        <Route path="/edit/:id" element={<BoardEdit />} /> {/* 수정 추가 */}
      </Routes>
    </Router>
  );
}
```

---

이제 게시판에서 글을 **수정**하고 **삭제**하는 기능까지 완성되었습니다.

---

다음은 페이징, 정렬, 카테고리 분류, 파일첨부 등도 확장할 수 있어요.
원하시면 `.zip`으로 전체 예제도 만들어드릴게요.
**"페이징 추가해줘"**, 또는 **"전체 압축파일 줘"** 라고 말씀해주세요!

---

이번엔 **페이징 기능**을 추가해보겠습니다.
json-server의 `_page`와 `_limit` 파라미터를 활용합니다.

---

## ✅ 1. API 수정 (페이지 처리 지원)

📁 `src/api/boardApi.js`

```js
// 기존 fetchPosts에 page와 limit 파라미터 추가
export const fetchPosts = (q = '', page = 1, limit = 5) =>
  axios.get(`http://localhost:3001/posts?q=${q}&_page=${page}&_limit=${limit}`);
```

---

## ✅ 2. BoardList 수정 - 페이징 적용

📁 `src/components/BoardList.js`

```jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/boardApi';

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 5;

  const loadPosts = async () => {
    const res = await fetchPosts(keyword, page, limit);
    setPosts(res.data);
    setTotalCount(parseInt(res.headers['x-total-count'], 10));
  };

  useEffect(() => {
    loadPosts();
  }, [keyword, page]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <h2>게시판</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setPage(1); // 검색 시 첫 페이지로 이동
          setKeyword(e.target.value);
        }}
        placeholder="검색어 입력"
      />
      <Link to="/write">글쓰기</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/view/${post.id}`}>{post.title} - {post.author}</Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 버튼 */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{ fontWeight: page === i + 1 ? 'bold' : 'normal' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BoardList;
```

---

## ✅ 3. 테스트를 위해 `db.json`에 데이터 늘리기

```json
{
  "posts": [
    { "id": 1, "title": "1번 글", "content": "내용입니다", "author": "작성자1" },
    { "id": 2, "title": "2번 글", "content": "내용입니다", "author": "작성자2" },
    { "id": 3, "title": "3번 글", "content": "내용입니다", "author": "작성자3" },
    ...
    { "id": 30, "title": "30번 글", "content": "내용입니다", "author": "작성자30" }
  ]
}
```

---

이제 **검색 + 페이징 기능**이 잘 작동합니다.

> `?q=검색어&_page=1&_limit=5` → 검색 결과도 페이지별로 나눠짐

---

필요하시면 다음 기능도 추가해드릴게요:

* ✅ 정렬 기능
* ✅ 카테고리
* ✅ 파일 업로드
* ✅ 로그인 인증
