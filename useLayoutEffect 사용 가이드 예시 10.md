`useLayoutEffect`는 DOM 변경 직후에 동기적으로 실행되어, 렌더링 전에 DOM을 측정하거나 스타일을 강제로 조정해야 할 때 사용합니다. 주로 **레이아웃 측정, 스크롤 위치 조정, 리플 효과 적용** 등에 활용됩니다.

---

## ✅ `useLayoutEffect` 사용 예시 10가지

각 예제는 **코드와 상세 주석**으로 설명해드릴게요.

---

### 1. DOM의 크기를 가져오기

📄 **경로: `/examples/MeasureSize.tsx`**

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

export default function MeasureSize() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []); // DOM이 렌더링된 직후 실행

  return (
    <>
      <div ref={boxRef} style={{ width: '50%', height: '200px', background: 'skyblue' }} />
      <p>Box size: {size.width}px × {size.height}px</p>
    </>
  );
}
```

> ✅ 렌더링이 완료된 후 박스의 **정확한 크기 측정**에 사용.

---

### 2. 스크롤 위치 강제 조정

📄 **경로: `/examples/ScrollToTop.tsx`**

```tsx
import React, { useLayoutEffect } from 'react';

export default function ScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // 렌더 직후 스크롤 위치 초기화
  }, []);

  return (
    <div style={{ height: '2000px' }}>
      <h1>페이지 상단으로 이동</h1>
    </div>
  );
}
```

> ✅ **페이지 진입 시 스크롤을 맨 위로 이동**.

---

### 3. 레이아웃 깜빡임 방지

📄 **경로: `/examples/NoFlicker.tsx`**

```tsx
import React, { useLayoutEffect, useState } from 'react';

export default function NoFlicker() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    // 컴포넌트가 렌더링되자마자 표시
    setReady(true);
  }, []);

  if (!ready) return null;

  return <div style={{ background: 'green', height: 100 }}>내용 로딩 완료</div>;
}
```

> ✅ 렌더 후 깜빡임 방지를 위해 **초기 상태 렌더링 제어**.

---

### 4. 부모 요소 기준 자식 위치 계산

📄 **경로: `/examples/ChildPosition.tsx`**

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

export default function ChildPosition() {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (parentRef.current && childRef.current) {
      const parentTop = parentRef.current.getBoundingClientRect().top;
      const childTop = childRef.current.getBoundingClientRect().top;
      setOffset(childTop - parentTop);
    }
  }, []);

  return (
    <div ref={parentRef} style={{ position: 'relative', padding: 20 }}>
      <div ref={childRef} style={{ marginTop: 100 }}>자식 요소</div>
      <p>자식의 상단 위치: {offset}px</p>
    </div>
  );
}
```

> ✅ **자식 요소가 부모 기준으로 얼마나 떨어졌는지 계산**.

---

### 5. 테마 변경 후 스타일 강제 적용

📄 **경로: `/examples/ForceTheme.tsx`**

```tsx
import React, { useLayoutEffect, useState } from 'react';

export default function ForceTheme() {
  const [darkMode, setDarkMode] = useState(false);

  useLayoutEffect(() => {
    document.body.style.background = darkMode ? '#222' : '#fff';
  }, [darkMode]); // 테마가 바뀔 때마다 즉시 반영

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

> ✅ 테마 변경 시 **백그라운드 색상 즉시 반영**.

---

### 6. 요소 숨기기 전 위치 고정

📄 **경로: `/examples/FixBeforeHide.tsx`**

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

export default function FixBeforeHide() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    if (hidden && ref.current) {
      ref.current.style.position = 'absolute'; // 숨기기 전 위치 고정
    }
  }, [hidden]);

  return (
    <>
      <button onClick={() => setHidden(true)}>숨기기</button>
      <div ref={ref} style={{ height: 100, background: 'pink', display: hidden ? 'none' : 'block' }}>
        숨겨질 박스
      </div>
    </>
  );
}
```

> ✅ 숨기기 전 **레이아웃 변화 없이 위치 고정**.

---

### 7. 레이아웃 기반 애니메이션 시작

📄 **경로: `/examples/LayoutAnimation.tsx`**

```tsx
import React, { useLayoutEffect, useRef } from 'react';

export default function LayoutAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.transform = 'scale(1)';
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: 'scale(0)',
        transition: 'transform 0.3s ease',
        width: 100,
        height: 100,
        backgroundColor: 'orange',
      }}
    />
  );
}
```

> ✅ 렌더 직후 **애니메이션 트리거**에 적합.

---

### 8. 폰트 적용 전 측정 방지

📄 **경로: `/examples/PreventLayoutShift.tsx`**

```tsx
import React, { useLayoutEffect, useState } from 'react';

export default function PreventLayoutShift() {
  const [fontReady, setFontReady] = useState(false);

  useLayoutEffect(() => {
    document.fonts.ready.then(() => setFontReady(true));
  }, []);

  return fontReady ? <p style={{ fontFamily: 'Roboto' }}>폰트 적용 완료</p> : null;
}
```

> ✅ 웹 폰트 로딩 완료 후 **레이아웃 깨짐 방지**.

---

### 9. 드래그 시작 위치 정확히 잡기

📄 **경로: `/examples/DraggableInit.tsx`**

```tsx
import React, { useLayoutEffect, useRef } from 'react';

export default function DraggableInit() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const startX = ref.current.offsetLeft;
      console.log('드래그 시작 위치:', startX);
    }
  }, []);

  return <div ref={ref} style={{ width: 100, height: 100, background: 'blue' }} />;
}
```

> ✅ 드래그 시작 시 **초기 위치 정확히 측정**.

---

### 10. 포커스 시 위치 보정

📄 **경로: `/examples/FocusAdjust.tsx`**

```tsx
import React, { useLayoutEffect, useRef } from 'react';

export default function FocusAdjust() {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      window.scrollTo(0, inputRef.current.offsetTop); // 포커스 위치로 이동
    }
  }, []);

  return (
    <div style={{ marginTop: 1000 }}>
      <input ref={inputRef} placeholder="자동 포커스 입력창" />
    </div>
  );
}
```

> ✅ 포커스된 입력창으로 **스크롤 자동 이동**.

---

### 다음

원하시면 `"."` 입력해 주세요. 다음은 `useLayoutEffect` 실무 주의사항과 `useEffect`와의 차이로 이어드립니다.


좋아요! 각 예제의 설명을 **아주 구체적으로 자세히** 다시 드릴게요.
아래는 `useLayoutEffect`가 왜 사용되었는지, `언제`, `어떤 목적`, `왜 useEffect가 아닌 useLayoutEffect인지`를 중심으로 설명한 내용입니다.

---

### ✅ 1. DOM의 크기 측정

**목적:**
렌더링이 끝난 뒤 특정 DOM 요소의 `width`, `height`를 정확하게 측정하고 싶을 때 사용합니다.

**왜 useLayoutEffect?:**
`useEffect`는 브라우저가 화면에 렌더링을 완료한 뒤 실행되기 때문에, 화면에 **보이는 동안 깜빡임(flicker)** 이 생길 수 있습니다.
반면 `useLayoutEffect`는 DOM이 화면에 그려지기 **직전에 동기적으로 실행**되므로 정확한 사이즈 측정이 가능하고, 깜빡임 없이 상태를 반영할 수 있습니다.

---

### ✅ 2. 스크롤 위치 강제 조정

**목적:**
페이지가 렌더링되자마자 스크롤 위치를 최상단(0,0)으로 이동시켜야 할 때 사용합니다.

**왜 useLayoutEffect?:**
렌더링이 끝난 후 `useEffect`를 쓰면 브라우저가 먼저 페이지 하단까지 렌더링한 뒤 다시 스크롤을 위로 올리는 작업을 하게 되므로, 사용자 입장에선 **스크롤이 위아래로 순간 움직이는 현상**이 발생할 수 있습니다.
`useLayoutEffect`는 브라우저가 그리기 전에 스크롤을 조정하므로 이러한 불필요한 움직임 없이 깔끔하게 화면을 고정시킬 수 있습니다.

---

### ✅ 3. 레이아웃 깜빡임 방지

**목적:**
초기 렌더링 시 특정 UI가 깜빡이거나 보였다 사라지는 현상을 방지하기 위해 **조건부 렌더링을 동기적으로 처리**합니다.

**왜 useLayoutEffect?:**
상태를 `useEffect`로 변경하면 첫 프레임에 잠깐 잘못된 UI가 나타날 수 있습니다. `useLayoutEffect`는 상태를 즉시 변경함으로써 **"잘못된 UI가 그려지기 전에"** 처리할 수 있습니다.

---

### ✅ 4. 부모 기준 자식 위치 계산

**목적:**
자식 요소가 부모 요소로부터 얼마나 떨어졌는지 정확하게 계산하여, 레이아웃 계산이나 사용자 위치 표시 등에 활용합니다.

**왜 useLayoutEffect?:**
DOM의 위치 정보(`getBoundingClientRect()`)는 렌더 직후가 가장 정확하며, 이후에는 사용자 이벤트나 스타일 변화로 위치가 바뀔 수 있습니다.
`useLayoutEffect`를 쓰면 **렌더된 직후 시점**의 정확한 위치 정보를 측정할 수 있습니다.

---

### ✅ 5. 테마 변경 시 스타일 강제 적용

**목적:**
버튼 클릭 시 테마가 바뀌면, 브라우저의 `<body>`나 전역 스타일을 즉시 반영하고 싶을 때 사용합니다.

**왜 useLayoutEffect?:**
스타일을 `useEffect`로 바꾸면 시각적으로 딜레이가 발생할 수 있습니다.
하지만 `useLayoutEffect`를 사용하면 상태가 바뀌는 즉시 DOM 스타일을 조작하므로 **즉시 전환 효과**를 줄 수 있습니다.

---

### ✅ 6. 요소 숨기기 전 위치 고정

**목적:**
레이아웃에서 어떤 요소를 숨기더라도 **그 위치나 주변 레이아웃이 깨지지 않게** 하기 위해 스타일을 조정합니다.

**왜 useLayoutEffect?:**
`display: none` 등으로 요소가 제거되기 전에 `position`을 `absolute`로 바꿔야 하지만, 이 시점을 놓치면 레이아웃이 밀리는 문제가 발생합니다.
`useLayoutEffect`는 DOM이 변경되기 직전에 실행되므로 **정확한 타이밍에 스타일을 강제 적용**할 수 있습니다.

---

### ✅ 7. 레이아웃 기반 애니메이션 시작

**목적:**
DOM이 화면에 나타나자마자 특정 애니메이션이 시작되도록 트리거를 설정합니다.

**왜 useLayoutEffect?:**
CSS 애니메이션은 요소가 DOM에 **삽입된 직후 상태**를 기준으로 동작합니다. `useEffect`를 쓰면 애니메이션 시작 타이밍이 밀려서 의도한 동작이 발생하지 않을 수 있습니다.
`useLayoutEffect`는 DOM에 삽입된 직후, **화면에 그려지기 전 상태에서 애니메이션 초기값을 설정할 수 있으므로** 정확하게 시작됩니다.

---

### ✅ 8. 웹폰트 적용 전 레이아웃 이동 방지

**목적:**
웹폰트가 비동기 로딩될 때, 글자가 바뀌면서 레이아웃이 흔들리는 문제(layout shift)를 방지하기 위해 **폰트 적용 후에만 글자를 보여줍니다.**

**왜 useLayoutEffect?:**
폰트 로딩이 완료된 시점을 `document.fonts.ready`로 체크한 뒤, 바로 DOM 업데이트를 막아야 하므로 `useLayoutEffect`가 적절합니다.
`useEffect`로 하면 깜빡이는 글자가 잠시 보였다 사라질 수 있습니다.

---

### ✅ 9. 드래그 시작 위치 측정

**목적:**
드래그 기능 구현 시, **사용자가 클릭한 시점의 정확한 위치**를 기억해야 합니다.

**왜 useLayoutEffect?:**
처음 렌더링된 요소의 `offsetLeft`, `offsetTop`은 DOM이 완전히 준비된 후에만 정확합니다.
`useLayoutEffect`는 이 시점에 실행되므로 **드래그 시작 좌표를 오차 없이 잡을 수 있습니다.**

---

### ✅ 10. 포커스 시 위치 보정

**목적:**
포커스된 입력창이 화면 바깥에 있으면, **포커스를 주는 동시에 스크롤을 조정**하여 사용자에게 입력 UI를 보여줍니다.

**왜 useLayoutEffect?:**
브라우저는 `focus()` 실행 시 자동으로 스크롤하지 않기도 하고, `useEffect`에서는 DOM이 완전히 표시된 후 스크롤되므로 **타이밍이 늦습니다**.
`useLayoutEffect`를 쓰면 포커스를 주는 동시에 `scrollTo()`도 정확한 위치로 맞출 수 있습니다.

---

원하시면 각 예제 코드를 다시 정리해서 함께 보여드릴게요.
또는 다음 주제 원하시면 `.` 입력해주세요.
