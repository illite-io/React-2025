좋습니다.
**49번 – JOIN + 서브쿼리** 예제를 설명드리겠습니다.

---

## ✅ 49. JOIN + 서브쿼리

### 📌 개념

* `JOIN`에 사용되는 테이블이 반드시 실제 테이블일 필요는 없음
* 서브쿼리를 `FROM` 절에 넣어서 가상의 테이블(파생 테이블)과 조인 가능
* 집계된 데이터와 원본 데이터를 결합할 때 유용

---

### 📄 예제 1: 고객별 총 주문 금액과 고객 정보 결합

```sql
SELECT c.name, t.total_spent
FROM customers c
JOIN (
    SELECT customer_id, SUM(total_price) AS total_spent
    FROM orders
    GROUP BY customer_id
) AS t
  ON c.id = t.customer_id;
```

* 서브쿼리에서 고객별 구매 총액 계산
* 고객 정보 테이블과 결합

---

### 📄 예제 2: 최근 주문만 결합

```sql
SELECT c.name, recent.order_id, recent.order_date
FROM customers c
JOIN (
    SELECT customer_id, order_id, order_date
    FROM orders
    WHERE order_date = (SELECT MAX(order_date) FROM orders)
) AS recent
  ON c.id = recent.customer_id;
```

* 전체 주문 중 가장 최근 주문만 가져와 고객과 결합

---

### 📄 예제 3: 평균 매출보다 높은 주문만 결합

```sql
SELECT o.order_id, c.name, o.total_price
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
JOIN (
    SELECT AVG(total_price) AS avg_price
    FROM orders
) AS avg_table
  ON o.total_price > avg_table.avg_price;
```

* 평균 주문 금액보다 높은 주문만 고객과 함께 조회

---

### 📄 예제 4: 상품별 최고가 주문과 결합

```sql
SELECT p.product_name, max_order.order_id, max_order.max_price
FROM products p
JOIN (
    SELECT product_id, MAX(total_price) AS max_price, order_id
    FROM orders
    GROUP BY product_id
) AS max_order
  ON p.id = max_order.product_id;
```

* 상품별 최고 주문 금액과 상품 이름 결합

---

### 📄 예제 5: LEFT JOIN + 서브쿼리

```sql
SELECT c.name, t.total_orders
FROM customers c
LEFT JOIN (
    SELECT customer_id, COUNT(*) AS total_orders
    FROM orders
    GROUP BY customer_id
) AS t
  ON c.id = t.customer_id;
```

* 주문이 없는 고객도 포함
* 주문 수가 NULL이면 0으로 처리 가능 (`IFNULL` 사용)

---

### 🧠 실무 팁

* 서브쿼리를 JOIN에서 사용할 때, 불필요하게 큰 데이터셋이 되지 않도록 주의
* 파생 테이블(서브쿼리)에 **인덱스가 적용되지 않으므로** 가능하면 데이터 양을 줄인 뒤 JOIN
* MySQL 8 이상에서는 `WITH`(CTE)로 가독성을 높일 수 있음

---

다음은 **50번 – NATURAL JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
