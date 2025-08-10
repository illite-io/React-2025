좋습니다.
**50번 – NATURAL JOIN** 예제를 설명드리겠습니다.

---

## ✅ 50. NATURAL JOIN

### 📌 개념

* `NATURAL JOIN`은 **두 테이블에서 이름과 데이터 타입이 같은 컬럼을 자동으로 찾아 조인**합니다.
* `ON` 절을 명시하지 않아도 조인 조건이 자동으로 설정됨
* 단, 컬럼명이 우연히 같을 경우 의도치 않은 결과가 나올 수 있으므로 주의 필요

---

### 📄 예제 1: 기본 NATURAL JOIN

```sql
SELECT *
FROM customers
NATURAL JOIN orders;
```

* `customers`와 `orders`에서 **같은 이름의 컬럼**(예: `customer_id`)이 조인 조건이 됨
* `ON customers.customer_id = orders.customer_id`와 동일한 효과

---

### 📄 예제 2: NATURAL LEFT JOIN

```sql
SELECT *
FROM customers
NATURAL LEFT JOIN orders;
```

* 고객 테이블을 기준으로 모든 고객 포함
* 주문이 없으면 주문 관련 컬럼이 NULL

---

### 📄 예제 3: NATURAL JOIN + 특정 컬럼 선택

```sql
SELECT name, order_id, total_price
FROM customers
NATURAL JOIN orders;
```

* 자동 조인 후 원하는 컬럼만 선택

---

### 📄 예제 4: NATURAL JOIN + WHERE 조건

```sql
SELECT name, order_id, total_price
FROM customers
NATURAL JOIN orders
WHERE total_price > 50000;
```

* 자동 조인 후 필터 조건 적용

---

### 📄 예제 5: NATURAL JOIN 컬럼명 주의 사례

```sql
-- customers 테이블에 'city' 컬럼이 있고
-- orders 테이블에도 'city' 컬럼이 있다면
SELECT *
FROM customers
NATURAL JOIN orders;
```

* `city` 컬럼도 자동으로 조인 조건에 포함되어
  **예상치 못한 결과**가 나올 수 있음

---

### 🧠 실무 팁

* NATURAL JOIN은 편리하지만 **명시적 ON 절 사용을 권장**
* 컬럼명이 의도적으로 동일하고, 조인 조건이 확실한 경우에만 사용
* 실무에서는 코드 가독성과 유지보수를 위해 INNER JOIN/LEFT JOIN + ON 방식을 선호

---

다음은 **51번 – SELECT 안의 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
