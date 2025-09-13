`start.spring.io` 에서 **Maven + Spring Boot 3.x + MyBatis + MySQL 8** 조합으로 API 서버를 만들 때 필요한 Dependencies는 아래와 같다.

---

## 필수 Dependencies

1. **Spring Web**

   * REST API 엔드포인트 생성.
   * `@RestController`, `@RequestMapping`, `ResponseEntity` 등을 사용 가능.

2. **MyBatis Framework**

   * ORM 대체로 SQL 직접 매핑.
   * `@Mapper` 인터페이스와 XML 매퍼 파일을 통한 쿼리 실행.

3. **MySQL Driver**

   * MySQL 8.x 접속용 JDBC 드라이버.
   * DB 커넥션을 위해 필수.

4. **Spring Boot Starter Test**

   * JUnit, AssertJ, Mockito 포함.
   * 단위 및 통합 테스트 환경 제공.

---

## 선택적 Dependencies

* **Spring Boot DevTools**

  * 코드 수정 시 자동 재시작, 개발 편의성 증가.

* **Spring Validation**

  * API 요청 파라미터 검증. (`@Valid`, `@NotNull`, `@Size` 등)

* **Spring Security**

  * 인증·인가 처리 필요 시 추가.

* **Spring Boot Actuator**

  * API 서버 상태, 헬스체크, 메트릭 노출.

---

## 예시 (Spring Initializr 설정)

* Project: **Maven Project**
* Language: **Java**
* Spring Boot: **3.x.x**
* Packaging: **Jar**
* Java: **17 이상 권장**
* Dependencies:

  * `Spring Web`
  * `MyBatis Framework`
  * `MySQL Driver`
  * (Optional) `Spring Boot DevTools`, `Validation`, `Actuator`, `Security`

---

원한다면 내가 `pom.xml` 예시랑 `application.yml` (MyBatis + MySQL 8 연결 설정) 샘플 코드도 작성해줄까?
