React에서 **자식 컴포넌트 → 부모 컴포넌트**로 데이터를 전달하려면,
부모 컴포넌트가 \*\*콜백 함수(예: `handleChange`, `onUpdate` 등)\*\*를 정의하고,
그 함수를 **props로 자식에게 전달**해야 합니다.

---

## ✅ 예시로 보기 (입력값을 부모로 전달)

### 1. 부모 컴포넌트 (`ParentComponent.jsx`)

```jsx
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [childData, setChildData] = useState('');

  // 자식에게 전달할 함수
  const handleDataFromChild = (data) => {
    setChildData(data);
  };

  return (
    <div>
      <h2>부모 컴포넌트</h2>
      <p>자식으로부터 받은 데이터: {childData}</p>

      {/* 자식에게 함수 전달 */}
      <ChildComponent onSendData={handleDataFromChild} />
    </div>
  );
}

export default ParentComponent;
```

---

### 2. 자식 컴포넌트 (`ChildComponent.jsx`)

```jsx
import React, { useState } from 'react';

function ChildComponent({ onSendData }) {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    // 부모에게 데이터 전달
    onSendData(inputValue);
  };

  return (
    <div>
      <h3>자식 컴포넌트</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="데이터 입력"
      />
      <button onClick={handleClick}>부모에게 보내기</button>
    </div>
  );
}

export default ChildComponent;
```

---

## 🧠 핵심 요약

| 역할 | 설명                                     |
| -- | -------------------------------------- |
| 부모 | 데이터를 받을 **함수 정의**, 자식에게 **props로 전달**  |
| 자식 | **props로 받은 함수 호출**, 전달하고 싶은 값을 인자로 넘김 |

---

필요하신 형태(예: 여러 자식 → 부모, useContext 사용 등)에 맞춰 더 구체적인 예시도 드릴 수 있어요.
원하시면 `.jsx` 확장자가 아닌 `.tsx` (TypeScript) 예제로도 변환해드릴 수 있습니다.
계속 도와드릴까요?
