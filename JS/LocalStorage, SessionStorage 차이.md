`localStorage`와 `sessionStorage`는 모두 브라우저에 데이터를 저장할 수 있는 Web Storage API입니다. 둘은 매우 유사하지만 **저장 기간과 사용 목적**에서 차이가 있습니다.

---

### ✅ 공통점

* **문자열(String)** 형식으로 key-value 쌍 저장
* 브라우저 내에 저장 (서버 전송 안 됨)
* 도메인 기준으로 저장됨 (같은 도메인 내에서만 접근 가능)
* JavaScript로 쉽게 접근 가능 (`setItem`, `getItem`, `removeItem`, `clear` 등)

---

### ✅ 차이점 정리

| 항목         | `localStorage`        | `sessionStorage`              |
| ---------- | --------------------- | ----------------------------- |
| **유지 기간**  | 브라우저를 꺼도 **영구 보존**    | \*\*탭(세션)\*\*이 닫히면 삭제됨        |
| **세션 독립성** | 모든 탭/창에서 공유됨 (같은 도메인) | 각 탭/창마다 **독립적 저장소**           |
| **사용 용도**  | 로그인 유지, 사용자 설정 저장 등   | 폼 데이터 임시 저장, 페이지 이동 간 상태 유지 등 |
| **크기 제한**  | 대략 5MB 정도             | 대략 5MB 정도 (브라우저마다 다름)         |

---

### ✅ 간단한 예시

```js
// localStorage 사용 예
localStorage.setItem('username', 'nextstep');
const user = localStorage.getItem('username'); // 'nextstep'

// sessionStorage 사용 예
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token'); // 'abc123'
```

---

### ✅ 언제 어떤 걸 써야 하나요?

* **로그인 상태 유지**: `localStorage`
* **새로고침 또는 탭 닫기 시 초기화 필요한 데이터**: `sessionStorage`
* **민감한 정보 저장은 X**: 둘 다 쉽게 접근 가능하므로 보안에 유의해야 합니다. (토큰 저장 시에는 보안 고려 필수)

---

필요하면 각각을 사용하는 실전 예제도 만들어드릴 수 있습니다.



다음은 `localStorage`와 `sessionStorage` 각각을 활용한 **예시 코드**입니다. HTML + JS로 구성되어 있으니 브라우저에 붙여 테스트할 수 있습니다.

---

## ✅ 1. localStorage 예제

**사용자가 이름을 입력하면 저장되고, 새로고침해도 유지됨**

### 📁 `/localStorage-example.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>localStorage 예제</title>
</head>
<body>
  <h2>localStorage 이름 저장</h2>
  <input type="text" id="nameInput" placeholder="이름을 입력하세요" />
  <button onclick="saveName()">저장</button>
  <p id="greeting"></p>

  <script>
    // 페이지 로드 시 저장된 이름 불러오기
    const savedName = localStorage.getItem('name');
    if (savedName) {
      document.getElementById('greeting').textContent = `안녕하세요, ${savedName}님!`;
    }

    function saveName() {
      const name = document.getElementById('nameInput').value;
      localStorage.setItem('name', name);
      document.getElementById('greeting').textContent = `안녕하세요, ${name}님!`;
    }
  </script>
</body>
</html>
```

---

## ✅ 2. sessionStorage 예제

**사용자가 페이지를 이동하지 않는 한 로그인 상태 유지, 새로고침 시 유지되지만 탭을 닫으면 사라짐**

### 📁 `/sessionStorage-example.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>sessionStorage 예제</title>
</head>
<body>
  <h2>sessionStorage 로그인 상태</h2>
  <input type="text" id="username" placeholder="사용자명 입력" />
  <button onclick="login()">로그인</button>
  <button onclick="logout()">로그아웃</button>
  <p id="status"></p>

  <script>
    // 세션 로그인 상태 확인
    const user = sessionStorage.getItem('loginUser');
    if (user) {
      document.getElementById('status').textContent = `${user}님 로그인 중입니다.`;
    }

    function login() {
      const username = document.getElementById('username').value;
      sessionStorage.setItem('loginUser', username);
      document.getElementById('status').textContent = `${username}님 로그인 중입니다.`;
    }

    function logout() {
      sessionStorage.removeItem('loginUser');
      document.getElementById('status').textContent = '로그아웃 되었습니다.';
    }
  </script>
</body>
</html>
```

---

두 예제의 차이를 직접 확인해보세요:

* `localStorage`는 브라우저를 껐다 켜도 값이 남아 있습니다.
* `sessionStorage`는 새 탭을 열거나 브라우저를 닫으면 값이 사라집니다.

더 복잡한 예제(예: 리스트 저장, 다크모드 유지 등)도 원하시면 말씀해주세요.


이번에는 `localStorage`와 `sessionStorage`를 활용한 **리스트 저장 및 삭제 기능 예제**입니다.
사용자가 항목을 추가하면 화면에 목록이 표시되고, 각각 삭제할 수 있습니다.

---

## ✅ 3. localStorage 기반 할 일 목록 예제

### 📁 `/todo-localStorage.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>localStorage 할 일 목록</title>
</head>
<body>
  <h2>할 일 목록 (localStorage)</h2>
  <input type="text" id="todoInput" placeholder="할 일을 입력하세요" />
  <button onclick="addTodo()">추가</button>
  <ul id="todoList"></ul>

  <script>
    // localStorage에서 기존 목록 불러오기
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    // 저장된 목록 렌더링
    function renderTodos() {
      const list = document.getElementById('todoList');
      list.innerHTML = '';
      savedTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        
        const delBtn = document.createElement('button');
        delBtn.textContent = '삭제';
        delBtn.onclick = () => {
          savedTodos.splice(index, 1);
          localStorage.setItem('todos', JSON.stringify(savedTodos));
          renderTodos();
        };
        
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    }

    function addTodo() {
      const input = document.getElementById('todoInput');
      const newTodo = input.value.trim();
      if (newTodo) {
        savedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        input.value = '';
        renderTodos();
      }
    }

    renderTodos(); // 초기 렌더링
  </script>
</body>
</html>
```

---

## ✅ 4. sessionStorage 기반 임시 메모 예제

### 📁 `/memo-sessionStorage.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>sessionStorage 임시 메모</title>
</head>
<body>
  <h2>임시 메모 (sessionStorage)</h2>
  <textarea id="memoBox" rows="6" cols="50" placeholder="여기에 입력하세요..."></textarea>

  <script>
    const memoBox = document.getElementById('memoBox');

    // 저장된 메모 불러오기 (세션 기준)
    memoBox.value = sessionStorage.getItem('memo') || '';

    // 입력할 때마다 sessionStorage에 저장
    memoBox.addEventListener('input', () => {
      sessionStorage.setItem('memo', memoBox.value);
    });
  </script>
</body>
</html>
```

> 이 예제에서는 브라우저 탭을 닫으면 메모가 사라지고, 새로고침은 유지됩니다.

---

다음으로는 다음 중 원하시는 걸 이어드릴 수 있습니다:

1. **다크모드 설정을 localStorage에 저장**
2. **로그인 상태를 localStorage + sessionStorage 조합으로 유지**
3. **React에서 localStorage / sessionStorage 연동하는 예제**

원하시는 항목을 말씀해 주세요.


이번에는 **다크모드 설정을 `localStorage`에 저장하는 예제**를 소개합니다.
사용자가 다크모드를 켜면 다음 방문 시에도 설정이 유지됩니다.

---

## ✅ 5. 다크모드 설정 저장 예제 (localStorage 사용)

### 📁 `/darkmode-localStorage.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>다크모드 저장 예제</title>
  <style>
    body {
      transition: background-color 0.3s, color 0.3s;
    }
    .dark {
      background-color: #121212;
      color: white;
    }
    .light {
      background-color: white;
      color: black;
    }
  </style>
</head>
<body>
  <h2>다크모드 설정 (localStorage)</h2>
  <button onclick="toggleDarkMode()">다크모드 토글</button>

  <script>
    // 초기 다크모드 상태 설정
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }

    function toggleDarkMode() {
      const body = document.body;
      const isCurrentlyDark = body.classList.contains('dark');

      // 현재 다크모드면 라이트로 전환
      if (isCurrentlyDark) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('darkMode', 'false');
      } else {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    }
  </script>
</body>
</html>
```

---

### ✅ 동작 설명

* 버튼 클릭 시 `.dark` / `.light` 클래스가 토글됩니다.
* 현재 상태는 `localStorage.setItem('darkMode', 'true' 또는 'false')`로 저장됩니다.
* 사용자가 다음에 방문해도 이전 설정을 유지합니다.

---

### 🔄 다음 예제로는 다음 중 이어서 보여드릴 수 있습니다:

1. `localStorage + sessionStorage` 조합으로 로그인 상태 유지 예제
2. React에서 `localStorage`를 사용하는 커스텀 Hook (`useDarkMode`, `useLocalStorage`) 예제
3. Vue, Svelte, 또는 다른 프레임워크로 다크모드 구현 예제

원하는 항목을 알려주세요.


이번에는 `localStorage + sessionStorage`를 **조합해서 로그인 상태를 관리하는 예제**를 소개합니다.
사용자가 "자동 로그인"을 선택하면 `localStorage`에 저장되고, 선택하지 않으면 `sessionStorage`에 저장됩니다.

---

## ✅ 6. 자동 로그인 설정 예제 (localStorage + sessionStorage 조합)

### 📁 `/login-auto-local-session.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>자동 로그인 예제</title>
</head>
<body>
  <h2>로그인 예제</h2>

  <div id="loginForm">
    <input type="text" id="username" placeholder="아이디 입력" />
    <label>
      <input type="checkbox" id="rememberMe" />
      자동 로그인
    </label>
    <button onclick="login()">로그인</button>
  </div>

  <div id="welcomeMessage" style="display: none;">
    <p id="welcomeText"></p>
    <button onclick="logout()">로그아웃</button>
  </div>

  <script>
    const loginForm = document.getElementById('loginForm');
    const welcomeSection = document.getElementById('welcomeMessage');
    const welcomeText = document.getElementById('welcomeText');

    // 로그인 상태 확인 (localStorage 우선 확인, 없으면 sessionStorage)
    const savedUser = localStorage.getItem('loginUser') || sessionStorage.getItem('loginUser');

    if (savedUser) {
      showWelcome(savedUser);
    }

    function login() {
      const username = document.getElementById('username').value.trim();
      const remember = document.getElementById('rememberMe').checked;

      if (!username) {
        alert('아이디를 입력하세요.');
        return;
      }

      // 저장 위치 결정
      if (remember) {
        localStorage.setItem('loginUser', username);
      } else {
        sessionStorage.setItem('loginUser', username);
      }

      showWelcome(username);
    }

    function logout() {
      // 두 저장소 모두에서 제거
      localStorage.removeItem('loginUser');
      sessionStorage.removeItem('loginUser');

      loginForm.style.display = 'block';
      welcomeSection.style.display = 'none';
    }

    function showWelcome(username) {
      welcomeText.textContent = `${username}님 환영합니다!`;
      loginForm.style.display = 'none';
      welcomeSection.style.display = 'block';
    }
  </script>
</body>
</html>
```

---

### ✅ 동작 설명

* 자동 로그인을 체크하면 `localStorage`에 저장 → 브라우저를 꺼도 유지됨
* 체크하지 않으면 `sessionStorage`에 저장 → 탭을 닫으면 사라짐
* 로그아웃 시에는 둘 다 삭제

---

### 다음 예제로는 아래 중에서 진행할 수 있습니다:

1. **React에서 useLocalStorage, useSessionStorage Hook 만들기**
2. **Vue 3에서 reactive와 함께 localStorage 동기화 예제**
3. **로그인 상태를 기억해서 특정 페이지로 리다이렉트하는 예제**

원하시는 방향을 알려주세요.
