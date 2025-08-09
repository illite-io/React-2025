다음은 **`axios.get`을 병렬로 처리**하는 기본적인 예시입니다.
여러 개의 요청을 동시에 보내고, 모든 응답을 기다리는 방식이며, `Promise.all()`을 활용합니다.

---

### 📁 예시 파일: `/examples/axios/parallel-get.js`

```javascript
// axios 라이브러리 import
import axios from 'axios';

// 병렬로 GET 요청을 보내는 함수 정의
async function fetchMultipleData() {
  try {
    // 병렬로 3개의 요청을 보냄
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/users'),    // 사용자 목록
      axios.get('https://jsonplaceholder.typicode.com/posts'),    // 게시글 목록
      axios.get('https://jsonplaceholder.typicode.com/comments')  // 댓글 목록
    ]);

    // 응답 데이터 구조 분해
    const users = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    // 결과 출력
    console.log('사용자 수:', users.length);
    console.log('게시글 수:', posts.length);
    console.log('댓글 수:', comments.length);
  } catch (error) {
    // 하나라도 실패하면 이 블록에서 처리됨
    console.error('요청 중 오류 발생:', error.message);
  }
}

// 함수 실행
fetchMultipleData();
```

---

### ✅ 설명

* `Promise.all([...])`:

  * 배열 안에 있는 `axios.get()` 요청들을 **동시에 실행**함
  * 모든 요청이 **성공해야만** 다음 `.then` 또는 `await` 구문이 실행됨
* `await` 사용:

  * `try...catch` 구문으로 **에러 핸들링** 가능
  * 하나라도 실패하면 `catch`로 넘어감
* 병렬 처리이기 때문에 속도 효율이 좋음

---

### 📝 참고: 순차 방식과의 차이

```javascript
// ❌ 느린 방식: 순차 처리
const users = await axios.get(...);
const posts = await axios.get(...);
const comments = await axios.get(...);
```

> 순차 처리 시 요청이 **하나씩 차례대로 진행되며**, 전체 시간이 오래 걸림

---

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
이번엔 **`POST` 요청을 병렬로 처리하는 예시**를 보여줄게.
`axios.post()`를 여러 개 동시에 보내고, 서버로부터 결과를 받아오는 구조야.

---

### 📁 예시 파일: `/examples/axios/parallel-post-with-baseurl.js`

```javascript
// axios 인스턴스 설정
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // 공통 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 병렬 POST 요청 보내기
async function sendMultiplePosts() {
  try {
    // 동시에 보낼 POST 요청 정의
    const [res1, res2, res3] = await Promise.all([
      api.post('/posts', { title: '글 1', content: '내용 1' }),
      api.post('/posts', { title: '글 2', content: '내용 2' }),
      api.post('/posts', { title: '글 3', content: '내용 3' }),
    ]);

    // 응답 결과 출력
    console.log('📌 응답 1:', res1.data);
    console.log('📌 응답 2:', res2.data);
    console.log('📌 응답 3:', res3.data);
  } catch (error) {
    console.error('❌ POST 병렬 요청 중 오류 발생:', error.message);
  }
}

// 실행
sendMultiplePosts();
```

---

### ✅ 설명 요약

| 항목                          | 설명                                                     |
| --------------------------- | ------------------------------------------------------ |
| `api.post('/posts', {...})` | `baseURL`을 기반으로 `http://localhost:8080/posts`로 POST 요청 |
| `Promise.all([...])`        | 3개의 POST 요청을 **동시에 병렬로 실행**                            |
| `await` 사용                  | 모든 응답이 올 때까지 기다림                                       |
| `try...catch`               | 전체 요청 중 하나라도 실패하면 에러 처리 가능                             |

---

### 🔧 서버 요구사항

이 예시는 서버에 아래와 같은 API가 있어야 작동함:

```
POST http://localhost:8080/posts
Body: { title: string, content: string }
```
이번엔 **병렬 요청 시 각각의 요청 결과(성공/실패)를 따로 처리하는 예시**를 보여줄게.
`Promise.allSettled()`를 사용하면 일부 요청이 실패해도 **전체 결과를 모두 확인**할 수 있어.

---

### 📁 예시 파일: `/examples/axios/parallel-get-allSettled.js`

```javascript
// axios 인스턴스 생성
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000,
});

// 병렬 요청 각각의 성공/실패 결과 처리
async function fetchWithIndividualErrorHandling() {
  const endpoints = ['/users', '/posts', '/invalid-url']; // 일부러 잘못된 URL 포함

  // Promise.allSettled 사용
  const results = await Promise.allSettled(
    endpoints.map((endpoint) => api.get(endpoint))
  );

  results.forEach((result, index) => {
    const label = endpoints[index];
    if (result.status === 'fulfilled') {
      console.log(`✅ ${label} 성공 (${result.value.data.length}개 항목)`);
    } else {
      console.warn(`❌ ${label} 실패 - ${result.reason.message}`);
    }
  });
}

// 실행
fetchWithIndividualErrorHandling();
```

---

### ✅ `Promise.allSettled()` 설명

| 항목                   | 설명                  |
| -------------------- | ------------------- |
| `fulfilled`          | 요청이 성공했을 때          |
| `rejected`           | 요청이 실패했을 때 (에러 포함됨) |
| 실패해도 전체 반복문은 끝까지 돌아감 | ✔                   |

---

### 🔎 예시 결과 (예상 출력)

```
✅ /users 성공 (10개 항목)
✅ /posts 성공 (100개 항목)
❌ /invalid-url 실패 - Request failed with status code 404
```

---

### 🤔 언제 사용하나?

* 일부 요청은 실패해도 괜찮고, **성공한 요청만으로 화면 구성**할 수 있을 때
* 예: 날씨 정보 + 뉴스 + 광고 → 광고 실패해도 다른 정보만 보여주면 됨

---

이번엔 **Axios 인터셉터(Interceptor) 설정 예시**를 보여줄게.
인터셉터는 **요청 전/응답 후**에 공통 작업(예: 토큰 설정, 응답 로깅 등)을 자동으로 해주는 기능이야.

---

### 📁 예시 파일: `/examples/axios/interceptor-setup.js`

```javascript
// axios 가져오기
import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 요청 전 헤더에 Authorization 추가
api.interceptors.request.use(
  (config) => {
    const token = 'my-secret-token'; // 보통 로컬스토리지나 전역상태에서 꺼냄
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('📤 요청 보내기 전:', config.url);
    return config;
  },
  (error) => {
    console.error('❌ 요청 에러:', error.message);
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터: 응답 데이터 가공 or 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log('📥 응답 받음:', response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.warn('⚠️ 서버 응답 오류:', error.response.status);
    } else if (error.request) {
      console.warn('⚠️ 응답 없음:', error.request);
    } else {
      console.warn('⚠️ 요청 설정 오류:', error.message);
    }
    return Promise.reject(error);
  }
);

// 테스트용 GET 요청
async function testInterceptor() {
  try {
    const res = await api.get('/users');
    console.log('🎯 사용자 목록:', res.data);
  } catch (e) {
    console.error('❌ 요청 실패:', e.message);
  }
}

// 실행
testInterceptor();
```

---

### ✅ 결과

1. 요청 전:

   * `Authorization: Bearer my-secret-token` 자동 추가
   * `console.log()`으로 요청 URL 출력
2. 응답 후:

   * `console.log()`로 응답 URL 출력
   * 에러 상황도 종류별로 나눠서 출력

---

### 🧠 언제 유용할까?

| 상황           | 설명                  |
| ------------ | ------------------- |
| 로그인 토큰 자동 부착 | 모든 요청에 토큰 붙일 때      |
| 공통 에러 처리     | 401, 500 등 에러 로직 통합 |
| 로깅           | 요청/응답 모니터링용         |

---

이번엔 **Axios 요청 취소 (CancelToken)** 예시를 보여줄게.
특히 **검색 자동완성**이나 **타이핑 중복 요청 방지**할 때 유용해.

---

### 📁 예시 파일: `/examples/axios/cancel-request.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

// ✅ 이전 요청을 취소할 수 있도록 토큰 생성
let cancelTokenSource = null;

// 자동완성 또는 검색 요청 예시 함수
async function fetchSearchResult(keyword) {
  // 이전 요청이 있다면 취소
  if (cancelTokenSource) {
    cancelTokenSource.cancel('🔴 이전 요청 취소됨');
  }

  // 새 cancel token 생성
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await api.get('/search', {
      params: { q: keyword },
      cancelToken: cancelTokenSource.token,
    });
    console.log(`✅ 검색 결과 (${keyword}):`, response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('⚠️ 요청 취소됨:', error.message);
    } else {
      console.error('❌ 요청 실패:', error.message);
    }
  }
}
```

---

### ✅ 사용 예시

```javascript
// 사용자가 타이핑할 때마다 요청
fetchSearchResult('a');
setTimeout(() => fetchSearchResult('ab'), 100);  // 앞 요청 취소됨
setTimeout(() => fetchSearchResult('abc'), 200); // 앞 요청 또 취소됨
```

---

### 🧠 언제 쓰나?

| 상황       | 설명                               |
| -------- | -------------------------------- |
| 자동완성     | 사용자가 빠르게 입력할 때, 마지막 입력만 서버 요청하도록 |
| 탭 이동     | 탭 바뀔 때 이전 요청 무효화                 |
| 요청 중복 방지 | 같은 API에 여러 번 요청이 날아가는 것 방지       |

---

이번엔 **Axios 요청 실패 시 자동 재시도**하는 예시를 보여줄게.
네트워크 오류나 일시적인 서버 오류(예: 500, 503 등)에 대해 **자동으로 다시 요청**하게 할 수 있어.

---

### 📁 예시 파일: `/examples/axios/retry-request.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

// ✅ 자동 재시도 함수 (기본 3회까지)
async function fetchWithRetry(url, options = {}, retryCount = 3) {
  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      const response = await api.get(url, options);
      console.log(`✅ 요청 성공 (시도 ${attempt}회차)`);
      return response.data;
    } catch (error) {
      const status = error?.response?.status;
      const isRetryable =
        !error.response || [500, 502, 503, 504].includes(status);

      if (attempt < retryCount && isRetryable) {
        console.warn(`🔁 요청 재시도 중... (${attempt}회 실패)`);
        await new Promise((res) => setTimeout(res, 1000)); // 1초 대기
      } else {
        console.error(`❌ 요청 실패 (${attempt}회차):`, error.message);
        throw error;
      }
    }
  }
}

// 사용 예시
fetchWithRetry('/unstable-api')
  .then((data) => {
    console.log('📦 최종 응답 데이터:', data);
  })
  .catch(() => {
    console.error('😵 최종 요청 실패 처리');
  });
```

---

### ✅ 주요 포인트

| 항목            | 설명                                 |
| ------------- | ---------------------------------- |
| `retryCount`  | 최대 재시도 횟수                          |
| `isRetryable` | 재시도 대상인지 판단 (서버오류 or 네트워크 끊김)      |
| `setTimeout`  | 재시도 간 딜레이 설정                       |
| `for` 루프      | `axios-retry` 라이브러리 없이도 간단하게 구현 가능 |

---

### 🔧 재시도 조건 추천

| 조건                   | 설명                   |
| -------------------- | -------------------- |
| `!error.response`    | 네트워크 오류 (인터넷 끊김 등)   |
| `status === 500~504` | 서버 오류, 게이트웨이 시간 초과 등 |

---

### 💡 참고: `axios-retry` 라이브러리도 있음

자동화가 필요하면 [`axios-retry`](https://www.npmjs.com/package/axios-retry) 라이브러리를 써도 돼.

---

이번엔 **Axios 요청에 로딩 스피너 자동 연동**하는 예시를 보여줄게.
인터셉터를 활용해 **모든 요청 전엔 로딩 시작**, **응답 오면 로딩 종료**되도록 처리하는 방식이야.

---

### 📁 예시 파일: `/examples/axios/with-loading-spinner.js`

```javascript
import axios from 'axios';

// ✅ 로딩 상태를 저장할 전역 변수 (여기선 단순 예시)
let loadingCount = 0;

// 로딩 스피너 함수 (React가 아니라 콘솔 기반 예시)
function showLoading() {
  if (loadingCount === 0) console.log('⏳ 로딩 시작...');
  loadingCount++;
}
function hideLoading() {
  loadingCount--;
  if (loadingCount <= 0) {
    console.log('✅ 로딩 끝!');
    loadingCount = 0;
  }
}

// axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

// ✅ 요청 인터셉터: 로딩 시작
api.interceptors.request.use(
  (config) => {
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터: 로딩 끝
api.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// 테스트용 함수
async function testRequest() {
  try {
    const res1 = await api.get('/users');
    console.log('👤 사용자 목록:', res1.data);

    const res2 = await api.get('/posts');
    console.log('📝 게시글 목록:', res2.data);
  } catch (e) {
    console.error('❌ 오류 발생:', e.message);
  }
}

// 실행
testRequest();
```

---

### ✅ 설명

| 항목               | 역할                                                    |
| ---------------- | ----------------------------------------------------- |
| `loadingCount`   | 여러 요청이 동시에 발생할 경우 중첩 로딩 방지용                           |
| `request.use()`  | 요청 전 로딩 시작                                            |
| `response.use()` | 응답/에러 시 로딩 종료                                         |
| `console.log`    | 실제 React 프로젝트라면 이 부분을 `setLoading(true/false)` 등으로 대체 |

---

### 💡 React와 연동할 땐?

```tsx
// 예: useState로 로딩 상태 추적
const [loading, setLoading] = useState(false);

useEffect(() => {
  const requestInterceptor = api.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });
  const responseInterceptor = api.interceptors.response.use(
    (res) => {
      setLoading(false);
      return res;
    },
    (err) => {
      setLoading(false);
      return Promise.reject(err);
    }
  );

  return () => {
    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
  };
}, []);
```

---
