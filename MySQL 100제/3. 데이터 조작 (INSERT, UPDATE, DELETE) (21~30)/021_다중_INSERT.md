좋습니다.
다음은 **21번 – 다중 INSERT** 예제를 설명드리겠습니다.

---

## ✅ 21. 다중 INSERT

### 📌 개념

`INSERT INTO` 문을 사용하면 한 번에 **여러 행(row)** 을 추가할 수 있습니다.
이 방식은 여러 번의 단일 INSERT보다 훨씬 빠르고 효율적입니다.

---

### 📄 예제 1: 고객 여러 명 추가

```sql
INSERT INTO customers (name, email)
VALUES
  ('김철수', 'kim@example.com'),
  ('이영희', 'lee@example.com'),
  ('박민수', 'park@example.com');
```

→ 한 번의 쿼리로 3명의 고객 정보 삽입

---

### 📄 예제 2: 일부 컬럼만 입력

```sql
INSERT INTO customers (name)
VALUES
  ('최영'),
  ('장보고');
```

→ `email`, `created_at` 은 **DEFAULT 값** 또는 `NULL`로 처리

---

### 📄 예제 3: SELECT 결과로 다중 삽입

```sql
INSERT INTO backup_customers (name, email)
SELECT name, email
FROM customers
WHERE created_at < '2025-01-01';
```

→ 기존 테이블의 데이터를 조건부로 복사

---

### 🧠 실무 팁

* 다중 INSERT는 **네트워크 요청 횟수를 줄여 성능 향상**에 도움이 됩니다.
* 너무 많은 행(수천\~수만)을 한 번에 넣으면 메모리 사용량이 커질 수 있으니 적당한 단위로 나누는 것이 좋습니다.
* 대용량 데이터는 `LOAD DATA INFILE` 같은 방식이 더 빠를 수 있습니다.

---

다음은 **22번 – UPDATE 기본 사용법** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
