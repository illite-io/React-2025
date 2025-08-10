좋습니다.
**52번 – WHERE 안의 서브쿼리** 예제를 설명드리겠습니다.

---

## ✅ 52. WHERE 안의 서브쿼리

### 📌 개념

* `WHERE` 절에서 서브쿼리를 사용하면
  조건 비교 값을 **다른 쿼리 결과로 동적으로 생성** 가능
* `IN`, `NOT IN`, `=`, `>`, `<`, `EXISTS` 등과 함께 자주 사용됨

---

### 📄 예제 1: 평균 가격보다 비싼 상품 조회

```sql
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

* 서브쿼리에서 평균 가격을 구하고, 그보다 비싼 상품만 필터링

---

### 📄 예제 2: 특정 고객이 주문한 상품 조회

```sql
SELECT product_name
FROM products
WHERE id IN (
    SELECT product_id
    FROM orders
    WHERE customer_id = 1
);
```

* 고객 ID가 1인 사람이 주문한 상품 목록

---

### 📄 예제 3: 주문이 한 번도 없는 고객 조회

```sql
SELECT name
FROM customers
WHERE id NOT IN (
    SELECT DISTINCT customer_id
    FROM orders
);
```

* 주문 기록이 없는 고객 찾기

---

### 📄 예제 4: EXISTS 사용

```sql
SELECT name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
```

* 최소 한 번 이상 주문한 고객만 조회

---

### 📄 예제 5: 서브쿼리 + 날짜 조건

```sql
SELECT name
FROM customers
WHERE id IN (
    SELECT customer_id
    FROM orders
    WHERE order_date >= '2025-01-01'
);
```

* 2025년 이후 주문한 고객 목록

---

### 🧠 실무 팁

* `IN`보다 `EXISTS`가 큰 데이터셋에서 더 효율적인 경우가 많음
* 서브쿼리의 결과가 NULL을 포함하면 `NOT IN`은 주의해야 함 (결과가 비정상적으로 줄어듦)
* 가능하면 서브쿼리 대신 JOIN으로 대체해 성능을 확보

---

다음은 **53번 – FROM 안의 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
