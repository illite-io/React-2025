좋습니다.
**28번 – ON DUPLICATE KEY UPDATE** 예제를 설명드리겠습니다.

---

## ✅ 28. ON DUPLICATE KEY UPDATE

### 📌 개념

`ON DUPLICATE KEY UPDATE`는 **INSERT 시 기본 키(PK)나 UNIQUE 키가 중복될 경우, 새로운 데이터를 삽입하지 않고 기존 행을 업데이트**하는 문법입니다.
즉, **있으면 수정하고, 없으면 삽입**하는 기능입니다.

---

### 📄 예제 1: 이메일이 UNIQUE 키일 때

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  visit_count INT DEFAULT 0
);
```

```sql
INSERT INTO customers (name, email, visit_count)
VALUES ('홍길동', 'hong@example.com', 1)
ON DUPLICATE KEY UPDATE
visit_count = visit_count + 1;
```

* `hong@example.com`이 이미 있으면 `visit_count`가 +1 증가
* 없으면 새로운 행을 삽입

---

### 📄 예제 2: 다중 컬럼 업데이트

```sql
INSERT INTO customers (name, email, visit_count)
VALUES ('김철수', 'kim@example.com', 5)
ON DUPLICATE KEY UPDATE
name = VALUES(name),
visit_count = VALUES(visit_count);
```

* 기존 데이터가 있으면 `name`과 `visit_count` 모두 새 값으로 갱신

---

### 📄 예제 3: PRIMARY KEY 기반 업데이트

```sql
INSERT INTO customers (id, name, email)
VALUES (1, '이영희', 'lee@example.com')
ON DUPLICATE KEY UPDATE
email = VALUES(email);
```

* `id = 1`이 이미 있으면 이메일만 수정

---

### 🧠 실무 팁

* UPSERT(Insert + Update) 패턴 구현 시 유용
* PostgreSQL에서는 `ON CONFLICT (...) DO UPDATE` 구문이 비슷한 역할을 함
* 성능을 위해 **중복 체크용 인덱스**가 반드시 필요
* 복잡한 갱신 로직이 필요하면 애플리케이션 로직에서 분기하는 것이 안전

---

다음은 **29번 – IGNORE 키워드** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
