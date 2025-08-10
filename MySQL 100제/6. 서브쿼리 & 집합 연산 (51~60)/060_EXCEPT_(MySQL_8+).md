좋습니다.
**60번 – EXCEPT (MySQL 8+)** 예제를 설명드리겠습니다.

---

## ✅ 60. EXCEPT (MySQL 8+)

### 📌 개념

* `EXCEPT`는 첫 번째 SELECT 결과에서 **두 번째 SELECT 결과를 뺀 차집합**을 반환
* 즉, **A에는 있지만 B에는 없는 데이터**만 가져옴
* 컬럼 개수와 데이터 타입이 동일해야 함
* 기본적으로 **중복 제거**(`DISTINCT`) 적용됨

---

### 📄 예제 1: 주문한 고객 중 VIP가 아닌 고객

```sql
SELECT customer_id FROM orders
EXCEPT
SELECT customer_id FROM vip_customers;
```

* 주문은 했지만 VIP 명단에는 없는 고객

---

### 📄 예제 2: 서울 고객 중 부산에 없는 고객

```sql
SELECT name, city FROM customers WHERE city = 'Seoul'
EXCEPT
SELECT name, city FROM customers WHERE city = 'Busan';
```

* 서울에만 있는 고객 목록

---

### 📄 예제 3: 현재 주문 중 보관 주문에 없는 건

```sql
SELECT order_id FROM orders
EXCEPT
SELECT order_id FROM archived_orders;
```

* 현재만 존재하는 주문 ID 목록

---

### 📄 예제 4: 특정 상품 구매 안 한 고객

```sql
SELECT customer_id FROM customers
EXCEPT
SELECT DISTINCT customer_id FROM orders WHERE product_id = 1001;
```

* 특정 상품을 구매하지 않은 고객

---

### 📄 예제 5: 컬럼명 일치

```sql
SELECT name AS person FROM customers
EXCEPT
SELECT supplier_name FROM suppliers;
```

* 고객 이름 중 공급자 이름에 없는 값

---

### 🧠 실무 팁

* `EXCEPT`는 내부적으로 정렬과 중복 제거를 수행 → 대량 데이터에서는 느릴 수 있음
* MySQL 8 미만 버전에서는 `LEFT JOIN ... WHERE NULL` 방식으로 대체 가능
* 차집합 연산은 데이터 정합성 체크, 배타 조건 필터링에 유용

---

다음은 **61번 – PRIMARY KEY** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
