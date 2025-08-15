# React + TypeScript 시작하기 100제

## 📘 전체 목차

### 🧩 Part 1. 기본 세팅 및 타입 도입 (1~10)
1. 프로젝트 생성과 TypeScript 설정  
2. JSX에서 타입 추론 이해하기  
3. props에 타입 지정하기 (기본 타입)  
4. props에 타입 지정하기 (interface 사용)  
5. children props 타입 지정  
6. useState로 문자열 상태 관리  
7. useState로 숫자 상태 관리  
8. useState로 객체 상태 관리  
9. useState로 배열 상태 관리  
10. 상태 타입을 명시적으로 선언하는 법

### 🧩 Part 2. 이벤트 처리와 폼 (11~20)
11. onClick 이벤트 핸들러 타입 지정  
12. onChange 텍스트 입력 처리  
13. 숫자 입력값 처리  
14. 체크박스 입력 처리  
15. 라디오 버튼 입력 처리  
16. 셀렉트 박스 입력 처리  
17. 폼 제출 이벤트 타입  
18. 폼 입력 컴포넌트 분리  
19. 이벤트에서 e.preventDefault 타입 처리  
20. HTMLInputElement 사용 시 타입 추론

### 🧩 Part 3. 컴포넌트 구조화 & props 전달 (21~30)
21. 컴포넌트 분리 및 props 전달  
22. props로 함수 전달하기  
23. props로 자식 컴포넌트 전달 (children)  
24. props optional 속성 다루기  
25. props에 유니언 타입 사용하기  
26. 컴포넌트 내에서 map으로 리스트 렌더링  
27. 리스트에 key 지정하기  
28. 조건부 렌더링 (boolean 상태 사용)  
29. 삼항 연산자와 && 연산자 사용  
30. 컴포넌트 내 중첩 컴포넌트 만들기

### 🧩 Part 4. useEffect 사용법 (31~40)
31. 마운트 시 한번만 실행되는 useEffect  
32. 특정 상태 변경 시만 실행되는 useEffect  
33. useEffect로 이벤트 리스너 추가하기  
34. 타이머(setTimeout, setInterval) 사용  
35. useEffect 정리(cleanup) 함수 작성  
36. 비동기 호출(fetch)과 useEffect  
37. useEffect에 async 함수 직접 사용할 수 없는 이유  
38. useEffect + props 조합으로 반응형 동작 만들기  
39. 여러 useEffect 나누어 쓰는 패턴  
40. useEffect로 API 요청 후 상태 저장

### 🧩 Part 5. useRef와 DOM 제어 (41~50)
41. useRef로 input 포커스 주기  
42. useRef로 이전 상태 값 저장하기  
43. useRef로 DOM 엘리먼트에 접근  
44. useRef와 useEffect 함께 사용  
45. useRef를 통해 스크롤 위치 제어  
46. useRef를 통한 타이머 제어  
47. useRef의 current 값 변경 실습  
48. input 값을 직접 참조하여 읽기  
49. canvas 등 직접 DOM 제어 예시  
50. useRef를 상태처럼 쓰지 않아야 하는 이유

### 🧩 Part 6. 커스텀 Hook 만들기 (51~60)
51. useToggle 커스텀 훅 만들기  
52. useInput 커스텀 훅 만들기  
53. useCounter 훅 만들기  
54. useBoolean 훅 만들기  
55. useMounted 훅 (마운트 여부 확인)  
56. usePrevious 훅 (이전 값 추적)  
57. useInterval 훅 (타이머 반복)  
58. useDebounce 훅 만들기  
59. useThrottle 훅 만들기  
60. useWindowSize 훅 만들기

### 🧩 Part 7. React.memo, useMemo, useCallback 최적화 (61~70)
61. React.memo 기본 사용법  
62. props 변경 여부로 렌더링 제어  
63. useMemo로 연산 결과 캐싱  
64. useMemo로 컴포넌트 성능 최적화  
65. useCallback으로 함수 메모이제이션  
66. props로 함수 전달 시 useCallback 필요성  
67. 자식 컴포넌트 + useCallback 최적화  
68. React.memo + useCallback 조합  
69. 불필요한 렌더링 디버깅하기  
70. React 개발자 도구로 리렌더링 확인

### 🧩 Part 8. 조건부 렌더링과 반복 렌더링 (71~80)
71. 조건부 렌더링 패턴 정리  
72. 컴포넌트 fallback (로딩 중 UI)  
73. 다단계 조건 표현식 패턴  
74. 반복 렌더링 with map  
75. 반복 내 조건별 분기 처리  
76. 리스트 렌더링 성능 팁  
77. 중첩 조건부 렌더링  
78. Fragment 사용  
79. 컴포넌트 리스트 재사용  
80. 데이터가 없을 때 empty UI 처리

### 🧩 Part 9. 상태 업데이트 심화 (81~90)
81. 객체 상태 변경 시 spread로 복사  
82. 배열 상태 변경 (추가/삭제/수정)  
83. 상태 변경 시 깊은 복사 주의  
84. 상태 불변성 유지하는 방법  
85. 복잡한 상태는 useReducer로 관리  
86. useReducer 기본 사용법  
87. useReducer 액션 정의/디스패치  
88. useReducer + 타입스크립트 조합  
89. useReducer + context 조합  
90. 상태 변경 추적 로그 넣기

### 🧩 Part 10. 비동기 처리 및 데이터 가져오기 (91~100)
91. fetch로 데이터 가져오기 (기본 GET 요청)  
92. useEffect + fetch로 마운트 시 요청  
93. 로딩 중 상태 처리  
94. 에러 처리 (try-catch + 메시지 출력)  
95. POST 요청으로 데이터 전송하기  
96. async/await를 useEffect에서 사용하는 법  
97. useCallback으로 API 요청 최적화  
98. 사용자 입력값으로 검색 요청 보내기  
99. useEffect 정리(cleanup)로 요청 취소  
100. JSONPlaceholder API 활용 CRUD 구현
