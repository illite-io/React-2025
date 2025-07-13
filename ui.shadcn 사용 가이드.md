`ui.shadcn`은 React와 Tailwind CSS 기반의 컴포넌트 라이브러리로, **커스터마이징 가능한 UI 컴포넌트를 빠르게 사용할 수 있는** 오픈소스 도구입니다. 아래에 설치부터 사용까지 기본적인 가이드를 정리해드릴게요.

---

## 1. Shadcn UI란?

* Tailwind CSS와 Radix UI를 기반으로 제작된 **컴포넌트 라이브러리**
* 모든 컴포넌트는 코드로 직접 관리 (패키지처럼 설치되는 게 아님)
* 디자인 시스템 구축이 쉬움

---

## 2. 설치 방법 (Next.js 기준)

### 2-1. 프로젝트에 Tailwind CSS가 설치되어 있어야 함

```bash
npx create-next-app@latest my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2-2. Tailwind 설정 파일 수정

```js
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2-3. Shadcn UI 초기 설정

```bash
npx shadcn-ui@latest init
```

질문이 나오면 다음처럼 답변:

* **Which style**: `default` (또는 원하는 스타일)
* **Which directory**: `components`
* **Which config file**: `tailwind.config.js`
* **Typescript 사용 여부**: `yes`

---

## 3. 컴포넌트 추가 방법

```bash
npx shadcn-ui@latest add button
```

> 위 명령어 실행 시 `components/ui/button.tsx` 파일이 생기며 직접 수정 가능.

추가로 사용 가능한 컴포넌트 목록 보기:

```bash
npx shadcn-ui@latest list
```

---

## 4. 사용 예시

```tsx
// app/page.tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="p-4">
      <Button>기본 버튼</Button>
      <Button variant="outline">테두리 버튼</Button>
      <Button variant="destructive">위험 버튼</Button>
    </div>
  )
}
```

---

## 5. 버튼 스타일 커스터마이징

`components/ui/button.tsx`는 직접 수정할 수 있어 Tailwind 스타일을 자유롭게 바꿀 수 있음.

```tsx
// components/ui/button.tsx
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

---

## 6. 장점 요약

* 코드로 관리하는 방식이라 **커스터마이징이 쉬움**
* 컴포넌트별로 하나씩 설치 가능
* Radix UI 기반이라 접근성(A11y) 우수

---

## 7. 추천 사용 흐름

1. `npx shadcn-ui@latest add [컴포넌트]` 명령으로 가져오기
2. 생성된 컴포넌트에서 Tailwind CSS로 스타일 조정
3. 필요 시 다른 컴포넌트들과 조합해서 복합 UI 구현

---

## 8. 공식 문서

* 공식 문서: [https://ui.shadcn.com](https://ui.shadcn.com)

---

추가로 버튼 외에 **Dialog, Dropdown, Tooltip, Tabs, Form, Card 등** 다양한 컴포넌트도 지원하므로 필요 시 예제도 따로 알려드릴 수 있어요. 어떤 컴포넌트부터 보고 싶으신가요?
