좋습니다.
**44번 – FULL JOIN (UNION 사용)** 예제를 설명드리겠습니다.

---

## ✅ 44. FULL JOIN (UNION 사용)

### 📌 개념

* MySQL은 **FULL OUTER JOIN**을 기본적으로 지원하지 않음
* 대신 **LEFT JOIN + RIGHT JOIN**을 `UNION`으로 결합해서 구현
* 목적: **두 테이블의 모든 데이터를 모두 반환**, 매칭 안 되는 부분은 NULL

---

### 📄 예제 1: FULL JOIN 구현

```sql
SELECT c.id AS customer_id, c.name, o.order_id, o.total_price
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id

UNION

SELECT c.id AS customer_id, c.name, o.order_id, o.total_price
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id;
```

* `LEFT JOIN`으로 고객 기준 데이터 확보
* `RIGHT JOIN`으로 주문 기준 데이터 확보
* `UNION`으로 중복 제거 후 합침

---

### 📄 예제 2: FULL JOIN + GROUP BY

```sql
SELECT customer_id, COUNT(order_id) AS order_count
FROM (
    SELECT c.id AS customer_id, o.order_id
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id

    UNION

    SELECT c.id AS customer_id, o.order_id
    FROM customers c
    RIGHT JOIN orders o ON c.id = o.customer_id
) AS full_data
GROUP BY customer_id;
```

* 모든 고객과 주문을 포함하여 고객별 주문 개수 집계

---

### 📄 예제 3: FULL JOIN + NULL 구분

```sql
SELECT customer_id, name, order_id,
       CASE 
         WHEN customer_id IS NULL THEN '주문만 존재'
         WHEN order_id IS NULL THEN '고객만 존재'
         ELSE '둘 다 존재'
       END AS status
FROM (
    SELECT c.id AS customer_id, c.name, o.order_id
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id

    UNION

    SELECT c.id AS customer_id, c.name, o.order_id
    FROM customers c
    RIGHT JOIN orders o ON c.id = o.customer_id
) AS full_data;
```

---

### 🧠 실무 팁

* FULL JOIN은 데이터 비교, 동기화 작업에서 많이 사용
* `UNION`은 중복을 제거하지만, 중복 제거 과정에서 속도가 느려질 수 있음
* 중복 허용이 필요한 경우 `UNION ALL` 사용 (성능 빠름)

---

다음은 **45번 – JOIN + 다양한 ON 조건** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
