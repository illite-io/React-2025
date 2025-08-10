좋습니다.
**59번 – INTERSECT (MySQL 8+)** 예제를 설명드리겠습니다.

---

## ✅ 59. INTERSECT (MySQL 8+)

### 📌 개념

* `INTERSECT`는 두 개의 SELECT 결과에서 **공통된 행만 반환**
* MySQL 8.0부터 공식 지원
* 컬럼 개수와 데이터 타입이 동일해야 함
* 기본적으로 **중복 제거**됨 (`DISTINCT` 동작)

---

### 📄 예제 1: 두 도시 모두에 거주한 고객 찾기

```sql
SELECT name, city FROM customers WHERE city = 'Seoul'
INTERSECT
SELECT name, city FROM customers WHERE city = 'Busan';
```

* 같은 고객이 서울과 부산에 모두 등록된 경우

---

### 📄 예제 2: 현재 주문과 보관 주문에 모두 있는 주문

```sql
SELECT order_id FROM orders
INTERSECT
SELECT order_id FROM archived_orders;
```

* 동일 주문 ID가 두 테이블에 모두 존재하는 경우만 표시

---

### 📄 예제 3: 특정 상품을 구매한 VIP 고객

```sql
SELECT customer_id FROM vip_customers
INTERSECT
SELECT customer_id FROM orders WHERE product_id = 1001;
```

* VIP 고객 중 특정 상품 구매자만 추출

---

### 📄 예제 4: 컬럼명 통일

```sql
SELECT name AS person FROM customers
INTERSECT
SELECT supplier_name FROM suppliers;
```

* 첫 번째 SELECT의 컬럼명이 최종 결과 컬럼명으로 사용됨

---

### 📄 예제 5: 중복 데이터 제거 특성

```sql
SELECT city FROM customers WHERE city IN ('Seoul', 'Busan')
INTERSECT
SELECT city FROM suppliers WHERE city IN ('Seoul', 'Busan');
```

* 결과는 DISTINCT 적용됨 (중복 제거됨)

---

### 🧠 실무 팁

* `INTERSECT`는 내부적으로 정렬과 중복 제거를 수행하므로 대량 데이터에서 느릴 수 있음
* 성능이 중요한 경우 `INNER JOIN`으로 대체 가능
* MySQL 8 미만 버전에서는 `INNER JOIN` + `DISTINCT`로 구현해야 함

---

다음은 **60번 – EXCEPT (MySQL 8+)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
