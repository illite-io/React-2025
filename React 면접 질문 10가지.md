좋습니다. JavaScript 기반으로 React 면접 질문 10가지에 대해 매우 상세한 설명과 함께 예시 코드도 포함하여 정리해 드리겠습니다. 각 질문은 개별 섹션으로 구성하고, 중급\~고급 개발자 수준에 맞춰 설명하겠습니다.

작업이 완료되면 알려드리겠습니다.


# React 면접 질문 10가지와 상세 답변

## 1. useState와 useReducer 선택 기준 (상태 관리)

**답변:** 컴포넌트 상태 관리 시 **useState**와 **useReducer**는 각각 장단점이 있으며, 상황에 따라 선택합니다. 일반적으로 상태가 단순하거나 독립적이면 `useState`를 쓰고, 상태 구조가 복잡하거나 여러 값이 하나의 로직으로 묶여 있으면 `useReducer`를 고려합니다. 예를 들어 **문자열, 불리언, 숫자와 같은 간단한 값**을 관리하거나 **간단한 비즈니스 로직**만 필요한 경우엔 `useState` 훅이 더 간편합니다. 반면 **객체나 배열로 이루어진 복잡한 상태**나 **여러 하위 값들이 하나의 동작으로 함께 변경**되어야 하면 `useReducer`가 적합합니다. 또한 상태 변경 로직을 컴포넌트 밖으로 분리해 **코드를 구조화**할 수 있으므로, 처리해야 할 **액션의 종류가 여러 개일 때**도 `useReducer`를 쓰면 가독성이 높아집니다. 두 훅은 내부적으로 동작이 비슷하므로 필요에 따라 상호 전환도 가능하며, 복잡도가 높아지면 `useReducer`로 리팩토링하는 식으로 \*\*“간단하게 시작하고 필요할 때 복잡도를 추가”\*\*하는 것이 좋습니다.

* **useState를 선호하는 경우:** 상태가 자바스크립트 \*\*기본 타입(문자열, 숫자, 불리언)\*\*이고 **단순 로직**일 때, 또는 **여러 개의 독립적인 상태값**을 각각 관리해도 상관없을 때. 예를 들어 토글(Boolean) 값이나 폼 입력처럼 간단히 변경되는 값은 `useState`로 관리하면 충분합니다.
* **useReducer를 선호하는 경우:** 상태가 **객체/배열 등의 구조적 데이터**거나 변경 로직이 **복잡**해서 분기처리가 필요할 때, 그리고 여러 하위 상태가 **한 개 액션으로 동시에 바뀌어야** 할 때입니다. 또한 이전 상태 기반으로 다음 상태를 계산하는 로직을 한 곳에서 관리하고 싶을 때도 `useReducer`가 유용합니다. 예를 들어 To-Do 리스트에서 **추가/완료처리/삭제** 같은 여러 액션을 일관되게 처리하려면 `useReducer`로 리듀서 함수를 작성하면 편리합니다.

```jsx
// ✅ useState 사용 예시: 상태가 단순한 카운터
function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);  // 간단한 상태 변경 로직

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={increment}>+1 증가</button>
    </div>
  );
}

// ✅ useReducer 사용 예시: 복잡한 상태 (예: 다중 액션이 있는 To-Do 리스트)
const initialTodos = [];  // To-Do 아이템들의 초기 배열
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // 새로운 할 일 추가 (action.payload는 새로운 todo 객체)
      return [...state, action.payload];
    case 'REMOVE_TODO':
      // 해당 ID의 할 일을 제거
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO':
      // 완료 상태 토글
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  
  // 예시: 새로운 할 일 추가 액션 디스패치
  const handleAdd = text => {
    const newTodo = { id: Date.now(), text, done: false };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  // ...생략 (UI 렌더링)
}
```

위 예시에서 `Counter` 컴포넌트는 값 하나를 관리하므로 `useState`가 간단하고 적합합니다. 반면 `TodoApp`은 추가/삭제/토글 등 **다양한 상태 변경**이 일어나므로 `useReducer`로 액션별 로직을 분리했습니다. 이렇게 하면 상태 변경 관련 코드가 한 곳에 모여 **예측 가능**하고, 컴포넌트 JSX 부분도 깔끔해집니다.

요약하면, **상태 갱신 로직이 단순**하고 **독립적**인 경우 `useState`를, **다양한 타입의 업데이트가 발생**하거나 **상태 구조가 복잡**해지는 경우 `useReducer`를 고려하세요. 프로젝트 초기에는 복잡도를 낮춰 `useState`로 시작하고, 요구사항이 늘어나면 `useReducer`로 자연스럽게 전환하는 접근이 바람직합니다.

## 2. 커스텀 훅(Custom Hook) 사용 이유와 장점

**답변:** **커스텀 훅**은 React의 기본 훅들을 조합하여 **재사용 가능한 상태 로직**을 추출한 함수입니다. 이를 사용하는 주된 이유는 **컴포넌트 간에 공통 로직을 공유**함으로써 **중복 코드를 줄이고**, 컴포넌트 자체는 **UI 렌더링에만 집중**하도록 만들기 위해서입니다. 즉, 화면을 그리는 컴포넌트에서 비즈니스 로직이나 사이드 이펙트 처리를 분리하면 관심사가 명확히 분리되어 코드 구조가 개선됩니다. 여러 컴포넌트에서 반복되는 로직(예: **데이터 fetch, 폼 상태 관리, 이벤트 리스너 등록** 등)을 커스텀 훅으로 빼내면 **한 번만 작성하고 어디서든 재사용**할 수 있어 생산성과 유지보수성이 높아집니다.

커스텀 훅의 **주요 장점**은 다음과 같습니다:

* **컴포넌트 복잡도 감소:** 복잡한 상태 관리나 비즈니스 로직을 훅으로 분리함으로써, 컴포넌트는 **UI 렌더링에 집중**할 수 있습니다. 이로써 컴포넌트 코드가 간결해지고 가독성이 향상됩니다. 예를 들어 사용자 인증 로직을 `useAuth` 훅으로 분리하면, UI 컴포넌트는 인증 상태에 따라 무엇을 보여줄지만 신경 쓰면 되므로 코드가 깨끗해집니다.
* **로직 재사용 및 중복 제거:** 커스텀 훅은 한 곳에 검증된 로직을 모아두고 **여러 컴포넌트에서 공유**하게 해줍니다. 동일한 동작을 하는 코드를 여기저기 반복 작성하지 않아도 되므로 **DRY 원칙**을 지킬 수 있고, 버그 발생 확률도 낮아집니다. 한 훅을 수정하면 그 훅을 사용하는 모든 곳에 적용되므로 일관성도 높아집니다.
* **관심사 분리:** UI와 상태 관리/사이드 이펙트 로직을 분리하여 **코드 구조를 체계화**합니다. 컴포넌트는 "무엇을 화면에 표시할지"에 집중하고, 커스텀 훅은 "어떻게 데이터나 상태를 다룰지" 처리합니다. 이렇게 하면 각 부분의 **책임이 명확**해져 유지보수와 테스트가 쉬워집니다 (예: API 호출, 타이머, 이벤트 구독 같은 것들을 훅으로 분리).
* **선언적인 코드 작성:** 커스텀 훅을 활용하면 복잡한 로직도 함수 호출로 추상화되어 컴포넌트에서는 **선언적으로** 사용할 수 있습니다. 예를 들어 `useFetch` 훅을 만들어 놓으면, 컴포넌트에서는 구현 세부사항 몰라도 `const { data, error } = useFetch(url)`과 같이 선언적으로 데이터 가져오기 상태를 사용할 수 있습니다. 이는 React의 선언형 프로그래밍 철학과도 부합합니다.
* **Side Effect 관리 용이:** 여러 컴포넌트에서 사용하는 이벤트 리스너나 타이머 같은 부작용 코드를 커스텀 훅으로 모으면, **자원 정리(clean-up)** 로직을 한 곳에서 관리할 수 있어 **메모리 누수 방지** 등에 유리합니다. 예를 들어 `useWebSocket` 훅을 만들어 웹소켓 연결 로직을 캡슐화하고, 언마운트 시 연결 해제를 훅 내부에서 처리하면 컴포넌트들은 신경 쓸 필요가 없습니다.

**예시 코드:** 아래는 **사용자 온라인 상태 추적** 로직을 커스텀 훅으로 분리한 예시입니다. 두 컴포넌트에서 동일 로직을 공유해야 한다고 가정해 보겠습니다.

```jsx
// ✅ 커스텀 훅: 네트워크 온라인 상태 추적 (useOnlineStatus.js)
import { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // 이벤트 핸들러 정의
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    // 브라우저 온라인/오프라인 이벤트 구독
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // 정리 함수: 이벤트 구독 해제
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);  // 한 번만 실행

  return isOnline;
}

export default useOnlineStatus;
```

```jsx
// ✅ 위 커스텀 훅을 사용하는 컴포넌트들
import useOnlineStatus from './useOnlineStatus';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ 온라인' : '❌ 오프라인'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  return (
    <button disabled={!isOnline}>
      {isOnline ? '저장' : '재연결 중...'}
    </button>
  );
}
```

위와 같이 `useOnlineStatus` 훅을 한 번 만들어 두면, `StatusBar`, `SaveButton` 등 **여러 컴포넌트에서 쉽게 재사용**할 수 있습니다. 각 컴포넌트는 `useOnlineStatus()` 호출 결과만 써서 **현재 네트워크 상태에 따른 UI**를 표현하면 되므로, 내부 구현을 몰라도 되고 중복 코드도 없습니다. 이처럼 커스텀 훅은 **상태 관련 로직을 캡슐화**하여 컴포넌트의 역할을 단순화하고 재사용성을 높여주는 유용한 수단입니다.

## 3. React 렌더링 성능 최적화: React.memo, useMemo, useCallback 활용

**답변:** React에서는 불필요한 재렌더링을 줄여 성능을 높이기 위해 **메모이제이션(Memoization)** 기법을 지원하는 몇 가지 도구를 제공합니다. **`React.memo`**, **`useMemo`**, \*\*`useCallback`\*\*이 대표적이며, 각각 컴포넌트 또는 값/함수를 **메모이제이션하여 불필요한 재연산이나 재생성**을 방지합니다. 올바르게 사용하면 렌더링 횟수와 연산량을 줄여 성능을 향상시킬 수 있지만, 남용하면 오히려 복잡성과 메모리 사용이 증가할 수 있으므로 **필요한 경우에만 사용하는 것이 좋습니다**.

* **`React.memo` (컴포넌트 메모이제이션):** 고차 컴포넌트(HOC)로서, **프롭스가 바뀌지 않으면 컴포넌트를 다시 렌더링하지 않도록** 합니다. `React.memo(MyComponent)`로 감싸주면 React가 이전 프롭스와 새 프롭스를 얕은 비교(shallow compare)하여 동일한 경우 마지막 렌더링 결과를 재사용합니다. 이를 통해 부모가 다시 렌더링되더라도 특정 자식 컴포넌트는 프롭스 변화가 없으면 렌더링을 생략하게 되어 **불필요한 렌더링 최소화**에 도움이 됩니다. 예를 들어 리스트 아이템 컴포넌트에 `React.memo`를 적용하면, 리스트 상위 컴포넌트가 업데이트될 때 내용이 바뀐 아이템만 다시 렌더됩니다.

* **`useMemo` (값 메모이제이션):** **연산 비용이 큰 계산 결과**를 메모이제이션하는 훅입니다. `useMemo(() => 계산식, [의존값])` 형태로 사용하며, 의존값이 변경되지 않는 한 **이전 계산 결과를 캐시**하여 동일 연산을 반복하지 않습니다. 렌더링 과정에서 **복잡한 계산이나 데이터 가공**이 필요한 경우 `useMemo`로 감싸면, 해당 값이 필요할 때만 계산하고 그렇지 않으면 기존 값을 재사용하여 성능을 개선합니다. 예를 들어, 무거운 함수 `calculatePrimeNumbers(n)` 결과를 화면에 표시해야 하면 `useMemo(() => calculatePrimeNumbers(n), [n])`으로 감싸 **n 값이 바뀔 때만** 함수를 실행하게 만들 수 있습니다. 이를 통해 불필요한 계산으로 인한 UI 지연을 줄일 수 있습니다.

* **`useCallback` (함수 메모이제이션):** **함수 정의 자체를 메모이제이션**하는 훅으로, `useCallback(callback, [의존값])` 형태입니다. 매 렌더링마다 새 함수 객체가 생성되는 것을 방지하여, **의존값이 변하지 않으면 동일한 함수 인스턴스**를 반환합니다. 주로 자식 컴포넌트에 콜백 함수를 프롭스로 전달할 때 유용한데, 콜백이 불필요하게 새로 생성되지 않도록 해주면 자식이 `React.memo`로 메모된 경우 **자식의 재렌더링을 막을 수 있기 때문**입니다. 예를 들어 부모 컴포넌트에서 `useCallback`으로 `onClick` 핸들러 함수를 메모이제이션하고 자식 버튼에 내려주면, 부모가 다른 상태로 업데이트돼도 `onClick`이 변경되지 않았다면 자식 버튼(`React.memo` 적용 시)은 리렌더링을 건너뜁니다.

```jsx
import React, { useState, useMemo, useCallback } from 'react';

// ❌ 최적화 전: 부모 리렌더링 시 자식도 매번 리렌더링
function Child({ onClick }) {
  console.log('Child 렌더링');
  return <button onClick={onClick}>증가</button>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(prev => prev + 1);  // 매번 새 함수 생성됨
  console.log('Parent 렌더링');
  return (
    <div>
      <Child onClick={handleClick} />
      <p>카운트: {count}</p>
    </div>
  );
}
```

```jsx
import React, { useState, useMemo, useCallback } from 'react';

// ✅ 최적화 후: React.memo, useCallback, useMemo 활용
const Child = React.memo(function Child({ onClick, value }) {
  console.log('Child 렌더링');
  return (
    <button onClick={onClick}>
      값 {value} 증가
    </button>
  );
});

function Parent() {
  const [count, setCount] = useState(0);

  // useCallback: 의존 배열이 []이므로 컴포넌트 생애주기 내 동일 함수 유지
  const handleClick = useCallback(() => setCount(c => c + 1), []);

  // useMemo: 복잡한 계산 결과를 메모이제이션 (예시로 count의 두 배 값을 계산)
  const doubled = useMemo(() => {
    console.log('복잡한 계산 실행!');
    return count * 2;
  }, [count]);

  console.log('Parent 렌더링');
  return (
    <div>
      {/* React.memo 적용된 Child: onClick이나 value 변경 시에만 렌더링 */}
      <Child onClick={handleClick} value={doubled} />
      <p>카운트: {count}</p>
    </div>
  );
}
```

위 코드에서, 최적화 전에는 `Parent`가 렌더링될 때마다 `Child` 컴포넌트도 항상 다시 렌더링되었습니다. 하지만 최적화 후 코드를 보면:

* `Child` 컴포넌트는 `React.memo`로 래핑되어, 부모로부터 전달된 `onClick`이나 `value` 프롭스가 변경될 때만 렌더링됩니다.
* 부모의 `handleClick` 함수는 `useCallback`으로 한 번 생성된 후 계속 재사용되므로, `Child`에 내려주는 콜백 참조가 매번 바뀌지 않습니다. 결과적으로 `Child`는 버튼 클릭으로 부모 상태가 변해도 콜백 참조가 동일하면 리렌더링을 건너뜁니다.
* 또한 `doubled` 값 계산에 `useMemo`를 적용하여, `count`가 변하지 않는 한 복잡한 계산(`count * 2` 예시)도 다시 수행하지 않습니다.

이처럼 \*\*`React.memo`\*\*는 **컴포넌트 단위**로, \*\*`useMemo`\*\*는 **값 반환 함수 단위**로, \*\*`useCallback`\*\*은 **함수 자체**를 메모이제이션하여 **불필요한 연산과 렌더링을 줄임으로써 성능 최적화**를 도와줍니다. 다만, 세 가지 모두 **메모이제이션 비용**이 있기 때문에, **재렌더링이 성능에 실제로 문제를 일으킬 때만** 사용하고 그렇지 않을 경우 과용하지 않는 것이 권장됩니다. React 18+에서는 자동 배치나 렌더링 최적화가 향상되어 지나친 `useMemo/useCallback` 사용이 오히려 복잡도를 높일 수 있다는 점도 기억하세요.

## 4. useEffect 모범 사례와 주의사항

**답변:** **`useEffect`** 훅은 **컴포넌트가 외부 시스템과 동기화**하거나 \*\*부수효과(side effect)\*\*를 처리하기 위해 사용합니다. 올바르게 사용하기 위해 몇 가지 모범 사례와 주의할 점을 숙지해야 합니다:

* **최상위에서만 호출:** `useEffect`는 리액트 훅의 규칙을 따라 **컴포넌트 함수의 최상위 레벨**에서만 호출해야 합니다. **조건문이나 반복문 내부, 중첩된 함수 내**에서는 호출하지 않도록 합니다. 이렇게 해야 리액트가 훅 호출 순서를 예측 가능하게 관리할 수 있습니다. 만약 특정 조건에 따라 효과를 실행하고 싶다면, 훅 내부에서 조건 분기를 넣거나, 효과 자체를 여러 개로 분리하는 것이 좋습니다.

* **의존성 배열 정확히 관리:** `useEffect(effect, [dep1, dep2, ...])` 형태로 \*\*의존성 배열(dependencies)\*\*을 지정하여, 어떤 값들이 바뀔 때 이 Effect를 다시 실행할지 명시해야 합니다. **의존성 배열을 올바르게 설정하지 않으면** 의도와 다르게 작동할 수 있습니다. 예를 들어 의존성 배열을 빈 배열 `[]`로 두면 컴포넌트 **마운트/언마운트 시에만** effect가 실행되고 업데이트 시에는 실행되지 않습니다. 반대로 의존성 배열을 생략하거나 누락하면 **매 렌더링마다 effect가 실행**될 수 있습니다. 필요한 모든 \*\*“reactive”한 값(프롭스, 상태, 또는 훅 내부 정의 변수)\*\*을 의존성에 포함시키되, 불필요한 객체나 함수를 넣어 무한 루프를 유발하지 않도록 주의합니다. 만약 effect 안에서 사용하지만 **의존성으로 넣고 싶지 않은 값**(예: 변하지 않는 함수)은, 훅 밖으로 추출하거나 `useCallback`/`useMemo`로 메모이제이션해서 처리합니다. 의존성 관리가 어렵다면 린트 규칙(ESLint의 `react-hooks/exhaustive-deps`)을 활용해 누락된 의존성을 경고받을 수 있습니다.

* **부수효과 목적에만 사용 (필요 없는 경우 회피):** `useEffect`는 **DOM 업데이트 후에 실행**되어 **외부 시스템과의 동기화** 등에 쓰입니다. React 공식 문서에서도 \*\*“굳이 Effect를 쓰지 않아도 될 일에는 쓰지 마라”\*\*고 권장합니다. 예를 들어 단순히 **컴포넌트 내부 상태를 다른 상태로 변환**하거나 **부모에 데이터 통지**하는 용도로는 Effect가 불필요할 수 있습니다. 이런 경우 해당 로직을 이벤트 핸들러나 state 설정 로직으로 처리하고 Effect를 사용하지 않는 편이 좋습니다. Effect를 남발하면 불필요한 반복 실행이나 복잡도가 증가할 수 있으므로, **정말로 React 외부와의 동기화가 필요한 경우에만** 사용합니다. (예: 데이터 fetching, 수동으로 DOM 조작, 구독 설정 등)

* **클린업(clean-up) 처리:** Effect에서 **이벤트 리스너 등록, 타이머 시작, 외부 자원 사용** 등을 했다면 **정리 함수**를 반환하여 해제/정리 작업을 해야 합니다. `useEffect(() => { ...; return () => { /* 정리 */ } }, [deps])` 형태로 cleanup 함수를 반환하면, **컴포넌트 언마운트시** 또는 **의존성이 바뀌어 Effect가 재실행되기 직전**에 React가 cleanup을 호출합니다. 정리를 제대로 하지 않으면 이벤트 리스너나 타이머가 계속 남아서 **메모리 누수**나 의도치 않은 동작이 발생할 수 있습니다. 예를 들어 `window.addEventListener`로 등록한 경우 cleanup에서 꼭 `removeEventListener`를 호출하고, 타이머(`setTimeout`, `setInterval`)를 사용했다면 `clearTimeout`/`clearInterval`을 해야 합니다. 또한 **React Strict Mode**에서는 개발 모드에서 Effect의 cleanup과 setup을 **한 번 더 실행**해보므로 (double invoke) cleanup 로직이 idempotent하게 잘 구현돼 있어야 합니다.

* **무한 반복 예방:** Effect 안에서 상태를 업데이트할 때는 각별히 유의해야 합니다. Effect가 실행될 때 **상태를 변경**하면 다시 렌더링 -> Effect 실행이 반복되어 **무한 루프**에 빠질 수 있습니다. 이런 경우 **상태 업데이트의 조건**을 엄격히 제한하거나, 의존성에 그 상태를 포함하여 변화 감지를 정확히 하도록 해야 합니다. 때로는 Effect를 여러 개로 분리하여 서로 영향을 주지 않게 하거나, state 업데이트 로직 자체를 Effect 밖으로 옮기는 것도 방법입니다.

* **UI 차원 효과는 useLayoutEffect 고려:** 대부분의 경우 `useEffect`는 비동기로 동작하여 **화면 업데이트 후에 실행**됩니다. 그런데 만약 effect에서 DOM을 조작하거나 레이아웃에 영향을 주는 작업(예: 툴팁 위치 계산)을 하면 화면이 그려졌다가 다시 수정되어 **깜박임**이 보일 수 있습니다. 이러한 **화면 관련 부작용**은 `useLayoutEffect`를 쓰면 렌더 완료 후 화면 그리기 전에 동기적으로 처리할 수 있습니다. 따라서 **시각적 안정성이 필요하거나, Effect로 인해 화면 깜박임이 발생한다면** `useLayoutEffect`로 전환하는 것을 고려합니다.

* **서버 사이드 렌더링(SSR) 주의:** `useEffect`는 **클라이언트에서만 실행**되고 서버 렌더링 중에는 무시됩니다. 따라서 Effect 내부에서 수행하는 작업은 브라우저 환경에서만 일어난다는 것을 염두에 두고 작성해야 합니다. 만약 SSR 단계에서도 어떤 처리가 필요하다면, 해당 코드를 Effect가 아니라 다른 곳에서 수행하거나 `useLayoutEffect`(SSR 시 경고 발생) 대신 조건 처리로 예외케이스를 다뤄야 합니다.

**예시 코드:** 아래는 Effect의 모범 사례를 보여주는 간단한 예시입니다. 윈도우의 리사이즈 이벤트에 따라 현재 창 크기를 상태로 관리하고, 컴포넌트가 사라질 때 이벤트를 정리(clean-up)하는 패턴입니다:

```jsx
function WindowSizeComponent() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // ✅ Effect: 창 크기 변화 이벤트 핸들링
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    console.log('이벤트 리스너 등록');

    // ✅ Cleanup: 컴포넌트 언마운트 또는 재실행 전에 제거
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('이벤트 리스너 제거');
    };
  }, []); // 빈 배열: 마운트 시 한 번 실행, 언마운트 시 정리

  return <div>현재 창 너비: {width}px</div>;
}
```

위 코드에서는 의존성 배열을 `[]`로 주어, 컴포넌트 **마운트시에만** Effect가 실행되게 했습니다. `resize` 이벤트 리스너를 등록하고, cleanup에서 제거함으로써 **메모리 누수와 중복 등록을 방지**했습니다. 또한 상태 업데이트 (`setWidth`)가 일어나지만 의존성 배열에 `width`를 넣지 않았는데요, 이는 이벤트 핸들러가 **외부 이벤트에 의해 호출**되므로 `width` 변화와는 상관없이 한 번만 등록하면 되는 경우이기 때문입니다. 만약 Effect 내부에서 참조하는 값 중 매 렌더링마다 변하는 것이 있다면 (예: props로 받은 함수 등) 반드시 의존성에 포함시켜야 무한루프를 막을 수 있습니다.

요약하자면, **useEffect는 필요한 경우에 한해 신중히 사용**하고, **의존성 배열을 정확히 관리**하며, **정리 함수로 부작용을 제대로 정리**하는 것이 중요합니다. 이것들을 지키면 `useEffect`를 통해 데이터 페칭이나 이벤트 핸들링 같은 작업을 안전하고 효율적으로 수행할 수 있습니다.

## 5. React.lazy와 Suspense를 활용한 코드 스플리팅 구현

**답변:** \*\*코드 스플리팅(Code Splitting)\*\*은 번들 크기를 줄여 초기 로드 시간을 단축하기 위한 기법으로, \*\*React에서는 `React.lazy`와 `Suspense`\*\*로 손쉽게 구현할 수 있습니다. `React.lazy`는 컴포넌트를 동적으로 임포트하여 **필요할 때만 로드**하게 해주고, `Suspense`는 로드가 **완료될 때까지 폴백 UI**(예: 로딩 스피너)를 보여주는 역할을 합니다.

* **`React.lazy()` 사용:** `React.lazy`는 `import()`를 활용하여 코드를 분할하고, **동적 임포트된 모듈을 컴포넌트처럼 반환**합니다. 예를 들어 다음과 같이 사용할 수 있습니다:

  ```js
  const OtherComponent = React.lazy(() => import('./OtherComponent'));
  ```

  이렇게 선언하면 `OtherComponent`를 실제로 렌더링하기 전까지 해당 번들(chunk)을 로드하지 않습니다. 즉, 초기 번들 크기에서 이 컴포넌트 코드는 제외되고, 사용자 이동 등으로 정말 필요해졌을 때 네트워크를 통해 불러오게 됩니다. 이 방식으로 페이지별, 컴포넌트별로 코드를 분할하여 \*\*"필요한 코드만 그때그때 로드"\*\*할 수 있어 **초기 로딩 성능**이 개선됩니다.

* **`<Suspense>` 컴포넌트:** Lazy 컴포넌트를 사용하려면 반드시 상위 트리 어딘가에 `<Suspense>`를 배치하고 `fallback` 프로퍼티로 **로딩 중임을 표시할 UI**를 지정해야 합니다. Suspense는 그 하위에 **아직 로드되지 않은 lazy 컴포넌트가 있을 경우** 자동으로 잡아내어 fallback UI를 보여줍니다. 로드가 완료되면 fallback을 숨기고 실제 컴포넌트를 렌더링합니다. 예를 들어:

  ```jsx
  import { Suspense, lazy } from 'react';
  const OtherComponent = lazy(() => import('./OtherComponent'));

  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    );
  }
  ```

  위 코드에서 `<OtherComponent />`가 아직 네트워크로 불러오는 중이라면 `<Suspense>`가 감싸고 있으므로 `fallback`으로 준 `"Loading..."` 문구가 임시로 표시됩니다. 로드 완료 후에는 자동으로 `OtherComponent` 내용이 나타납니다. `fallback`에는 로딩 스피너, 플레이스홀더 등 **사용자 경험을 개선할 요소**를 자유롭게 넣을 수 있습니다. Suspense를 여러 곳에 중첩하여 각각 다른 로딩 UI를 보여주거나, **여러 lazy 컴포넌트를 하나의 Suspense로 묶어** 한번에 로딩 상태를 처리하는 것도 가능합니다.

**예시 코드:** 페이지를 라우팅할 때 각 페이지 컴포넌트를 lazy load 하는 사례를 보겠습니다. (React Router와 함께 사용하는 예)

```jsx
// Route-based code splitting 예시
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// 페이지 컴포넌트를 필요할 때만 로드하도록 lazy로 감싸기
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));

function App() {
  return (
    <BrowserRouter>
      {/* 모든 라우트에 대해 Suspense 적용, 로딩스피너 표시 */}
      <Suspense fallback={<div className="spinner">로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

위처럼 구현하면 사용자가 `/about`이나 `/users` 경로로 이동할 때 처음 해당 컴포넌트들을 요청하여 가져옵니다. 이때 Suspense가 로딩 상태를 감지해 **스피너를 표시**하고, 데이터 페칭과 유사하게 코드도 비동기로 불러오는 동안 사용자에게 피드백을 주는 것이죠. 페이지가 적거나 번들이 작을 때는 큰 차이가 없지만, **앱 규모가 클 경우 코드 스플리팅은 매우 큰 성능 향상**을 가져옵니다. 특히 초기 진입 시에 당장 필요없는 관리 페이지나 방대한 서드파티 라이브러리 등을 뒤로 미루면 **첫 화면 표시 시간을 단축**할 수 있습니다.

추가적으로, React.lazy는 **기본 export를 내보내는 모듈만 바로 다룰 수 있으므로** named export를 다루려면 중간에 래퍼 컴포넌트가 필요하다는 점이나, Suspense는 **서버 사이드 렌더링(SSR)** 시 바로 지원되지 않으므로 SSR 환경에서는 `loadable-components` 같은 대안을 고려해야 한다는 점도 알아두면 좋습니다. 요약하면, `React.lazy`와 `Suspense`를 활용한 코드 분할로 **필요한 코드만 효율적으로 로드**하고, 그 사이에는 **적절한 폴백 UI**를 제공하여 사용자 경험과 성능을 모두 향상시킬 수 있습니다.

## 6. useContext로 상태 공유하기 – 장점과 주의사항

**답변:** **`useContext`** 훅(또는 Context API)은 컴포넌트 트리 전체에서 **데이터를 전역적**으로 공급하여 *prop drilling* 없이 하위 컴포넌트들이 해당 값을 사용할 수 있게 해줍니다. 컨텍스트를 사용하면 여러 컴포넌트가 공통으로 필요로 하는 상태(예: 테마, 로그인 정보)를 손쉽게 공유할 수 있다는 **장점**이 있습니다. 하지만 몇 가지 \*\*주의할 점(단점)\*\*도 존재합니다.

### 주요 장점 🟢

* **프로퍼티 드릴링 해소:** Context를 쓰면 일일이 중간 컴포넌트를 통해 값을 전달하지 않고도, **트리의 깊숙한 하위에서도 필요한 데이터에 곧바로 접근**할 수 있습니다. 부모->자식으로 여러 단계 전달해야 하는 prop을 없앨 수 있어, 컴포넌트 간 결합도를 낮추고 코드가 간결해집니다. 예를 들어 최상위 `<AuthContext.Provider value={user}>`로 사용자 정보를 제공하면, 수 많은 중간 컴포넌트들을 거치지 않고도 깊은 하위에서 `useContext(AuthContext)` 한 번으로 현재 사용자 정보를 얻을 수 있습니다.

* **전역 상태 관리에 용이 (경량 글로벌 상태):** 리액트 내장 API라 별도 라이브러리 없이 **간단한 전역 상태**를 만들 수 있습니다. Redux 같은 도구에 비해 설정이 간편하고, **필요한 부분만 컨텍스트로 감싸서 국소적인 글로벌 상태**를 만들 수도 있습니다. 예를 들어 작은 앱에서 테마나 사용자 정보 정도는 Context로 충분히 관리 가능합니다. 또한 Context는 **상태 자체를 관리**해주진 않지만, `useState`나 `useReducer`와 함께 쓰면 원하는 방식으로 상태를 다룰 수 있는 유연성도 있습니다.

* **컴포넌트 재사용성과 구조 개선:** 공통 관심사를 Context로 분리함으로써, 컴포넌트들을 더 **독립적이고 재사용 가능**하게 설계할 수 있습니다. 예를 들어 다크모드 테마를 Context로 제공하면, 개별 컴포넌트들은 테마 구현 방식에 몰라도 되고 그저 Context에서 값만 받아 쓰면 되므로 UI 코드와 전역 로직이 분리됩니다. 이는 유지보수성도 높여줍니다.

### 주의사항 및 단점 🔴

* **컨텍스트 값 변경 시 광범위한 리렌더링:** Context의 **값이 변경되면** 그 Provider 아래의 **모든 구독 컴포넌트가 다시 렌더링**됩니다. 이는 필요한 부분만 업데이트하는 것이 아니고 트리 전체가 다시 그려질 수 있다는 뜻이어서 성능에 영향이 있습니다. 예를 들어 Context에 `{a, b, c}` 세 가지 값을 객체로 담아 제공하고, 그 중 하나만 바뀌어도 객체 참조가 달라지기 때문에 **세 값 중 일부만 쓰는 컴포넌트들도 전부 리렌더링**됩니다. 따라서 **빈번히 바뀌는 값**을 Context로 관리할 때는 신중해야 합니다. 해결책으로, 상태를 쪼개어 여러 Context로 분리하거나, 메모이제이션(`useMemo`)을 통해 컨텍스트 value 객체의 변경 범위를 제한하는 방법이 있습니다. 하지만 기본적으로 **Context는 부분 구독이 불가능**하여, 필요한 컴포넌트만 선택적으로 갱신하기 어렵다는 점을 기억해야 합니다.

* **구현상의 보일러플레이트:** Context를 사용하려면 우선 `React.createContext`로 컨텍스트 객체를 만들고, Provider로 값을 공급하고, 소비하는 쪽에서는 `useContext` 훅을 써야 하는 등 세팅 단계가 필요합니다. 작은 규모에선 다소 번거롭게 느껴질 수 있습니다. 또한 컨텍스트 사용 컴포넌트는 반드시 해당 Provider 하위에서 렌더링돼야 하므로, 재사용하려면 구조를 맞춰줘야 합니다. Provider를 깜빡 잊고 사용하면 `useContext`가 `undefined`를 읽게 되어 에러가 나는 점도 주의해야 합니다 (필요시 `useContext` 훅 래퍼를 만들어 **Provider 밖 사용 시 에러를 명시적으로 던지는 패턴**도 있습니다).

* **디버깅과 추적 난이도:** Context는 값이 어디서 변경되었는지 추적이 어려울 수 있습니다. 복잡한 앱에서 여러 컨텍스트가 엮이면, 특정 값이 변경되어 리렌더링이 발생해도 React DevTools로는 prop 변화처럼 직접 눈에 보이지 않기 때문에 흐름을 따라가기 힘든 경우가 있습니다. 이런 때는 로그를 넣거나 Context 업데이트 패턴을 잘 구조화해야 합니다.

* **퍼포먼스 이슈 대안:** 앞서 언급한 성능 문제 때문에, 컨텍스트 기반 전역 상태 관리가 앱 규모가 커질수록 버거울 수 있습니다. 상태 변동이 많고 여러 컴포넌트가 물리는 경우, React Context만으로 관리하면 불필요한 렌더가 많아지고 최적화도 까다롭습니다. 이럴 때는 Redux, Zustand, Jotai 등 **전문 상태 관리 라이브러리**로 옮기는 게 더 나은 선택일 수 있습니다. 즉 **Context API는 "전역 상태 관리 도구"라기보다는 좁은 범위의 공유 상황에 적합**하며, 앱이 복잡해지면 다른 도구와 병행 검토가 필요합니다.

**예시 코드:** 간단한 컨텍스트 사용 예를 통해 장점과 동작을 살펴보겠습니다. 아래는 User 정보를 담는 컨텍스트를 만들고, 계층 구조 상관없이 하위 컴포넌트가 이 값을 사용하는 방식입니다.

```jsx
// 1. 컨텍스트 생성
const UserContext = React.createContext(null);

// 2. 상위 컴포넌트에서 Provider로 값 공급
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return (
    <UserContext.Provider value={user}>
      <Toolbar />
    </UserContext.Provider>
  );
}

function Toolbar() {
  // Toolbar 아래 깊은 곳에 실제 UserContext를 사용하는 컴포넌트가 있다고 가정
  return <UserProfile />;
}

// 3. 하위 컴포넌트에서 useContext로 값 소비
function UserProfile() {
  const user = useContext(UserContext);
  return <p>현재 사용자: <b>{user.name}</b></p>;
}
```

위 코드에서 `App` 컴포넌트는 `UserContext.Provider`로 현재 사용자 객체를 공급하고 있습니다. `UserProfile` (혹은 그 하위)이 `useContext(UserContext)`를 호출하면, 멀리 떨어져 있어도 Provider에서 준 `user` 값을 바로 얻게 됩니다. 이 때 중간의 `Toolbar`는 `user`를 몰라도 되며 prop으로 전달할 필요도 없습니다. **이것이 컨텍스트의 편리함**으로, 복잡한 계층 구조에서도 데이터 공유를 쉽게 합니다.

그러나 만약 `user` 객체의 내용이 바뀌면 (`setUser`로 새 객체 할당 등) Provider가 있는 `App`이 재렌더링되고, 그 아래 `UserProfile`까지 모두 다시 렌더링됩니다. 현재 예시는 단순해서 문제가 없지만, Provider 하위에 수많은 컴포넌트가 있다면 **모두 불필요하게 다시 그려질 수 있습니다**. 이러한 과도한 렌더링을 줄이기 위해 **컨텍스트 분리** 기법을 사용할 수 있습니다. 예를 들어 `user` 상태와 `setUser` 함수가 모두 필요하다면, 둘을 각각 다른 Context로 제공하고 사용하는 컴포넌트를 구분하면 `user`만 바뀌면 `user` 제공 Context 하위만, `setUser`만 바뀌면 `setUser` 제공 Context 하위만 갱신되게 할 수 있습니다.

결론적으로, **`useContext`의 장점**은 **간편한 전역 수준 상태 공유와 prop drilling 제거**이며, **주의점**은 **값 변경 시 렌더링 성능**과 **구독 범위**입니다. 규모가 작은 애플리케이션이나 테마/언어 설정처럼 전체적으로 드문드문 읽히는 값에는 Context를 적극 활용하고, **자주 바뀌는 대량의 상태에는 적절한 분리나 다른 상태 관리 기법을 병행**하는 것이 좋습니다.

## 7. 복잡한 상황에서 컴포넌트 설계 원칙과 전략

**답변:** 애플리케이션 규모가 커지거나 UI 요구사항이 복잡해질수록, **컴포넌트를 체계적으로 설계**하는 것이 매우 중요합니다. 잘 설계된 컴포넌트는 **확장성과 재사용성**이 높고, 변화에 유연하게 대응하며, 버그 발생을 줄여 줍니다. 아래에 React에서 컴포넌트를 설계할 때 유념해야 할 핵심 **원칙과 전략**을 정리했습니다:

* **단일 책임 원칙 (Single Responsibility Principle):** **하나의 컴포넌트는 하나의 역할만** 수행하도록 만듭니다. UI 요소를 구성하는 컴포넌트가 너무 많은 일을 하면 재사용성이 떨어지고 유지보수가 어려워집니다. 예를 들어 **표시와 데이터 처리 기능을 한 컴포넌트에 몰아넣기보다는**, 표시 전용 컴포넌트와 데이터 처리/상태 관리를 하는 컨테이너 컴포넌트로 분리할 수 있습니다. 이렇게 하면 각 컴포넌트를 이해하기 쉬워지고, 변경으로 인한 영향 범위가 명확해집니다. 즉 **관심사 분리**를 통해 컴포넌트 내부 복잡성을 낮추고 예측 가능성을 높이는 것입니다. (예: 사용자 프로필 컴포넌트라면 이미지 표시와 같은 UI 기능만 하고, 데이터 불러오기나 상태 결정은 다른 곳에 맡긴다.)

* **재사용성과 확장성:** 컴포넌트를 설계할 때 **다른 곳에서도 활용될 수 있도록 범용적**으로 만드는 것이 좋습니다. 동일한 UI 패턴이나 로직이 반복된다면 그 부분을 공통 컴포넌트로 추출합니다. 또한 신규 요구사항에도 기존 코드를 \*\*변경 없이 추가(확장)\*\*할 수 있도록 설계합니다 (개방-폐쇄 원칙, OCP). 이를 위해 \*\*컴포넌트 API(props)\*\*를 잘 설계하고, 필요한 부분은 외부에서 제어 가능하게 만듭니다. 예를 들어 버튼 컴포넌트를 만들 때 label이나 onClick 등을 prop으로 받고, 스타일 커스터마이징을 prop이나 context로 가능하게 하면 다양하게 재사용할 수 있습니다. 반대로 여러 기능이 하드코딩된 컴포넌트는 다른 곳에 쓰기 어렵고 변경에 취약합니다.

* **명시적이고 예측 가능한 구조:** 컴포넌트의 \*\*입력(props)과 출력(JSX)\*\*이 명확해야 합니다. 불필요한 내부 상태를 두지 말고, prop으로 받은 것이 동일하면 항상 동일한 UI를 내놓는 **순수 컴포넌트**에 가깝게 만드는 것이 버그를 줄입니다. 또한 props와 state의 변화에 따른 컴포넌트 트리 변화를 쉽게 따라갈 수 있도록, 복잡한 분기를 피하거나 상위에서 분기해주는 전략이 좋습니다. 예를 들어 "관리자용 뷰와 사용자용 뷰를 한 컴포넌트에서 if문으로 분기"하기보다는, 상위에서 조건부로 서로 다른 컴포넌트를 렌더링하게 해 역할을 분리하는 식입니다.

* **상태 관리와 로직의 위임 (컨테이너/프레젠테이션 패턴):** 복잡한 앱에서는 **데이터 로딩이나 비즈니스 로직**을 담당하는 **컨테이너(Container) 컴포넌트**와 **UI 표시만 하는 프레젠테이션(Presentation) 컴포넌트**로 역할을 나누는 패턴이 유용합니다. 컨테이너는 주로 훅(`useState`, `useEffect`, `useReducer`)을 사용해 상태를 관리하고 데이터를 준비하며, 이렇게 준비된 데이터와 콜백을 프레젠테이션 컴포넌트에 **props로 내려주는 방식**입니다. 프레젠테이션 컴포넌트는 오직 props에 따라 UI를 렌더링하기 때문에 단순하고 재사용 가능해집니다. 이처럼 **제어를 외부(상위)로 위임**하면 컴포넌트의 **유연성과 재사용성**이 높아집니다. React 라이브러리들 (예: Material-UI 등)도 내부 상태를 최소화하고 대부분 설정을 props로 받는 식으로 유연성을 확보합니다.

* **구성(Composition) 사용, 상속 피하기:** React는 \*\*컴포넌트 합성(Composition)\*\*을 통한 설계를 권장합니다. 즉 한 컴포넌트의 자식으로 다른 컴포넌트를 넣어 UI를 조합하는 방식을 최대한 활용하고, 객체지향의 상속(inheritance)은 사용하지 않습니다. 합성은 훨씬 **명시적**이고, 작은 컴포넌트들을 모아 큰 컴포넌트를 이루는 자연스러운 구조를 만듭니다. 예를 들어 복잡한 페이지도 Header, Sidebar, Content 같은 하위 컴포넌트를 합성하여 구성하고, 각 부분은 독립적으로 개발될 수 있습니다. 또한 **컨텍스트** 등을 활용하면 아주 유연한 Compound Components 패턴(복합 컴포넌트 패턴)을 구현할 수도 있습니다 (예: `<Dropdown>` 컴포넌트 내부에서만 동작하는 `<Dropdown.Item>` 등을 context로 연결).

* **불변성 및 상태 최소화:** 상태는 변경될 때마다 컴포넌트를 다시 렌더링시키므로, 필요한 최소한으로 관리하는 것이 좋습니다. 또한 상태로 관리하는 데이터 구조는 가능하면 \*\*불변성(immutability)\*\*을 지켜 업데이트 시 매번 새로운 객체/배열을 만드는 것이 예측 가능성을 높이고 React의 변경 감지에도 유리합니다. 예를 들어 배열에 항목을 추가할 때 `push`로 원본을 바꾸기보다 스프레드 `[...array, newItem]`로 새 배열을 만들어 setState 하는 식입니다. 이는 버그를 줄이고, `PureComponent`나 `React.memo` 같은 최적화에도 도움이 됩니다.

* **전역 상태 최소화:** **전역으로 상태를 두면 어디서든 바꿀 수 있어** 예상치 못한 사이드 이펙트가 생기기 쉽습니다. 가능하면 상태는 필요한 최상위 컴포넌트 수준까지만 끌어올리고 (이를 \*\*상태 올리기(lifting state up)\*\*라고 합니다), 정말 앱 전체에서 공유해야 하는 것만 Context나 상태 라이브러리로 관리하세요. 전역 상태가 많아질수록 컴포넌트들 간 의존성이 높아져 수정 시 리스크가 커지고 디버깅이 난해해집니다. 따라서 \*\*지역 상태(local state)\*\*를 선호하고, 상태를 갖는 컴포넌트를 신중하게 선정해야 합니다. 필요 이상으로 전역 상태를 만들지 말라는 것은 많은 React 고수들이 강조하는 부분입니다.

* **패턴과 베스트 프랙티스 활용:** React 생태계에는 **SOLID 원칙** 적용, **프레젠테이션/컨테이너 패턴**, **Compound Components 패턴**, **Render Props**, **HOC** 등 다양한 패턴이 존재합니다. 복잡한 문제 상황에 직면하면 이러한 패턴을 검토해보는 것도 좋습니다. 예를 들어 여러 컴포넌트가 복잡하게 상태를 공유해야 한다면 Context+Reducer 조합 (Flux 패턴과 유사)으로 확장하는 식입니다. 다만 패턴도 과하면 안 되므로, 문제를 명확히 정의하고 이에 맞는 해결책을 적용하는 균형이 필요합니다.

**전략 요약:** 위 원칙들을 실제로 적용하려면 먼저 UI를 기능 단위로 **최대한 작은 컴포넌트들로 나누는 일**이 출발점입니다. 그리고 나서 **여러 곳에서 쓰일 수 있는 부분을 별도 컴포넌트(또는 훅)로 추출**하고, **상태를 상위로 올리거나 Context로 분리**해서 컴포넌트들을 **더욱 순수하게** 만듭니다. UI 로직과 비즈니스 로직을 분리하고, 외부 변경에 강한 안정적인 API를 가진 컴포넌트를 만들면, 요구사항 변경에도 코드 수정 범위가 줄어듭니다.

예를 들어, **데이터를 가져와 리스트를 보여주는 컴포넌트**를 설계한다고 하면:

1. 데이터 fetch와 로딩 상태 관리는 `useEffect`와 `useState`를 쓰는 **컨테이너** 컴포넌트가 맡습니다.
2. 리스트 렌더링은 **프레젠테이션** 컴포넌트가 맡고, props로 받은 데이터 목록을 보여주는 순수한 역할만 합니다.
3. 리스트 아이템 하나가 복잡한 구조라면 그것도 각각 작은 컴포넌트로 쪼개 책임을 나눕니다.
4. 공통되는 UI 조각(예: 스타 rating 표시 등)은 별도 컴포넌트로 분리해 여러 곳에서 재사용합니다.
5. 이렇게 계층을 나누고 나면, 각 부분이 단순해지므로 필요 시 최적화(예: `React.memo`)도 수월해집니다.

결론적으로, **복잡한 UI일수록 더 철저한 컴포넌트 설계 원칙 적용이 필요**합니다. 단일 책임, 재사용성, 관심사 분리, 합성, 불변성 같은 원칙들을 따르면 결과적으로 **확장에 열려 있고 변경에 닫힌** 견고한 컴포넌트 구조를 얻을 수 있습니다. 이런 구조는 새로운 요구사항이나 수정이 생겨도 시스템 전체에 파급을 일으키지 않고 필요한 부분만 수정하게 해줘서, 유지보수성과 개발 생산성을 크게 높여줍니다.

## 8. 리액트 성능 문제 분석을 위한 도구와 기법

**답변:** React 애플리케이션의 **성능 문제를 진단**하려면, 원인을 찾아내기 위한 다양한 **도구와 기법**을 활용해야 합니다. 보통 **어디에서 시간이 많이 소요되는지**, **어떤 컴포넌트가 불필요하게 렌더링되는지** 등을 알아내는 것이 핵심인데, 이를 위해 다음과 같은 도구들을 사용합니다:

* **React Developer Tools – Profiler:** React 공식 개발자 도구(브라우저 확장)에 내장된 **Profiler 탭**은 애플리케이션의 렌더링 성능을 측정하고 분석할 수 있는 강력한 도구입니다. Profiler를 사용하면 **각 렌더링 “커밋”**(DOM 업데이트)의 **소요 시간**과 **어떤 컴포넌트들이 렌더링되었는지**를 시각적으로 확인할 수 있습니다. 막대 차트나 플레임 차트 형태로 **컴포넌트 렌더링 비용**을 보여주고, 특정 컴포넌트를 선택하면 그 컴포넌트가 왜 리렌더링됐는지 (props 변화, state 변화 등) 알려주는 기능도 있습니다. 예를 들어 Profiler를 녹화하여, 어느 컴포넌트가 \*\*노란색 긴 막대(오랜 렌더링 시간)\*\*로 표시된다면 최적화 대상임을 알아낼 수 있습니다. 또는 “왜 이 컴포넌트가 렌더링되었는가”를 추적해보면, 불필요한 prop 변경이나 state 업데이트로 인해 예상치 않게 다시 그려지고 있다는 것을 발견할 수 있습니다. **React Profiler**는 성능 튜닝 시 거의 필수적으로 쓰이는 도구이며, React.StrictMode와 함께 쓰면 개발 중 성능 문제를 조기에 감지하기에도 좋습니다.

* **브라우저 개발자 도구 – Performance/Memory 탭:** 크롬 등 브라우저의 **Performance 탭**에서는 JS 실행, 렌더링, 페인트 등 **전체적인 성능 프로파일**을 기록할 수 있습니다. 특히 React 16+부터는 React 자체가 User Timing API를 통해 각 컴포넌트 렌더링 시간을 측정 정보로 남기므로, Performance 기록을 보면 **“🌐 React 컴포넌트 렌더링”** 구간들이 타임라인에 나타납니다. 이를 통해 React DevTools Profiler와 유사하게 어느 컴포넌트 렌더링에 시간이 많이 걸렸는지 파악할 수 있습니다. 또한 **Call Tree**나 **Bottom-Up** 뷰를 통해 어떤 함수 호출이 성능을 잡아먹는지도 분석 가능합니다. 이 방법은 React 외의 비동기 호출, 레이아웃 계산, 스크립트 실행 등의 병목도 함께 보여주기 때문에 **전체적인 프론트엔드 성능 병목** 파악에 유용합니다. 메모리 탭에서는 **힙 스냅샷**이나 **할당 타임라인**을 이용해 메모리 누수가 있는지도 분석할 수 있습니다. 예를 들어 컴포넌트 언마운트 후에도 어떤 객체가 해제되지 않고 남아 있으면, 그것이 event listener 등 clean-up 누락으로 인한 메모리 누수임을 발견할 수 있습니다.

* **Why Did You Render (WDYR) 라이브러리:** `why-did-you-render`는 React 컴포넌트들이 **불필요하게 리렌더링되는 경우**를 콘솔에 출력해 알려주는 개발 보조 라이브러리입니다. React를 monkey patch하여 동작하며, 각 컴포넌트 별로 “내가 리렌더링된 이유”를 콘솔에 표시해주므로, 어디서 낭비 렌더링이 발생하는지 찾을 때 유용합니다. 예를 들어 memoization이 제대로 되지 않아 같은 props로 여러 번 렌더링되는 경우나, 부모의 함수 prop이 불필요하게 새로 생성되어 자식이 갱신되는 경우 등을 쉽게 캐치할 수 있습니다. 설정 방법은 프로젝트에 패키지 추가 후, 초기화 파일에서 `whyDidYouRender(React)`를 호출하고 `React.memo` 또는 `Component.whyDidYouRender = true` 설정을 해주면 됩니다. **WDYR의 콘솔 출력**을 보면 각 리렌더 시 어떤 prop이 변해서 렌더링되었고, 그 값이 이전과 어떤 차이가 있는지도 알려주기 때문에, 성능 최적화 포인트를 정확히 짚어낼 수 있습니다. 단, 이 라이브러리는 개발용으로만 사용해야 하며(production에서 사용 금지), React 18 이상에서는 StrictMode로 인한 이중 렌더에 대해서도 로그가 나올 수 있는 점을 감안해야 합니다.

* **Lighthouse 및 웹 성능 측정:** 크롬의 Lighthouse (혹은 Web Vitals) 등은 React에 한정되진 않지만 **앱의 전반적인 성능 지표**(초기 로딩 시간, 렌더링 지연, 실사용자 경험 등)를 측정해줍니다. 이를 통해 성능 문제가 **애플리케이션 로딩 단계**에 있는지, **런타임 상호작용 단계**에 있는지 파악할 수 있습니다. 예컨대 Time To Interactive (TTI)나 First Contentful Paint (FCP) 수치가 나쁘다면 코드 스플리팅이나 리소스 최적화를 고려하고, Interaction to Next Paint (INP)나 Total Blocking Time (TBT) 문제가 있다면 런타임 상에 메인쓰레드를 막는 연산이 없는지 점검합니다. Lighthouse 결과는 구체적인 개선 팁도 주므로 참고하면 좋습니다.

* **Webpack Bundle Analyzer:** 번들 크기나 구조가 성능에 영향을 줄 때 사용합니다. 애플리케이션 번들을 시각화해서 불필요하게 큰 라이브러리가 포함되었는지, 중복 번들링이 있는지 등을 찾아냅니다. React 앱에서 **코드 스플리팅 전략이 잘 적용되었는지**나, **moment와 같은 크거나 쓰지 않는 라이브러리**가 들어와 있지는 않은지 등을 발견하면 로딩 최적화에 도움됩니다.

* **프로파일링/모니터링 툴:** Sentry, LogRocket 등의 APM(Application Performance Monitoring) 도구를 이용하면 **실제 사용자 환경에서의 성능 이슈**를 추적할 수도 있습니다. React 개발 중에만 성능 보는 게 아니라, 배포 후 사용자 세션에서 느린 페이지를 기록하고, 성능 트레이싱이나 에러를 수집해주는 것이죠. 이러한 툴은 주로 **개발 단계 이후**에 프로덕션 성능을 튜닝할 때 유용합니다.

**기법 및 접근법:**
도구와 함께, 개발자가 사용할 수 있는 일반적인 기법들도 있습니다:

* **콘솔 로그/마커 활용:** 간단히 각 컴포넌트의 `render()`나 함수 컴포넌트 본체에 `console.log`를 넣어서 렌더 빈도를 파악할 수 있습니다. 어떤 state 변화가 어떤 하위 컴포넌트까지 영향 미치는지 로그로 찍어 보는 거죠. 또는 `performance.mark`와 `performance.measure`를 코드에 심어 특정 연산에 걸린 시간을 직접 재어볼 수도 있습니다.
* **성능 테스트 시 시나리오 구성:** 예를 들어 리스트 1000개 렌더링, 필터링하면서 타이핑, 페이지 전환 등 **문제 의심 구간**을 정해서 Profiler나 Performance로 집중 측정합니다. 그리고 최적화 전후를 비교해가며 개선 정도를 확인하는 것도 중요합니다.
* **StrictMode 활용:** 개발 모드에서 React.StrictMode를 켜두면 일부 함수가 두 번 호출되고, Effect도 두 번 실행되는 등 **문제성 코드를 빨리 드러내는 효과**가 있습니다. 이를 통해 부적절한 Effect나 불필요한 연산을 조기에 발견할 수 있습니다.
* **CPU 스로틀링과 메모리 확인:** 내 개발 PC에서는 빠르게 도는 것 같아도, 느린 환경에서는 문제될 수 있습니다. 개발자 도구에서 CPU Throttle (예: 6x slowdown)이나 낮은 네트워크 속도를 설정해두고 테스트하면 병목이 더 뚜렷이 드러납니다.

**정리:** React의 성능 문제를 분석하려면 \*\*“어디에서 시간이 걸리는가”\*\*와 **“어떤 작업이 불필요한가”** 두 측면을 봐야 합니다. React DevTools Profiler와 브라우저 Performance 프로파일링으로 **시간 소모**를 파악하고, why-did-you-render 같은 도구로 **쓸데없는 렌더링**을 잡아냅니다. 그런 다음 그 정보를 바탕으로 `React.memo` 적용이나 `useMemo` 활용, 코드 스플리팅, 알고리즘 개선 등의 최적화 작업을 진행하면 됩니다. 이러한 도구들을 적절히 병행하면, 대부분의 React 성능 병목 원인을 효과적으로 찾아낼 수 있습니다.

## 9. To-Do 리스트 앱의 실시간 항목 추가/삭제/변경 – 상태 관리 설계

**답변:** To-Do 리스트와 같이 **항목을 추가, 삭제, 수정**하는 애플리케이션을 설계할 때는, \*\*상태(state)\*\*를 어떻게 구조화하고 어떤 식으로 업데이트할지 결정하는 것이 핵심입니다. 제 경험에 비춰볼 때, 다음과 같은 접근으로 상태 관리를 설계합니다:

1. **상태 구조 정의:** 우선 관리해야 할 To-Do 항목의 속성을 정합니다. 예컨대 *{id, text, done}* 형태의 객체 리스트로 상태를 유지할 수 있습니다. 초기 상태는 빈 배열 `[]`이 될 것이고, 새로운 항목이 추가되면 배열에 객체를 추가, 삭제 시엔 배열에서 제거, 수정(체크박스 체크 등) 시엔 해당 아이템을 갱신하는 식으로 모델링합니다. **고유 ID**를 각 To-Do에 부여하는 것도 중요합니다. ID는 항목을 삭제하거나 업데이트할 때 기준 키로 사용되며, 리스트 렌더링 시 `key`로도 쓰여 성능과 정확성을 담보합니다.

2. **상태 관리 방식 선택:** To-Do 앱은 항목 추가/삭제/토글 등 **다양한 업데이트 액션**이 존재하므로, 단순한 `useState` 여러 개로 관리하기보다 \*\*`useReducer`\*\*를 사용하는 편이 코드의 구조를 잡는 데 좋습니다. `useReducer`를 사용하면 각 액션 타입 (예: `'ADD_TODO'`, `'REMOVE_TODO'`, `'TOGGLE_TODO'`, `'EDIT_TODO'`)별로 상태 업데이트 로직을 한 곳에 모을 수 있고, 복잡한 변경도 **불변성을 유지**하면서 명확하게 처리할 수 있습니다. 특히 여러 상태가 서로 얽혀 변화해야 할 경우 reducer 내에서 한꺼번에 처리하면 일관성이 높아집니다. 다만, 앱 규모가 아주 작고 상태 변경 로직이 단순하다면 `useState`로도 충분할 수 있습니다. 예를 들어 "항목 추가"만 있는 경우 굳이 reducer를 쓸 필요는 없겠죠. 하지만 일반적인 To-Do 리스트는 추가/삭제/토글이 다 있으므로 저는 `useReducer`를 주로 활용합니다.

3. **상태 저장 위치:** 상태를 상위 컴포넌트 (예: `<App>` 컴포넌트)에서 관리하고 필요한 하위 컴포넌트에 props로 내려주는 방식이 기본입니다. 예를 들어 `<App>`에서 `todos`와 `dispatch`를 만들어 `TodoList`나 `TodoInput` 등에 내려보냅니다. 만약 규모가 커져서 매우 많은 컴포넌트가 이 상태에 접근한다면, **Context API와 useReducer를 조합**하여 전역-ish하게 관리할 수도 있습니다. 컨텍스트를 쓰면 중간에 props 전달을 생략하고 필요한 곳에서 `useContext`로 바로 `todos`와 `dispatch`를 쓸 수 있어 편의성이 높아집니다. 단, 컨텍스트 사용 시에는 앞서 언급한 성능 이슈(모든 소비자 리렌더)를 염두에 두어야 하므로, 필요할 때에만 적용하고 규모가 작을 때는 단순 prop drilling도 고려합니다.

4. **불변성 유지와 업데이트 방식:** To-Do 리스트 상태를 업데이트할 때는 **원본 배열을 직접 수정하지 않고**, **새 배열을 만들어 교체**하는 식으로 합니다. 예를 들어 항목 추가는 `state.concat(newItem)` 혹은 스프레드 `[...state, newItem]`, 삭제는 `state.filter(...)`, 수정은 `state.map(...)`으로 새로운 배열을 반환합니다. 이렇게 해야 React가 상태 변화 감지를 제대로 하고, 이전 상태를 보존하여 디버깅하거나 나중에 Undo/Redo 기능을 구현할 때도 도움이 됩니다.

5. **UI와의 상호작용 설계:** 사용자 액션(추가 버튼 클릭, 체크박스 체크 등)이 일어나면 그에 맞는 **dispatch**나 **setState 호출**을 연결합니다. 예컨데 Add 버튼 onClick -> `dispatch({ type: 'ADD_TODO', payload: { ... } })`, 개별 To-Do 체크 onChange -> `dispatch({ type: 'TOGGLE_TODO', id })` 이런 식입니다. 이때 상태 변경 함수를 직접 하위에 내려주거나, Context 쓸 경우 `dispatch` 함수를 context로 전달하거나, 또는 custom hook으로 `useTodos()` 같은 훅을 만들어 내부에서 useReducer를 사용하고 내보내는 형태도 깔끔할 수 있습니다.

**예시 코드:** To-Do 리스트 상태 관리를 위한 `useReducer` 설계와 Context 사용 예를 함께 보여드립니다:

```jsx
// ToDo 종류 정의
const initialTodos = [
  // { id: 1, text: '예시 투두', done: false } 등 초기값 (없으면 빈 배열)
];

// 리듀서 함수 정의
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.todo];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.newText } : todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
```

위 `todoReducer`는 네 가지 액션을 처리합니다. 새로운 todo 추가 시 현재 배열에 추가한 새 배열을 리턴하고, 삭제는 해당 ID를 제외한 새로운 배열 반환, 토글이나 수정은 `map`을 돌며 일치하는 항목만 바꾼 새로운 배열을 반환합니다. 이렇게 기존 state를 **불변하게 다루는 것**이 핵심 포인트입니다.

```jsx
// ToDoContext 설정 (Context + Reducer 활용 예)
const TodoStateContext = React.createContext(null);
const TodoDispatchContext = React.createContext(null);

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// Custom hook (선택사항): 편의용으로 컨텍스트 값 꺼내는 훅
function useTodos() {
  const todos = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext);
  if (todos === undefined || dispatch === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return { todos, dispatch };
}
```

위 `TodoProvider` 컴포넌트를 애플리케이션 최상위에 감싸주면, 하위 어디서나 `useTodos()`를 통해 현재 todos 리스트와 dispatch 함수를 사용할 수 있습니다.

```jsx
function TodoApp() {
  return (
    <TodoProvider>
      <TodoInput />
      <TodoList />
    </TodoProvider>
  );
}

function TodoInput() {
  const [text, setText] = useState('');
  const { dispatch } = useTodos();
  const onAdd = () => {
    const newTodo = { id: Date.now(), text, done: false };
    dispatch({ type: 'ADD_TODO', todo: newTodo });
    setText('');  // 입력창 비우기
  };
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={onAdd}>추가</button>
    </div>
  );
}

function TodoList() {
  const { todos, dispatch } = useTodos();
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
          />
          {todo.done ? <s>{todo.text}</s> : todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
```

이 예시에서, **상태 추가/삭제/토글 로직이 모두 `todoReducer`로 일원화**되어 있어 버그 없이 동작을 확인하기 쉽습니다. 새로운 기능(예: **정렬 변경** 등)이 요구되면 reducer에 액션을 추가하는 식으로 확장할 수 있습니다. 또한 Context를 사용하여 `TodoInput`, `TodoList` 같은 하위 컴포넌트들이 `todos`와 `dispatch`에 쉽게 접근하고 있습니다. 만약 규모가 작다면 굳이 Context를 쓰지 않고 `TodoApp`에서 `todos`와 관련 함수들을 props로 내려보내는 것도 가능하지만, Context를 쓰면 컴포넌트 트리가 깊어져도 실시간으로 상태를 공유하기 편합니다 (단, **아주 빈번한 갱신이 일어나는 경우 Context는 주의**).

정리하면, **To-Do 리스트 상태 관리 설계**에서는:

* **데이터 모델**을 명확히 하고 (id, text, done 등),
* **상태 변경 로직**을 일관성 있게 관리(useReducer 권장),
* **상태 범위**를 적절한 상위에 위치시키는 것 (필요하면 Context 사용),
* 그리고 **불변성을 지키며 업데이트**하는 것을 유념합니다.

이렇게 하면 여러 컴포넌트에서 실시간으로 아이템을 추가/삭제해도 싱크가 맞지 않는 문제나 버그를 방지할 수 있고, 새로운 요구사항 (예: "모두 완료" 버튼, 필터링 등)도 손쉽게 추가할 수 있는 견고한 구조가 됩니다.

## 10. React의 Virtual DOM이 성능 최적화에 기여하는 방식

**답변:** **Virtual DOM**은 React의 핵심 아이디어 중 하나로, **실제 DOM을 직접 다루지 않고 그보다 가벼운 JavaScript 객체로 구성된 가상 DOM**을 다루는 개념입니다. React는 UI를 업데이트할 때 Virtual DOM을 활용하여 **최소한의 실제 DOM 조작으로 원하는 변경을 반영**함으로써 성능을 최적화합니다.

브라우저의 실제 DOM 조작은 비교적 비용이 큰 작업입니다. DOM 요소를 추가/삭제하거나 속성을 변경하면 레이아웃 계산과 리페인트 등이 발생해 성능에 부담을 줍니다. React는 이러한 문제를 줄이기 위해 다음과 같이 동작합니다:

1. **내부적으로 Virtual DOM 트리 유지:** React 컴포넌트가 반환하는 JSX는 결국 **React.createElement 호출**로 표현되고, 이는 실제 DOM이 아닌 **자바스크립트 객체 구조**로 메모리에 보관됩니다. 이 객체들이 모여 **React Element 트리**를 구성하며, 이게 흔히 Virtual DOM이라 불립니다. React는 처음 렌더링 시 이 Virtual DOM을 기반으로 실제 DOM을 생성하지만, 그 이후 업데이트에서는 **Virtual DOM끼리의 비교 작업**을 주로 수행합니다. 예컨대 state나 props 변경으로 UI를 다시 렌더링해야 하면, 새로운 Virtual DOM을 만들고 이전 Virtual DOM과 \*\*diff(비교)\*\*합니다.

2. **Diffing 알고리즘으로 변경점 계산:** React는 효율적인 **Diff 알고리즘**을 사용해 이전 Virtual DOM과 새로운 Virtual DOM 간의 **차이점**을 찾아냅니다. 이 때 전체 DOM을 비교하지 않고, **동일한 레벨에서는 키(key)를 사용한 비교**, **형제가 크게 달라지면 하위는 통째로 재생성** 등 여러 최적화된 휴리스틱을 사용합니다. 그 결과 바뀐 부분만을 추려내죠. 예를 들어 100개의 리스트 아이템 중 5개만 내용이 바뀌었다면, diff 알고리즘 결과로 그 5개에 해당하는 변화만 도출됩니다.

3. **필요한 실제 DOM 업데이트만 수행:** diff 단계에서 얻은 변경 사항을 바탕으로, React는 **배치(batching)** 기법과 함께 실제 DOM을 업데이트합니다. 즉, 변하지 않은 노드는 건드리지 않고, 변경된 부분만 **추가/삭제/수정**합니다. 이 과정에서 여러 setState 호출이 있으면 한번에 묶어 처리하고 (batch update), 가능한 한 DOM 조작을 최소화합니다. 결과적으로, Virtual DOM을 사용하면 “전체 DOM을 매번 다시 그리는” 것처럼 보이지만 내부적으로는 **변경된 부분만 선별적으로 그리는** 것입니다. 이렇게 함으로써 불필요한 DOM 접근을 줄이고, UI 업데이트 성능이 향상됩니다.

4. **추가 최적화 – Reconciliation 제어:** Virtual DOM 덕분에 React는 기본적으로 최적의 DOM 처리을 수행하지만, 컴포넌트 단에서 더 최적화가 필요할 경우 `shouldComponentUpdate` (클래스 컴포넌트) 또는 `React.memo`/`useMemo` 등의 훅을 통해 **Virtual DOM 비교 자체를 건너뛰거나** 연산을 줄일 수도 있습니다. 예컨대 `React.PureComponent`나 `React.memo`는 prop과 state를 얕은 비교하여 동일하면 아예 Virtual DOM 새로 생성도 하지 않고 이전 결과를 재사용하기 때문에, Virtual DOM diff 조차 생략하며 성능을 높입니다. 즉, Virtual DOM 체계 위에 추가적인 최적화 수단을 적용할 수 있는 것이죠.

**정리:** Virtual DOM은 React가 **UI 업데이트를 선언적으로** 작성하게 해주는 동시에, **실제 DOM 조작을 효과적으로 줄여주는 장치**입니다. \*\*“Virtual DOM 비교 – 최소 변경 적용”\*\*으로 대표되는 이 메커니즘 덕분에 개발자는 전체 UI를 매 렌더링마다 새로 만든다고 생각해도, React가 알아서 변경된 부분만 찾아 업데이트하므로 앱이 효율적으로 작동합니다. 특히 초기 jQuery 등의 방식과 비교하면, 수동으로 DOM을 조작하며 발생시킬 수 있는 실수를 줄이고, 프레임워크 차원에서 최적화를 해주므로 복잡한 애플리케이션에서도 좋은 성능을 유지하게 도와줍니다.

물론 Virtual DOM 자체에도 연산 비용이 있지만, **대부분의 경우 실제 DOM 처리 비용보다 훨씬 작기 때문에** 이득이 큽니다. 또한 React는 이벤트 핸들링이나 Batch Update, 렌더링 스케줄링 등도 최적화하여 Virtual DOM과 함께 **사용자 인터페이스의 높은 성능과 부드러운 사용자 경험**을 실현합니다. 한마디로, Virtual DOM은 **“더 적은 실제 DOM 조작으로 동일한 UI 결과를 얻도록”** 함으로써 React 앱의 퍼포먼스 최적화에 기여하는 것입니다.

마지막으로, Virtual DOM이 만능은 아니어서 아주 단순한 UI에서는 오히려 오버헤드일 수도 있고, React 18+에서는 Concurrent Features로 더욱 스마트한 렌더링이 도입되었지만, **대부분의 일반적인 웹앱 시나리오에서 Virtual DOM은 성능과 개발 편의성의 균형을 훌륭히 잡아주는 핵심 기술**임을 강조하고 싶습니다.
