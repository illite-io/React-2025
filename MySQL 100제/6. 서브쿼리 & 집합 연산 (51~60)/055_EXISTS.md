좋습니다.
**55번 – EXISTS** 예제를 설명드리겠습니다.

---

## ✅ 55. EXISTS

### 📌 개념

* `EXISTS`는 서브쿼리가 **하나라도 결과를 반환하면 TRUE**
* 실제 데이터 내용보다 **존재 여부**만 확인
* 대량 데이터에서는 `IN`보다 빠른 경우가 많음

---

### 📄 예제 1: 주문이 있는 고객 조회

```sql
SELECT name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
```

* 고객별 주문 존재 여부 확인

---

### 📄 예제 2: 특정 카테고리 상품을 구매한 고객

```sql
SELECT name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.customer_id = c.id
      AND p.category_id = 3
);
```

* 카테고리 ID가 3인 상품을 주문한 고객 조회

---

### 📄 예제 3: NOT EXISTS로 주문 없는 고객 조회

```sql
SELECT name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
```

* 주문 기록이 없는 고객만 조회

---

### 📄 예제 4: 배송된 주문만 조회

```sql
SELECT order_id
FROM orders o
WHERE EXISTS (
    SELECT 1
    FROM shipments s
    WHERE s.order_id = o.order_id
      AND s.ship_date IS NOT NULL
);
```

* 배송일이 있는 주문만 표시

---

### 📄 예제 5: EXISTS + 서브쿼리 복합 조건

```sql
SELECT name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
      AND o.total_price > 100000
);
```

* 10만 원 이상 주문한 고객만 조회

---

### 🧠 실무 팁

* `EXISTS`는 조건을 만족하는 **첫 번째 행을 찾으면 바로 종료** → 효율적
* `IN`은 전체 결과 집합을 만든 후 비교 → 데이터가 많으면 느려질 수 있음
* 존재 여부만 필요할 때는 `EXISTS`가 성능상 유리

---

다음은 **56번 – IN + 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
