좋습니다.
**103번 – WHERE 조건 최적화: 인덱스를 타는 조건 만들기** 예제를 설명드리겠습니다.

---

## ✅ 103. WHERE 조건 최적화: 인덱스를 타는 조건 만들기

### 📌 개념

* WHERE 절이 인덱스를 사용하지 않으면 쿼리 성능이 급격히 저하
* 인덱스를 타도록 조건을 작성하는 것이 핵심 튜닝 포인트

---

### 📄 예시 1: 인덱스를 타는 조건

```sql
-- 고객ID 인덱스 생성
CREATE INDEX idx_customer_id ON Orders(고객ID);

EXPLAIN
SELECT * FROM Orders
WHERE 고객ID = 'C01';
```

* `EXPLAIN` 결과 `type=ref`, `key=idx_customer_id` → 인덱스 사용됨

---

### 📄 예시 2: 인덱스를 타지 못하는 조건

```sql
EXPLAIN
SELECT * FROM Orders
WHERE YEAR(주문일자) = 2025;
```

* 컬럼에 함수 적용 → 인덱스 사용 불가 → `type=ALL` (Full Table Scan)

---

### 📄 예시 3: 가공 없이 비교

```sql
-- 인덱스 활용 가능하게 조건 변경
EXPLAIN
SELECT * FROM Orders
WHERE 주문일자 >= '2025-01-01' 
  AND 주문일자 < '2026-01-01';
```

* 날짜 범위 비교로 변경 → 인덱스 사용 가능

---

### 📄 예시 4: LIKE 최적화

```sql
-- 비효율적인 LIKE (인덱스 사용 불가)
SELECT * FROM Customers
WHERE 고객명 LIKE '%철수%';

-- 효율적인 LIKE (인덱스 사용 가능)
SELECT * FROM Customers
WHERE 고객명 LIKE '김%';
```

* `%`로 시작하면 인덱스 사용 불가
* 접두어 검색(`'김%'`)은 인덱스 사용 가능

---

### 🧠 실무 팁

1. WHERE 조건에서 인덱스 컬럼은 가공하지 말 것
2. 문자열 검색 시 `%`로 시작하지 않게 조건 작성
3. 날짜 검색은 범위 조건으로 변경
4. 복합 인덱스 사용 시 **선행 컬럼** 조건이 먼저 걸려야 함

---

다음은 **104번 – OR 대신 UNION이 빠른 경우** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
