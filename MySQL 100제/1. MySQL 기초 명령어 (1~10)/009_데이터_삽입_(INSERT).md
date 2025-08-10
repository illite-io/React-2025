좋습니다.
**9번 – 데이터 삽입 (INSERT)** 예제를 설명드리겠습니다.

---

## ✅ 9. 데이터 삽입 (INSERT)

### 📌 개념

MySQL에서 테이블에 새로운 행(row)을 추가하려면 `INSERT INTO` 문을 사용합니다.
가장 기본적이고 자주 사용하는 명령 중 하나입니다.

---

### 📄 예제

```sql
INSERT INTO customers (name, email)
VALUES ('홍길동', 'hong@example.com');
```

---

### 📘 설명

* `INSERT INTO customers (...)` : `customers` 테이블의 특정 컬럼에 데이터를 삽입합니다.
* `VALUES (...)` : 각 컬럼에 대응하는 실제 값을 지정합니다.
* `id`는 `AUTO_INCREMENT` 이므로 생략해도 자동으로 값이 들어갑니다.
* `created_at` 컬럼은 `DEFAULT CURRENT_TIMESTAMP` 이므로 자동 채워집니다.

---

### ✅ 삽입된 결과 확인

```sql
SELECT * FROM customers;
```

**결과 예시:**

```
+----+--------+---------------------+---------------------+
| id | name   | email               | created_at          |
+----+--------+---------------------+---------------------+
| 1  | 홍길동 | hong@example.com    | 2025-07-11 13:30:00 |
+----+--------+---------------------+---------------------+
```

---

### 🧠 실무 팁

* 컬럼명을 생략하지 말고 **명시적으로 적는 습관**을 들이세요.
  → 테이블 구조가 바뀌어도 오류를 피할 수 있습니다.

```sql
-- 권장 ❌ (구조 바뀌면 위험)
INSERT INTO customers VALUES ('홍길동', 'hong@example.com');

-- 권장 ✅
INSERT INTO customers (name, email) VALUES ('홍길동', 'hong@example.com');
```

* 다중 INSERT 시는 다음과 같이 작성합니다:

```sql
INSERT INTO customers (name, email)
VALUES 
  ('김철수', 'kim@example.com'),
  ('이영희', 'lee@example.com');
```

---

다음은 **10번 – 데이터 조회 (SELECT)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
