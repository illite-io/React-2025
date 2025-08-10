좋습니다.
**46번 – 다중 테이블 JOIN** 예제를 설명드리겠습니다.

---

## ✅ 46. 다중 테이블 JOIN

### 📌 개념

* 두 개 이상의 테이블을 한 번에 조인하여 데이터를 결합
* INNER JOIN, LEFT JOIN, RIGHT JOIN 등 혼합 가능
* 각 조인 순서와 조건이 결과에 직접적인 영향을 미침

---

### 📄 예제 1: 세 테이블 INNER JOIN

```sql
SELECT o.order_id, c.name AS customer_name, p.product_name
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
INNER JOIN products p
  ON o.product_id = p.id;
```

* 주문, 고객, 상품 정보를 한 번에 가져옴

---

### 📄 예제 2: INNER JOIN + LEFT JOIN 혼합

```sql
SELECT o.order_id, c.name AS customer_name, p.product_name, s.ship_date
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
LEFT JOIN shipments s
  ON o.order_id = s.order_id
INNER JOIN products p
  ON o.product_id = p.id;
```

* 주문이 있는 고객만 포함,
* 배송 정보는 없는 경우도 포함 (LEFT JOIN)

---

### 📄 예제 3: 네 개 이상의 테이블 JOIN

```sql
SELECT o.order_id, c.name, p.product_name, s.ship_date, pay.payment_date
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
INNER JOIN products p
  ON o.product_id = p.id
LEFT JOIN shipments s
  ON o.order_id = s.order_id
LEFT JOIN payments pay
  ON o.order_id = pay.order_id;
```

* 주문 → 고객 → 상품 → 배송 → 결제까지 모든 데이터 조인

---

### 📄 예제 4: 다중 JOIN + 그룹 집계

```sql
SELECT c.name, COUNT(o.order_id) AS order_count, SUM(o.total_price) AS total_spent
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
LEFT JOIN products p
  ON o.product_id = p.id
GROUP BY c.name;
```

* 고객별 주문 횟수와 총 지출 금액 집계

---

### 📄 예제 5: 다중 JOIN 성능 튜닝

```sql
EXPLAIN
SELECT o.order_id, c.name, p.product_name
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.id
INNER JOIN products p
  ON o.product_id = p.id;
```

* `EXPLAIN`으로 실행 계획 확인
* 조인 키 컬럼에 인덱스 적용 필수

---

### 🧠 실무 팁

* 조인 순서를 잘못 설정하면 불필요한 대량 데이터 결합으로 성능 저하
* INNER JOIN을 먼저 적용해 데이터 범위를 줄이고, 그 뒤 LEFT JOIN 사용 권장
* 항상 조인 대상 컬럼에 인덱스를 걸어야 함

---

다음은 **47번 – SELF JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
