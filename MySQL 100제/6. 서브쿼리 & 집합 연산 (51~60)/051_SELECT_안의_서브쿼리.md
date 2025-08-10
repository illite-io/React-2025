좋습니다.
**51번 – SELECT 안의 서브쿼리** 예제를 설명드리겠습니다.

---

## ✅ 51. SELECT 안의 서브쿼리

### 📌 개념

* `SELECT` 절 내부에서 서브쿼리를 사용하면, **행 단위로 계산된 값**을 새로운 컬럼으로 추가 가능
* 주로 통계, 순위, 비교 데이터를 컬럼에 바로 포함시킬 때 사용
* **스칼라 서브쿼리**라고도 함 (결과가 단일 값)

---

### 📄 예제 1: 고객별 주문 수 컬럼 추가

```sql
SELECT c.name,
       (SELECT COUNT(*) 
        FROM orders o 
        WHERE o.customer_id = c.id) AS order_count
FROM customers c;
```

* 각 고객의 주문 수를 `order_count` 컬럼에 표시

---

### 📄 예제 2: 상품별 평균 가격 대비 현재 가격

```sql
SELECT p.product_name,
       p.price,
       (SELECT AVG(price) FROM products) AS avg_price
FROM products p;
```

* 전체 상품 평균 가격과 비교 가능

---

### 📄 예제 3: 가장 최근 주문 날짜 추가

```sql
SELECT c.name,
       (SELECT MAX(order_date) 
        FROM orders o 
        WHERE o.customer_id = c.id) AS last_order_date
FROM customers c;
```

* 고객별 마지막 주문일 표시

---

### 📄 예제 4: 순위 계산

```sql
SELECT p.product_name,
       p.price,
       (SELECT COUNT(*) + 1 
        FROM products p2
        WHERE p2.price > p.price) AS price_rank
FROM products p;
```

* 가격이 높은 순으로 순위 표시

---

### 📄 예제 5: 다른 테이블의 정보 바로 가져오기

```sql
SELECT o.order_id,
       (SELECT name 
        FROM customers c 
        WHERE c.id = o.customer_id) AS customer_name
FROM orders o;
```

* 주문 정보에 고객 이름 직접 추가

---

### 🧠 실무 팁

* SELECT 절 서브쿼리는 **매 행마다 실행**되므로 데이터가 많으면 성능 저하 가능
* 대규모 데이터에서는 `JOIN`으로 대체하는 것이 효율적
* 하지만 간단한 조회나 빠른 테스트에서는 유용

---

다음은 **52번 – WHERE 안의 서브쿼리** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
