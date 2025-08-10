좋습니다.
**29번 – IGNORE 키워드** 예제를 설명드리겠습니다.

---

## ✅ 29. IGNORE 키워드

### 📌 개념

`IGNORE` 키워드는 **데이터 조작(INSERT, UPDATE, DELETE) 시 오류가 발생해도 작업을 중단하지 않고 무시**하도록 합니다.
주로 **UNIQUE 제약 조건, 데이터 타입 불일치, 외래 키 제약 조건** 위반 시 유용하게 쓰입니다.

---

### 📄 예제 1: INSERT IGNORE – 중복 데이터 무시

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE
);

INSERT IGNORE INTO customers (email)
VALUES 
  ('hong@example.com'),
  ('hong@example.com'); -- 중복 발생
```

* 중복된 행은 무시되고 나머지만 삽입됨
* 오류 없이 실행되며 경고(warning)만 발생

---

### 📄 예제 2: UPDATE IGNORE – 오류 무시하고 업데이트

```sql
UPDATE IGNORE customers
SET email = 'hong@example.com'
WHERE id = 2;
```

* 만약 `hong@example.com`이 이미 존재해도 중단되지 않고 해당 행만 무시됨

---

### 📄 예제 3: DELETE IGNORE – 외래키 제약 무시

```sql
DELETE IGNORE FROM customers
WHERE id = 5;
```

* 외래키 제약 조건 오류가 발생해도 해당 행 삭제를 무시하고 나머지 행 삭제 계속 진행

---

### 🧠 실무 팁

* `IGNORE`는 유용하지만, 무시된 오류가 데이터 무결성을 해칠 수 있으므로 **로그와 경고 확인이 필수**입니다.
* `INSERT IGNORE` 대신 `INSERT ... ON DUPLICATE KEY UPDATE`가 더 명확한 경우도 많습니다.
* `IGNORE`는 MySQL에서만 지원하며 다른 DBMS에서는 동작하지 않을 수 있습니다.

---

다음은 **30번 – REPLACE INTO** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
