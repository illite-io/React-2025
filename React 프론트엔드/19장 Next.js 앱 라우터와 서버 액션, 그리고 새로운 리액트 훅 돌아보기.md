좋습니다. 이어서 **19장 Next.js 앱 라우터와 서버 액션, 그리고 새로운 리액트 훅 돌아보기**를 정리해드리겠습니다.

---

# 19장. Next.js 앱 라우터와 서버 액션, 그리고 새로운 리액트 훅 돌아보기

## 19.1 왜 이 장을 돌아봐야 하나

* Next.js 13 이후 **App Router**가 도입되면서 기존 Pages Router를 대체하기 시작했습니다.
* App Router는 **파일 기반 라우팅 + 서버 컴포넌트 + 레이아웃 시스템**을 결합해 더 강력한 구조를 제공합니다.
* 또한 \*\*서버 액션(Server Actions)\*\*과 \*\*React 19의 새로운 훅들(useActionState, useOptimistic, useFormStatus)\*\*이 함께 활용되며 풀스택 개발의 패러다임을 바꿉니다.

---

## 19.2 Next.js 앱 라우터 기본 사용법

### 19.2.1 라우팅 규칙

* `app/` 디렉토리 안의 폴더와 파일명이 라우팅 경로를 결정.
* `page.js`는 해당 경로의 기본 페이지.

```
app/
 ├─ layout.js   // 공통 레이아웃
 ├─ page.js     // "/" 루트 페이지
 └─ about/
     └─ page.js // "/about" 페이지
```

### 19.2.2 특수 파일과 계층 구조

* `layout.js`: 페이지 사이를 이동해도 유지되는 UI
* `error.js`: 에러 처리
* `loading.js`: Suspense fallback 대체
* `not-found.js`: 404 처리

### 19.2.3 중첩 라우팅과 레이아웃

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>사이드바</nav>
      <main>{children}</main>
    </div>
  );
}
```

→ `/dashboard/*` 경로에서 공통 레이아웃 적용.

---

## 19.3 정적/동적 렌더링과 캐싱

### 19.3.1 동적 라우트에서 정적 렌더링

```js
// app/posts/[id]/page.js
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}
```

### 19.3.2 정적 라우트에서 동적 렌더링

* `fetch()` 옵션에 `{ cache: "no-store" }` → 항상 최신 데이터.

### 19.3.3 풀 라우트 캐시

* 정적 결과를 라우트 단위로 캐싱.

### 19.3.4 라우터 캐시

* 동일 요청에 대해 클라이언트 사이드 캐싱.

### 19.3.5 요청 메모이제이션 (React.cache)

```js
import { cache } from "react";

const getUser = cache(async (id) => {
  return fetch(`/api/user/${id}`).then(r => r.json());
});
```

### 19.3.6 데이터 캐시와 fetch

```js
await fetch("https://api.example.com", { next: { revalidate: 60 } });
```

### 19.3.7 라우트 핸들러 (API)

```js
// app/api/hello/route.js
export async function GET() {
  return Response.json({ msg: "Hello" });
}
```

---

## 19.4 서버 액션(Server Actions)

### 19.4.1 개념

* 클라이언트 이벤트에서 직접 서버 함수를 호출.
* API 라우트 작성 없이 **서버 로직을 컴포넌트와 같이 정의** 가능.

```jsx
// app/actions.js
"use server";

export async function addTodo(todo) {
  await db.todos.insert(todo);
}
```

### 19.4.2 동작 원리

* `"use server"`가 선언된 함수는 서버 번들에만 포함됨.
* 클라이언트에서 호출 시 Next.js가 서버에 RPC 호출.

---

## 19.5 React 19의 새로운 훅들 (서버 액션과 함께)

### 19.5.1 액션과 서버 액션의 관계

* `useActionState`, `useOptimistic`, `useFormStatus`는 **서버 액션을 더 자연스럽게 사용**하기 위한 보조 훅.

---

### 19.5.2 useActionState

* 서버 액션 실행 결과를 상태처럼 관리.

```jsx
import { useActionState } from "react";
import { addTodo } from "./actions";

export default function Form() {
  const [state, formAction] = useActionState(addTodo, null);

  return (
    <form action={formAction}>
      <input name="title" />
      <button>추가</button>
      {state && <p>결과: {state}</p>}
    </form>
  );
}
```

---

### 19.5.3 useOptimistic

* 낙관적 UI 업데이트 (Optimistic UI).
* 서버 응답 전 미리 UI 반영.

```jsx
import { useOptimistic } from "react";

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAdd(newTodo) {
    addOptimisticTodo(newTodo); // 즉시 UI 반영
    await saveToServer(newTodo); // 서버 동기화
  }

  return (
    <ul>
      {optimisticTodos.map(t => <li key={t.id}>{t.title}</li>)}
      <button onClick={() => handleAdd({ id: Date.now(), title: "새 할 일" })}>
        추가
      </button>
    </ul>
  );
}
```

---

### 19.5.4 useFormStatus

* `<form>` 상태를 감지 (제출 중/완료 여부).

```jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "전송 중..." : "제출"}</button>;
}
```

---

## 예시 코드 (19장 종합)

**/app/page.js**

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Next.js App Router</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
```

**/app/about/page.js**

```jsx
export default function About() {
  return <h2>소개 페이지</h2>;
}
```

**/app/api/hello/route.js**

```js
export async function GET() {
  return Response.json({ msg: "Hello Next.js!" });
}
```

**/app/actions.js**

```js
"use server";
export async function addTodo(formData) {
  const title = formData.get("title");
  return `추가됨: ${title}`;
}
```

**/app/form/page.js**

```jsx
import { useActionState } from "react";
import { addTodo } from "../actions";

export default function FormPage() {
  const [state, formAction] = useActionState(addTodo, null);

  return (
    <form action={formAction}>
      <input name="title" />
      <button>추가</button>
      {state && <p>{state}</p>}
    </form>
  );
}
```

---

**핵심 키워드 리마인드**

* App Router: app 디렉토리 기반, layout/error/loading/not-found 파일
* 정적/동적 렌더링: fetch 캐싱 옵션, ISR, 데이터 캐시
* Server Actions: `"use server"`, 클라이언트→서버 직접 호출
* React 19 훅:

  * useActionState: 서버 액션 상태 관리
  * useOptimistic: 낙관적 업데이트
  * useFormStatus: 폼 제출 상태

---

넥스트스탭님, 여기서 \*\*PART 4 전체 요약(18\~19장 흐름 비교 도표)\*\*을 만들어드릴까요, 아니면 곧바로 \*\*\[PART 5] (실전 활용 편)\*\*으로 넘어가 정리해드릴까요?
