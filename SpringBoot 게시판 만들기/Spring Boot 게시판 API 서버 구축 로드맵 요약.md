네, 지금까지 진행한 **Spring Boot 게시판 API 서버 구축 로드맵(1\~15단계)** 전체를 한눈에 볼 수 있도록 요약 정리해드리겠습니다.

---

# Spring Boot 게시판 API 서버 구축 로드맵 요약

## 1. 개발 환경 준비

* **Java 21 LTS** 설치 (Temurin 권장)
* **Maven** 설치
* **MySQL 8** 설치 및 DB/계정 생성
* IDE: IntelliJ IDEA or VSCode

---

## 2. 프로젝트 생성

* Spring Initializr (Maven, Java 21, Spring Boot 3.x)
* Dependencies: Web, Validation, Lombok, MyBatis, MySQL Driver

---

## 3. 기본 설정

* `pom.xml`: 의존성 확인
* `application.yml`: DB 연결, MyBatis 설정
* `MyBatisConfig.java`: MapperScan 설정

---

## 4. DB 스키마

* `users`, `posts`, `comments` 테이블 생성
* 샘플 데이터 입력

---

## 5. 도메인 & DTO

* `Post`, `User`, `Comment` 엔티티 작성
* `PostCreateRequest`, `PostUpdateRequest`, `PostResponse`, `PageResponse` DTO 작성

---

## 6. 공통 구조

* `ApiResponse` (성공/실패 일관된 응답)
* `ApiException`, `ErrorCode`, `GlobalExceptionHandler` (전역 에러 처리)

---

## 7. Mapper + XML

* `PostMapper.java / PostMapper.xml` → CRUD + 검색/페이징
* MyBatis 동적 SQL 활용

---

## 8. Service & Controller

* `PostService`, `PostController` 작성
* API: 목록, 상세(조회수 증가), 등록, 수정, 삭제

---

## 9. 댓글 기능

* 대댓글 구조(Adjacency List + thread\_id, depth)
* `CommentService`, `CommentController`
* API: 댓글 등록, 수정, 삭제, 조회

---

## 10. Swagger 문서화

* `springdoc-openapi` 의존성 추가
* `OpenApiConfig` 작성
* `/swagger-ui.html` 에서 자동 문서 확인

---

## 11. JWT 인증/인가

* `spring-boot-starter-security` + `jjwt` 의존성
* `AuthController`, `AuthService` → 회원가입, 로그인, JWT 발급
* `JwtAuthenticationFilter` → 요청 시 토큰 검증

---

## 12. 파일 업로드

* `uploads/` 디렉토리 저장
* `attachments` 테이블에 메타데이터 저장
* 이미지일 경우 Thumbnailator로 썸네일 생성

---

## 13. 조회수 중복 방지

* Redis 사용
* `view:{postId}:{userKey}` 형태 키 저장 + TTL
* 로그인 사용자=username, 비로그인=IP 구분

---

## 14. 정렬/검색 고도화

* 다중 조건: `keyword`, `authorId`, `기간(startDate~endDate)`
* 정렬: 최신순, 조회순, 제목순
* MyBatis `<if>`, `<choose>`로 동적 SQL 구현

---

## 15. 운영 고도화

### (7) 트랜잭션/락/에러 전략

* `@Transactional`로 원자성 보장
* 낙관적/비관적 락 사용 (조회수, 수정 충돌 방지)
* `GlobalExceptionHandler`로 예외 일관 처리

### (8) 테스트 코드

* 단위 테스트(JUnit + Mockito)
* 통합 테스트(MockMvc, H2 DB)

### (9) 다중 프로필

* `application-dev.yml` (로컬 DB, DEBUG 로그)
* `application-prod.yml` (운영 DB, 보안/성능)

### (10) 배포

* **Jar**: `mvn package → java -jar`
* **Docker**: Dockerfile, Docker Compose(MySQL+App)
* **CI/CD**: GitHub Actions로 빌드 & Docker Hub 푸시

---

# 최종 결과

* **Spring Boot + MyBatis + MySQL 기반 게시판 API 서버 완성**
* 기능: CRUD, 댓글, 검색/정렬, JWT 인증, 파일 업로드, 조회수 중복 방지
* 운영: 다중 프로필, 트랜잭션/락/에러 전략, 테스트, Swagger 문서화, Docker 배포

---

원하시면 제가 이 요약을 **단계별 `.md` 문서 (예: 01-설치.md, 02-게시판API.md …)** 로 정리해서 드릴 수도 있고, 아예 **ZIP 파일 구조**로 만들어드릴 수도 있습니다. 어떤 방식이 더 편하실까요?
