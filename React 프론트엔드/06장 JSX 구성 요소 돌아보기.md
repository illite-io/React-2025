좋습니다. \[PART 2]는 **리액트 내부 동작 원리와 핵심 개념을 “깊게” 이해하는 파트**입니다. 단순 사용법이 아니라 **JSX → 변환 → 렌더링 → 재조정 → 상태 → 파이버 아키텍처**까지 파고듭니다.

제가 \[PART 1]처럼 각 장을 **개념 설명 + 핵심 포인트 + 예시 코드** 흐름으로 정리해드리겠습니다.
오늘은 먼저 **06장 \~ 07장**까지만 상세히 풀어드리고, 원하시면 이후 08\~12장을 이어가겠습니다.

---

# 06장. JSX 구성 요소 돌아보기

## 6.1 왜 JSX를 공부해야 하나

* JSX는 **리액트 UI 선언의 중심**입니다.
* 단순 문법이 아니라 \*\*DSL(Domain Specific Language)\*\*로, JS와 XML을 결합한 특별 문법.
* JSX를 이해하면 렌더링 과정, props 전달, children 구조를 **정확히 해석**할 수 있습니다.

## 6.2 DSL과 JSX

* DSL: 특정 목적을 위한 언어 (SQL, HTML).
* JSX는 **UI를 선언하기 위한 DSL**.

```jsx
// JSX (DSL)
<Button primary>확인</Button>

// 변환된 JS
React.createElement(Button, { primary: true }, "확인")
```

## 6.3 JSX를 구성하는 요소

### 6.3.1 JSXElements

```jsx
const element = <h1>Hello</h1>;
```

### 6.3.2 JSXAttributes

```jsx
const element = <input type="text" placeholder="이름" />;
```

### 6.3.3 JSXChildren

```jsx
const element = (
  <ul>
    <li>사과</li>
    <li>바나나</li>
  </ul>
);
```

### 6.3.4 JSX Strings

```jsx
const element = <p>{"문자열도 가능"}</p>;
```

### 예시 코드

**/06-jsx/App.jsx**

```jsx
import React from "react";

export default function App() {
  return (
    <div>
      <h1>JSX 요소 정리</h1>
      {/* JSXElement */}
      <p>단순 엘리먼트</p>

      {/* JSXAttributes */}
      <input type="text" placeholder="이름 입력" />

      {/* JSXChildren */}
      <ul>
        <li>🍎 사과</li>
        <li>🍌 바나나</li>
      </ul>

      {/* JSX String */}
      <span>{"문자열 표현"}</span>
    </div>
  );
}
```

**핵심 키워드 리마인드**
DSL / JSXElement / JSXAttribute / JSXChildren / JSX String

---

