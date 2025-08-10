좋습니다.
**48번 – JOIN + GROUP BY** 예제를 설명드리겠습니다.

---

## ✅ 48. JOIN + GROUP BY

### 📌 개념

* `JOIN`으로 여러 테이블을 결합한 후,
  **GROUP BY**로 집계 데이터를 계산
* 판매 통계, 고객별 구매량, 상품별 매출 등을 구할 때 자주 사용

---

### 📄 예제 1: 고객별 총 주문 금액

```sql
SELECT c.name, SUM(o.total_price) AS total_spent
FROM customers c
JOIN orders o
  ON c.id = o.customer_id
GROUP BY c.name;
```

* 고객별 총 지출 금액 집계

---

### 📄 예제 2: 상품별 판매 수량

```sql
SELECT p.product_name, COUNT(o.order_id) AS order_count
FROM products p
JOIN orders o
  ON p.id = o.product_id
GROUP BY p.product_name;
```

* 각 상품이 몇 번 주문되었는지 집계

---

### 📄 예제 3: 카테고리별 매출 합계

```sql
SELECT cat.category_name, SUM(o.total_price) AS total_sales
FROM categories cat
JOIN products p
  ON cat.id = p.category_id
JOIN orders o
  ON p.id = o.product_id
GROUP BY cat.category_name;
```

* 카테고리별 총 매출 계산

---

### 📄 예제 4: 연도별 고객 주문 수

```sql
SELECT c.name, YEAR(o.order_date) AS order_year, COUNT(o.order_id) AS orders_per_year
FROM customers c
JOIN orders o
  ON c.id = o.customer_id
GROUP BY c.name, YEAR(o.order_date);
```

* 고객별 연도별 주문 횟수 집계

---

### 📄 예제 5: JOIN + GROUP BY + HAVING

```sql
SELECT c.name, SUM(o.total_price) AS total_spent
FROM customers c
JOIN orders o
  ON c.id = o.customer_id
GROUP BY c.name
HAVING total_spent > 500000;
```

* 총 구매 금액이 50만 원 이상인 고객만 조회

---

### 🧠 실무 팁

* JOIN + GROUP BY 조합은 데이터 양이 많으면 속도가 느려질 수 있음 → 조인 키와 그룹 키에 인덱스 적용
* GROUP BY 전에 WHERE로 데이터 범위를 줄이면 성능 향상
* MySQL 8 이상에서는 `GROUPING SETS`, `ROLLUP`으로 다차원 집계 가능

---

다음은 **49번 – JOIN + 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
