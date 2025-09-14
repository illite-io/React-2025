좋아요! 😊
이번 단계에서는 **입력값 유효성 검사(Form Validation)** 기능을 추가하겠습니다.
사용자가 **빈칸으로 글을 작성하거나 댓글을 작성하지 못하도록 막고**, **적절한 안내 메시지를 보여주는 방식**으로 구현할게요.

---

## ✅ 11단계: 입력값 유효성 검사 (Form Validation)

---

### 💡 적용 대상

1. `글 작성 폼` (`PostWritePage`)
2. `글 수정 폼` (`PostEditPage`)
3. `댓글 작성 폼` (`CommentForm`)

---

### 📄 1. 파일 수정: `src/pages/PostWritePage.js`

```jsx
// src/pages/PostWritePage.js
// 추가된 부분: 유효성 검사, 경고 메시지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostWritePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !content) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const newPost = { title, author, content };

    try {
      const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error('글 등록 실패');

      navigate('/posts');
    } catch (err) {
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

### 📄 2. 파일 수정: `src/pages/PostEditPage.js`

```jsx
// src/pages/PostEditPage.js
// 변경된 부분: 유효성 검사 + 에러 메시지 추가
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
      })
      .catch(() => setError('글 정보를 불러오지 못했습니다.'));
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !author || !content) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const updatedPost = { title, author, content };

    try {
      const res = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (!res.ok) throw new Error();

      navigate(`/posts/${postId}`);
    } catch {
      setError('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>글 수정하기</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <label>제목:</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} /><br />

        <label>작성자:</label><br />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} /><br />

        <label>내용:</label><br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} /><br />

        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default PostEditPage;
```

---

### 📄 3. 파일 수정: `src/components/CommentForm.js`

```jsx
// src/components/CommentForm.js
import React, { useState } from 'react';

function CommentForm({ postId, onCommentAdded }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author || !content) {
      setError('작성자와 내용을 모두 입력해주세요.');
      return;
    }

    const newComment = { postId: Number(postId), author, content };

    try {
      const res = await fetch('http://localhost:4000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error();

      setAuthor('');
      setContent('');
      setError('');
      onCommentAdded(); // 목록 리프레시
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

## ✅ 결과 요약

* 빈 입력 필드가 있으면 제출 막음
* 사용자에게 적절한 안내 메시지 표시
* 댓글, 글 작성, 글 수정 모두 적용됨

---

## 🔜 다음에 할 수 있는 기능은?

이제 UX가 좋아졌어요! 다음은 어떤 기능을 원하시나요?

* 🔍 “제목 검색 기능 추가해줘 (입력값으로 필터링)”
* 🕐 “글 작성일/수정일 자동으로 넣어줘”
* 💾 “브라우저 localStorage 사용 예시 보여줘”
* 🎨 “Tailwind나 Material UI 적용해줘”

> 어떤 걸 다음으로 할까요?
> 말만 해주세요. 박하가 다음 기능도 경로, 파일명, 설명까지 하나하나 알려드릴게요!
