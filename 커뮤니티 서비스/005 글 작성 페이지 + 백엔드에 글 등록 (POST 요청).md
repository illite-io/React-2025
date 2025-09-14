좋습니다! 😊
이번 단계에서는 **글 작성 페이지를 만들고**, **백엔드로 POST 요청하여 새 글을 등록하는 기능**을 구현하겠습니다.

---

## ✅ 5단계: 글 작성 페이지 + 백엔드에 글 등록 (POST 요청)

---

## 📁 파일: `src/pages/PostWritePage.js`

```jsx
// src/pages/PostWritePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostWritePage() {
  // 상태: 제목, 작성자, 내용
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate(); // 작성 후 목록으로 이동

  // 글 등록 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    const newPost = {
      title,
      author,
      content,
    };

    try {
      const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error('글 등록 실패');

      const result = await res.json();
      console.log('등록된 글:', result);

      // 글 목록으로 이동
      navigate('/posts');
    } catch (err) {
      console.error('글 작성 중 에러 발생:', err);
    }
  };

  return (
    <div>
      <h1>글 작성하기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>작성자:</label><br />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
        </div>
        <button type="submit">글 등록</button>
      </form>
    </div>
  );
}

export default PostWritePage;
```

---

## ✅ 백엔드 (`json-server`)가 저장하는 구조

새 글은 아래 형식으로 저장됩니다:

```json
{
  "id": 3,
  "title": "방금 작성한 글",
  "author": "박하",
  "content": "본문입니다."
}
```

---

## 🔧 확인 방법

1. `npm start`로 프론트 서버 실행
2. `json-server --watch db.json --port 4000` 백엔드 실행
3. 브라우저에서 `http://localhost:3000/write` 접속
4. 제목/작성자/내용 입력 후 제출
5. 자동으로 `/posts`로 이동 → 새 글이 추가된 걸 확인!

---

## 📌 다음에 만들 기능은?

이제 기본적인 CRUD 중에서 **Create / Read**는 구현되었습니다.
다음은 아래 중 원하시는 걸 선택해주세요:

* ✅ “글 삭제 기능도 추가하고 싶어”
* ✅ “글 수정(수정 페이지) 기능도 넣고 싶어”
* ✅ “상단 네비게이션 메뉴 만들고 싶어”
* ✅ “글 목록 로딩 중 표시 추가해줘”
* ✅ “에러 발생 시 메시지를 예쁘게 보여줘”

> 원하시는 기능을 알려주세요. 박하가 계속해서 **파일명, 경로, 설명, 코드 전부** 자세히 만들어드릴게요!
