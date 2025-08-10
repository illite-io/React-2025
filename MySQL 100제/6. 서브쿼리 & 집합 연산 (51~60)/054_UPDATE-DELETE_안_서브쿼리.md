좋습니다.
**54번 – UPDATE/DELETE 안 서브쿼리** 예제를 설명드리겠습니다.

---

## ✅ 54. UPDATE / DELETE 안의 서브쿼리

### 📌 개념

* `UPDATE`나 `DELETE` 문에서 서브쿼리를 사용해 **대상 행을 동적으로 선택** 가능
* 주로 **다른 테이블의 값**을 참조해서 수정/삭제할 때 활용

---

## **UPDATE 안의 서브쿼리**

### 📄 예제 1: 평균보다 비싼 상품 가격 인하

```sql
UPDATE products
SET price = price * 0.9
WHERE price > (SELECT AVG(price) FROM products);
```

* 평균 가격보다 비싼 상품 가격을 10% 인하

---

### 📄 예제 2: 다른 테이블 값을 이용한 갱신

```sql
UPDATE orders
SET total_price = (
    SELECT SUM(price)
    FROM order_items
    WHERE order_items.order_id = orders.order_id
)
WHERE order_id IN (
    SELECT DISTINCT order_id
    FROM order_items
);
```

* 각 주문의 총액을 `order_items` 합계로 업데이트

---

## **DELETE 안의 서브쿼리**

### 📄 예제 3: 주문 없는 고객 삭제

```sql
DELETE FROM customers
WHERE id NOT IN (
    SELECT DISTINCT customer_id
    FROM orders
);
```

* 주문 기록이 없는 고객 삭제

---

### 📄 예제 4: 평균보다 저렴한 상품 중 재고 없는 경우 삭제

```sql
DELETE FROM products
WHERE stock = 0
AND price < (SELECT AVG(price) FROM products);
```

* 평균 가격보다 낮고 재고가 없는 상품 삭제

---

### 📄 예제 5: 특정 조건의 다중 테이블 삭제 (MySQL 확장 문법)

```sql
DELETE o
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
WHERE c.city = 'Seoul';
```

* 서울 거주 고객의 주문 삭제 (JOIN 기반 DELETE)

---

### 🧠 실무 팁

* UPDATE/DELETE 서브쿼리는 **실행 전에 SELECT로 먼저 검증**해야 안전
* DELETE는 되돌릴 수 없으니 `BEGIN` / `ROLLBACK` 같은 트랜잭션 사용 권장
* 서브쿼리보다 JOIN을 활용한 DELETE/UPDATE가 더 빠른 경우가 많음

---

다음은 **55번 – EXISTS** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
