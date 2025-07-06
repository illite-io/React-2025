`React.createContext`와 `Zustand`는 상태 관리를 위한 도구이지만, **용도와 사용 방식, 성능, 개발 경험**에서 큰 차이가 있습니다. 아래에 주요 차이점들을 정리해드릴게요.

---

## ✅ 1. 기본 개념

| 항목 | `React.createContext`          | `Zustand`                         |
| -- | ------------------------------ | --------------------------------- |
| 목적 | 전역 상태 공유를 위한 React 내장 기능       | 가볍고 강력한 상태 관리 라이브러리               |
| 기반 | React API (Context + Provider) | 외부 라이브러리 (`zustand` 패키지 설치 필요)    |
| 철학 | 전통적인 React 패턴                  | Flux도 Redux도 아닌, 함수형 방식 중심의 상태 관리 |

---

## ✅ 2. 사용 예시

### 📄 `React.createContext` 예시

**경로: `contexts/ThemeContext.tsx`**

```tsx
import { createContext, useState, useContext, ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 사용 Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider를 감싸야 합니다.");
  return context;
};
```

* 상태 공유하려면 `Provider`로 컴포넌트를 감싸야 함
* 소비 컴포넌트는 `useContext`로 접근

---

### 📄 `zustand` 예시

**경로: `stores/themeStore.ts`**

```ts
import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
```

* 어디서든 `useThemeStore()` 훅으로 바로 접근 가능
* 별도의 Provider 필요 없음

```tsx
// 사용 예시
import { useThemeStore } from "../stores/themeStore";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
};
```

---

## ✅ 3. 주요 차이점 정리

| 비교 항목             | `React.createContext`         | `Zustand`           |
| ----------------- | ----------------------------- | ------------------- |
| Provider 필요 여부    | ✅ 필요                          | ❌ 불필요               |
| props drilling 제거 | ⭕ 가능                          | ⭕ 가능                |
| 구조 복잡성            | 보일러플레이트 많음                    | 단순                  |
| 성능 (리렌더링 제어)      | ❌ 느림 (모든 하위 컴포넌트 리렌더링됨)       | ⭕ 빠름 (선택한 상태만 리렌더링) |
| 코드 분리             | context, provider, hook 각각 필요 | 하나의 훅에 상태/액션 포함     |
| 비동기 로직 처리         | useEffect 등과 조합해야 함           | 상태 내부에서 가능          |
| 사용성               | React만으로도 충분하지만 제한적           | 더 강력하고 유연한 상태 관리 가능 |

---

## ✅ 추천 기준

| 상황                  | 추천                    |
| ------------------- | --------------------- |
| 소규모 앱, 간단한 테마/언어 상태 | `React.createContext` |
| 중대형 앱, 복잡한 상태 관리 필요 | `Zustand`             |
| 여러 상태가 독립적으로 존재해야 함 | `Zustand`             |
| 리렌더링 최적화가 필요함       | `Zustand`             |
| Redux보다 간단한 대체재를 원함 | `Zustand`             |

---

## ✅ 결론

* `createContext`는 React에 내장된 기능으로 **작고 단순한 상태 공유에 적합**
* `Zustand`는 **리렌더링 최소화, 간결한 API, 비동기 로직 처리** 등에서 우수

---

필요하시면 두 상태관리 방법을 사용하는 프로젝트 예제도 단계별로 만들어드릴게요.
`Zustand vs Context 성능 비교`도 벤치마크로 보여드릴 수 있어요.

원하시나요?
