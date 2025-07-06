좋아요! 😎
이번 단계에서는 **글 삭제 기능**을 구현해보겠습니다.
사용자가 **글 상세 페이지**에서 버튼을 클릭하면 해당 글이 삭제되고, 목록 페이지로 이동하는 방식입니다.

---

## ✅ 6단계: 글 삭제 기능 구현 (DELETE 요청)

---

## 📁 파일 수정: `src/pages/PostDetailPage.js`

```jsx
// src/pages/PostDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetailPage() {
  const { postId } = useParams(); // URL에서 글 ID 추출
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // 글 데이터 불러오기
  useEffect(() => {
    fetch(`http://localhost:4000/posts/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error('글을 찾을 수 없습니다.');
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error('글 불러오기 실패:', err);
        setPost(null);
      });
  }, [postId]);

  // 글 삭제 핸들러
  const handleDelete = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('삭제 실패');

      alert('글이 삭제되었습니다.');
      navigate('/posts'); // 목록으로 이동
    } catch (err) {
      console.error('삭제 중 오류:', err);
    }
  };

  if (post === null) {
    return <p>글을 불러오는 중이거나 존재하지 않습니다.</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>작성자:</strong> {post.author}</p>
      <hr />
      <p>{post.content}</p>

      {/* 삭제 버튼 */}
      <button onClick={handleDelete} style={{ color: 'red' }}>
        삭제하기
      </button>
    </div>
  );
}

export default PostDetailPage;
```

---

## ✅ 결과

* `/posts/:id` 경로에서 상세 페이지 진입
* "삭제하기" 버튼 클릭 → 확인창 표시 → 삭제 요청(`DELETE`)
* 삭제 성공 시 `/posts`로 이동하며 목록에서 제거됨

---

## 🔄 백엔드 자동 반영 확인

`json-server`는 내부적으로 파일(`db.json`)을 자동으로 업데이트합니다. 삭제된 글은 `db.json`에서도 사라집니다.

---

## 📝 다음에 만들 수 있는 기능들

이제 **글 쓰기(Create), 목록(Read), 삭제(Delete)** 기능까지 구현됐습니다!
다음은 아래 중에서 선택해주세요:

* ✍️ “글 수정하는 기능(폼 불러오기 + PUT 요청)”
* 🧭 “상단 네비게이션 메뉴(홈/글목록/글쓰기 버튼)”
* 💬 “댓글 기능 추가”
* 💅 “페이지에 스타일(CSS 또는 간단한 UI 라이브러리) 적용”
* 🔁 “목록에 최신순 정렬 추가”

> 원하시는 다음 기능을 말해주세요!
> 박하가 또다시 **경로, 파일명, 코드, 주석 포함해서 친절하게 설명**해드릴게요.
