### ✅ React Query로 데이터 가져오기 예시 100제 - 전체 목록

#### 📘 1\~20: 기초 - GET 방식 데이터 패칭

1. 기본 useQuery로 JSON 데이터 가져오기
2. 파라미터로 ID 넘겨서 단일 데이터 가져오기
3. 조건부 데이터 패칭 (enabled 옵션 사용)
4. URL query param으로 필터링된 데이터 요청
5. refetch로 수동 데이터 새로고침
6. polling으로 일정 시간마다 데이터 갱신
7. staleTime 사용한 캐시 유지
8. select 옵션으로 원하는 필드만 추출
9. error 상태 핸들링
10. loading 상태 UI 처리
11. queryKey 배열로 다중 파라미터 관리
12. axios 커스텀 인스턴스 사용
13. fetch 함수 분리해서 재사용
14. async/await로 데이터 fetch
15. queryFn에서 try/catch 처리
16. retry 옵션 설정하기
17. queryClient.invalidateQueries 사용
18. queryClient.prefetchQuery 사용
19. suspense와 함께 데이터 가져오기
20. React Suspense + useQuery 조합

#### 📙 21\~40: 동적 파라미터와 필터링

21. 검색어(query string)로 필터링
22. 날짜 범위로 데이터 가져오기
23. 정렬 조건 파라미터로 넘기기
24. 페이지네이션 (page, size) 적용
25. 다중 필터 조합으로 요청하기
26. mapStateToQuery: 상태 → 요청 파라미터
27. form 입력값으로 API 호출
28. debounce로 검색 조건 제어
29. route param으로 queryKey 설정
30. location.search → query string 전달
31. react-router-dom + useQuery 연동
32. 상태 변경 시 자동 refetch
33. category별 데이터 가져오기
34. 다국어/로케일 기반 요청
35. 로그인 유저 기반 데이터 요청
36. 체크박스 선택된 항목으로 필터링
37. 슬라이더로 범위 설정 후 fetch
38. 커스텀 훅으로 파라미터 기반 데이터 요청
39. useMemo로 queryKey 최적화
40. 다중 조건 조합 시 key 생성 전략

#### 📕 41\~60: 고급 응용

41. useQueries로 다수 요청 병렬 처리
42. dependent query (이전 요청 결과에 따라 다음 요청)
43. 무한 스크롤 구현 (useInfiniteQuery)
44. 커스텀 페이지네이션
45. 토큰 인증이 필요한 fetch
46. 사용자 역할에 따른 데이터 분기
47. 검색 필터 상태 관리
48. React Hook Form + React Query
49. Redux와 React Query 병행 사용
50. 서버 오류코드 별 커스텀 메시지
51. API 응답 delay 처리
52. 서버측 validation 오류 처리
53. loadingSkeleton으로 UX 개선
54. queryErrorResetBoundary 사용법
55. optimistic update 준비
56. 접근 제어 기반 쿼리 요청
57. 캐시 키에 타임스탬프 포함
58. fetch 중 취소 처리 (AbortController)
59. 브라우저 포커스시 자동 refetch
60. window resize 등에 따른 데이터 다시 불러오기

#### 📗 61\~80: POST, PUT, DELETE와 useMutation

61. useMutation으로 POST 요청
62. 서버에 새로운 글 등록
63. PUT으로 데이터 수정 요청
64. DELETE로 데이터 삭제
65. form → mutation → query invalidation
66. mutation 후 쿼리 자동 갱신
67. mutation 상태 (isLoading, isSuccess 등)
68. optimistic update 적용 예제
69. rollback mutation
70. mutation 중 에러 발생 시 처리
71. mutation timeout 처리
72. multipart/form-data 전송
73. 이미지 업로드 + 쿼리 갱신
74. 서버 응답으로 새로운 항목 추가
75. 쿼리 결과에 항목 삽입 후 재정렬
76. useMutation과 useQuery 병행 사용
77. 새 댓글 작성 후 댓글 목록 갱신
78. 데이터 삭제 후 목록 자동 새로고침
79. 여러 mutation 병렬 실행
80. mutation 에러에 따른 사용자 알림

#### 📒 81\~100: 테스트, 성능 최적화, 실전 팁

81. mock API를 활용한 테스트
82. msw(Mock Service Worker)로 테스트
83. loading indicator 위치 전략
84. 데이터 의존 관계 시 관리 전략
85. 브라우저 캐시와 Query 캐시 비교
86. 캐시 유효성 판단 전략
87. 캐시 메모리 크기 제한
88. 쿼리 직렬화 도구 만들기
89. 서버 요청 수 줄이기 위한 병합 전략
90. 대량 데이터 lazy load
91. 모바일 / 데스크탑 별 요청 전략
92. SSR에서 React Query 활용
93. Next.js에서 서버측 쿼리 미리 불러오기
94. fallback 데이터로 UX 향상
95. 서버 요청 전 로컬 저장소 확인
96. 쿼리 우선순위 조절
97. 유저 활동 패턴에 따른 fetch 전략
98. 자동 백오프 (Exponential Retry)
99. stale-while-revalidate 전략 구현
100. 실제 실무 프로젝트에서의 통합 구조 설계

---