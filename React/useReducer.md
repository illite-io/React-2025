`useReducer`는 React에서 상태 관리를 위해 사용하는 훅으로, 복잡한 상태 로직이나 여러 상태가 관련된 상황에서 유용합니다. `useState`보다 더 명확하게 상태 전이 로직을 관리할 수 있도록 돕습니다. 아래에 비교와 함께 다양한 예시 코드를 설명드리겠습니다.

---

## 1. `useState` vs `useReducer` 비교

| 항목      | `useState`                       | `useReducer`                 |
| ------- | -------------------------------- | ---------------------------- |
| 사용 목적   | 간단한 상태값 처리                       | 복잡한 상태 로직 또는 여러 상태 관리        |
| 상태 구조   | 단순한 값 (string, number, object 등) | 상태와 액션 기반 처리 (state, action) |
| 상태 업데이트 | 직접 값 설정                          | reducer 함수를 통해 액션에 따라 업데이트   |
| 코드 구조   | 간단하고 짧음                          | 액션 타입과 리듀서 작성 필요             |
| 디버깅     | 간단한 경우에 적합                       | 액션/로직이 분리되어 추적과 테스트가 쉬움      |

---

## 2. `useReducer` 기본 사용법

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

* `reducer`: `(state, action) => newState`
* `initialState`: 초기 상태 값
* `dispatch`: 액션을 발생시키는 함수

---

## 3. 예시 코드 10가지 이상

### 1. 기본 카운터

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

---

### 2. 문자열 상태 관리

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'append':
      return state + action.value;
    case 'reset':
      return '';
    default:
      return state;
  }
};

const StringAppender = () => {
  const [text, dispatch] = useReducer(reducer, '');

  return (
    <div>
      <input onChange={(e) => dispatch({ type: 'append', value: e.target.value })} />
      <p>현재 입력: {text}</p>
      <button onClick={() => dispatch({ type: 'reset' })}>초기화</button>
    </div>
  );
};
```

---

### 3. boolean 상태 toggle

```jsx
const reducer = (state) => !state;

function ToggleSwitch() {
  const [isOn, toggle] = useReducer(reducer, false);
  return (
    <button onClick={toggle}>
      {isOn ? '켜짐' : '꺼짐'}
    </button>
  );
}
```

---

### 4. 폼 데이터 관리

```jsx
const reducer = (state, action) => ({
  ...state,
  [action.name]: action.value,
});

const Form = () => {
  const [form, dispatch] = useReducer(reducer, { name: '', email: '' });

  return (
    <form>
      <input name="name" onChange={(e) => dispatch(e.target)} placeholder="이름" />
      <input name="email" onChange={(e) => dispatch(e.target)} placeholder="이메일" />
      <p>이름: {form.name}, 이메일: {form.email}</p>
    </form>
  );
};
```

---

### 5. 리스트 추가 및 제거

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.item];
    case 'remove':
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

const List = () => {
  const [items, dispatch] = useReducer(reducer, []);
  const inputRef = React.useRef();

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => dispatch({ type: 'add', item: inputRef.current.value })}>추가</button>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item} <button onClick={() => dispatch({ type: 'remove', index: i })}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

### 6. 다중 상태 관리 (다크모드 + 카운터)

```jsx
const initialState = { count: 0, dark: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
      return { ...state, dark: !state.dark };
    case 'increment':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};
```

---

### 7. 상태 초기화

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};
```

---

### 8. undo/redo 구현

```jsx
const initialState = {
  past: [],
  present: '',
  future: [],
};

function reducer(state, action) {
  const { past, present, future } = state;
  switch (action.type) {
    case 'type':
      return {
        past: [...past, present],
        present: action.value,
        future: [],
      };
    case 'undo':
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, -1),
        present: previous,
        future: [present, ...future],
      };
    case 'redo':
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      };
    default:
      return state;
  }
}
```

---

### 9. API 호출 상태 관리

```jsx
const initialState = {
  loading: false,
  data: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetch_start':
      return { loading: true, data: null, error: null };
    case 'fetch_success':
      return { loading: false, data: action.payload, error: null };
    case 'fetch_error':
      return { loading: false, data: null, error: action.error };
    default:
      return state;
  }
}
```

---

### 10. 모달 관리

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, open: true };
    case 'close':
      return { ...state, open: false };
    default:
      return state;
  }
};
```

---

이어서 추가 예시나 각 예제의 변형도 가능하니 원하시면 `.`, `다음` 또는 구체적인 예시 번호로 말씀해주세요.


import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}

useState로 변환


`useReducer`를 `useState`로 변환한 예시는 다음과 같습니다.

### ✅ 변환된 `useState` 버전

```jsx
import React, { useState } from 'react';

function Counter() {
  // useState를 사용해 count 상태 선언
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      {/* 버튼 클릭 시 직접 count 값을 변경 */}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
}
```

### 주요 차이점 설명

| 항목       | `useReducer`                                    | `useState`                  |
| -------- | ----------------------------------------------- | --------------------------- |
| 상태 정의    | `state = { count: 0 }`                          | `count = 0`                 |
| 상태 변경 방식 | `dispatch({ type: 'increment' })` → reducer로 분기 | `setCount(count + 1)` 직접 설정 |
| 액션 기반    | Yes (type 분기)                                   | No (값 직접 변경)                |

`useState`는 간단한 숫자 증가/감소처럼 로직이 단순한 경우 적합합니다. `useReducer`는 상태가 객체로 복잡해질 때 더 적합합니다.


좋은 질문입니다. `useState`와 `useReducer`는 겉으로 보기엔 비슷해 보여도, **복잡한 상태 로직**이나 **액션 중심의 상태 전이**가 필요한 상황에서는 `useReducer`가 훨씬 더 명확하고 유지보수에 유리합니다.

---

## 🔍 useReducer의 확실한 장점

### 1. **복잡한 상태 로직을 한 곳에 모아서 관리**

* 여러 상태 변수들끼리 **서로 영향을 주는 경우**, `useState`는 상태 갯수만큼 `setState`를 따로 관리해야 하지만,
  `useReducer`는 **하나의 reducer 함수로 상태 전이 로직을 명확하게 표현**할 수 있음.

> 예시: 입력값, 유효성 상태, 에러 메시지 등을 동시에 다루는 폼

---

### 2. **상태 변화 로직을 외부로 분리해서 테스트와 디버깅이 쉬움**

* `reducer`는 순수 함수이기 때문에 단위 테스트가 쉬움
* 상태가 어떻게 변했는지 액션 로그를 통해 추적 가능 (→ 디버깅에 유리)

---

### 3. **액션 기반으로 상태 전이**

* 복잡한 UI 동작을 단순한 액션 이름으로 다룰 수 있어 **가독성**과 **유지보수성**이 뛰어남

```js
dispatch({ type: 'submit_success' })
dispatch({ type: 'error', payload: '서버 오류' })
```

> 이런 형태는 `setState`로 각각 처리하면 로직이 흩어지게 됨

---

### 4. **콜백 함수 안에서 상태를 업데이트해야 할 때 안정적**

* `setState(prev => prev + 1)` 형태처럼 이전 값을 기반으로 갱신할 일이 많으면 reducer가 더 깔끔

---

## ✍ 언제 useReducer를 쓰면 좋을까?

| 상황                            | 추천 훅         |
| ----------------------------- | ------------ |
| 상태가 단순하고 변경도 간단함              | `useState`   |
| 상태가 객체이며 속성이 여러 개임            | `useReducer` |
| 상태 변경 로직이 복잡하거나 액션 중심임        | `useReducer` |
| 상태 변화 과정을 외부에서 제어하거나 테스트하고 싶음 | `useReducer` |

---

## ✅ 실전 예: useReducer가 유리한 경우

```jsx
const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'start_submit':
      return { ...state, isSubmitting: true, error: null };
    case 'success':
      return { ...state, isSubmitting: false };
    case 'error':
      return { ...state, isSubmitting: false, error: action.error };
    case 'change_field':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}
```

위와 같은 상황을 `useState`로 하면 최소 4개 상태 + 4개 setter + 분산된 로직이 필요합니다.

---

## 요약

| 비교 항목     | useState           | useReducer        |
| --------- | ------------------ | ----------------- |
| 코드 간결성    | 상태가 단순할 때 유리       | 복잡한 상태일 땐 가독성 저하  |
| 상태 구조     | 단일 값 or 여러 개 상태 변수 | 하나의 구조체(state 객체) |
| 상태 전이 로직  | 컴포넌트 내 흩어짐         | reducer에 집중       |
| 디버깅 및 테스트 | 어려움                | 액션 기반으로 쉽고 예측 가능  |

---

원하신다면 `useState`로 복잡한 상태를 다룰 때 발생하는 문제와 `useReducer`로 바꿨을 때 개선되는 실제 예제를 비교해 보여드릴게요. 요청하시면 바로 이어서 드리겠습니다.


이번엔 복잡한 상태 로직을 다룰 때 `useState`와 `useReducer`의 차이를 직접 비교해보겠습니다.

---

## ✅ 예시: 로그인 폼 상태 관리

### 1. `useState` 버전 (상태가 여러 개, 로직이 흩어짐)

```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 가상의 로그인 API
      await fakeLogin(email, password);
      alert('로그인 성공');
    } catch (err) {
      setError('로그인 실패');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isSubmitting}>로그인</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

### 2. `useReducer` 버전 (로직 집중, 가독성/확장성 향상)

```jsx
import React, { useReducer } from 'react';

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'change_field':
      return { ...state, [action.field]: action.value };
    case 'submit_start':
      return { ...state, isSubmitting: true, error: null };
    case 'submit_success':
      return { ...state, isSubmitting: false };
    case 'submit_error':
      return { ...state, isSubmitting: false, error: action.error };
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, isSubmitting, error } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'submit_start' });

    try {
      await fakeLogin(email, password);
      dispatch({ type: 'submit_success' });
      alert('로그인 성공');
    } catch (err) {
      dispatch({ type: 'submit_error', error: '로그인 실패' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) =>
          dispatch({ type: 'change_field', field: 'email', value: e.target.value })
        }
      />
      <input
        type="password"
        value={password}
        onChange={(e) =>
          dispatch({ type: 'change_field', field: 'password', value: e.target.value })
        }
      />
      <button disabled={isSubmitting}>로그인</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

## 결론

| 기준       | useState   | useReducer                 |
| -------- | ---------- | -------------------------- |
| 상태 수     | 상태마다 하나씩   | 하나의 객체로 묶음                 |
| 상태 변경 로직 | 이벤트 안에서 직접 | reducer로 일괄 관리             |
| 유지보수     | 상태 많아지면 복잡 | 액션 기반 구조로 정돈됨              |
| 추천 상황    | 단순한 UI 조작  | 로그인, 폼, API 응답 등 복잡한 상태 흐름 |

다음은 복잡한 컴포넌트 내에서 `useReducer`가 구조적으로 왜 깔끔한지 더 보여주는 예시를 드릴 수 있습니다. 원하시면 `.`, `다음`으로 말씀해주세요.



이번엔 `useReducer`가 특히 유용한 **ToDo 리스트 예제**를 보여드리겠습니다. 항목 추가, 토글, 삭제 등 다양한 상태 변화가 있고, `useState`로 하면 로직이 흩어지지만 `useReducer`로 하면 매우 깔끔하게 정리됩니다.

---

## ✅ useReducer를 이용한 ToDo 리스트 예제

```jsx
import React, { useReducer, useState } from 'react';

// 초기 상태는 빈 배열
const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'toggle':
      return state.map((item) =>
        item.id === action.id ? { ...item, done: !item.done } : item
      );
    case 'remove':
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: 'add', text });
    setText('');
  };

  return (
    <div>
      <h3>할 일 목록</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
      />
      <button onClick={handleAdd}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch({ type: 'toggle', id: todo.id })}
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'remove', id: todo.id })}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 💡 이 예제에서 useReducer가 빛나는 이유

* 상태가 단순 배열이 아닌, 객체 배열 (id, text, done)을 포함
* 항목 추가, 토글, 삭제 등 다양한 동작이 존재
* 각 액션 타입별 로직이 한 곳(`reducer`)에 집중되어 있어 **가독성**이 뛰어남
* 상태 로직 변경 시 reducer만 수정하면 됨 → **유지보수성이 매우 높음**

---

다음으로 `useReducer`를 활용한 **모달/알림 상태 관리**, 또는 `useState`로 동일한 로직을 구현해보고 불편함을 비교해볼 수도 있습니다. 원하시면 이어서 설명드릴게요.
