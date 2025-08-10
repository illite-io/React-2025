좋습니다.
**58번 – UNION ALL** 예제를 설명드리겠습니다.

---

## ✅ 58. UNION ALL

### 📌 개념

* `UNION ALL`은 두 개 이상의 SELECT 결과를 **그대로 합침**
* **중복 제거를 하지 않음** → 성능이 빠르고, 데이터 수가 많은 경우에 유리
* 중복된 행이 필요한 경우 반드시 `UNION ALL` 사용

---

### 📄 예제 1: 고객 이름 + 공급자 이름 (중복 포함)

```sql
SELECT name FROM customers
UNION ALL
SELECT supplier_name FROM suppliers;
```

* 중복된 이름도 모두 표시됨

---

### 📄 예제 2: 두 도시 고객 목록 합치기

```sql
SELECT name, city FROM customers WHERE city = 'Seoul'
UNION ALL
SELECT name, city FROM customers WHERE city = 'Busan';
```

* 서울과 부산 고객 데이터를 단순 병합 (중복 고객 포함)

---

### 📄 예제 3: 현재 주문 + 과거 주문 합치기

```sql
SELECT order_id, total_price FROM orders
UNION ALL
SELECT order_id, total_price FROM archived_orders;
```

* 모든 주문을 합쳐서 확인 (중복 주문 ID 포함 가능)

---

### 📄 예제 4: 성능 비교 예시

```sql
-- 중복 제거 필요
SELECT name FROM customers
UNION
SELECT name FROM suppliers;

-- 중복 제거 불필요 (더 빠름)
SELECT name FROM customers
UNION ALL
SELECT name FROM suppliers;
```

* `UNION`은 정렬 및 중복 제거 과정이 추가되므로 `UNION ALL`보다 느림

---

### 📄 예제 5: 집계와 결합

```sql
SELECT 'current' AS source, COUNT(*) AS order_count FROM orders
UNION ALL
SELECT 'archived', COUNT(*) FROM archived_orders;
```

* 현재 주문과 과거 주문 건수를 하나의 결과로 합침

---

### 🧠 실무 팁

* 중복 제거가 필요 없으면 `UNION ALL`이 항상 더 빠름
* `UNION ALL` 사용 후 중복 여부가 필요하면 애플리케이션 단에서 처리
* 대규모 데이터 통합 시 성능 차이가 크므로 선택이 중요

---

다음은 **59번 – INTERSECT (MySQL 8+)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
