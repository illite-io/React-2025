"403 Forbidden" 오류는 서버가 요청을 이해했지만, **접근 권한이 없기 때문에 요청을 거부**하는 경우 발생합니다. 주요 원인과 해결 방법은 아래와 같습니다:

---

### ✅ 주요 원인

1. **인증되지 않은 접근**

   * 로그인하지 않고 인증이 필요한 리소스에 접근한 경우
   * 토큰/세션이 없거나 만료됨

2. **권한 부족**

   * 해당 계정 또는 IP가 리소스를 사용할 수 없는 권한 상태
   * 관리자 권한이 필요한데 일반 유저가 접근한 경우

3. **IP 차단**

   * 서버 설정에서 특정 IP 또는 지역을 차단

4. **서버 설정 오류**

   * `.htaccess`, Nginx, Apache 설정에서 디렉터리나 파일 접근을 제한한 경우

5. **CORS 설정 문제**

   * 클라이언트에서 다른 도메인으로 요청했을 때 CORS 설정이 제대로 되어 있지 않음

6. **디렉터리 인덱스 제한**

   * `/some-path/`와 같이 디렉터리로 요청했는데, index.html 같은 파일이 없거나 디렉터리 열람이 차단된 경우

---

### 🛠 해결 방법

#### 클라이언트 측 (브라우저, 앱 등)

* 로그인이 필요한 경우 로그인 먼저 진행
* 토큰이 있다면 만료 여부 확인 및 재발급
* CORS 관련 요청이면 서버가 `Access-Control-Allow-Origin`을 설정했는지 확인

#### 서버 측

* 접근 권한 설정 확인 (파일 퍼미션, 사용자 권한)
* 웹 서버 설정 점검 (예: Apache의 `Require all granted` 또는 Nginx의 `allow/deny`)
* IP 차단 설정 확인
* API의 인증 미들웨어 또는 필터에서 잘못된 판단이 있는지 확인

---

### 예: Spring Boot에서 403이 나는 경우

```java
// WebSecurityConfigurerAdapter 설정 예시
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        .antMatchers("/admin/**").hasRole("ADMIN") // 권한 제한
        .anyRequest().permitAll()
        .and()
        .formLogin()
        .and()
        .csrf().disable(); // CSRF 설정이 원인일 수 있음
}
```

---

문제가 발생한 환경 (예: React에서 API 요청할 때인지, Spring Boot 백엔드에서 발생한 것인지 등)을 알려주시면, 구체적으로 분석해드릴 수 있습니다.

---

Axios 사용 시 "403 Forbidden" 오류가 발생하는 경우는 **프론트엔드에서 백엔드로 요청할 때 인증 또는 권한 관련 문제가 있을 때** 주로 발생합니다. 아래는 상황별 해결 방법을 정리한 것입니다.

---

## ✅ Axios에서 403 Forbidden 발생 원인 & 해결 방법

---

### 1. **인증 토큰이 누락되었거나 잘못된 경우**

#### 원인

* 서버는 인증 토큰(`Authorization` 헤더 등)이 없으면 403을 응답할 수 있음

#### 해결 방법

```js
// 예: JWT 토큰을 Authorization 헤더에 포함
axios.get('/api/protected', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

### 2. **CORS(Cross-Origin Resource Sharing) 설정 문제**

#### 원인

* 프론트엔드 도메인이 백엔드 CORS 정책에 허용되지 않음
* 서버가 preflight 요청(`OPTIONS`)을 거부

#### 해결 방법

* 서버 측에서 CORS 설정 수정 필요 (예: `Access-Control-Allow-Origin`)

서버 예시 (Express.js):

```js
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 주소
  credentials: true // 쿠키 포함 시 필요
}));
```

---

### 3. **withCredentials 사용 시 쿠키 누락**

#### 원인

* 인증에 쿠키 사용 시 `withCredentials: true`가 없으면 서버에서 인증 실패

#### 해결 방법

```js
axios.get('/api/user', {
  withCredentials: true
});
```

---

### 4. **권한이 없는 사용자로 요청함**

#### 원인

* 로그인은 되었지만 특정 역할(예: 관리자)이 필요한 API에 접근한 경우

#### 해결 방법

* 서버에서 반환한 메시지를 확인 (`error.message`)
* 해당 권한이 있는지 확인하거나 백엔드 권한 로직 확인 필요

---

### 5. **요청 주소 또는 메서드 오류**

#### 원인

* 잘못된 URL로 요청하거나 `GET`으로 보내야 할 것을 `POST`로 보냄

#### 해결 방법

```js
// 예: /api/admin으로 POST 요청
axios.post('/api/admin', data);
```

---

## 📌 디버깅 팁

1. **개발자 도구 Network 탭에서 요청 헤더와 응답 확인**
2. **서버 콘솔에서 에러 로그 확인**
3. **백엔드에서 403 발생 조건 로직 직접 확인**

---

## ✍️ 예시 전체 코드 (JWT + withCredentials)

```js
axios.get('http://localhost:8080/api/user', {
  headers: {
    Authorization: `Bearer ${yourToken}`
  },
  withCredentials: true // 쿠키도 함께 보낼 경우
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  if (err.response?.status === 403) {
    console.error('접근 권한이 없습니다');
  } else {
    console.error('오류 발생', err);
  }
});
```

---

403 오류와 관련된 상황을 좀 더 자세히 알려주시면 (예: 요청 URL, 토큰 여부, 쿠키 사용 여부 등) 더 정확한 해결책을 드릴 수 있습니다.

---

`Failed to fetch` 에러는 **Axios 또는 Fetch API 사용 시 브라우저에서 네트워크 요청 자체가 실패했을 때** 발생하는 일반적인 오류입니다. 이 에러는 **HTTP 응답을 받기도 전에 브라우저가 요청을 실패**했을 때 뜹니다.

---

## ✅ 주요 원인과 해결 방법

---

### 1. **서버가 꺼져 있거나 잘못된 URL**

#### 원인

* 요청한 서버 주소(URL)가 틀림
* 서버가 실행되고 있지 않음

#### 해결 방법

* `localhost`, 포트번호, API 경로 등을 다시 확인

```js
// 예: 서버 주소 확인
axios.get('http://localhost:8080/api/user')
```

---

### 2. **CORS 정책에 의해 차단됨**

#### 원인

* 브라우저가 서버의 `Access-Control-Allow-Origin` 응답 헤더가 없어서 요청을 막음

#### 해결 방법 (백엔드 설정 필요)

**Spring Boot 예시**

```java
// 컨트롤러 레벨
@CrossOrigin(origins = "http://localhost:3000")
@GetMapping("/api/user")
public ResponseEntity<?> getUser() {
    ...
}
```

**Express.js 예시**

```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

**프론트엔드 설정**

```js
axios.get('http://localhost:8080/api/user', {
  withCredentials: true // 쿠키 전달 시 필요
});
```

---

### 3. **HTTPS ↔ HTTP 혼용 (Mixed Content)**

#### 원인

* HTTPS 사이트에서 HTTP 주소로 요청하면 브라우저가 차단함

#### 해결 방법

* 백엔드도 HTTPS로 맞추거나, 개발 시 모두 HTTP로 통일

---

### 4. **방화벽/보안 소프트웨어 차단**

#### 원인

* 회사 네트워크, 보안 프로그램, 브라우저 확장 기능이 요청을 차단

#### 해결 방법

* 브라우저 확장 기능 끄기, 사설망에서는 VPN 확인

---

### 5. **프록시 서버 설정 문제 (개발 환경)**

#### 예: React 개발 서버에서 `proxy` 설정 안 했거나 오작동

**`vite.config.js` 예시**

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

**React CRA 예시 (`package.json`)**

```json
"proxy": "http://localhost:8080"
```

---

## 📌 에러 디버깅 팁

1. **브라우저 개발자 도구 > Network 탭**에서 요청 확인
2. **Console 탭**에서 CORS 에러 메시지 확인
3. **서버 로그** 확인 (요청이 아예 안 왔다면 CORS 또는 주소 오류일 가능성 높음)

---

## 예시 코드 (실패 시 로그 출력)

```js
axios.get('http://localhost:8080/api/user')
  .then(res => {
    console.log('성공:', res.data);
  })
  .catch(error => {
    if (error.response) {
      // HTTP 응답이 있는 경우
      console.error('서버 응답 에러:', error.response.status);
    } else if (error.request) {
      // 요청은 보냈으나 응답이 없음
      console.error('요청 실패:', error.request);
    } else {
      // 요청 자체가 실패 (예: URL 문제)
      console.error('에러 발생:', error.message);
    }
  });
```

---

정확한 원인을 알려면 요청한 URL, 개발 환경(React/Vite/CORS 여부 등), 서버 상태 등을 알려주시면 더 구체적으로 도와드릴 수 있습니다. 필요하시면 코드 같이 보셔도 됩니다.

---

`fetch` 사용 시 발생하는 `Failed to fetch` 에러는 네트워크 요청 자체가 실패했을 때 나타납니다. Axios와 비슷하지만, fetch는 **HTTP 응답 코드가 400/500이어도 "에러"로 간주하지 않기 때문에**, `catch`에서 잡히는 건 거의 항상 **요청 자체가 실패했을 때**입니다.

---

## ✅ `fetch`에서 `Failed to fetch` 에러 주요 원인 & 해결 방법

---

### 1. **URL 오류 또는 서버 미동작**

#### 원인

* 잘못된 주소
* 서버가 꺼져 있거나 포트가 다름

#### 예시

```js
fetch('http://localhost:8080/api/user')
```

#### 해결

* 주소 확인 (도메인, 포트, 경로)
* 서버 실행 여부 확인

---

### 2. **CORS 차단**

#### 원인

* 브라우저가 요청을 차단 (서버에서 CORS 설정이 안됨)

#### 해결

**프론트엔드**

```js
fetch('http://localhost:8080/api/user', {
  credentials: 'include' // 쿠키 포함 필요 시
})
```

**백엔드 (예: Spring Boot)**

```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
```

**Node (Express)**

```js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

### 3. **HTTPS ↔ HTTP 혼용 (Mixed Content)**

#### 원인

* HTTPS에서 HTTP로 요청 → 브라우저 차단

#### 해결

* 백엔드도 HTTPS로 맞추거나 개발 환경에선 모두 HTTP로

---

### 4. **네트워크 차단 / 브라우저 확장 기능 간섭**

#### 원인

* 회사 보안 정책, VPN, 브라우저 확장 프로그램 차단

#### 해결

* VPN 확인, 확장 기능 꺼보기

---

### 5. **프록시 또는 포트 충돌 (개발 환경)**

* React 개발 서버가 `3000`, 백엔드가 `8080` → CORS 필수
* Vite 사용 시 `vite.config.js` 프록시 설정 필요

---

## ✅ 예시 코드 (에러 핸들링 포함)

```js
fetch('http://localhost:8080/api/user', {
  method: 'GET',
  credentials: 'include' // 쿠키 기반 인증 시 필요
})
  .then(response => {
    if (!response.ok) {
      // HTTP 응답은 성공했지만 상태 코드가 4xx/5xx일 경우
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('데이터:', data);
  })
  .catch(error => {
    console.error('요청 실패:', error.message);
  });
```

---

## 🧪 디버깅 순서 요약

1. **개발자 도구 Console + Network 탭** 확인
2. **브라우저가 보여주는 정확한 메시지** 확인 (특히 CORS)
3. **서버 로그** 확인 (요청이 아예 안 오는지 확인)
4. **주소/포트/CORS 설정** 점검

---

필요하시면 `fetch` 사용하는 실제 코드 공유해 주시면 구체적으로 어떤 문제가 있는지 더 정확히 도와드릴 수 있습니다.


---

`Failed to load resource: net::ERR_FAILED` 에러는 브라우저 콘솔에서 자주 볼 수 있는 **네트워크 요청 실패** 메시지이며, 근본 원인은 다음과 같습니다:

---

## ✅ 주요 원인 요약 및 해결 방법

---

### 1. **잘못된 URL 요청**

#### 원인

* URL 오타
* 도메인 또는 포트가 다름
* 서버가 꺼져 있음

#### 해결

* 요청 주소 정확히 확인 (`http://localhost:8080/api/user` 등)
* 서버 실행 여부 확인 (`ping`, 브라우저에서 직접 접속 등)

---

### 2. **CORS 정책 차단**

#### 원인

* 브라우저가 `Access-Control-Allow-Origin` 헤더 없어서 요청을 차단

#### 해결

**프론트엔드 (React, Vite 등)**

```js
fetch('http://localhost:8080/api/user', {
  credentials: 'include'
});
```

**백엔드 (Spring Boot 예시)**

```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
```

**Node.js (Express 예시)**

```js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

### 3. **HTTPS ↔ HTTP 혼용 (Mixed Content)**

#### 원인

* 브라우저가 HTTPS 페이지에서 HTTP 요청을 차단함

#### 해결

* 요청도 HTTPS로 맞추거나, 개발 중이라면 모두 HTTP 사용

---

### 4. **프록시 문제 (개발 환경)**

#### 원인

* React, Vite 개발환경에서 프록시 미설정 또는 잘못 설정됨

#### 해결

**React (CRA)**

```json
"proxy": "http://localhost:8080"
```

**Vite**

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

---

### 5. **방화벽/보안 소프트웨어/브라우저 확장기능**

#### 원인

* 요청을 가로채서 차단

#### 해결

* 보안 프로그램, 브라우저 확장기능 일시 비활성화 후 재시도

---

### 6. **네트워크가 완전히 차단된 경우**

* 네트워크 문제, DNS 오류, VPN, 프록시 설정 등 확인 필요

---

## 🛠 디버깅 팁

1. **브라우저 개발자도구 (Network 탭)** 에서 상태 확인
2. 콘솔 메시지 전체 확인 (CORS, Mixed content, 인증 문제 등 여부)
3. **URL을 브라우저에 직접 입력**해서 접근 가능한지 확인
4. 백엔드 서버 로그 확인

---

## 🔍 예시 요청 코드 (fetch)

```js
fetch('http://localhost:8080/api/user', {
  method: 'GET',
  credentials: 'include'
})
  .then(res => {
    if (!res.ok) throw new Error(`HTTP 상태 오류: ${res.status}`);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error('에러:', err.message));
```

---

### 더 구체적으로 도와드리려면 다음 정보가 필요합니다:

* 요청한 **정확한 URL**
* 사용 중인 **프레임워크/툴 (React, Vite 등)**
* **백엔드 종류** (Spring Boot, Express 등)
* 콘솔에 출력되는 **전체 에러 메시지**

알려주시면 바로 이어서 도와드릴게요.

---

Postman도 정상, 웹브라우저에서도 정상, 로컬 React에서 호출에서만 에러

---

좋습니다. 상황을 요약하면 다음과 같습니다:

---

## ❗ 문제 요약

* API 서버는 **Postman**과 **브라우저 직접 접근**으로는 정상 작동
* 하지만 **React 로컬 개발 환경에서 fetch()로 호출 시 `Failed to fetch`, `net::ERR_FAILED`** 발생

즉, 브라우저에서 직접 열면 되는데, React 앱에서 fetch 할 때만 막힌다는 것은 **거의 100% CORS 문제 또는 HTTPS/HTTP 혼용 문제**입니다.

---

## ✅ 가능한 원인 & 해결 방법

---

### 1. **CORS 설정 문제**

Postman은 CORS를 **무시하고 요청 가능**하지만, 브라우저 기반 앱(React)은 CORS 검사에 걸립니다.

#### 해결 방법 (백엔드 설정 필요)

**Spring Boot**

```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
```

**Node.js + Express**

```js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

### 2. **HTTPS ↔ HTTP 혼용 (Mixed Content)**

* 브라우저가 HTTPS 페이지에서 HTTP 요청을 차단할 수 있음

#### 해결 방법

* React 앱을 `http://localhost:3000`에서 띄우고, API도 `http://localhost:8080`으로 일치시키세요
* 또는 둘 다 HTTPS로

---

### 3. **React fetch() 요청에 `credentials` 설정 누락**

* 서버에서 쿠키 기반 인증을 사용하거나 CORS 정책에서 `credentials`가 필요한 경우

#### 해결 방법

```js
fetch('http://localhost:8080/api/user', {
  credentials: 'include' // 쿠키 보내기
})
```

---

### 4. **프록시 미설정 또는 잘못된 프록시 설정**

React 개발 환경에서 CORS 우회하려면 프록시 설정도 가능

#### CRA (Create React App) 방식

```json
// package.json
"proxy": "http://localhost:8080"
```

```js
// 요청 시엔 상대경로만
fetch('/api/user')
```

#### Vite 사용 시

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

---

## 🔍 최종 체크리스트

| 체크 항목                                                                       | 확인 |
| --------------------------------------------------------------------------- | -- |
| 백엔드에서 `Access-Control-Allow-Origin`에 `http://localhost:3000` 포함?            | ✅  |
| fetch에 `credentials: 'include'` 넣었는가?                                       | ✅  |
| React 앱 주소(`localhost:3000`)와 API 주소(`localhost:8080`) 모두 HTTP 또는 HTTPS 일치? | ✅  |
| `package.json` 또는 `vite.config.js`에 proxy 설정 했는가?                           | ✅  |
| 브라우저 캐시 및 확장기능 차단은 없는가?                                                     | ✅  |

---

### ✍ 예시 코드 (정상 작동 형태)

```js
fetch('http://localhost:8080/api/user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('에러:', err));
```

---

React 프로젝트 설정이나 fetch 호출 코드 보여주시면, 바로 디버깅해드릴 수 있습니다.

---

CORS 대해 자세히 설명

좋습니다. `CORS`(Cross-Origin Resource Sharing)는 **웹 브라우저의 보안 정책** 중 하나로, 자바스크립트 코드가 \*\*다른 출처(origin)\*\*의 리소스를 요청할 때 **허용 여부를 제어**하는 메커니즘입니다. 즉, 브라우저에서 "이 요청을 허락할지 말지" 판단하는 기준입니다.

---

## ✅ 1. 기본 개념: Same-Origin Policy (SOP)

웹 브라우저는 기본적으로 **다른 출처의 요청을 제한**합니다.

> **Origin(출처)** = `프로토콜 + 도메인 + 포트`

예:

* `http://localhost:3000` → origin A
* `http://localhost:8080` → origin B → 서로 다름 → cross-origin

브라우저는 이 origin B에 JS로 요청하면 보안상 차단합니다.
이를 **제한적으로 허용**할 수 있도록 고안된 것이 바로 **CORS**입니다.

---

## ✅ 2. CORS 작동 방식 (요청 흐름)

### 1) **Simple Request (단순 요청)**

브라우저는 바로 요청을 보내고, 서버가 아래와 같은 헤더를 포함하면 허용합니다.

```http
Access-Control-Allow-Origin: http://localhost:3000
```

> JS 코드 예시:

```js
fetch('http://localhost:8080/api/data')
```

---

### 2) **Preflight Request (사전 요청)**

다음 조건 중 하나라도 해당되면 브라우저가 먼저 **OPTIONS 메서드**로 \*\*"사전 요청"\*\*을 보냅니다.

조건:

* `PUT`, `DELETE`, `PATCH` 같은 "단순하지 않은 메서드"
* 커스텀 헤더 사용 (예: Authorization)
* JSON 이외의 Content-Type (예: `application/x-www-form-urlencoded`)

#### 요청 흐름:

1. 브라우저가 `OPTIONS` 요청 보냄
2. 서버가 CORS 허용 응답 헤더로 응답
3. 브라우저가 실제 `POST`, `PUT` 등 요청을 보냄

#### 서버 응답 예시:

```http
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## ✅ 3. 주요 응답 헤더 설명

| 헤더                                 | 설명                              |
| ---------------------------------- | ------------------------------- |
| `Access-Control-Allow-Origin`      | 허용할 origin을 명시 (`*` 또는 도메인)     |
| `Access-Control-Allow-Methods`     | 허용할 HTTP 메서드 명시                 |
| `Access-Control-Allow-Headers`     | 허용할 요청 헤더 명시 (예: Authorization) |
| `Access-Control-Allow-Credentials` | 쿠키, 인증정보 포함 요청 허용 여부 (`true`)   |
| `Access-Control-Max-Age`           | preflight 응답을 브라우저가 캐싱하는 시간(초)  |

---

## ✅ 4. CORS 설정 예시 (Spring Boot)

```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@GetMapping("/api/data")
public ResponseEntity<?> getData() {
    return ResponseEntity.ok("ok");
}
```

---

## ✅ 5. CORS 설정 예시 (Express.js)

```js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## ✅ 6. 브라우저 vs Postman 차이

| 툴                 | CORS 적용 여부            |
| ----------------- | --------------------- |
| **브라우저**          | 엄격하게 검사함 (보안상)        |
| **Postman, cURL** | 무시하고 전송 가능 (개발 도구이므로) |

---

## ✅ 7. CORS 에러 예시와 의미

### 예: `Access to fetch at ... has been blocked by CORS policy`

* 서버에서 `Access-Control-Allow-Origin`을 응답하지 않았거나
* `credentials: 'include'` 요청 시, 서버가 `Access-Control-Allow-Credentials: true`를 포함하지 않았을 때

---

## ✅ 8. 실전 fetch 예시

```js
fetch('http://localhost:8080/api/data', {
  method: 'GET',
  credentials: 'include', // 쿠키 포함
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer yourToken'
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('CORS 에러:', err));
```

---

필요하시면 Spring, Express, nginx 등 환경에 맞춘 CORS 설정도 예시로 더 드릴 수 있습니다.
원하시는 환경을 알려주세요.

---

Spring Boot에서 CORS 문제를 해결하는 방법은 여러 가지가 있지만, 가장 확실하고 구조적으로 적용할 수 있는 방식부터 정리해드리겠습니다. 상황에 따라 `컨트롤러 레벨`, `전역 설정`, `Security 설정` 3가지 방식 중 적절히 선택해야 합니다.

---

## ✅ 1. 컨트롤러 레벨에서 `@CrossOrigin` 사용 (간단)

```java
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("유저 정보");
    }
}
```

> `allowCredentials = true` 설정 시, `Access-Control-Allow-Credentials: true` 헤더가 응답에 포함됩니다
> 이 경우 `origin="*"` 은 쓸 수 없고, 명확한 주소를 지정해야 함

---

## ✅ 2. 전역(Global) CORS 설정

모든 컨트롤러에 일괄 적용하고 싶다면, 아래처럼 설정 클래스를 만들어 전역 적용할 수 있습니다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins("http://localhost:3000") // 허용할 Origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 메서드
                .allowedHeaders("*") // 허용할 헤더
                .allowCredentials(true) // 인증 정보 포함 허용
                .maxAge(3600); // preflight 요청 캐시 시간 (초)
    }
}
```

---

## ✅ 3. Spring Security 사용 시 CORS 설정 (중요)

Spring Security가 설정되어 있다면 **WebMvcConfigurer 설정만으로는 CORS가 적용되지 않습니다.** 반드시 Security에서도 명시해야 합니다.

### 예: Spring Security 5 이상 버전

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // CORS 설정 활성화
            .csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .anyRequest().permitAll()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // 허용 origin
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

---

## ✅ 필수: 프론트엔드 fetch 또는 axios 요청 설정

React 등에서 아래처럼 `credentials: 'include'` 옵션을 꼭 포함해야 함:

```js
fetch('http://localhost:8080/api/user', {
  method: 'GET',
  credentials: 'include'
})
```

또는 axios:

```js
axios.get('http://localhost:8080/api/user', {
  withCredentials: true
})
```

---

## 🔍 주의 사항

| 상황                  | 주의할 점                                     |
| ------------------- | ----------------------------------------- |
| `credentials: true` | `allowedOrigins`는 `*` 불가 — 명시적으로 주소 지정 필요 |
| Spring Security 사용  | 반드시 Security 쪽에서도 CORS 설정해야 정상 적용됨        |
| HTTPS 환경            | 프론트와 백 모두 HTTPS 통일 필요                     |

---

원하시면 전체 프로젝트 구조 예제도 드릴 수 있습니다. 혹시 사용 중인 Spring Boot 버전이나 Security 유무 알려주시면, 더 구체적으로 도와드릴 수 있습니다.


