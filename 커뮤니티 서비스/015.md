좋아요! 😊
이번에는 브라우저의 **localStorage를 사용하는 예시**를 구현해보겠습니다.

---

## ✅ 15단계: localStorage 사용 예시 – 작성자 이름 기억하기

---

### ✨ 목표

* 글을 작성할 때나 댓글을 작성할 때 자주 입력하는 **작성자(author) 이름을 localStorage에 저장**
* 다음 방문 시 자동으로 author 필드에 **저장된 이름이 미리 채워짐**
* 사용자가 작성자 이름을 바꾸면 자동으로 localStorage도 업데이트됨

---

## 📁 적용 대상 파일

```
src/pages/
├── PostWritePage.js       ✅ 글 작성자 자동 저장
src/components/
├── CommentForm.js         ✅ 댓글 작성자 자동 저장
```

---

## 📄 파일 수정: `src/pages/PostWritePage.js`

```jsx
// src/pages/PostWritePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PostWritePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(localStorage.getItem('author') || ''); // ✅ 기본값
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ 작성자 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem('author', author);
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !content) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const newPost = {
      title,
      author,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error('글 등록 실패');

      navigate('/posts');
    } catch {
      setError('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>글 작성하기</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>제목:</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />

        <label>작성자:</label><br />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} /><br />

        <label>내용:</label><br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} /><br />

        <button type="submit">글 등록</button>
      </form>
    </div>
  );
}

export default PostWritePage;
```

---

## 📄 파일 수정: `src/components/CommentForm.js`

```jsx
// src/components/CommentForm.js
import React, { useState, useEffect } from 'react';

function CommentForm({ postId, onCommentAdded }) {
  const [author, setAuthor] = useState(localStorage.getItem('author') || '');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // ✅ 작성자 입력값을 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('author', author);
  }, [author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author || !content) {
      setError('작성자와 내용을 모두 입력해주세요.');
      return;
    }

    const newComment = {
      postId: Number(postId),
      author,
      content,
    };

    try {
      const res = await fetch('http://localhost:4000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error();

      setContent('');
      setError('');
      onCommentAdded();
    } catch {
      setError('댓글 등록 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>댓글 작성</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="작성자"
      /><br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        rows={3}
      /><br />
      <button type="submit">댓글 등록</button>
    </form>
  );
}

export default CommentForm;
```

---

## ✅ 실행 결과

* 글 또는 댓글을 한번 작성하면 작성자 이름이 localStorage에 저장됨
* 다음 방문 시 자동으로 채워짐
* 글/댓글 폼 모두 같은 이름으로 공유됨 (`author`)

---

## ✅ 다음 기능 제안

이제 사용자 이름을 기억하는 UX도 좋아졌어요!

다음으로 원하시는 기능은?

* 🧹 “삭제 확인을 alert 말고, 예쁜 커스텀 모달로 바꿔줘”
* 📱 “모바일에서도 보기 좋게 반응형 UI 구성해줘”
* 🌈 “TailwindCSS 또는 Material UI 적용하고 싶어”
* 📎 “파일 업로드 기능도 붙이고 싶어”

> 어떤 기능이든 말씀해주세요!
> 박하가 이어서 경로, 코드, 설명 포함해서 도와드릴게요.
