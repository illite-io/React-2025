좋습니다.
**43번 – RIGHT JOIN** 예제를 설명드리겠습니다.

---

## ✅ 43. RIGHT JOIN

### 📌 개념

* `RIGHT JOIN`은 **오른쪽 테이블의 모든 행을 반환**하고,
  왼쪽 테이블에 매칭되는 값이 없으면 **NULL**을 반환합니다.
* `LEFT JOIN`과 반대 개념입니다.

---

### 📄 예제 1: 기본 RIGHT JOIN

```sql
SELECT o.order_id, c.name, o.total_price
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id;
```

* 모든 주문이 반환됨
* 고객 정보가 없는 주문의 경우, `name`이 NULL

---

### 📄 예제 2: 고객 정보가 없는 주문 찾기

```sql
SELECT o.order_id
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id
WHERE c.id IS NULL;
```

* 고객 테이블에 없는 주문만 조회

---

### 📄 예제 3: RIGHT JOIN + GROUP BY

```sql
SELECT o.product_id, COUNT(o.order_id) AS order_count
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id
GROUP BY o.product_id;
```

* 모든 주문 기준으로 상품별 주문 개수 집계

---

### 📄 예제 4: 세 개 이상의 테이블 RIGHT JOIN

```sql
SELECT p.product_name, o.order_id, c.name
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id
RIGHT JOIN products p
  ON o.product_id = p.id;
```

* 상품 테이블을 기준으로 모든 상품이 포함되며, 주문이나 고객 정보가 없으면 NULL

---

### 📄 예제 5: LEFT JOIN 변환

```sql
-- RIGHT JOIN
SELECT o.order_id, c.name
FROM customers c
RIGHT JOIN orders o
  ON c.id = o.customer_id;

-- LEFT JOIN으로 변환
SELECT o.order_id, c.name
FROM orders o
LEFT JOIN customers c
  ON o.customer_id = c.id;
```

* RIGHT JOIN은 LEFT JOIN으로 쉽게 변환 가능 (테이블 순서만 반대)

---

### 🧠 실무 팁

* MySQL에서는 RIGHT JOIN보다 LEFT JOIN을 더 자주 사용 (가독성, 유지보수성)
* RIGHT JOIN이 필요한 경우 대부분 LEFT JOIN으로 변환 가능
* RIGHT JOIN을 쓰는 상황은 "오른쪽 테이블을 기준으로 모든 데이터를 보고 싶은 경우"

---

다음은 **44번 – FULL JOIN (UNION 사용)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
