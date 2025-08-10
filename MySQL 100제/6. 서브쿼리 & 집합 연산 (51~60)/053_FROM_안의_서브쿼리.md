좋습니다.
**53번 – FROM 안의 서브쿼리** 예제를 설명드리겠습니다.

---

## ✅ 53. FROM 안의 서브쿼리

### 📌 개념

* `FROM` 절에서 서브쿼리를 사용하면 **임시 테이블(파생 테이블)** 을 만들 수 있음
* 서브쿼리 결과에 **별칭(alias)** 을 반드시 지정해야 함
* 복잡한 계산을 먼저 수행하고, 그 결과를 다시 SELECT/JOIN 할 때 유용

---

### 📄 예제 1: 고객별 주문 합계 임시 테이블

```sql
SELECT t.customer_id, t.total_spent
FROM (
    SELECT customer_id, SUM(total_price) AS total_spent
    FROM orders
    GROUP BY customer_id
) AS t;
```

* `orders`에서 고객별 총 지출액을 계산한 후, 외부 쿼리에서 사용

---

### 📄 예제 2: FROM 서브쿼리 + 조건 필터

```sql
SELECT sub.customer_id, sub.total_spent
FROM (
    SELECT customer_id, SUM(total_price) AS total_spent
    FROM orders
    GROUP BY customer_id
) AS sub
WHERE sub.total_spent > 500000;
```

* 고객별 총액이 50만 원 이상인 경우만 조회

---

### 📄 예제 3: FROM 서브쿼리 + JOIN

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

* 고객 이름과 총 지출액 결합

---

### 📄 예제 4: 다중 집계 처리

```sql
SELECT sub.category_id, sub.avg_price, sub.max_price
FROM (
    SELECT category_id, AVG(price) AS avg_price, MAX(price) AS max_price
    FROM products
    GROUP BY category_id
) AS sub;
```

* 카테고리별 평균 가격과 최고 가격을 한 번에 구함

---

### 📄 예제 5: FROM 서브쿼리 + ORDER BY

```sql
SELECT *
FROM (
    SELECT customer_id, SUM(total_price) AS total_spent
    FROM orders
    GROUP BY customer_id
    ORDER BY total_spent DESC
    LIMIT 5
) AS top_customers;
```

* 상위 5명의 고객을 서브쿼리에서 뽑아 최종 결과로 사용

---

### 🧠 실무 팁

* FROM 서브쿼리는 **인덱스를 활용하지 못함** → 데이터 범위를 먼저 줄여서 사용
* 복잡한 분석 쿼리를 단계별로 나눠서 가독성을 높일 수 있음
* MySQL 8 이상에서는 `WITH`(CTE) 문법을 사용하면 더 깔끔해짐

---

다음은 **54번 – UPDATE/DELETE 안 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
