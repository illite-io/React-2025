좋습니다.
**41번 – INNER JOIN** 예제를 설명드리겠습니다.

---

## ✅ 41. INNER JOIN

### 📌 개념

* `INNER JOIN`은 **두 테이블에서 조인 조건에 맞는 행만 반환**합니다.
* 공통 키(Primary Key ↔ Foreign Key)를 기준으로 매칭되는 데이터만 가져옵니다.

---

### 📄 예제 1: 기본 INNER JOIN

```sql
SELECT orders.order_id, customers.name, orders.total_price
FROM orders
INNER JOIN customers
  ON orders.customer_id = customers.id;
```

* `orders.customer_id`와 `customers.id`가 일치하는 행만 반환

---

### 📄 예제 2: 별칭(alias) 사용

```sql
SELECT o.order_id, c.name, o.total_price
FROM orders AS o
INNER JOIN customers AS c
  ON o.customer_id = c.id;
```

* 별칭 사용으로 쿼리 가독성 향상

---

### 📄 예제 3: 여러 조건의 INNER JOIN

```sql
SELECT o.order_id, c.name, o.total_price
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
  AND c.grade = 'VIP';
```

* 조인 조건에 추가 필터(`c.grade = 'VIP'`) 적용

---

### 📄 예제 4: 세 개 이상의 테이블 JOIN

```sql
SELECT o.order_id, c.name, p.product_name
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
INNER JOIN products p
  ON o.product_id = p.id;
```

* 주문, 고객, 상품 테이블을 모두 조인

---

### 📄 예제 5: INNER JOIN + GROUP BY

```sql
SELECT c.name, COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o
  ON c.id = o.customer_id
GROUP BY c.name;
```

* 고객별 주문 횟수 집계

---

### 🧠 실무 팁

* INNER JOIN은 조인 키 컬럼에 **인덱스**가 있어야 성능이 향상됨
* 조인 조건을 ON에 넣을지, WHERE에 넣을지 명확히 구분 (ON은 매칭 조건, WHERE는 필터링 조건)
* 대량 조인 시 `EXPLAIN`으로 실행 계획 확인 필수

---

다음은 **42번 – LEFT JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
