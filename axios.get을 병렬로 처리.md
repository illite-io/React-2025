좋아! `baseURL: 'http://localhost:8080/'` 로 설정한 상태에서 병렬 `axios.get` 요청을 처리하는 예시를 아래와 같이 수정했어.
※ `http://` 붙이는 거 잊지 마! 안 그러면 에러 나거나 요청 안 될 수 있어.

---

### 📁 예시 파일: `/examples/axios/parallel-get-with-baseurl.js`

```javascript
// axios 인스턴스 생성 시 baseURL 설정
import axios from 'axios';

// 공통 axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/', // ✅ 로컬 서버 기본 주소
  timeout: 5000,                     // 요청 타임아웃 5초 설정 (선택)
});

// 병렬로 GET 요청을 보내는 함수
async function fetchParallelData() {
  try {
    // baseURL 기준으로 경로만 적음 (전체 URL 아님)
    const [userRes, postRes, commentRes] = await Promise.all([
      api.get('/users'),     // → http://localhost:8080/users
      api.get('/posts'),     // → http://localhost:8080/posts
      api.get('/comments')   // → http://localhost:8080/comments
    ]);

    // 데이터 분해
    const users = userRes.data;
    const posts = postRes.data;
    const comments = commentRes.data;

    // 로그 출력
    console.log('✔ 사용자:', users.length);
    console.log('✔ 게시글:', posts.length);
    console.log('✔ 댓글:', comments.length);
  } catch (err) {
    console.error('❌ 병렬 요청 실패:', err.message);
  }
}

// 실행
fetchParallelData();
```

---

### ✅ 설명

| 항목                  | 내용                                       |
| ------------------- | ---------------------------------------- |
| `axios.create`      | 설정 공통 적용을 위한 인스턴스 생성                     |
| `baseURL`           | 모든 요청에 자동으로 붙는 기본 경로                     |
| `api.get('/users')` | 실제 요청 URL은 `http://localhost:8080/users` |
| `Promise.all()`     | 3개의 GET 요청을 **병렬로 동시에 실행**               |
| `try...catch`       | 모든 요청 중 하나라도 실패하면 에러 처리                  |

---

### 🔧 서버 API 예시

이 예시는 로컬 서버가 아래와 같은 REST API를 제공한다고 가정함:

* `GET http://localhost:8080/users`
* `GET http://localhost:8080/posts`
* `GET http://localhost:8080/comments`

---

다음 예시:

* `POST` 병렬로 보내기
* `개별 에러 처리`
* `axios 인터셉터 추가`

원하면 `.` 입력해줘!
