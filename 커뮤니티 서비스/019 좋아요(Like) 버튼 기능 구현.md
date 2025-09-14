좋아요! 😊
이번 단계에서는 각 게시글에 **“좋아요(Like) 버튼” 기능**을 추가하겠습니다.

---

## ✅ 19단계: 좋아요(Like) 버튼 기능 구현

---

### 🎯 목표

* 각 글에 좋아요 수(`likes`)를 저장
* 사용자가 글 상세 페이지에서 ♥ 버튼을 클릭하면 좋아요 수 증가
* 좋아요 수는 `PATCH` 요청으로 서버에 반영됨
* 리스트에도 좋아요 수 표시 (선택사항)

---

## 📁 수정 대상 파일

```
src/pages/
├── PostDetailPage.js        ✅ 좋아요 버튼 추가
├── PostListPage.js          ✅ 목록에 좋아요 수 표시 (선택)
```

---

## 📄 1. 파일 수정: `src/pages/PostDetailPage.js`

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import { formatDate } from '../utils/dateFormat';

function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ 좋아요 수 상태
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLikes(data.likes || 0); // likes 필드가 없으면 0
      })
      .catch((err) => console.error('글 불러오기 실패:', err));
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      alert('삭제 완료!');
      navigate('/posts');
    } catch {
      alert('삭제 실패!');
    }
  };

  // ✅ 좋아요 버튼 클릭 처리
  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await fetch(`http://localhost:4000/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: newLikes }),
    });
  };

  if (!post) return <p>불러오는 중...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>작성자:</strong> {post.author}</p>
      {post.createdAt && <p><strong>작성일:</strong> {formatDate(post.createdAt)}</p>}
      {post.updatedAt && <p><strong>수정일:</strong> {formatDate(post.updatedAt)}</p>}
      <hr />
      <p>{post.content}</p>

      {/* ✅ 좋아요 버튼 */}
      <button onClick={handleLike} style={{ fontSize: '18px', marginRight: '10px' }}>
        ❤️ 좋아요 {likes}
      </button>

      <button onClick={() => navigate(`/edit/${post.id}`)}>수정하기</button>
      <button onClick={() => setShowModal(true)} style={{ color: 'red' }}>삭제하기</button>

      {showModal && (
        <ConfirmModal
          message="정말 삭제할까요?"
          onConfirm={() => {
            setShowModal(false);
            handleDelete();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default PostDetailPage;
```

---

## 📄 2. (선택) 파일 수정: `src/pages/PostListPage.js`

> 목록에서 좋아요 수를 함께 보여주고 싶을 경우

```jsx
{filteredPosts.map((post) => (
  <li key={post.id} style={{ marginBottom: '20px' }}>
    {post.thumbnail && (
      <img
        src={post.thumbnail}
        alt="썸네일"
        style={{ width: '100px', marginRight: '10px', verticalAlign: 'middle' }}
      />
    )}
    <Link to={`/posts/${post.id}`}>
      <strong>{post.title}</strong>
    </Link>{' '}
    - {post.author}
    {post.likes !== undefined && (
      <span style={{ marginLeft: '10px', color: '#888' }}>❤️ {post.likes}</span>
    )}
  </li>
))}
```

---

## ✅ 실행 결과

* 글 상세 페이지에 **“❤️ 좋아요 0”** 버튼이 표시됨
* 클릭 시 숫자가 +1씩 증가하고 서버에 반영됨
* 새로고침해도 좋아요 수 유지됨
* 선택적으로 글 목록에도 좋아요 수 표시 가능

---

## ✅ 다음 기능 제안

이제 사용자 인터랙션까지 추가되었습니다! 🙌
다음으로 무엇을 원하시나요?

* 📱 “모바일 반응형 UI 적용해줘”
* 🌈 “TailwindCSS로 전체 스타일 업그레이드”
* 🔢 “조회수 기능도 같이 넣고 싶어”
* 🧠 “간단한 로그인 기능 붙이고 싶어 (비밀번호 없이 닉네임만)”

> 다음 기능 말씀만 해주세요!
> 박하가 전체 코드와 함께 이어서 도와드릴게요.
