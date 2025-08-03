좋습니다. 완전 기초부터 Spring Boot로 API 서버와 CRUD 게시판을 만드는 과정을 아래와 같이 단계별로 설명드리겠습니다.

## ✅ 목표

* Spring Boot 기반 API 서버 구축
* 게시판 CRUD(글 목록, 글 보기, 글 쓰기, 수정, 삭제) 구현
* DB는 H2 → 추후 MySQL/Oracle로 확장 가능
* 상세한 설치, 설정, 파일 경로와 이름 설명

---

## 1단계: 개발 환경 준비

### 1-1. 설치할 도구

| 항목            | 버전 권장                 | 설명                                  |
| ------------- | --------------------- | ----------------------------------- |
| JDK           | 17                    | Java 개발 키트                          |
| Gradle        | 8.x                   | 빌드 도구 (Spring Initializr로 자동 설정 가능) |
| IntelliJ IDEA | Community 또는 Ultimate | Java IDE                            |
| Spring Boot   | 3.x                   | Spring Framework의 빠른 개발 플랫폼         |
| H2 DB         | 내장 DB                 | 빠른 테스트용 DB                          |
| Postman       | -                     | API 테스트 툴                           |

### 1-2. JDK 설치 (Ubuntu 기준 예시)

```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

### 1-3. IntelliJ 설치

* [https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/)

---

## 2단계: 프로젝트 생성

### 방법 1: Spring Initializr 사용 (웹)

* 주소: [https://start.spring.io](https://start.spring.io)
* 설정 예:

  * Project: Gradle - Groovy
  * Language: Java
  * Spring Boot: 3.2.x
  * Group: `com.example`
  * Artifact: `board`
  * Name: `board`
  * Package name: `com.example.board`
  * Packaging: Jar
  * Java: 17
  * Dependencies:

    * Spring Web
    * Spring Boot DevTools
    * Spring Data JPA
    * H2 Database
    * Lombok

#### 다운로드 후 압축 해제

---

## 3단계: 프로젝트 폴더 구조

```
board/
├── build.gradle
├── settings.gradle
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/board/
│   │   │       ├── BoardApplication.java       <- 시작 클래스
│   │   │       ├── controller/                 <- API 컨트롤러
│   │   │       ├── service/                    <- 비즈니스 로직
│   │   │       └── entity/                     <- JPA 엔티티
│   │   └── resources/
│   │       ├── application.yml                 <- 설정 파일
│   │       └── static/
│   │       └── templates/
│   └── test/
```

---

## 4단계: application.yml 설정

**파일 경로**: `src/main/resources/application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
  h2:
    console:
      enabled: true
      path: /h2-console
```

---

## 5단계: 시작 클래스

**파일 경로**: `src/main/java/com/example/board/BoardApplication.java`

```java
package com.example.board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BoardApplication {
    public static void main(String[] args) {
        SpringApplication.run(BoardApplication.class, args);
    }
}
```

---

다음 단계부터는 다음과 같은 순서로 진행할 예정입니다:

1. Entity 생성 (`Post` 엔티티)
2. Repository 인터페이스 생성
3. Service 클래스 생성
4. Controller 클래스 생성 (REST API)
5. API 테스트 (Postman 등으로)

"다음"이라고 입력하시면 이어서 **Post 엔티티 생성**부터 설명드리겠습니다.

---

Mybatis, maven 다시

---

좋습니다. 이번에는 **MyBatis + Maven 기반**으로 Spring Boot 프로젝트를 구성하고, 게시판 CRUD 기능을 구현하는 방법을 완전 기초부터 설치와 환경 설정, 경로까지 자세히 설명드리겠습니다.

---

## ✅ 목표

* Spring Boot + MyBatis + Maven 기반 API 서버 구축
* 게시판 CRUD 기능 구현
* 완전 기초부터 설치, 설정, 파일 경로 및 파일명 명확하게 설명

---

## 1단계: 개발 환경 준비

### 1-1. 설치 도구

| 도구              | 설명                     |
| --------------- | ---------------------- |
| JDK 17          | Java 개발 키트             |
| IntelliJ IDEA   | Java IDE               |
| Maven           | 빌드 도구                  |
| Spring Boot 3.x | API 서버 프레임워크           |
| MyBatis         | SQL Mapper             |
| H2 DB           | 테스트용 내장 DB (MySQL도 가능) |
| Postman         | API 테스트 툴              |

---

## 2단계: Maven 프로젝트 생성 (Spring Initializr)

**방법 1: 웹에서 생성**

* 주소: [https://start.spring.io](https://start.spring.io)
* 설정:

  * Project: Maven
  * Language: Java
  * Spring Boot: 3.2.x
  * Group: `com.example`
  * Artifact: `board`
  * Package: `com.example.board`
  * Dependencies:

    * Spring Web
    * MyBatis Framework
    * Spring Boot DevTools
    * Lombok
    * H2 Database

**방법 2: IntelliJ에서 생성**

* New Project → Spring Initializr → 위와 동일한 설정

---

## 3단계: 프로젝트 폴더 구조

```
board/
├── pom.xml                           <- Maven 설정 파일
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/board/
│   │   │       ├── BoardApplication.java       <- 시작 클래스
│   │   │       ├── controller/                 <- API 컨트롤러
│   │   │       ├── service/                    <- 서비스 로직
│   │   │       ├── domain/                     <- VO, DTO, Entity
│   │   │       └── mapper/                     <- MyBatis 매퍼 인터페이스
│   │   ├── resources/
│   │   │   ├── application.yml                 <- 설정 파일
│   │   │   └── mapper/
│   │   │       └── PostMapper.xml              <- MyBatis SQL 매퍼
│   └── test/
```

---

## 4단계: `pom.xml` 설정

**파일 경로**: `/pom.xml`

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>board</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
  </parent>

  <properties>
    <java.version>17</java.version>
  </properties>

  <dependencies>
    <!-- Spring Boot Starter -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- MyBatis -->
    <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>3.0.2</version>
    </dependency>

    <!-- H2 Database -->
    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <scope>runtime</scope>
    </dependency>

    <!-- Lombok -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>

    <!-- DevTools -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <scope>runtime</scope>
    </dependency>

    <!-- Test -->
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

## 5단계: application.yml 설정

**파일 경로**: `src/main/resources/application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:

  mybatis:
    mapper-locations: classpath:mapper/**/*.xml
    type-aliases-package: com.example.board.domain

  h2:
    console:
      enabled: true
      path: /h2-console
```

---

## 6단계: 시작 클래스

**파일 경로**: `src/main/java/com/example/board/BoardApplication.java`

```java
package com.example.board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BoardApplication {
    public static void main(String[] args) {
        SpringApplication.run(BoardApplication.class, args);
    }
}
```

---

이제 다음 단계부터는 다음과 같이 진행합니다:

1. VO/DTO 클래스 생성 (`Post`)
2. MyBatis Mapper 인터페이스 (`PostMapper`)
3. XML Mapper (`PostMapper.xml`)
4. Service 및 Controller 작성
5. Postman으로 API 테스트

좋습니다. 다음은 **MyBatis Mapper 인터페이스 (PostMapper.java)** 작성입니다.

---

## ✅ 2. PostMapper.java 생성

### 📁 파일 경로

`src/main/java/com/example/board/mapper/PostMapper.java`

### 📄 PostMapper.java

```java
package com.example.board.mapper;

import com.example.board.domain.Post;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    // 게시글 전체 조회
    List<Post> findAll();

    // 게시글 상세 조회
    Post findById(Long id);

    // 게시글 등록
    int insert(Post post);

    // 게시글 수정
    int update(Post post);

    // 게시글 삭제
    int delete(Long id);
}
```

### 설명

* `@Mapper`: 이 인터페이스가 MyBatis 매퍼임을 명시합니다.
* 각 메서드는 `PostMapper.xml` 파일의 SQL과 연결됩니다.
* `List<Post> findAll()`: 모든 게시글 조회
* `Post findById(Long id)`: 특정 ID의 게시글 조회
* `int insert(Post post)`: 게시글 등록
* `int update(Post post)`: 게시글 수정
* `int delete(Long id)`: 게시글 삭제

---

좋습니다. 이번에는 **MyBatis XML 매퍼(PostMapper.xml)** 파일을 작성하겠습니다.

---

## ✅ 3. PostMapper.xml 생성

### 📁 파일 경로

`src/main/resources/mapper/PostMapper.xml`

> **주의:** `application.yml` 설정에서 `mapper-locations: classpath:mapper/**/*.xml`로 설정했기 때문에 반드시 `/resources/mapper/` 경로에 있어야 하며, 이름도 인터페이스 이름(PostMapper)과 일치해야 합니다.

---

### 📄 PostMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.board.mapper.PostMapper">

    <!-- 전체 게시글 조회 -->
    <select id="findAll" resultType="com.example.board.domain.Post">
        SELECT id, title, content, writer, created_at
        FROM posts
        ORDER BY id DESC
    </select>

    <!-- 게시글 상세 조회 -->
    <select id="findById" parameterType="long" resultType="com.example.board.domain.Post">
        SELECT id, title, content, writer, created_at
        FROM posts
        WHERE id = #{id}
    </select>

    <!-- 게시글 등록 -->
    <insert id="insert" parameterType="com.example.board.domain.Post">
        INSERT INTO posts (title, content, writer, created_at)
        VALUES (#{title}, #{content}, #{writer}, CURRENT_TIMESTAMP)
    </insert>

    <!-- 게시글 수정 -->
    <update id="update" parameterType="com.example.board.domain.Post">
        UPDATE posts
        SET title = #{title},
            content = #{content},
            writer = #{writer}
        WHERE id = #{id}
    </update>

    <!-- 게시글 삭제 -->
    <delete id="delete" parameterType="long">
        DELETE FROM posts
        WHERE id = #{id}
    </delete>

</mapper>
```

---

### 참고: H2 초기 테이블 생성 쿼리

**📁 파일 경로 (선택)**
`src/main/resources/data.sql`

```sql
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    writer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

좋습니다. 이번에는 **서비스 클래스(PostService.java)** 를 작성하겠습니다.

---

## ✅ 4. PostService.java 생성

### 📁 파일 경로

`src/main/java/com/example/board/service/PostService.java`

---

### 📄 PostService.java

```java
package com.example.board.service;

import com.example.board.domain.Post;
import com.example.board.mapper.PostMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostMapper postMapper;

    // 생성자 주입 (PostMapper를 DI)
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    // 전체 게시글 조회
    public List<Post> getAllPosts() {
        return postMapper.findAll();
    }

    // 게시글 상세 조회
    public Post getPostById(Long id) {
        return postMapper.findById(id);
    }

    // 게시글 등록
    public int createPost(Post post) {
        return postMapper.insert(post);
    }

    // 게시글 수정
    public int updatePost(Post post) {
        return postMapper.update(post);
    }

    // 게시글 삭제
    public int deletePost(Long id) {
        return postMapper.delete(id);
    }
}
```

---

### 설명

* `@Service`: 이 클래스가 서비스 계층임을 명시합니다.
* `PostMapper`를 생성자 주입받아 데이터베이스 연산을 위임합니다.
* Controller에서 호출할 메서드들을 정의합니다.

---

좋습니다. 이번에는 최종 단계인 **PostController.java** 를 작성하겠습니다.

---

## ✅ 5. PostController.java 생성

### 📁 파일 경로

`src/main/java/com/example/board/controller/PostController.java`

---

### 📄 PostController.java

```java
package com.example.board.controller;

import com.example.board.domain.Post;
import com.example.board.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // 생성자 주입
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 전체 게시글 조회
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // 게시글 등록
    @PostMapping
    public String createPost(@RequestBody Post post) {
        int result = postService.createPost(post);
        return result == 1 ? "등록 성공" : "등록 실패";
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public String updatePost(@PathVariable Long id, @RequestBody Post post) {
        post.setId(id);
        int result = postService.updatePost(post);
        return result == 1 ? "수정 성공" : "수정 실패";
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable Long id) {
        int result = postService.deletePost(id);
        return result == 1 ? "삭제 성공" : "삭제 실패";
    }
}
```

---

## ✅ API 테스트 예시 (Postman)

| 메서드    | URL                                 | 설명            |
| ------ | ----------------------------------- | ------------- |
| GET    | `http://localhost:8080/api/posts`   | 전체 조회         |
| GET    | `http://localhost:8080/api/posts/1` | ID=1 상세 조회    |
| POST   | `http://localhost:8080/api/posts`   | 게시글 등록 (JSON) |
| PUT    | `http://localhost:8080/api/posts/1` | 게시글 수정        |
| DELETE | `http://localhost:8080/api/posts/1` | 게시글 삭제        |

### POST/PUT 요청 예시 Body (JSON)

```json
{
  "title": "첫 게시글",
  "content": "내용입니다",
  "writer": "관리자"
}
```

---

확장 기능으로 많이 사용하는 항목들을 아래와 같이 정리해드릴게요. 필요하신 항목을 말씀해주시면 해당 항목부터 설치 및 구현 방법을 완전 기초부터 이어서 설명드리겠습니다.

---

## ✅ Spring Boot + MyBatis 게시판 확장 기능 목록

### 1. ✅ MySQL 연동

* 내장 H2 대신 실제 운영용 MySQL DB 연결
* `application.yml` 설정 변경
* JDBC 드라이버 설정

### 2. ✅ 페이지네이션(Pagination)

* 게시글 목록 API에 `page`, `size` 파라미터 추가
* LIMIT, OFFSET 활용한 쿼리
* 총 개수(count) 포함한 응답 구조

### 3. ✅ Swagger 연동

* API 문서 자동 생성
* `/swagger-ui/index.html` 경로 제공

### 4. ✅ Validation 적용

* 제목, 내용 등 필수 입력 항목 유효성 검사
* `@Valid`, `@NotBlank` 등 사용

### 5. ✅ 에러 핸들링 공통화

* 예외 상황에 대한 공통 응답 처리
* `@ControllerAdvice`, `@ExceptionHandler` 사용

### 6. ✅ JWT 로그인 및 권한 인증

* 사용자 로그인 기능 추가
* JWT 토큰 발급 및 검증
* 권한 기반 접근 제어

### 7. ✅ 댓글 기능 추가

* 게시글 하위에 댓글 목록, 등록, 삭제
* 연관 관계 테이블 구성 및 매퍼 추가

### 8. ✅ 파일 업로드

* 게시글에 첨부파일 업로드/다운로드
* Multipart 처리, 저장 경로 설정

### 9. ✅ 검색 기능

* 제목/내용/작성자 기준 검색
* SQL의 `LIKE`, 조건 쿼리 활용

### 10. ✅ 프론트엔드 연결 예시

* React, Vue, 또는 간단한 HTML 폼으로 연결
* 게시글 작성, 목록 조회 등 API 연동

---

좋습니다. 이번에는 **React로 게시판 프론트엔드 만들기** 1단계부터 시작하겠습니다.
Spring Boot에서 만든 게시판 API 서버와 연동하여 게시글 목록, 상세, 작성, 수정, 삭제 기능을 React에서 구현하는 전체 과정입니다.

---

## ✅ React 게시판 만들기 1단계: 프로젝트 생성 및 환경 설정

---

### 1. Node.js 설치

React 앱을 만들기 위해서는 Node.js가 필요합니다.

* [https://nodejs.org](https://nodejs.org) 에서 LTS 버전 다운로드 후 설치
* 설치 확인:

```bash
node -v
npm -v
```

---

### 2. React 프로젝트 생성

터미널에서 원하는 폴더로 이동 후 아래 명령 실행

```bash
npx create-react-app board-frontend
cd board-frontend
```

* `board-frontend`: 폴더 이름 (원하는 이름 가능)

---

### 3. 폴더 구조 소개 (create-react-app 기준)

```
board-frontend/
├── public/
│   └── index.html         // 루트 HTML
├── src/
│   ├── App.js             // 전체 앱 컴포넌트
│   ├── index.js           // 진입점
│   └── components/        // 게시판 관련 컴포넌트들
├── package.json           // 프로젝트 설정 및 의존성
```

---

### 4. 불필요한 파일 정리

`src` 폴더에서 다음 파일을 삭제:

* `App.test.js`
* `logo.svg`
* `reportWebVitals.js`
* `setupTests.js`

그리고 `App.js`, `index.js` 안에서 해당 import도 삭제합니다.

---

### 5. Axios 설치 (API 요청을 위해 필요)

```bash
npm install axios
```

설치가 완료되면 `package.json`에 아래와 같이 추가됩니다:

```json
"dependencies": {
  "axios": "^1.x.x",
  ...
}
```

---

### 6. 기본 화면 확인

`src/App.js` 파일을 간단히 아래와 같이 수정해 테스트합니다.

```jsx
// src/App.js

import React from 'react';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>React 게시판</h1>
      <p>Spring Boot와 연동되는 게시판 프로젝트 시작!</p>
    </div>
  );
}

export default App;
```

실행:

```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하면 React 앱이 실행됩니다.

---

### ✅ 요약

| 항목    | 내용                                                         |
| ----- | ---------------------------------------------------------- |
| 백엔드   | Spring Boot + MyBatis 게시판 API 서버 (`http://localhost:8080`) |
| 프론트엔드 | React (`http://localhost:3000`)                            |
| 통신 방식 | Axios로 API 호출                                              |
| 시작 준비 | 기본 폴더 구조와 실행 완료                                            |

---

좋습니다. 앞서 말씀드린 확장 기능 목록 중 **1번: MySQL 연동**부터 시작하겠습니다.
이번 단계에서는 Spring Boot + MyBatis 프로젝트에서 **H2 대신 MySQL을 사용하는 방법**을 완전 기초부터 자세히 설명드리겠습니다.

---

## ✅ MySQL 연동하기 (Spring Boot + MyBatis)

---

### ✅ 1단계: MySQL 설치 (로컬 또는 Docker 선택)

#### 방법 ① 로컬에 설치

* [MySQL 공식 홈페이지](https://dev.mysql.com/downloads/)에서 설치
* 설치 중 루트 비밀번호(`root` 사용자 비밀번호) 설정 필요

#### 방법 ② Docker로 실행 (선호)

```bash
docker run --name mysql-board -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=boarddb -p 3306:3306 -d mysql:8
```

* root 비밀번호: `1234`
* 생성될 DB 이름: `boarddb`
* 포트: `3306`

---

### ✅ 2단계: MySQL 접속 및 테이블 생성

#### 방법 ① 터미널에서 접속

```bash
mysql -u root -p
# 비밀번호: 1234 입력
```

#### 방법 ② MySQL Workbench 또는 DBeaver 사용

---

### ✅ 3단계: 게시글 테이블 생성

```sql
CREATE DATABASE IF NOT EXISTS boarddb;

USE boarddb;

CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    writer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### ✅ 4단계: pom.xml에 MySQL 드라이버 추가

**📁 경로**: `pom.xml`

```xml
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

---

### ✅ 5단계: application.yml 수정

**📁 경로**: `src/main/resources/application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/boarddb?serverTimezone=Asia/Seoul
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 1234

mybatis:
  mapper-locations: classpath:mapper/**/*.xml
  type-aliases-package: com.example.board.domain

# 콘솔에서 SQL 확인용
logging:
  level:
    com.example.board.mapper: debug
```

> ⚠️ 주의: `username`, `password`, `port`는 본인 환경에 맞게 수정해야 합니다.

---

### ✅ 6단계: 프로젝트 실행 확인

```bash
./mvnw spring-boot:run
```

브라우저에서 아래 경로로 접속해서 API 작동 여부 확인:

```
GET http://localhost:8080/api/posts
```

정상적으로 작동한다면 MySQL과 연결에 성공한 것입니다.

---

## ✅ 요약

| 항목    | 설명                                  |
| ----- | ----------------------------------- |
| DB    | MySQL (boarddb)                     |
| 테이블   | posts                               |
| 드라이버  | `mysql-connector-j`                 |
| 설정 파일 | `application.yml`에 datasource 정보 변경 |
| 장점    | 운영 환경 대응 가능, 데이터 영속성                |

---

좋습니다. 이번에는 확장 기능 **2번: 페이지네이션(Pagination)** 구현을 완전 기초부터 설명드리겠습니다.

---

## ✅ 2. 페이지네이션 기능 구현 (Spring Boot + MyBatis)

목표는 다음과 같은 API 형태를 만드는 것입니다:

```
GET /api/posts?page=1&size=10
```

* **page**: 몇 번째 페이지인지 (1부터 시작)
* **size**: 한 페이지에 몇 개를 보여줄지

---

## ✅ 1단계: Controller 수정

### 📁 경로

`src/main/java/com/example/board/controller/PostController.java`

### 📄 변경 코드

```java
// 게시글 목록에 page, size 파라미터 추가
@GetMapping
public List<Post> getAllPosts(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
) {
    // 페이지는 1부터 시작하지만, OFFSET은 0부터 시작하므로 계산 필요
    int offset = (page - 1) * size;
    return postService.getPostsByPaging(offset, size);
}
```

---

## ✅ 2단계: Service 수정

### 📁 경로

`src/main/java/com/example/board/service/PostService.java`

### 📄 변경 코드

```java
// 페이징 처리된 게시글 목록 조회
public List<Post> getPostsByPaging(int offset, int size) {
    return postMapper.findByPaging(offset, size);
}
```

---

## ✅ 3단계: Mapper 인터페이스 수정

### 📁 경로

`src/main/java/com/example/board/mapper/PostMapper.java`

### 📄 추가 코드

```java
// 페이징 조회
List<Post> findByPaging(@Param("offset") int offset, @Param("size") int size);
```

> `@Param`을 붙이지 않으면 XML에서 인식되지 않음

---

## ✅ 4단계: XML 매퍼(PostMapper.xml) 수정

### 📁 경로

`src/main/resources/mapper/PostMapper.xml`

### 📄 추가 SQL

```xml
<!-- 페이징 게시글 조회 -->
<select id="findByPaging" resultType="com.example.board.domain.Post">
    SELECT id, title, content, writer, created_at
    FROM posts
    ORDER BY id DESC
    LIMIT #{size} OFFSET #{offset}
</select>
```

---

## ✅ 5단계: 총 게시글 수(count) 조회 기능 추가 (선택)

페이지 번호 계산 등에 사용될 수 있음.

### PostMapper.java

```java
int countPosts();
```

### PostMapper.xml

```xml
<select id="countPosts" resultType="int">
    SELECT COUNT(*) FROM posts
</select>
```

---

## ✅ 테스트

### API 호출 예시

```
GET http://localhost:8080/api/posts?page=1&size=5
```

→ 게시글을 5개씩 1페이지부터 조회

---

## ✅ 요약

| 항목                             | 설명                               |
| ------------------------------ | -------------------------------- |
| GET /api/posts?page=1\&size=10 | 페이지별 게시글 조회                      |
| OFFSET 계산                      | `(page - 1) * size`              |
| MyBatis SQL                    | `LIMIT #{size} OFFSET #{offset}` |
| 추가 확장                          | 게시글 개수 반환 API도 구현 가능             |

---

좋습니다. 이번에는 확장 기능 **3번: Swagger 연동**을 완전 기초부터 설명드리겠습니다.

---

## ✅ 3. Swagger 연동 (Spring Boot + MyBatis)

### ✅ 목표

* Swagger UI를 통해 API 문서를 자동 생성
* API 테스트 가능 (Postman 없이도)
* 경로: `http://localhost:8080/swagger-ui/index.html`

---

## ✅ 1단계: Swagger 라이브러리 추가

### 📁 경로

`pom.xml`

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.5.0</version>
</dependency>
```

> 최신 버전 확인: [https://search.maven.org/search?q=springdoc-openapi](https://search.maven.org/search?q=springdoc-openapi)

---

## ✅ 2단계: Swagger 기본 설정

Spring Boot 3.x 이상은 별도 설정 없이도 자동 적용됩니다.
하지만 기본 정보(제목, 설명 등)를 넣고 싶다면 설정 클래스를 추가해도 됩니다.

### 📁 경로

`src/main/java/com/example/board/config/OpenApiConfig.java`

### 📄 OpenApiConfig.java

```java
package com.example.board.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Board API 문서")
                        .description("Spring Boot + MyBatis 게시판 API")
                        .version("v1.0.0")
                );
    }
}
```

---

## ✅ 3단계: 컨트롤러에 Swagger 설명 추가 (선택)

SpringDoc는 기본적으로 모든 `@RestController`를 문서화하지만, 설명을 더 달아줄 수 있습니다.

```java
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "PostController", description = "게시판 API")
@RestController
@RequestMapping("/api/posts")
public class PostController {
  ...
}
```

각 메서드에도 설명을 추가할 수 있습니다:

```java
@Operation(summary = "전체 게시글 조회", description = "페이지 번호와 크기를 받아 전체 게시글을 조회합니다.")
@GetMapping
public List<Post> getAllPosts(...) { ... }
```

> 위 애노테이션은 선택 사항이며 없어도 Swagger UI에서 기본적으로 표시됩니다.

---

## ✅ 4단계: 실행 후 Swagger 확인

```bash
./mvnw spring-boot:run
```

브라우저 접속:

```
http://localhost:8080/swagger-ui/index.html
```

---

## ✅ 결과 화면

* 각 API가 메서드별로 자동 정리되어 나옵니다.
* “Try it out” 버튼으로 API 직접 테스트 가능
* JSON 요청/응답 형식 확인 가능

---

## ✅ 요약

| 항목            | 설명                                    |
| ------------- | ------------------------------------- |
| 라이브러리         | `springdoc-openapi-starter-webmvc-ui` |
| Swagger UI 주소 | `/swagger-ui/index.html`              |
| 설정            | OpenAPI 설정 클래스에서 문서화 제목/설명 설정 가능      |
| 장점            | API 자동 문서화, 팀 간 협업 및 테스트에 매우 유용       |

---

좋습니다. 이번에는 확장 기능 **4번: Validation(입력값 검증)** 적용을 완전 기초부터 설명드리겠습니다.

---

## ✅ 4. Validation 적용 (Spring Boot + MyBatis)

### 🎯 목표

* 사용자가 **잘못된 데이터를 보내면** → 400 Bad Request로 응답
* 예:

  * 제목이 비어 있으면 → `"제목을 입력해주세요"` 라는 메시지
  * 내용이 5자 미만이면 → `"내용은 최소 5자 이상 입력해야 합니다"`

---

## ✅ 1단계: 의존성 추가

Spring Boot에서는 기본적으로 `spring-boot-starter-validation`이 포함되어 있습니다.
혹시 누락됐다면 `pom.xml`에 추가:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

## ✅ 2단계: DTO 클래스에 유효성 검증 어노테이션 추가

### 📁 경로

`src/main/java/com/example/board/domain/Post.java`

```java
package com.example.board.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class Post {

    private Long id;

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    @Size(min = 5, message = "내용은 최소 5자 이상 입력해야 합니다")
    private String content;

    @NotBlank(message = "작성자를 입력해주세요")
    private String writer;

    private String createdAt;
}
```

---

## ✅ 3단계: Controller에서 `@Valid` 사용

### 📁 경로

`src/main/java/com/example/board/controller/PostController.java`

```java
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

// 등록
@PostMapping
public String createPost(@Valid @RequestBody Post post) {
    int result = postService.createPost(post);
    return result == 1 ? "등록 성공" : "등록 실패";
}

// 수정
@PutMapping("/{id}")
public String updatePost(@PathVariable Long id, @Valid @RequestBody Post post) {
    post.setId(id);
    int result = postService.updatePost(post);
    return result == 1 ? "수정 성공" : "수정 실패";
}
```

> `@Valid`는 요청 본문에 들어온 객체(Post)에 대해 유효성 검사를 수행합니다.

---

## ✅ 4단계: 전역 예외 처리 추가 (예쁘게 에러 응답)

### 📁 경로

`src/main/java/com/example/board/handler/ValidationExceptionHandler.java`

```java
package com.example.board.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
```

---

## ✅ 테스트 예시

### 요청

```http
POST /api/posts
Content-Type: application/json

{
  "title": "",
  "content": "짧",
  "writer": ""
}
```

### 응답 (400 Bad Request)

```json
{
  "title": "제목을 입력해주세요",
  "content": "내용은 최소 5자 이상 입력해야 합니다",
  "writer": "작성자를 입력해주세요"
}
```

---

## ✅ 요약

| 항목           | 설명                                       |
| ------------ | ---------------------------------------- |
| 유효성 검사 어노테이션 | `@NotBlank`, `@Size(min=)` 등             |
| 적용 위치        | DTO 클래스의 필드에 적용                          |
| 컨트롤러         | `@Valid`를 통해 검증 수행                       |
| 예외 처리        | `@RestControllerAdvice`를 통해 공통 에러 메시지 응답 |

---

좋습니다. 이번에는 확장 기능 **5번: 에러 핸들링 공통화**를 완전 기초부터 설명드리겠습니다.

---

## ✅ 5. 에러 핸들링 공통화 (Spring Boot + MyBatis)

### 🎯 목표

* 프로젝트 전체에서 발생하는 에러를 일관된 JSON 형태로 응답
* 상황별 HTTP 상태 코드 지정 (예: 400, 404, 500 등)
* 비즈니스 로직 예외를 명확하게 처리

---

## ✅ 1단계: 커스텀 예외 클래스 생성

### 📁 경로

`src/main/java/com/example/board/exception/PostNotFoundException.java`

### 📄 PostNotFoundException.java

```java
package com.example.board.exception;

/**
 * 게시글을 찾을 수 없을 때 발생하는 예외
 */
public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Long id) {
        super("ID가 " + id + "인 게시글을 찾을 수 없습니다.");
    }
}
```

---

## ✅ 2단계: Service 클래스에서 예외 발생

### 📁 경로

`src/main/java/com/example/board/service/PostService.java`

### 📄 수정 코드

```java
import com.example.board.exception.PostNotFoundException;

public Post getPostById(Long id) {
    Post post = postMapper.findById(id);
    if (post == null) {
        throw new PostNotFoundException(id);
    }
    return post;
}
```

---

## ✅ 3단계: 전역 예외 처리기 생성

### 📁 경로

`src/main/java/com/example/board/handler/GlobalExceptionHandler.java`

### 📄 GlobalExceptionHandler.java

```java
package com.example.board.handler;

import com.example.board.exception.PostNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 게시글을 찾을 수 없음
    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(PostNotFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "게시글 없음");
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    // 그 외 모든 예외
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "서버 오류");
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

## ✅ 4단계: 테스트

### 요청

```http
GET /api/posts/99999
```

→ 존재하지 않는 게시글 요청

### 응답

```json
{
  "timestamp": "2025-07-13T20:50:00.123",
  "status": 404,
  "error": "게시글 없음",
  "message": "ID가 99999인 게시글을 찾을 수 없습니다."
}
```

---

## ✅ 요약

| 항목     | 설명                                           |
| ------ | -------------------------------------------- |
| 예외 클래스 | `PostNotFoundException` 등 도메인 기반 정의          |
| 예외 핸들러 | `@RestControllerAdvice`에서 공통 처리              |
| 응답 형식  | `timestamp`, `status`, `error`, `message` 구조 |
| 이점     | API 사용자가 예외를 예측 가능하게 처리 가능                   |

---

좋습니다. 이번에는 확장 기능 **6번: JWT 로그인 및 권한 인증**을 완전 기초부터 설명드리겠습니다.

---

## ✅ 6. JWT 로그인 및 권한 인증 (Spring Boot)

### 🎯 목표

* 사용자가 로그인하면 JWT 토큰을 발급
* 이후 요청 시 `Authorization` 헤더에 토큰을 담아 인증
* 인증이 필요한 API는 토큰 없을 시 `401 Unauthorized` 응답

---

## ✅ 1단계: JWT 라이브러리 추가

### 📁 `pom.xml`

```xml
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>0.11.5</version>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-impl</artifactId>
  <version>0.11.5</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-jackson</artifactId>
  <version>0.11.5</version>
  <scope>runtime</scope>
</dependency>
```

> `jjwt-api`, `jjwt-impl`, `jjwt-jackson`을 모두 추가해야 합니다.

---

## ✅ 2단계: 사용자 엔티티(User) 및 로그인 요청 DTO 생성

### 📁 `domain/User.java`

```java
package com.example.board.domain;

import lombok.Data;

@Data
public class User {
    private String username;
    private String password;
}
```

### 📁 `dto/LoginRequest.java`

```java
package com.example.board.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
```

---

## ✅ 3단계: JWT 유틸 클래스 생성

### 📁 `util/JwtUtil.java`

```java
package com.example.board.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 자동 생성 키

    // 토큰 유효 시간: 1시간
    private final long expireTime = 1000 * 60 * 60;

    // 토큰 생성
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(key)
                .compact();
    }

    // 토큰 검증
    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            return null;
        }
    }
}
```

---

## ✅ 4단계: 로그인 API 생성

### 📁 `controller/AuthController.java`

```java
package com.example.board.controller;

import com.example.board.dto.LoginRequest;
import com.example.board.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 간단한 로그인 로직 (DB 없이)
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest loginRequest) {
        // 실제로는 DB에서 사용자 인증 필요
        if ("admin".equals(loginRequest.getUsername()) &&
            "1234".equals(loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            return Map.of("token", token);
        } else {
            throw new RuntimeException("사용자 인증 실패");
        }
    }
}
```

---

## ✅ 5단계: JWT 인증 필터 추가

### 📁 `filter/JwtAuthFilter.java`

```java
package com.example.board.filter;

import com.example.board.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthFilter implements Filter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        String auth = req.getHeader("Authorization");

        // 토큰이 필요한 경로만 인증 체크
        if (req.getRequestURI().startsWith("/api/posts")) {
            if (auth == null || !auth.startsWith("Bearer ")) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증 토큰 없음");
                return;
            }

            String token = auth.substring(7); // Bearer 제거
            String username = jwtUtil.validateToken(token);
            if (username == null) {
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 유효하지 않음");
                return;
            }

            // 통과
        }

        chain.doFilter(request, response);
    }
}
```

---

## ✅ 6단계: 필터 등록

### 📁 `config/FilterConfig.java`

```java
package com.example.board.config;

import com.example.board.filter.JwtAuthFilter;
import jakarta.servlet.Filter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter(JwtAuthFilter filter) {
        FilterRegistrationBean<Filter> bean = new FilterRegistrationBean<>();
        bean.setFilter(filter);
        bean.addUrlPatterns("/api/posts/*"); // 인증이 필요한 경로
        return bean;
    }
}
```

---

## ✅ 7단계: 테스트

1. 로그인 요청:

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "1234"
}
```

→ 응답:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

2. 게시글 등록 요청 시 `Authorization` 헤더 추가:

```http
POST /api/posts
Authorization: Bearer <발급받은 토큰>
Content-Type: application/json

{
  "title": "JWT 게시글",
  "content": "내용입니다",
  "writer": "admin"
}
```

---

## ✅ 요약

| 항목       | 설명                           |
| -------- | ---------------------------- |
| 로그인      | `POST /api/auth/login`       |
| 토큰 검증    | 커스텀 필터(`JwtAuthFilter`)에서 수행 |
| 인증 실패 응답 | `401 Unauthorized`           |
| 보안 확장    | 토큰 만료, 사용자 정보 저장 등 확장 가능     |

---

좋습니다. 이번에는 확장 기능 **7번: 댓글 기능 추가**를 완전 기초부터 설명드리겠습니다.

---

## ✅ 7. 댓글 기능 추가 (Spring Boot + MyBatis)

### 🎯 목표

* 각 게시글에 여러 개의 댓글을 달 수 있음
* 기능:

  * 특정 게시글의 댓글 목록 조회
  * 댓글 작성
  * 댓글 삭제

---

## ✅ 1단계: 댓글 테이블 생성 (MySQL 기준)

```sql
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    writer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
```

> `post_id`는 `posts` 테이블의 외래키로, 게시글 삭제 시 댓글도 함께 삭제됩니다.

---

## ✅ 2단계: 댓글 도메인 클래스 생성

### 📁 경로

`src/main/java/com/example/board/domain/Comment.java`

```java
package com.example.board.domain;

import lombok.Data;

@Data
public class Comment {
    private Long id;
    private Long postId;      // 게시글 ID
    private String content;   // 댓글 내용
    private String writer;    // 작성자
    private String createdAt; // 작성일시
}
```

---

## ✅ 3단계: Mapper 인터페이스 생성

### 📁 경로

`src/main/java/com/example/board/mapper/CommentMapper.java`

```java
package com.example.board.mapper;

import com.example.board.domain.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> findByPostId(Long postId);

    int insert(Comment comment);

    int delete(Long id);
}
```

---

## ✅ 4단계: XML 매퍼 생성

### 📁 경로

`src/main/resources/mapper/CommentMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.board.mapper.CommentMapper">

    <select id="findByPostId" parameterType="long" resultType="com.example.board.domain.Comment">
        SELECT id, post_id, content, writer, created_at
        FROM comments
        WHERE post_id = #{postId}
        ORDER BY id ASC
    </select>

    <insert id="insert" parameterType="com.example.board.domain.Comment">
        INSERT INTO comments (post_id, content, writer)
        VALUES (#{postId}, #{content}, #{writer})
    </insert>

    <delete id="delete" parameterType="long">
        DELETE FROM comments
        WHERE id = #{id}
    </delete>

</mapper>
```

---

## ✅ 5단계: Service 클래스 생성

### 📁 경로

`src/main/java/com/example/board/service/CommentService.java`

```java
package com.example.board.service;

import com.example.board.domain.Comment;
import com.example.board.mapper.CommentMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentMapper commentMapper;

    public CommentService(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentMapper.findByPostId(postId);
    }

    public int addComment(Comment comment) {
        return commentMapper.insert(comment);
    }

    public int deleteComment(Long id) {
        return commentMapper.delete(id);
    }
}
```

---

## ✅ 6단계: Controller 생성

### 📁 경로

`src/main/java/com/example/board/controller/CommentController.java`

```java
package com.example.board.controller;

import com.example.board.domain.Comment;
import com.example.board.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 특정 게시글의 댓글 목록 조회
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    // 댓글 등록
    @PostMapping
    public String addComment(@RequestBody Comment comment) {
        int result = commentService.addComment(comment);
        return result == 1 ? "댓글 등록 성공" : "댓글 등록 실패";
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    public String deleteComment(@PathVariable Long id) {
        int result = commentService.deleteComment(id);
        return result == 1 ? "댓글 삭제 성공" : "댓글 삭제 실패";
    }
}
```

---

## ✅ 7단계: API 테스트

### 댓글 등록

```http
POST /api/comments
Content-Type: application/json

{
  "postId": 1,
  "content": "첫 댓글입니다.",
  "writer": "사용자1"
}
```

### 댓글 목록 조회

```http
GET /api/comments/post/1
```

### 댓글 삭제

```http
DELETE /api/comments/5
```

---

## ✅ 요약

| 기능       | 경로                                | 설명           |
| -------- | --------------------------------- | ------------ |
| 댓글 목록 조회 | `GET /api/comments/post/{postId}` | 게시글별 댓글 리스트  |
| 댓글 작성    | `POST /api/comments`              | JSON 본문으로 등록 |
| 댓글 삭제    | `DELETE /api/comments/{id}`       | 댓글 ID로 삭제    |

---

좋습니다. 이번에는 확장 기능 **8번: 파일 업로드 기능**을 완전 기초부터 설명드리겠습니다.

---

## ✅ 8. 파일 업로드 기능 (Spring Boot)

### 🎯 목표

* 게시글에 **첨부파일을 업로드**
* 서버 디스크에 파일 저장
* 파일 다운로드 및 삭제 가능

---

## ✅ 1단계: 업로드 폴더 준비

### 📁 서버 저장 경로 예시

```
src/main/resources/static/uploads/
```

> 개발 환경에서는 `resources/static` 아래에 저장하면 정적 파일로 접근 가능 (`/uploads/파일명`으로 URL 접근 가능)

---

## ✅ 2단계: application.yml 설정

### 📁 `src/main/resources/application.yml`

```yaml
file:
  upload-dir: src/main/resources/static/uploads
```

> 추후 외부 디렉터리로 변경 가능 (`/home/user/uploads` 등)

---

## ✅ 3단계: 파일 업로드 서비스 클래스 생성

### 📁 `src/main/java/com/example/board/service/FileService.java`

```java
package com.example.board.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 파일 저장
    public String saveFile(MultipartFile file) throws IOException {
        // 고유한 파일 이름 생성
        String originalName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String savedName = uuid + "_" + originalName;

        Path savePath = Paths.get(uploadDir, savedName);
        Files.createDirectories(savePath.getParent()); // 폴더 없으면 생성

        file.transferTo(savePath.toFile());

        return savedName; // 저장된 파일명 반환
    }

    // 파일 삭제
    public boolean deleteFile(String filename) {
        Path path = Paths.get(uploadDir, filename);
        try {
            return Files.deleteIfExists(path);
        } catch (IOException e) {
            return false;
        }
    }
}
```

---

## ✅ 4단계: 컨트롤러에서 파일 업로드 처리

### 📁 `src/main/java/com/example/board/controller/FileController.java`

```java
package com.example.board.controller;

import com.example.board.service.FileService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // 파일 업로드
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String savedFilename = fileService.saveFile(file);
        return ResponseEntity.ok(Map.of(
            "filename", savedFilename,
            "url", "/uploads/" + savedFilename
        ));
    }

    // 파일 삭제
    @DeleteMapping("/{filename}")
    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
        boolean result = fileService.deleteFile(filename);
        return result ? ResponseEntity.ok("삭제 성공") : ResponseEntity.status(HttpStatus.NOT_FOUND).body("파일 없음");
    }
}
```

---

## ✅ 5단계: HTML/프론트 요청 예시 (Postman 기준)

### 파일 업로드 (form-data)

* URL: `POST /api/files/upload`
* body: `form-data` 형식

  * key: `file`
  * value: 실제 파일 선택

### 응답 예시

```json
{
  "filename": "c2541d2f-1d3f-4c89-a1cd-abc123_hello.jpg",
  "url": "/uploads/c2541d2f-1d3f-4c89-a1cd-abc123_hello.jpg"
}
```

### 다운로드 URL

```
http://localhost:8080/uploads/파일명
```

### 삭제 요청

```
DELETE /api/files/{filename}
```

---

## ✅ 6단계: 정적 리소스 접근 설정 (생략 가능)

Spring Boot는 기본적으로 `src/main/resources/static/` 하위 파일을 자동으로 서빙합니다.
만약 외부 경로를 사용할 경우 다음 설정이 필요합니다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/**")
            .addResourceLocations("file:/home/user/uploads/"); // 절대경로
    }
}
```

---

## ✅ 요약

| 기능      | 설명                                       |
| ------- | ---------------------------------------- |
| 업로드 API | `POST /api/files/upload` (form-data)     |
| 삭제 API  | `DELETE /api/files/{filename}`           |
| 다운로드 경로 | `/uploads/파일명`                           |
| 저장 경로   | `resources/static/uploads/` (또는 외부 디렉터리) |

---

좋습니다. 이번에는 확장 기능 **9번: 검색 기능 추가**를 완전 기초부터 설명드리겠습니다.

---

## ✅ 9. 검색 기능 추가 (Spring Boot + MyBatis)

### 🎯 목표

* 게시글 목록 조회 시 `검색 조건`을 추가
* 예:

  ```
  GET /api/posts?keyword=스프링&type=title
  ```

---

## ✅ 1단계: Controller 수정

### 📁 경로

`src/main/java/com/example/board/controller/PostController.java`

```java
// 게시글 목록 조회 - 검색 조건 포함
@GetMapping
public List<Post> searchPosts(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false, defaultValue = "title") String type
) {
    int offset = (page - 1) * size;
    return postService.searchPosts(keyword, type, offset, size);
}
```

* `keyword`: 검색어
* `type`: 검색 대상 필드 (`title`, `content`, `writer` 중 하나)

---

## ✅ 2단계: Service 수정

### 📁 경로

`src/main/java/com/example/board/service/PostService.java`

```java
public List<Post> searchPosts(String keyword, String type, int offset, int size) {
    return postMapper.search(keyword, type, offset, size);
}
```

---

## ✅ 3단계: Mapper 인터페이스 수정

### 📁 경로

`src/main/java/com/example/board/mapper/PostMapper.java`

```java
List<Post> search(@Param("keyword") String keyword,
                  @Param("type") String type,
                  @Param("offset") int offset,
                  @Param("size") int size);
```

---

## ✅ 4단계: XML 매퍼 수정

### 📁 경로

`src/main/resources/mapper/PostMapper.xml`

```xml
<!-- 검색 기능 -->
<select id="search" resultType="com.example.board.domain.Post">
    SELECT id, title, content, writer, created_at
    FROM posts
    <where>
        <if test="keyword != null and keyword != ''">
            <choose>
                <when test="type == 'title'">
                    title LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <when test="type == 'content'">
                    content LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <when test="type == 'writer'">
                    writer LIKE CONCAT('%', #{keyword}, '%')
                </when>
            </choose>
        </if>
    </where>
    ORDER BY id DESC
    LIMIT #{size} OFFSET #{offset}
</select>
```

> * `<where>`: 조건이 있으면 `WHERE` 붙이고, 없으면 생략
> * `<choose>/<when>`: `if-else` 구문처럼 동작
> * `LIKE '%keyword%'` 형식으로 부분 검색 처리

---

## ✅ 5단계: 테스트 예시

### 전체 조회 (기존과 동일)

```
GET /api/posts?page=1&size=5
```

### 제목 검색

```
GET /api/posts?keyword=Spring&type=title
```

### 작성자 검색

```
GET /api/posts?keyword=관리자&type=writer
```

---

## ✅ 선택: 검색 결과 총 개수 구하기 (페이지네이션에 활용)

### PostMapper.java

```java
int searchCount(@Param("keyword") String keyword, @Param("type") String type);
```

### PostMapper.xml

```xml
<select id="searchCount" resultType="int">
    SELECT COUNT(*) FROM posts
    <where>
        <if test="keyword != null and keyword != ''">
            <choose>
                <when test="type == 'title'">
                    title LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <when test="type == 'content'">
                    content LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <when test="type == 'writer'">
                    writer LIKE CONCAT('%', #{keyword}, '%')
                </when>
            </choose>
        </if>
    </where>
</select>
```

---

## ✅ 요약

| 기능     | 설명                                               |
| ------ | ------------------------------------------------ |
| 검색 조건  | `keyword`, `type` (`title`, `content`, `writer`) |
| 검색 방식  | LIKE `%keyword%`                                 |
| 페이징 포함 | `LIMIT`, `OFFSET` 사용                             |
| 추가 기능  | `COUNT(*)`로 전체 검색 결과 개수 계산 가능                    |

---


좋습니다. 이제 확장 기능 **10번: React 프론트엔드 연동 예시**를 완전 기초부터 설명드리겠습니다.
이번 단계에서는 **Spring Boot + MyBatis로 만든 API 서버**에 React에서 요청을 보내 **게시글 목록을 가져오는 화면**을 구현합니다.

---

## ✅ 10. React 프론트엔드 연동 (게시글 목록 조회)

---

## ✅ 1단계: React 프로젝트 준비

### 1. 프로젝트 생성

```bash
npx create-react-app board-frontend
cd board-frontend
npm install axios
```

---

### 2. 폴더 구조 추가

```
board-frontend/
├── src/
│   ├── components/
│   │   └── PostList.js      ← 게시글 목록 컴포넌트
│   ├── App.js
│   └── api.js               ← Axios 인스턴스 분리 (선택)
```

---

## ✅ 2단계: Axios 인스턴스 구성

### 📁 `src/api.js`

```js
import axios from 'axios';

// Spring Boot API 서버 주소 (포트 번호 반드시 확인)
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

---

## ✅ 3단계: 게시글 목록 컴포넌트 작성

### 📁 `src/components/PostList.js`

```jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

function PostList() {
  const [posts, setPosts] = useState([]);     // 게시글 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    api.get('/posts?page=1&size=10') // 게시글 목록 가져오기
      .then((res) => {
        setPosts(res.data);         // 성공 시 게시글 상태 저장
        setLoading(false);
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 목록</h2>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong> - {post.writer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
```

---

## ✅ 4단계: App.js에서 컴포넌트 연결

### 📁 `src/App.js`

```jsx
import React from 'react';
import PostList from './components/PostList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React 게시판</h1>
      <PostList />
    </div>
  );
}

export default App;
```

---

## ✅ 5단계: 실행 및 확인

```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속
→ Spring Boot API로부터 게시글 목록을 받아와서 출력되는지 확인

---

## ✅ 추가: CORS 설정 (Spring Boot)

프론트엔드에서 API 요청 시 CORS 에러가 나올 경우, 아래 설정을 추가합니다.

### 📁 `src/main/java/com/example/board/config/WebConfig.java`

```java
package com.example.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // React 개발 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

---

## ✅ 요약

| 항목      | 설명                        |
| ------- | ------------------------- |
| API 호출  | `axios.get('/api/posts')` |
| 화면 구성   | `PostList` 컴포넌트에서 목록 렌더링  |
| CORS 처리 | `addCorsMappings()` 설정 필요 |
| 다음 확장   | 게시글 작성, 삭제, 상세, 페이징 연결 가능 |

---

React로 **게시글 목록을 API로 받아오는 기본 화면**이 완성되었습니다.
다음으로 이어서 진행할 수 있는 항목은 다음과 같습니다:

1. 게시글 상세 페이지
2. 게시글 작성 폼
3. 게시글 삭제 기능
4. 페이지네이션 버튼
5. 검색 기능 연동
6. 댓글 연동
7. 파일 업로드 연동
8. 로그인 상태 기반 인증 처리 (JWT 토큰 저장)

좋습니다. React 연동의 **다음 단계는 게시글 작성 폼 구현**입니다.
Spring Boot API 서버의 `/api/posts` POST 엔드포인트와 연결해 **제목, 내용, 작성자**를 입력하고 게시글을 등록하는 기능을 React에서 구현해보겠습니다.

---

## ✅ React 게시글 작성 폼 구현

---

## ✅ 1단계: 컴포넌트 파일 생성

### 📁 경로

`src/components/PostForm.js`

---

## ✅ 2단계: 게시글 작성 컴포넌트 작성

### 📄 PostForm.js

```jsx
import React, { useState } from 'react';
import api from '../api';

function PostForm({ onPostCreated }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    writer: ''
  });

  const [message, setMessage] = useState('');

  // 입력값이 변경될 때 호출
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/posts', form);
      setMessage(res.data); // "등록 성공" 또는 "등록 실패"
      setForm({ title: '', content: '', writer: '' }); // 폼 초기화

      // 부모 컴포넌트에서 새로고침하도록 콜백 호출
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error('게시글 등록 실패', error);
      setMessage('등록 실패');
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>작성자:</label>
          <input
            type="text"
            name="writer"
            value={form.writer}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">등록</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostForm;
```

---

## ✅ 3단계: App.js에서 작성 폼과 목록 연결

### 📁 `src/App.js`

```jsx
import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  // 등록 완료 후 목록 새로고침을 위해 상태 변경
  const handlePostCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React 게시판</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <hr />
      <PostList key={refresh} />
    </div>
  );
}

export default App;
```

> `PostList`에 `key={refresh}`를 사용하면 상태가 바뀔 때 컴포넌트를 다시 마운트해서 최신 데이터를 가져옵니다.

---

## ✅ 4단계: 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. 제목, 내용, 작성자를 입력 후 “등록” 버튼 클릭
3. 성공 시 “등록 성공” 메시지 출력 및 아래 목록에 반영

---

## ✅ 요약

| 항목      | 설명                           |
| ------- | ---------------------------- |
| 폼 구성    | `useState`로 입력값 상태 관리        |
| API 연동  | `axios.post('/posts', form)` |
| 등록 성공 후 | 입력 초기화 + 목록 새로고침             |

---

다음으로 진행할 수 있는 항목은 다음과 같습니다:

* 게시글 삭제 버튼 추가
* 게시글 상세 페이지 보기
* 검색 입력창 연동
* 댓글 목록 / 작성 연동
* JWT 로그인 적용

좋습니다. 이번에는 **게시글 삭제 기능**을 React에 연동해보겠습니다.
게시글 목록 옆에 “삭제” 버튼을 추가하고, 클릭 시 Spring Boot API(`/api/posts/{id}`)에 `DELETE` 요청을 보내 해당 게시글을 삭제하는 기능을 구현합니다.

---

## ✅ React 게시글 삭제 기능 구현

---

## ✅ 1단계: PostList 컴포넌트 수정

### 📁 `src/components/PostList.js`

```jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 게시글 가져오기 함수
  const fetchPosts = () => {
    api.get('/posts?page=1&size=10')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
        setLoading(false);
      });
  };

  // 마운트 시 호출
  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 삭제 함수
  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    api.delete(`/posts/${id}`)
      .then((res) => {
        alert(res.data); // "삭제 성공" 또는 "삭제 실패"
        fetchPosts(); // 목록 다시 불러오기
      })
      .catch((err) => {
        console.error('삭제 실패', err);
        alert('삭제 중 오류가 발생했습니다.');
      });
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 목록</h2>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong> - {post.writer}
              <button
                onClick={() => handleDelete(post.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
```

---

## ✅ 2단계: 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. 게시글 목록 오른쪽에 “삭제” 버튼 표시
3. 클릭 시 확인창 → 확인하면 삭제 → 목록 자동 새로고침

---

## ✅ 요약

| 기능      | 설명                            |
| ------- | ----------------------------- |
| 삭제 요청   | `axios.delete('/posts/{id}')` |
| 삭제 후 목록 | `fetchPosts()`로 갱신            |
| 사용자 확인  | `window.confirm()` 사용         |

---

다음으로 이어서 진행 가능한 항목:

* 게시글 상세 보기 (클릭 시 상세 페이지로 이동)
* 검색창 추가 및 검색 기능 연동
* 댓글 목록 + 댓글 작성 기능 React 연동
* 파일 업로드 UI 및 처리
* JWT 로그인 UI + 토큰 저장

좋습니다. 이번에는 **게시글 상세 보기 기능**을 React에 추가해보겠습니다.
목록에서 게시글 제목을 클릭하면 상세 페이지로 이동하고, 해당 게시글의 내용을 보여주는 구조를 만들겠습니다.

---

## ✅ React 게시글 상세 페이지 구현

---

## ✅ 1단계: React Router 설치

```bash
npm install react-router-dom
```

---

## ✅ 2단계: React Router 설정

### 📁 `src/App.js`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>React 게시판</h1>
        <Routes>
          <Route path="/" element={
            <>
              <PostForm />
              <hr />
              <PostList />
            </>
          } />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

---

## ✅ 3단계: 게시글 상세 컴포넌트 생성

### 📁 `src/components/PostDetail.js`

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function PostDetail() {
  const { id } = useParams();         // URL 파라미터에서 ID 추출
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error('게시글 로딩 실패', err);
        alert('게시글을 찾을 수 없습니다.');
        navigate('/');
      });
  }, [id, navigate]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      <p><strong>제목:</strong> {post.title}</p>
      <p><strong>내용:</strong> {post.content}</p>
      <p><strong>작성자:</strong> {post.writer}</p>
      <p><strong>작성일:</strong> {post.createdAt}</p>
      <button onClick={() => navigate('/')}>목록으로</button>
    </div>
  );
}

export default PostDetail;
```

---

## ✅ 4단계: 목록에서 제목을 클릭하면 상세로 이동

### 📁 `src/components/PostList.js` 수정 (일부)

```jsx
import { Link } from 'react-router-dom';

...

{posts.map((post) => (
  <li key={post.id}>
    <Link to={`/posts/${post.id}`}>
      <strong>{post.title}</strong>
    </Link> - {post.writer}
    <button onClick={() => handleDelete(post.id)} style={{ marginLeft: '10px', color: 'red' }}>
      삭제
    </button>
  </li>
))}
```

---

## ✅ 테스트

1. 게시글 목록에서 제목을 클릭
2. `http://localhost:3000/posts/1` 같은 상세 페이지로 이동
3. 게시글 제목, 내용, 작성자, 날짜가 표시됨
4. "목록으로" 클릭 시 다시 메인 화면으로 이동

---

## ✅ 요약

| 항목     | 설명                                               |
| ------ | ------------------------------------------------ |
| 라우팅    | `react-router-dom`의 `Route`, `Link`, `useParams` |
| 상세 API | `/api/posts/{id}`                                |
| 연결 방식  | 제목 클릭 → 상세 컴포넌트로 이동                              |

---

좋습니다. 이번에는 **검색창 UI + 검색 기능 연동**을 React에서 구현하겠습니다.
Spring Boot API에 `keyword`, `type` 파라미터를 전달해서, 제목/내용/작성자 중 하나를 기준으로 검색하는 기능을 추가합니다.

---

## ✅ React 게시판 - 검색 기능 연동

---

## ✅ 1단계: PostList에 검색 UI 추가

### 📁 `src/components/PostList.js`

```jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 검색 상태
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('title');

  // 게시글 목록 불러오기 함수
  const fetchPosts = () => {
    setLoading(true);

    // 검색 조건을 쿼리 파라미터로 추가
    api.get('/posts', {
      params: {
        keyword,
        type,
        page: 1,
        size: 10,
      },
    })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 삭제 기능
  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    api.delete(`/posts/${id}`)
      .then((res) => {
        alert(res.data);
        fetchPosts(); // 삭제 후 새로 불러오기
      })
      .catch((err) => {
        console.error('삭제 실패', err);
        alert('삭제 중 오류 발생');
      });
  };

  // 검색 폼 제출
  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(); // 검색 시 목록 다시 불러오기
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 목록</h2>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <strong>{post.title}</strong>
              </Link>{' '}
              - {post.writer}
              <button
                onClick={() => handleDelete(post.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
```

---

## ✅ 2단계: 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. 검색어 입력 + 드롭다운에서 `제목/내용/작성자` 선택 후 검색
3. 필터링된 게시글 목록이 출력됨

> 검색 조건 없이 검색 버튼만 눌러도 전체 목록이 다시 조회됩니다.

---

## ✅ 요약

| 항목      | 설명                                               |
| ------- | ------------------------------------------------ |
| 검색 파라미터 | `keyword`, `type` (`title`, `content`, `writer`) |
| API 연동  | `/api/posts?keyword=OO&type=OO`                  |
| UI 요소   | `select`, `input`, `button` 조합으로 구성              |

---

좋습니다. 이번에는 **댓글 목록 조회 + 댓글 작성 기능**을 React에 연동해보겠습니다.
Spring Boot API 서버의 `/api/comments/post/{postId}` 및 `/api/comments` 엔드포인트를 React에서 호출하여 게시글 상세 페이지에 댓글을 표시하고, 새 댓글을 작성할 수 있도록 구성하겠습니다.

---

## ✅ React 댓글 목록 및 작성 연동

---

## ✅ 1단계: 댓글 컴포넌트 생성

### 📁 경로

`src/components/CommentSection.js`

---

## ✅ 2단계: 댓글 컴포넌트 코드 작성

### 📄 CommentSection.js

```jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]); // 댓글 목록
  const [form, setForm] = useState({
    content: '',
    writer: '',
  });

  // 댓글 목록 조회
  const fetchComments = () => {
    api.get(`/comments/post/${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error('댓글 조회 실패', err));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 댓글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/comments', {
        ...form,
        postId: postId,
      });
      setForm({ content: '', writer: '' }); // 폼 초기화
      fetchComments(); // 댓글 새로고침
    } catch (error) {
      console.error('댓글 등록 실패', error);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>댓글</h3>
      <ul>
        {comments.length === 0 ? (
          <li>댓글이 없습니다.</li>
        ) : (
          comments.map((c) => (
            <li key={c.id}>
              <strong>{c.writer}</strong>: {c.content}
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          name="writer"
          placeholder="작성자"
          value={form.writer}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="댓글 내용"
          value={form.content}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">댓글 등록</button>
      </form>
    </div>
  );
}

export default CommentSection;
```

---

## ✅ 3단계: 게시글 상세 페이지에 댓글 추가

### 📁 `src/components/PostDetail.js`

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import CommentSection from './CommentSection';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error('게시글 불러오기 실패', err);
        alert('게시글을 찾을 수 없습니다.');
        navigate('/');
      });
  }, [id, navigate]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      <p><strong>제목:</strong> {post.title}</p>
      <p><strong>내용:</strong> {post.content}</p>
      <p><strong>작성자:</strong> {post.writer}</p>
      <p><strong>작성일:</strong> {post.createdAt}</p>

      <button onClick={() => navigate('/')}>목록으로</button>

      {/* 댓글 컴포넌트 추가 */}
      <CommentSection postId={post.id} />
    </div>
  );
}

export default PostDetail;
```

---

## ✅ 테스트

1. 게시글 목록에서 제목 클릭 → 상세 페이지 이동
2. 하단에 댓글 목록이 표시되고, 입력 후 등록 가능
3. 등록 후 댓글 목록 자동 갱신

---

## ✅ 요약

| 기능    | 설명                                                |
| ----- | ------------------------------------------------- |
| 목록 조회 | `GET /api/comments/post/{postId}`                 |
| 등록    | `POST /api/comments` (postId, content, writer 포함) |
| 상태 관리 | `useState`, `useEffect`, `axios` 활용               |

---

좋습니다. 이번에는 **게시글 수정 기능**을 React에서 구현하겠습니다.
목표는 게시글 상세 페이지에서 “수정” 버튼을 클릭하면 편집 화면으로 이동하고, 수정 완료 시 API를 통해 게시글 내용을 변경하는 것입니다.

---

## ✅ React 게시글 수정 기능

---

## ✅ 1단계: 수정 페이지 라우트 등록

### 📁 `src/App.js` 수정

```jsx
import PostEdit from './components/PostEdit';

<Routes>
  ...
  <Route path="/posts/edit/:id" element={<PostEdit />} />
</Routes>
```

---

## ✅ 2단계: 수정 페이지 컴포넌트 생성

### 📁 `src/components/PostEdit.js`

```jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    writer: ''
  });

  // 게시글 정보 불러오기
  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error('불러오기 실패', err);
        alert('게시글을 찾을 수 없습니다.');
        navigate('/');
      });
  }, [id, navigate]);

  // 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 수정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, form);
      alert('수정 완료');
      navigate(`/posts/${id}`); // 수정 후 상세로 이동
    } catch (err) {
      console.error('수정 실패', err);
      alert('수정 중 오류');
    }
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>작성자:</label>
          <input
            type="text"
            name="writer"
            value={form.writer}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default PostEdit;
```

---

## ✅ 3단계: 상세 페이지에서 “수정” 버튼 추가

### 📁 `src/components/PostDetail.js` 하단 수정

```jsx
<button onClick={() => navigate('/')}>목록으로</button>
<button onClick={() => navigate(`/posts/edit/${post.id}`)}>수정</button>
```

---

## ✅ 테스트 흐름

1. `/posts/1` 상세 페이지 접속
2. “수정” 클릭 → `/posts/edit/1` 이동
3. 제목, 내용, 작성자 수정 후 “수정 완료” 클릭
4. 수정 후 상세 페이지로 이동

---

## ✅ 요약

| 항목       | 설명                                    |
| -------- | ------------------------------------- |
| 수정 화면    | `GET /posts/{id}` → `PUT /posts/{id}` |
| React 처리 | `useEffect`, `useParams`, `navigate`  |
| URL 경로   | `/posts/edit/:id`                     |

---

좋습니다. 이번에는 **파일 업로드 UI + API 연동**을 React에서 구현하겠습니다.
목표는 게시글 작성 시 첨부파일을 업로드하고, 업로드된 파일 URL을 함께 저장하거나 미리보기로 표시하는 기능입니다.

---

## ✅ React 파일 업로드 UI + Spring Boot API 연동

---

## ✅ 1단계: Spring Boot 업로드 API 복습

(이미 구현된 경우 생략 가능)

* `POST /api/files/upload`
* form-data로 `file` 전송 → 저장된 파일명과 URL 반환

```json
{
  "filename": "uuid_hello.jpg",
  "url": "/uploads/uuid_hello.jpg"
}
```

---

## ✅ 2단계: React 게시글 작성폼에 파일 업로드 필드 추가

### 📁 `src/components/PostForm.js` 수정

```jsx
import React, { useState } from 'react';
import api from '../api';

function PostForm({ onPostCreated }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    writer: '',
    fileUrl: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 파일 업로드 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, fileUrl: res.data.url }));
    } catch (err) {
      alert('파일 업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', form); // fileUrl 포함 전송
      alert('등록 완료');
      setForm({ title: '', content: '', writer: '', fileUrl: '' });
      if (onPostCreated) onPostCreated();
    } catch (err) {
      alert('등록 실패');
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="제목" required />
        <br />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용" required />
        <br />
        <input type="text" name="writer" value={form.writer} onChange={handleChange} placeholder="작성자" required />
        <br />
        <input type="file" onChange={handleFileChange} />
        {uploading && <p>업로드 중...</p>}
        {form.fileUrl && (
          <div>
            <p>첨부파일:</p>
            <a href={form.fileUrl} target="_blank" rel="noreferrer">파일 열기</a>
          </div>
        )}
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default PostForm;
```

---

## ✅ 3단계: Post 클래스에 fileUrl 필드 추가 (Spring Boot)

### 📁 `Post.java` 엔티티

```java
private String fileUrl; // 첨부파일 경로
```

* XML 매퍼의 insert, select, update 구문에도 `file_url` 컬럼 포함 필요
* DB 테이블에도 `file_url` VARCHAR 컬럼 추가 필요

---

## ✅ 테스트

1. 게시글 작성 시 파일 선택
2. 자동 업로드 → 업로드된 파일 URL 표시
3. “등록” 클릭 시 파일 URL 포함해서 게시글 등록
4. 목록/상세 페이지에서 파일 확인 가능 (연결 추가하면 됨)

---

## ✅ 요약

| 항목       | 설명                                             |
| -------- | ---------------------------------------------- |
| 업로드 API  | `POST /api/files/upload` (form-data)           |
| 저장 경로    | `resources/static/uploads` 또는 외부 디렉터리          |
| React 처리 | `FormData`, `multipart/form-data`, 미리보기 URL 표시 |
| 확장 가능    | 여러 파일 업로드, 이미지 미리보기 등 가능                       |

---

좋습니다. 이번에는 **JWT 로그인 기능을 React에서 연동**하겠습니다.
목표는 로그인 화면을 만들고, 성공 시 JWT 토큰을 로컬 스토리지에 저장하여 인증이 필요한 API 요청 시 자동으로 토큰을 첨부하는 방식입니다.

---

## ✅ React + JWT 로그인 연동 (Spring Boot 백엔드와 연동)

---

## ✅ 1단계: 로그인 컴포넌트 생성

### 📁 `src/components/Login.js`

```jsx
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form); // 로그인 요청
      const token = res.data.token;

      localStorage.setItem('jwtToken', token); // 토큰 저장
      if (onLogin) onLogin(token);             // 상태 업데이트 콜백
      navigate('/');                           // 홈으로 이동
    } catch (err) {
      setError('로그인 실패: 아이디 또는 비밀번호가 틀립니다.');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="아이디"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        <br />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
```

---

## ✅ 2단계: App.js에 라우팅 추가 + 로그인 상태 관리

### 📁 `src/App.js`

```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('jwtToken');
    if (saved) setToken(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setToken('');
  };

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>React 게시판</h1>

        <nav>
          <Link to="/">홈</Link> |{' '}
          {token ? (
            <span>
              <button onClick={handleLogout}>로그아웃</button>
            </span>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <PostForm />
              <hr />
              <PostList />
            </>
          } />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />
          <Route path="/login" element={<Login onLogin={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

---

## ✅ 3단계: Axios 요청 시 자동으로 토큰 추가

### 📁 `src/api.js` 수정

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰이 있으면 Authorization 헤더에 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## ✅ 테스트

1. 브라우저에서 `/login` 경로로 이동
2. `admin / 1234` 입력 (Spring Boot AuthController 기준)
3. 로그인 성공 시 `/`로 이동 + 토큰 저장됨
4. 글쓰기 요청 시 토큰 자동 포함됨

   * 백엔드에서 JWT 인증 필터로 검증 가능

---

## ✅ 요약

| 항목     | 설명                                    |
| ------ | ------------------------------------- |
| 로그인 요청 | `POST /api/auth/login`                |
| 토큰 저장  | `localStorage`에 저장                    |
| 인증 처리  | Axios 인터셉터에서 `Authorization` 헤더 자동 설정 |
| 상태 유지  | 새로고침 시에도 `localStorage`에서 복원 가능       |

---

좋습니다. 이번에는 **댓글 삭제 기능**을 React에 추가하겠습니다.
목표는 각 댓글 옆에 “삭제” 버튼을 추가하고, 클릭 시 해당 댓글을 삭제하는 API(`/api/comments/{id}`)를 호출하는 방식입니다.

---

## ✅ React 댓글 삭제 기능 구현

---

## ✅ 1단계: 댓글 삭제 API 복습

* **Spring Boot API**

  ```
  DELETE /api/comments/{id}
  ```

  응답: `"댓글 삭제 성공"` 또는 `"댓글 삭제 실패"`

---

## ✅ 2단계: `CommentSection.js` 수정

### 📁 `src/components/CommentSection.js`

```jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    content: '',
    writer: '',
  });

  // 댓글 목록 불러오기
  const fetchComments = () => {
    api.get(`/comments/post/${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error('댓글 조회 실패', err));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 댓글 삭제
  const handleDelete = (id) => {
    if (!window.confirm('이 댓글을 삭제하시겠습니까?')) return;

    api.delete(`/comments/${id}`)
      .then(res => {
        alert(res.data); // 삭제 성공 메시지
        fetchComments(); // 삭제 후 목록 다시 불러오기
      })
      .catch(err => {
        console.error('댓글 삭제 실패', err);
        alert('삭제 실패');
      });
  };

  // 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 댓글 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/comments', {
        ...form,
        postId: postId,
      });
      setForm({ content: '', writer: '' });
      fetchComments();
    } catch (error) {
      console.error('댓글 등록 실패', error);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>댓글</h3>
      <ul>
        {comments.length === 0 ? (
          <li>댓글이 없습니다.</li>
        ) : (
          comments.map((c) => (
            <li key={c.id}>
              <strong>{c.writer}</strong>: {c.content}
              <button
                onClick={() => handleDelete(c.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                삭제
              </button>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          name="writer"
          placeholder="작성자"
          value={form.writer}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="댓글 내용"
          value={form.content}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">댓글 등록</button>
      </form>
    </div>
  );
}

export default CommentSection;
```

---

## ✅ 테스트

1. 게시글 상세 페이지(`/posts/:id`) 접속
2. 댓글 오른쪽에 “삭제” 버튼 확인
3. 클릭 후 확인 창 → 삭제 성공 → 목록 자동 갱신

---

## ✅ 요약

| 기능       | 설명                          |
| -------- | --------------------------- |
| API 호출   | `DELETE /api/comments/{id}` |
| React 처리 | `axios.delete()` + 상태 재조회   |
| UI 구성    | 댓글 옆에 삭제 버튼 + 확인창 표시        |

---

좋습니다. 지금까지 구현해 온 **Spring Boot + MyBatis + React 게시판 프로젝트**를 기능 중심으로 전체 요약 정리해드리겠습니다.

---

## ✅ 전체 기능 요약 정리

---

### 📌 1. 백엔드 (Spring Boot + MyBatis + Maven)

#### ✅ 기본 구조

* API 서버: `http://localhost:8080/api`
* DB: MySQL (또는 H2)
* MyBatis로 SQL 매핑
* RESTful API 구성

#### ✅ 게시판 기능

* `GET /posts`: 게시글 목록 (페이지네이션 + 검색)
* `GET /posts/{id}`: 게시글 상세 조회
* `POST /posts`: 게시글 등록
* `PUT /posts/{id}`: 게시글 수정
* `DELETE /posts/{id}`: 게시글 삭제

#### ✅ 댓글 기능

* `GET /comments/post/{postId}`: 댓글 목록
* `POST /comments`: 댓글 등록
* `DELETE /comments/{id}`: 댓글 삭제

#### ✅ 파일 업로드

* `POST /files/upload`: 첨부파일 업로드 (단일 파일)
* 파일은 서버 디렉터리에 저장되고 `/uploads/{파일명}` URL로 접근 가능

#### ✅ 인증

* `POST /auth/login`: JWT 토큰 발급
* 로그인 성공 시 Bearer 토큰 응답
* 게시글 등록/수정/삭제 시 토큰 필요
* 인증 실패 시 401 Unauthorized 응답

#### ✅ 예외처리

* Validation: `@Valid` + `@ControllerAdvice`
* Not Found: 사용자 정의 예외 (`PostNotFoundException`)
* 통합된 에러 응답 구조

---

### 📌 2. 프론트엔드 (React + Axios + React Router)

#### ✅ 구조

* `create-react-app` 기반 프로젝트
* `axios`로 백엔드 API 호출
* `react-router-dom`으로 페이지 구성

#### ✅ 페이지 구성

* `/`: 게시글 목록 + 작성 폼
* `/posts/:id`: 게시글 상세 + 댓글 목록/작성/삭제
* `/posts/edit/:id`: 게시글 수정
* `/login`: JWT 로그인

#### ✅ 주요 컴포넌트

* `PostList`: 게시글 목록 + 삭제 + 검색
* `PostForm`: 게시글 작성 + 첨부파일
* `PostDetail`: 상세 보기 + 댓글
* `PostEdit`: 게시글 수정
* `CommentSection`: 댓글 목록 + 등록 + 삭제
* `Login`: 로그인 폼

#### ✅ 인증 처리

* 로그인 성공 시 토큰을 `localStorage`에 저장
* `axios` 요청 시 자동으로 `Authorization: Bearer` 헤더 설정
* 로그아웃 시 토큰 삭제

#### ✅ 기타 기능

* 파일 업로드 UI
* 검색창 (제목/내용/작성자 기준)
* 입력폼 검증 (`required`)
* 로딩 상태 표시
* 목록 자동 새로고침

---

## ✅ 확장 가능한 기능 (추천)

| 기능             | 설명                            |
| -------------- | ----------------------------- |
| 마이페이지          | 내가 쓴 글/댓글 확인                  |
| 작성자 권한 확인      | 로그인한 사용자만 수정/삭제 가능            |
| 좋아요 기능         | 게시글에 좋아요 수 추가                 |
| 조회수            | 게시글 읽을 때마다 count 증가           |
| 다중 파일 업로드      | 이미지/파일 여러 개 첨부                |
| 관리자 페이지        | 전체 게시글/댓글 관리 기능               |
| CSS 프레임워크      | Tailwind, Bootstrap 등으로 UI 개선 |
| SSR/Next.js 연동 | SEO 고려 시 React 확장 가능          |

---

필요하신 부분을 언제든지 더 구체적으로 설명해드릴 수 있습니다.
예: "`마이페이지 기능 추가하고 싶어`", "`좋아요 기능 만들자`" 등
또는 프로젝트를 압축/정리한 `.md` 파일로 제공받고 싶으시면 말씀해주세요.




