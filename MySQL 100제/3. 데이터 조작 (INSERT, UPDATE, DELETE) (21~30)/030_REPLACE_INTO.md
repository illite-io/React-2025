좋습니다.
**30번 – REPLACE INTO** 예제를 설명드리겠습니다.

---

## ✅ 30. REPLACE INTO

### 📌 개념

`REPLACE INTO`는 **데이터를 삽입하되, 기본 키(PK)나 UNIQUE 키가 중복되면 기존 행을 삭제한 후 새 데이터로 교체**하는 명령입니다.
즉, **중복 시 UPDATE가 아니라 DELETE 후 INSERT**가 일어납니다.

---

### 📄 예제 1: PRIMARY KEY 기반

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE,
  name VARCHAR(50)
);

-- id가 1인 데이터가 없으면 삽입
-- id가 1인 데이터가 있으면 기존 행을 삭제하고 새 행 삽입
REPLACE INTO customers (id, email, name)
VALUES (1, 'hong@example.com', '홍길동');
```

---

### 📄 예제 2: UNIQUE 키 기반

```sql
REPLACE INTO customers (email, name)
VALUES ('kim@example.com', '김철수');
```

* `email`이 UNIQUE 키라면 해당 값이 이미 있으면 해당 행 삭제 후 새로운 값 삽입

---

### 📄 예제 3: INSERT와의 차이점

```sql
INSERT INTO customers (id, email, name)
VALUES (1, 'hong@example.com', '홍길동');
```

* PK 중복 시 **에러 발생**
* REPLACE는 중복 시 **기존 행 삭제 후 새로 삽입**

---

### 🧠 실무 팁

* `REPLACE`는 사실상 **DELETE + INSERT**이므로, **외래 키 제약**이나 **AUTO\_INCREMENT 값 증가** 문제가 발생할 수 있음.
* 수정 목적이면 `ON DUPLICATE KEY UPDATE`가 더 효율적이고 안전합니다.
* 삭제 후 삽입 방식이므로 **트리거**(ON DELETE, ON INSERT)가 모두 실행됩니다.

---

다음은 **31번 – CONCAT, LENGTH (문자열 함수)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
