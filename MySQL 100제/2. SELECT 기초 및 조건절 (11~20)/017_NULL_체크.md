좋습니다.
**17번 – NULL 값 조회 (`IS NULL`, `IS NOT NULL`)** 예제를 자세히 설명드리겠습니다.

---

## ✅ 17. NULL 값 조회 (`IS NULL`, `IS NOT NULL`)

### 📌 개념

`NULL`은 **값이 없음을 의미하는 특수한 상태**로,
`= NULL` 같은 일반적인 비교 연산자로는 판별되지 않습니다.
→ 반드시 `IS NULL`, `IS NOT NULL` 을 사용해야 합니다.

---

### 📄 예제 1: 이메일이 없는 고객 조회

```sql
SELECT * FROM customers
WHERE email IS NULL;
```

→ `email` 컬럼이 **NULL(비어있음)** 인 고객만 조회됨

---

### 📄 예제 2: 이메일이 있는 고객 조회

```sql
SELECT * FROM customers
WHERE email IS NOT NULL;
```

→ `email`에 실제 값이 있는 고객만 조회됨

---

### 📄 잘못된 예 (주의)

```sql
-- ❌ 작동하지 않음
SELECT * FROM customers
WHERE email = NULL;
```

→ 항상 결과가 **0행** 반환됨. `NULL`은 비교가 아닌 **존재 여부 판단**으로 접근해야 함

---

### 📘 WHERE + 정렬과 함께 사용

```sql
SELECT * FROM customers
WHERE email IS NOT NULL
ORDER BY created_at DESC;
```

---

### 🧠 실무 팁

* `NULL`은 **빈 문자열('')과 다릅니다**:

```sql
SELECT * FROM users
WHERE nickname IS NULL;     -- 값이 아예 없음
SELECT * FROM users
WHERE nickname = '';        -- 빈 값은 있으나 내용 없음
```

* UPDATE 할 때도 `NULL` 대입 가능:

```sql
UPDATE customers
SET email = NULL
WHERE id = 5;
```

* `IFNULL()` 또는 `COALESCE()` 를 써서 NULL을 다른 값으로 바꿔 표시할 수 있습니다:

```sql
SELECT name, IFNULL(email, '이메일 없음') AS 이메일
FROM customers;
```

---

다음은 **18번 – 정렬 (`ORDER BY`)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
