좋습니다! 😊
이번 단계에서는 각 게시글에 **작성일(`createdAt`)과 수정일(`updatedAt`)을 자동으로 추가**해서 화면에 표시하는 기능을 구현합니다.

---

## ✅ 13단계: 글 작성일(createdAt)과 수정일(updatedAt) 자동 추가 및 표시

---

### ✨ 목표

* 글 작성 시 `createdAt`을 자동 생성 (현재 시간)
* 글 수정 시 `updatedAt`을 자동 업데이트
* 글 상세 페이지와 목록에 날짜 표시
* 날짜 포맷은 YYYY-MM-DD HH\:mm (예: 2025-06-26 18:00)

---

## 📁 수정 대상 파일 목록

```
src/pages/
├── PostWritePage.js      ✅ createdAt 추가
├── PostEditPage.js       ✅ updatedAt 추가
├── PostListPage.js       ✅ 날짜 표시
├── PostDetailPage.js     ✅ 날짜 표시
```

---

## ✅ 날짜 포맷 유틸 함수 추가

### 📄 파일 생성: `src/utils/dateFormat.js`

```js
// src/utils/dateFormat.js

export function formatDate(isoString) {
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
```

---

## 📄 파일 수정: `src/pages/PostWritePage.js`

```jsx
import { formatDate } from '../utils/dateFormat'; // 사용은 안하지만 추후 표시용
// ...
const newPost = {
  title,
  author,
  content,
  createdAt: new Date().toISOString(), // ✅ 작성일 추가
};
```

---

## 📄 파일 수정: `src/pages/PostEditPage.js`

```jsx
const updatedPost = {
  title,
  author,
  content,
  updatedAt: new Date().toISOString(), // ✅ 수정일 추가
};
```

---

## 📄 파일 수정: `src/pages/PostDetailPage.js`

```jsx
import { formatDate } from '../utils/dateFormat';

// 글 정보 아래에 작성일/수정일 표시
<p><strong>작성자:</strong> {post.author}</p>
{post.createdAt && <p><strong>작성일:</strong> {formatDate(post.createdAt)}</p>}
{post.updatedAt && <p><strong>수정일:</strong> {formatDate(post.updatedAt)}</p>}
```

---

## 📄 파일 수정: `src/pages/PostListPage.js`

```jsx
import { formatDate } from '../utils/dateFormat';

{filteredPosts.map((post) => (
  <li key={post.id}>
    <Link to={`/posts/${post.id}`}>
      <strong>{post.title}</strong>
    </Link>{' '}
    - {post.author}
    {post.createdAt && (
      <span style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>
        ({formatDate(post.createdAt)})
      </span>
    )}
  </li>
))}
```

---

## ✅ `json-server`로 저장되는 예시

```json
{
  "id": 3,
  "title": "예시 글",
  "author": "박하",
  "content": "본문입니다",
  "createdAt": "2025-06-26T08:00:00.000Z",
  "updatedAt": "2025-06-26T09:30:00.000Z"
}
```

---

## ✅ 실행 결과

* 글 작성하면 자동으로 `작성일`이 추가됨
* 글 수정 시 `수정일`이 업데이트됨
* 상세 페이지와 목록에서 날짜가 예쁘게 표시됨

---

## 📌 다음 기능 추천

이제 작성일/수정일도 완벽하게 표시됩니다!
다음으로 무엇을 원하시나요?

* 💾 “localStorage 저장 예제도 보여줘”
* 🔁 “목록을 최신순으로 정렬하고 싶어”
* 📱 “모바일에서도 잘 보이게 반응형 UI 구성해줘”
* 🧹 “글 삭제 시 confirm 대신 커스텀 모달로 처리해줘”

> 다음 기능을 알려주시면 계속해서 구조, 경로, 코드, 설명 포함해서 차근차근 이어가드릴게요!
