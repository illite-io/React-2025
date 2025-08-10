Spring Boot API 서버의 요청 처리 프로세스는 **클라이언트 → 서버(Controller → Service → Repository/Mapper → DB)** 순서로 진행되며, 내부적으로는 필터, 인터셉터, AOP, 예외 처리 등도 거칠 수 있습니다.
아래는 기본적인 순서를 **HTTP 요청 → 응답** 흐름에 맞춰 설명드리겠습니다.

---

## 1. 클라이언트 요청

* 브라우저, 모바일 앱, React/Vue 등에서 **HTTP 요청**(GET, POST, PUT, DELETE 등)을 전송
* 예: `GET /api/users`

---

## 2. 서블릿 컨테이너(내장 Tomcat) 수신

* Spring Boot 내장 Tomcat(또는 Jetty, Undertow)이 요청을 받음
* 요청 URL과 HTTP 메서드를 확인 후, **DispatcherServlet**으로 전달

---

## 3. DispatcherServlet 동작

* Spring MVC의 중심 컨트롤러 역할
* 요청을 분석해서 **HandlerMapping**으로 어떤 Controller 메서드를 호출할지 결정

---

## 4. HandlerMapping → Controller 선택

* URL, HTTP Method, PathVariable, RequestParam 등을 기반으로
* `@RestController` 또는 `@Controller`의 **매핑 메서드**를 찾음

---

## 5. 요청 데이터 변환

* JSON → Java 객체(`@RequestBody`)
* URL 쿼리 파라미터 → Java 변수(`@RequestParam`)
* 경로 파라미터 → Java 변수(`@PathVariable`)

---

## 6. Controller → Service 호출

* Controller는 주로 **요청 처리 흐름 제어 + 응답 포맷 구성** 역할
* 실제 비즈니스 로직은 **Service 계층**에서 수행

```java
@GetMapping("/users/{id}")
public UserDTO getUser(@PathVariable Long id) {
    return userService.getUserById(id);
}
```

---

## 7. Service → Repository/Mapper 호출

* Service 계층에서 DB 접근이 필요하면 **Repository(MyBatis Mapper, JPA Repository)** 호출
* 예:

```java
public UserDTO getUserById(Long id) {
    return userMapper.findById(id);
}
```

---

## 8. Repository/Mapper → DB 쿼리 실행

* JPA: 엔티티 매핑 후 SQL 실행
* MyBatis: XML Mapper 또는 어노테이션 기반 SQL 실행
* DB 결과를 Java 객체로 변환하여 반환

---

## 9. Service → Controller로 결과 반환

* DB에서 가져온 데이터를 가공, 변환
* 비즈니스 로직 처리 후 DTO나 VO로 반환

---

## 10. Controller → DispatcherServlet → 응답 변환

* 반환 객체를 JSON, XML 등으로 직렬화
* `@RestController`이면 자동으로 JSON 변환(Jackson)
* HTTP 응답 코드(200, 201, 404 등) 설정

---

## 11. 클라이언트로 응답

* API 호출 결과(JSON 등)가 브라우저, 앱 등 클라이언트로 전달
* 예:

```json
{
  "id": 1,
  "name": "홍길동"
}
```

---

## 전체 흐름 다이어그램

```
[Client]
   ↓ HTTP 요청
[Spring Boot 내장 Tomcat]
   ↓
[DispatcherServlet]
   ↓ HandlerMapping
[Controller]
   ↓
[Service]
   ↓
[Repository / Mapper]
   ↓
[Database]
   ↑
결과 반환
```

---

원하시면 제가 이 순서를 **Spring Boot 프로젝트 구조**와 함께 `Controller → Service → Mapper → DB` 예시 코드로 완전히 만들어 드릴 수 있습니다.
이렇게 하면 흐름이 바로 이해될 거예요.

그 예시 만들어 드릴까요?

---

좋습니다. “게시판 **리스트 조회**”를 기준으로 Spring Boot + MyBatis 예시 코드를 파일 경로까지 명확히 정리했습니다.
빠르게 실행 가능한 H2 메모리 DB 구성이며, MySQL/Oracle 전환 팁도 마지막에 적어두었습니다.

---

# 프로젝트 구조

```
board-api/
├─ pom.xml
├─ src/main/java/com/example/board/
│  ├─ BoardApiApplication.java
│  ├─ config/
│  │  └─ MyBatisConfig.java
│  ├─ controller/
│  │  └─ BoardController.java
│  ├─ service/
│  │  └─ BoardService.java
│  ├─ domain/
│  │  └─ Board.java
│  ├─ dto/
│  │  ├─ BoardListRequest.java
│  │  ├─ BoardListItem.java
│  │  └─ PageResponse.java
│  └─ mapper/
│     ├─ BoardMapper.java
│     └─ BoardMapper.xml
├─ src/main/resources/
│  ├─ application.yml
│  ├─ schema.sql
│  └─ data.sql
└─ README.md
```

---

## 1) 의존성

**/pom.xml**

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>board-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>board-api</name>
  <properties>
    <java.version>17</java.version>
    <spring-boot.version>3.3.2</spring-boot.version>
    <mybatis-spring-boot.version>3.0.3</mybatis-spring-boot.version>
  </properties>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>${spring-boot.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <!-- Web MVC -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- MyBatis -->
    <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>${mybatis-spring-boot.version}</version>
    </dependency>

    <!-- H2 (데모용) -->
    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <scope>runtime</scope>
    </dependency>

    <!-- Lombok (개발 편의) -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>

    <!-- 검증용(Optional) -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- 테스트(Optional) -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

---

## 2) 설정

**/src/main/resources/application.yml**

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:boarddb;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1
    username: sa
    password:
    driver-class-name: org.h2.Driver
  sql:
    init:
      mode: always   # schema.sql, data.sql 자동 실행
  h2:
    console:
      enabled: true
      path: /h2-console

mybatis:
  mapper-locations: classpath*:mapper/*.xml
  type-aliases-package: com.example.board.domain, com.example.board.dto
  configuration:
    map-underscore-to-camel-case: true
    default-statement-timeout: 5

server:
  port: 8080
```

**/src/main/java/com/example/board/config/MyBatisConfig.java**

```java
package com.example.board.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisConfig {
    // 별도 설정이 필요하면 추가 (예: Interceptor, TypeHandler 등)
}
```

---

## 3) 부트스트랩

**/src/main/java/com/example/board/BoardApiApplication.java**

```java
package com.example.board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BoardApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(BoardApiApplication.class, args);
    }
}
```

---

## 4) 도메인/DTO

**/src/main/java/com/example/board/domain/Board.java**

```java
package com.example.board.domain;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * DB 레코드와 1:1로 매핑되는 엔티티 성격의 클래스.
 * 리스트 응답에는 Board 자체 대신 경량 DTO를 써도 되고, 여기서는 재사용합니다.
 */
@Data
public class Board {
    private Long id;
    private String category;     // 예: free, qna, notice
    private String title;
    private String content;
    private String author;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

**/src/main/java/com/example/board/dto/BoardListItem.java**

```java
package com.example.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 리스트 전용 경량 DTO (목록에서 필요한 필드만)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private Long id;
    private String category;
    private String title;
    private String author;
    private Integer viewCount;
    private LocalDateTime createdAt;
}
```

**/src/main/java/com/example/board/dto/BoardListRequest.java**

```java
package com.example.board.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

/**
 * 페이징/필터/정렬 파라미터를 담는 요청 DTO.
 * Controller @ModelAttribute 로 바인딩.
 */
@Data
public class BoardListRequest {
    private String category;   // 카테고리 필터 (optional)
    private String keyword;    // 제목/내용/작성자 통합 검색어 (optional)

    @Min(0)
    private int page = 0;      // 0부터 시작

    @Min(1) @Max(200)
    private int size = 10;     // 페이지 크기

    private String sort = "created_at";  // 정렬 컬럼(실제 컬럼명 사용)
    private String dir  = "desc";        // asc or desc

    public int offset() {
        return page * size;
    }
}
```

**/src/main/java/com/example/board/dto/PageResponse.java**

```java
package com.example.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * 프론트엔드가 사용하기 쉬운 공통 페이징 응답 포맷
 */
@Data
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content; // 현재 페이지 데이터
    private long total;      // 전체 건수
    private int page;        // 현재 페이지(0-base)
    private int size;        // 페이지 크기
}
```

---

## 5) Mapper

**/src/main/java/com/example/board/mapper/BoardMapper.java**

```java
package com.example.board.mapper;

import com.example.board.dto.BoardListItem;
import com.example.board.dto.BoardListRequest;
import com.example.board.domain.Board;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    /**
     * 목록 조회 (페이징/검색/정렬)
     */
    List<BoardListItem> selectBoardList(@Param("req") BoardListRequest req);

    /**
     * 전체 건수 (검색 조건 동일 적용)
     */
    long countBoardList(@Param("req") BoardListRequest req);

    /**
     * 상세/기타용 예시 (여기서는 리스트만 사용)
     */
    Board findById(@Param("id") Long id);
}
```

**/src/main/resources/mapper/BoardMapper.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "https://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.board.mapper.BoardMapper">

  <!-- 컬럼 목록을 재사용 -->
  <sql id="board_columns">
    id, category, title, content, author, view_count AS viewCount, created_at AS createdAt, updated_at AS updatedAt
  </sql>

  <!-- 검색 공통 where 절 -->
  <sql id="where_clause">
    <where>
      <!-- 카테고리 정확히 일치 -->
      <if test="req.category != null and req.category != ''">
        AND category = #{req.category}
      </if>

      <!-- 키워드: 제목/내용/작성자 LIKE -->
      <if test="req.keyword != null and req.keyword != ''">
        AND (
          title   LIKE CONCAT('%', #{req.keyword}, '%')
          OR content LIKE CONCAT('%', #{req.keyword}, '%')
          OR author  LIKE CONCAT('%', #{req.keyword}, '%')
        )
      </if>
    </where>
  </sql>

  <!-- 정렬 컬럼 화이트리스트 대응: 동적 문자열은 인젝션 위험, 안전하게 분기 -->
  <sql id="order_by">
    ORDER BY
    <choose>
      <when test="req.sort == 'title'"> title </when>
      <when test="req.sort == 'author'"> author </when>
      <when test="req.sort == 'view_count'"> view_count </when>
      <otherwise> created_at </otherwise>
    </choose>
    <choose>
      <when test="req.dir == 'asc'"> ASC </when>
      <otherwise> DESC </otherwise>
    </choose>
  </sql>

  <!-- 목록 -->
  <select id="selectBoardList" resultType="com.example.board.dto.BoardListItem">
    SELECT id, category, title, author, view_count AS viewCount, created_at AS createdAt
    FROM board
    <include refid="where_clause"/>
    <include refid="order_by"/>
    LIMIT #{req.size} OFFSET #{req.offset}
  </select>

  <!-- 카운트 -->
  <select id="countBoardList" resultType="long">
    SELECT COUNT(1)
    FROM board
    <include refid="where_clause"/>
  </select>

  <!-- 상세 (참고) -->
  <select id="findById" parameterType="long" resultType="com.example.board.domain.Board">
    SELECT <include refid="board_columns"/>
    FROM board
    WHERE id = #{id}
  </select>

</mapper>
```

---

## 6) Service

**/src/main/java/com/example/board/service/BoardService.java**

```java
package com.example.board.service;

import com.example.board.dto.BoardListItem;
import com.example.board.dto.BoardListRequest;
import com.example.board.dto.PageResponse;
import com.example.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 비즈니스 로직 담당.
 * - 검색/필터/정렬 파라미터 검증/보정
 * - 다건 조회 + count 조합
 */
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardMapper boardMapper;

    @Transactional(readOnly = true)
    public PageResponse<BoardListItem> getBoardList(BoardListRequest req) {
        // 간단한 보정 (size 상한, dir/ sort 화이트리스트는 Mapper에서 2차 방어)
        if (req.getSize() > 200) req.setSize(200);
        if (req.getSize() <= 0) req.setSize(10);
        if (req.getPage() < 0) req.setPage(0);

        long total = boardMapper.countBoardList(req);
        List<BoardListItem> content = total > 0 ? boardMapper.selectBoardList(req) : List.of();

        return new PageResponse<>(content, total, req.getPage(), req.getSize());
    }
}
```

---

## 7) Controller

**/src/main/java/com/example/board/controller/BoardController.java**

```java
package com.example.board.controller;

import com.example.board.dto.BoardListRequest;
import com.example.board.dto.BoardListItem;
import com.example.board.dto.PageResponse;
import com.example.board.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시판 목록 API
     * 예) GET /api/boards?page=0&size=10&sort=created_at&dir=desc&category=free&keyword=검색어
     */
    @GetMapping
    public PageResponse<BoardListItem> list(@Valid @ModelAttribute BoardListRequest req) {
        return boardService.getBoardList(req);
    }
}
```

---

## 8) 스키마/샘플 데이터

**/src/main/resources/schema.sql**

```sql
DROP TABLE IF EXISTS board;

CREATE TABLE board (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,        -- free, qna, notice 등
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE INDEX idx_board_category ON board(category);
CREATE INDEX idx_board_created_at ON board(created_at);
CREATE INDEX idx_board_title ON board(title);
```

**/src/main/resources/data.sql**

```sql
INSERT INTO board(category, title, content, author, view_count, created_at)
VALUES
('free', '첫 번째 글', '내용입니다', '홍길동', 10, CURRENT_TIMESTAMP - 10 MINUTE),
('free', '두 번째 글', '검색 키워드 포함', '아무개', 5, CURRENT_TIMESTAMP - 5 MINUTE),
('qna', '질문: 스프링 부트', '도와주세요', '김개발', 1, CURRENT_TIMESTAMP - 1 MINUTE),
('notice', '공지 사항', '필독', '관리자', 100, CURRENT_TIMESTAMP - 1 DAY);
```

---

## 9) 실행 및 호출 예시

* 실행:

  ```
  mvn spring-boot:run
  ```
* 리스트 호출:

  * 모든 글: `GET http://localhost:8080/api/boards`
  * 카테고리 필터: `GET http://localhost:8080/api/boards?category=free`
  * 검색어: `GET http://localhost:8080/api/boards?keyword=스프링`
  * 정렬 변경: `GET /api/boards?sort=view_count&dir=asc`
  * 페이징: `GET /api/boards?page=1&size=20`

응답 예시:

```json
{
  "content": [
    {
      "id": 4,
      "category": "notice",
      "title": "공지 사항",
      "author": "관리자",
      "viewCount": 100,
      "createdAt": "2025-08-10T10:00:00"
    }
  ],
  "total": 4,
  "page": 0,
  "size": 10
}
```

---

## 10) 실무 포인트

* 정렬 컬럼/방향은 문자열 연결로 바로 쓰지 말고, 위처럼 **화이트리스트 분기**로 방어.
* 대용량 테이블이면 `COUNT(1)` 비용이 큼.

  * 무한 스크롤이면 **keyset pagination** 고려 (id < lastId 기준).
  * 전체 건수 표시가 꼭 필요 없으면 count 생략.
* 인덱스: `(category)`, `(created_at)`, `(title)` 등 검색/정렬 패턴에 맞춰 설계.
* 캐시: 자주 조회하는 리스트는 캐시를 고려(범위/무효화 전략 필요).

---

## 11) MySQL/Oracle 전환 팁

* `application.yml`의 datasource만 교체하면 됩니다.
* MySQL:

  ```yaml
  spring:
    datasource:
      url: jdbc:mysql://localhost:3306/boarddb?useSSL=false&characterEncoding=UTF-8&serverTimezone=Asia/Seoul
      username: root
      password: yourpw
      driver-class-name: com.mysql.cj.jdbc.Driver
  ```
* Oracle:

  ```yaml
  spring:
    datasource:
      url: jdbc:oracle:thin:@localhost:1521/xe
      username: board
      password: yourpw
      driver-class-name: oracle.jdbc.OracleDriver
  ```
* Oracle은 `LIMIT/OFFSET` 대신

  ```sql
  SELECT * FROM (
    SELECT t.*, ROWNUM rnum
    FROM (원본쿼리 ORDER BY ...) t
    WHERE ROWNUM &lt;= #{req.offset} + #{req.size}
  )
  WHERE rnum &gt; #{req.offset}
  ```

  형태로 바꿔야 합니다. 필요하시면 Oracle용 XML도 만들어 드리겠습니다.

---

원하시면 위 구조에 **상세조회, 등록, 수정, 삭제**까지 이어지는 풀 CRUD와 테스트 코드까지 확장해 드리겠습니다. 어떤 DB를 기준으로 이어갈까요?

---

좋습니다. 그럼 이어서 **게시판 상세 조회 API** 예시를 추가하겠습니다.

---

## 1) Mapper 수정

**/src/main/java/com/example/board/mapper/BoardMapper.java**

```java
/**
 * 게시판 상세 조회
 */
Board findById(@Param("id") Long id);
```

**/src/main/resources/mapper/BoardMapper.xml**

```xml
<!-- 상세 조회 -->
<select id="findById" parameterType="long" resultType="com.example.board.domain.Board">
  SELECT id, category, title, content, author, view_count AS viewCount,
         created_at AS createdAt, updated_at AS updatedAt
  FROM board
  WHERE id = #{id}
</select>
```

---

## 2) Service 추가

**/src/main/java/com/example/board/service/BoardService.java**

```java
@Transactional(readOnly = true)
public Board getBoardDetail(Long id) {
    Board board = boardMapper.findById(id);
    if (board == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다. id=" + id);
    }
    return board;
}
```

---

## 3) Controller 추가

**/src/main/java/com/example/board/controller/BoardController.java**

```java
/**
 * 게시판 상세 조회
 * 예) GET /api/boards/1
 */
@GetMapping("/{id}")
public Board detail(@PathVariable Long id) {
    return boardService.getBoardDetail(id);
}
```

---

## 4) 호출 예시

* 요청:

  ```
  GET http://localhost:8080/api/boards/1
  ```
* 응답:

```json
{
  "id": 1,
  "category": "free",
  "title": "첫 번째 글",
  "content": "내용입니다",
  "author": "홍길동",
  "viewCount": 10,
  "createdAt": "2025-08-10T10:00:00",
  "updatedAt": null
}
```

---

다음은 **게시글 등록 API**로 이어서 만들까요?
이렇게 하면 리스트 → 상세 → 등록 → 수정 → 삭제까지 CRUD가 완성됩니다.

---

좋습니다. 다음 단계 **게시글 등록( Create ) API**를 추가합니다. 파일 경로를 그대로 이어 씁니다.

---

# 1) 요청 DTO

**/src/main/java/com/example/board/dto/BoardCreateRequest.java**

```java
package com.example.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 게시글 등록 요청 DTO
 */
@Data
public class BoardCreateRequest {

    @NotBlank(message = "category는 필수입니다.")
    @Size(max = 50)
    private String category;   // free, qna, notice 등

    @NotBlank(message = "title은 필수입니다.")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "content는 필수입니다.")
    private String content;

    @NotBlank(message = "author는 필수입니다.")
    @Size(max = 100)
    private String author;
}
```

---

# 2) Mapper 추가

**/src/main/java/com/example/board/mapper/BoardMapper.java**

```java
import com.example.board.dto.BoardCreateRequest;

// ...

/**
 * 게시글 등록
 * - useGeneratedKeys 로 DB가 생성한 PK를 id 파라미터에 채워줌
 */
int insertBoard(Board board);
```

**/src/main/resources/mapper/BoardMapper.xml**

```xml
<!-- 등록 -->
<insert id="insertBoard" parameterType="com.example.board.domain.Board"
        useGeneratedKeys="true" keyProperty="id">
  INSERT INTO board (category, title, content, author, view_count, created_at, updated_at)
  VALUES (#{category}, #{title}, #{content}, #{author}, 0, CURRENT_TIMESTAMP, NULL)
</insert>
```

> 주의: `parameterType`은 실제로 insert에 전달하는 타입(`Board`)과 일치시킵니다.

---

# 3) Service 추가

**/src/main/java/com/example/board/service/BoardService.java**

```java
import com.example.board.dto.BoardCreateRequest;
import com.example.board.domain.Board;

// ...

/**
 * 게시글 등록
 * - 트랜잭션 내에서 insert 수행
 * - 생성된 id 반환
 */
@Transactional
public Long createBoard(BoardCreateRequest req) {
    // 요청 → 도메인 변환
    Board entity = new Board();
    entity.setCategory(req.getCategory());
    entity.setTitle(req.getTitle());
    entity.setContent(req.getContent());
    entity.setAuthor(req.getAuthor());
    entity.setViewCount(0);

    int rows = boardMapper.insertBoard(entity);
    if (rows != 1 || entity.getId() == null) {
        throw new IllegalStateException("게시글 등록 실패");
    }
    return entity.getId();
}
```

---

# 4) Controller 추가

**/src/main/java/com/example/board/controller/BoardController.java**

```java
import com.example.board.dto.BoardCreateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

// ...

/**
 * 게시글 등록
 * 예) POST /api/boards
 * Content-Type: application/json
 * {
 *   "category": "free",
 *   "title": "새 글 제목",
 *   "content": "새 글 내용",
 *   "author": "홍길동"
 * }
 */
@PostMapping
public ResponseEntity<Void> create(@Valid @RequestBody BoardCreateRequest req,
                                   UriComponentsBuilder uriBuilder) {
    Long id = boardService.createBoard(req);

    // Location 헤더에 생성된 리소스 URI 세팅: /api/boards/{id}
    return ResponseEntity.created(
            uriBuilder.path("/api/boards/{id}").buildAndExpand(id).toUri()
    ).build();
}
```

---

# 5) 동작 확인

* 실행:

  ```
  mvn spring-boot:run
  ```

* 등록 요청 예:

  ```
  POST http://localhost:8080/api/boards
  Content-Type: application/json

  {
    "category": "free",
    "title": "등록 테스트",
    "content": "내용 본문",
    "author": "테스터"
  }
  ```

* 예상 응답:

  * HTTP 201 Created
  * Location: `http://localhost:8080/api/boards/5` (예시)
  * 바디 없음

* 바로 상세 조회:

  ```
  GET http://localhost:8080/api/boards/5
  ```

---

# 6) 유효성 및 예외 처리 팁

* 현재는 `@Valid`로 필수값 검증만 수행.
* 글로벌 예외 처리(`@RestControllerAdvice`)를 추가하면 검증 오류를 표준 응답 포맷으로 반환 가능.
* 예: `MethodArgumentNotValidException` → 400 응답 변환.

원하시면 다음으로 \*\*게시글 수정( Update )\*\*과 **삭제( Delete )** API를 이어서 구현하겠습니다. 계속 진행할까요?

---

좋습니다. 이번에는 **게시글 수정(Update) API**를 이어서 추가하겠습니다.

---

## 1) 요청 DTO

**/src/main/java/com/example/board/dto/BoardUpdateRequest.java**

```java
package com.example.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 게시글 수정 요청 DTO
 */
@Data
public class BoardUpdateRequest {

    @NotBlank(message = "title은 필수입니다.")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "content는 필수입니다.")
    private String content;

    @NotBlank(message = "author는 필수입니다.")
    @Size(max = 100)
    private String author;
}
```

---

## 2) Mapper 추가

**/src/main/java/com/example/board/mapper/BoardMapper.java**

```java
import com.example.board.dto.BoardUpdateRequest;

// ...

/**
 * 게시글 수정
 */
int updateBoard(@Param("id") Long id, @Param("req") BoardUpdateRequest req);
```

**/src/main/resources/mapper/BoardMapper.xml**

```xml
<!-- 수정 -->
<update id="updateBoard">
  UPDATE board
  SET title = #{req.title},
      content = #{req.content},
      author = #{req.author},
      updated_at = CURRENT_TIMESTAMP
  WHERE id = #{id}
</update>
```

---

## 3) Service 추가

**/src/main/java/com/example/board/service/BoardService.java**

```java
import com.example.board.dto.BoardUpdateRequest;

// ...

@Transactional
public void updateBoard(Long id, BoardUpdateRequest req) {
    // 존재 여부 확인
    if (boardMapper.findById(id) == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다. id=" + id);
    }

    int rows = boardMapper.updateBoard(id, req);
    if (rows != 1) {
        throw new IllegalStateException("게시글 수정 실패");
    }
}
```

---

## 4) Controller 추가

**/src/main/java/com/example/board/controller/BoardController.java**

```java
import com.example.board.dto.BoardUpdateRequest;

// ...

/**
 * 게시글 수정
 * 예) PUT /api/boards/1
 * Content-Type: application/json
 * {
 *   "title": "수정된 제목",
 *   "content": "수정된 내용",
 *   "author": "홍길동"
 * }
 */
@PutMapping("/{id}")
public ResponseEntity<Void> update(@PathVariable Long id,
                                   @Valid @RequestBody BoardUpdateRequest req) {
    boardService.updateBoard(id, req);
    return ResponseEntity.noContent().build(); // 204 No Content
}
```

---

## 5) 요청 예시

```
PUT http://localhost:8080/api/boards/1
Content-Type: application/json

{
  "title": "제목 수정",
  "content": "내용 수정",
  "author": "홍길동"
}
```

* 응답: `204 No Content`
* 수정 확인:

  ```
  GET http://localhost:8080/api/boards/1
  ```

---

다음 단계는 **게시글 삭제(Delete) API**입니다.
원하시면 바로 이어서 작성해 드릴까요?

---

좋습니다. 이번에는 **게시글 삭제(Delete) API**를 추가합니다. 기본은 하드 삭제, 선택적으로 소프트 삭제 옵션도 제공합니다.

---

# 1) Mapper 추가

**/src/main/java/com/example/board/mapper/BoardMapper.java**

```java
/**
 * 게시글 삭제(하드 삭제)
 */
int deleteBoard(@Param("id") Long id);

/**
 * 소프트 삭제: deleted_at 컬럼만 갱신(선택)
 */
int softDeleteBoard(@Param("id") Long id);

/**
 * 다건 삭제(옵션)
 */
int deleteBoards(@Param("ids") List<Long> ids);
```

**/src/main/resources/mapper/BoardMapper.xml**

```xml
<!-- 하드 삭제 -->
<delete id="deleteBoard" parameterType="long">
  DELETE FROM board
  WHERE id = #{id}
</delete>

<!-- 소프트 삭제(옵션) -->
<update id="softDeleteBoard" parameterType="long">
  UPDATE board
  SET updated_at = CURRENT_TIMESTAMP
      <!-- deleted_at 컬럼을 쓰려면 스키마에 추가 필요 -->
      , deleted_at = CURRENT_TIMESTAMP
  WHERE id = #{id}
</update>

<!-- 다건 하드 삭제(옵션) -->
<delete id="deleteBoards">
  DELETE FROM board
  WHERE id IN
  <foreach collection="ids" item="id" open="(" close=")" separator=",">
    #{id}
  </foreach>
</delete>
```

> 소프트 삭제를 사용하려면 스키마에 `deleted_at TIMESTAMP NULL` 컬럼을 추가하고, 조회 쿼리(where절)에 `AND deleted_at IS NULL` 조건을 넣으세요.

---

# 2) Service 추가

**/src/main/java/com/example/board/service/BoardService.java**

```java
@Transactional
public void deleteBoard(Long id, boolean soft) {
    // 존재 확인
    if (boardMapper.findById(id) == null) {
        throw new RuntimeException("게시글을 찾을 수 없습니다. id=" + id);
    }

    int rows = soft ? boardMapper.softDeleteBoard(id)
                    : boardMapper.deleteBoard(id);

    if (rows != 1) {
        throw new IllegalStateException("게시글 삭제 실패");
    }
}

@Transactional
public void deleteBoards(List<Long> ids) {
    if (ids == null || ids.isEmpty()) return;
    int rows = boardMapper.deleteBoards(ids);
    if (rows != ids.size()) {
        // 일부 실패 시 정책에 따라 예외 또는 무시 선택
        throw new IllegalStateException("일부 게시글 삭제 실패");
    }
}
```

---

# 3) Controller 추가

**/src/main/java/com/example/board/controller/BoardController.java**

```java
import org.springframework.http.ResponseEntity;

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id,
                                   @RequestParam(name = "soft", defaultValue = "false") boolean soft) {
    boardService.deleteBoard(id, soft);
    return ResponseEntity.noContent().build(); // 204
}

/**
 * 다건 삭제(옵션)
 * 예) DELETE /api/boards?ids=1,2,3
 */
@DeleteMapping
public ResponseEntity<Void> deleteMany(@RequestParam("ids") List<Long> ids) {
    boardService.deleteBoards(ids);
    return ResponseEntity.noContent().build();
}
```

---

# 4) 스키마(소프트 삭제 사용 시)

**/src/main/resources/schema.sql** (추가/변경)

```sql
DROP TABLE IF EXISTS board;

CREATE TABLE board (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL              -- 소프트 삭제용
);

CREATE INDEX idx_board_category ON board(category);
CREATE INDEX idx_board_created_at ON board(created_at);
CREATE INDEX idx_board_title ON board(title);
CREATE INDEX idx_board_deleted_at ON board(deleted_at);
```

그리고 목록/카운트/상세 쿼리의 `<where>` 절에 아래 조건을 추가하세요.

```xml
AND deleted_at IS NULL
```

---

# 5) 호출 예시

* 하드 삭제:

```
DELETE http://localhost:8080/api/boards/1
```

응답: `204 No Content`

* 소프트 삭제:

```
DELETE http://localhost:8080/api/boards/1?soft=true
```

* 다건 삭제:

```
DELETE http://localhost:8080/api/boards?ids=2,3,4
```

---

# 6) 실무 팁

* 참조 무결성: 댓글, 첨부파일 등 연관 테이블이 있으면 FK 제약조건/ON DELETE CASCADE 또는 서비스 계층에서 순차 삭제를 고려.
* 소프트 삭제의 장점: 복구/감사 로그 가능. 단, 모든 조회 쿼리에 `deleted_at IS NULL` 누락 주의.
* 접근 제어: 작성자 또는 관리자만 삭제 가능하도록 인증/인가(스프링 시큐리티) 추가 권장.
* 감사 로깅: 삭제 사유, 사용자 ID, IP 등을 감사 테이블에 적재하면 운영에 유용.

---

CRUD가 모두 갖춰졌습니다. 다음으로 **예외 처리(ControllerAdvice) + 표준 응답 포맷**, 혹은 **조회수 증가 / 카테고리별 통계** 같은 확장 중 무엇으로 이어갈까요?
