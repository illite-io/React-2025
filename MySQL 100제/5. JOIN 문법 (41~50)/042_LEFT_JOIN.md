좋습니다.
**42번 – LEFT JOIN** 예제를 설명드리겠습니다.

---

## ✅ 42. LEFT JOIN

### 📌 개념

* `LEFT JOIN`은 **왼쪽(기준) 테이블의 모든 행을 반환**하고,
  오른쪽 테이블에 매칭되는 값이 없으면 **NULL**을 반환합니다.
* 데이터 누락 여부를 확인할 때 자주 사용됩니다.

---

### 📄 예제 1: 기본 LEFT JOIN

```sql
SELECT c.name, o.order_id, o.total_price
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id;
```

* 모든 고객이 반환됨
* 주문이 없는 고객은 `order_id`와 `total_price`가 `NULL`

---

### 📄 예제 2: 주문이 없는 고객 찾기

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
WHERE o.order_id IS NULL;
```

* `LEFT JOIN` 후 `WHERE o.order_id IS NULL` 조건으로 **매칭 데이터가 없는 행만** 조회

---

### 📄 예제 3: LEFT JOIN + GROUP BY

```sql
SELECT c.name, COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
GROUP BY c.name;
```

* 주문이 없는 고객도 포함하여 주문 개수 집계

---

### 📄 예제 4: 세 개 이상의 테이블 LEFT JOIN

```sql
SELECT c.name, o.order_id, p.product_name
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
LEFT JOIN products p
  ON o.product_id = p.id;
```

* 주문이 없는 고객도 포함되며, 주문이 있어도 상품 정보가 없으면 상품명은 `NULL`

---

### 📄 예제 5: LEFT JOIN vs INNER JOIN 비교

```sql
-- INNER JOIN
SELECT c.name, o.order_id
FROM customers c
INNER JOIN orders o
  ON c.id = o.customer_id;

-- LEFT JOIN
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id;
```

* INNER JOIN → 주문 없는 고객 제외
* LEFT JOIN → 주문 없는 고객도 포함

---

### 🧠 실무 팁

* `LEFT JOIN`은 데이터 누락 탐지, 통계 집계에서 매우 자주 사용
* 조인 조건 컬럼에 인덱스가 없으면 성능 저하 가능
* `WHERE` 절의 NULL 체크로 조인 여부를 판단할 수 있음

---

다음은 **43번 – RIGHT JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
