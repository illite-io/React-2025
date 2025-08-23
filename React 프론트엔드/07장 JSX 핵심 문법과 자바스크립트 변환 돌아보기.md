
# 07장. JSX 핵심 문법과 자바스크립트 변환 돌아보기

## 7.1 왜 변환 과정을 알아야 하나

* JSX는 브라우저가 직접 이해하지 못합니다.
* Babel/SWC/ESBuild 같은 **트랜스파일러**가 JS 코드로 변환합니다.
* 이 과정 이해 → “JSX = React.createElement 호출” 구조를 정확히 알게 됨.

## 7.2 JSX 변환하기

### 7.2.1 자동 런타임(React 17+)

* import React 필요 없음. JSX → 자동으로 `jsx()` 호출.

### 7.2.2 Babel 변환

```bash
npx babel App.jsx --out-file App.js
```

JSX:

```jsx
const el = <h1>Hello</h1>;
```

Babel 결과:

```js
const el = /*#__PURE__*/React.createElement("h1", null, "Hello");
```

### 7.2.3 SWC 변환

* Rust 기반, Babel보다 빠름.
* 결과는 동일하게 React.createElement 구조.

### 7.2.4 ESBuild 변환

* Go 기반, 번들러 내장 변환. 매우 빠른 빌드.

### 7.2.5 React.createElement & 가상 DOM

```jsx
const el = <button onClick={() => alert("hi")}>Click</button>;
```

→ 변환

```js
const el = React.createElement("button", { onClick: () => alert("hi") }, "Click");
```

→ 가상 DOM 객체

```js
{
  type: "button",
  props: {
    onClick: [Function],
    children: "Click"
  }
}
```

---

## 7.3 JSX 핵심 문법

### 7.3.1 템플릿 리터럴 & 태그드 템플릿

```js
// 템플릿 리터럴
const name = "넥스트스탭";
console.log(`안녕하세요 ${name}님`);

// 태그드 템플릿
function tag(strings, ...values) {
  return strings[0] + values[0].toUpperCase();
}
console.log(tag`hello ${"world"}`); // hello WORLD
```

### 7.3.2 JSX vs 템플릿 리터럴

* JSX: **UI 구조 선언**
* 템플릿 리터럴: **문자열 처리**

### 7.3.3 합성 이벤트

* JSX 이벤트 핸들러는 **합성 이벤트 객체**를 받음 (브라우저 이벤트 래핑).

```jsx
function App() {
  const handleClick = (e) => {
    console.log(e.type); // click
    console.log(e.nativeEvent); // 원래 브라우저 이벤트
  };
  return <button onClick={handleClick}>클릭</button>;
}
```

### 7.3.4 단일 루트 엘리먼트

* JSX 반환은 반드시 **하나의 루트 요소**여야 함.

```jsx
// 올바름
return <div><h1>Title</h1><p>내용</p></div>;

// 에러
return <h1></h1><p></p>;
```

### 7.3.5 삼항 연산자 & &&

```jsx
{isLogin ? <p>환영합니다</p> : <p>로그인 필요</p>}
{items.length > 0 && <p>{items.length} 개 있음</p>}
```

---

### 예시 코드

**/07-jsx-transform/App.jsx**

```jsx
import React, { useState } from "react";

export default function App() {
  const [isLogin, setLogin] = useState(false);
  const items = ["apple", "banana"];

  return (
    <div>
      <h1>JSX 핵심 문법</h1>

      {/* 합성 이벤트 */}
      <button onClick={() => setLogin(!isLogin)}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>

      {/* 삼항 연산자 */}
      {isLogin ? <p>환영합니다</p> : <p>로그인 해주세요</p>}

      {/* && 조건부 렌더링 */}
      {items.length > 0 && <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>}
    </div>
  );
}
```

**핵심 키워드 리마인드**
Babel/SWC/ESBuild / React.createElement / 가상 DOM / 합성 이벤트 / 단일 루트 / 조건부 렌더링

---