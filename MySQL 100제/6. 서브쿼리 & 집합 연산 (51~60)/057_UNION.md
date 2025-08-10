좋습니다.
**57번 – UNION** 예제를 설명드리겠습니다.

---

## ✅ 57. UNION

### 📌 개념

* `UNION`은 두 개 이상의 SELECT 결과를 **하나의 결과 집합으로 합치는** 연산
* 중복된 행은 자동으로 제거됨
* 모든 SELECT 문은 **컬럼 개수와 데이터 타입이 동일**해야 함

---

### 📄 예제 1: 고객 이름 + 공급자 이름 합치기

```sql
SELECT name FROM customers
UNION
SELECT supplier_name FROM suppliers;
```

* 고객 이름과 공급자 이름을 하나의 목록으로 표시
* 중복 이름은 제거됨

---

### 📄 예제 2: 두 도시의 고객 목록 합치기

```sql
SELECT name, city FROM customers WHERE city = 'Seoul'
UNION
SELECT name, city FROM customers WHERE city = 'Busan';
```

* 서울과 부산 고객 목록 합치기

---

### 📄 예제 3: 컬럼명 변경

```sql
SELECT name AS person_name FROM customers
UNION
SELECT supplier_name FROM suppliers;
```

* 최종 결과에서 첫 번째 SELECT의 컬럼명이 적용됨

---

### 📄 예제 4: 다른 조건 결과 합치기

```sql
SELECT order_id, total_price FROM orders WHERE total_price > 50000
UNION
SELECT order_id, total_price FROM archived_orders WHERE total_price > 50000;
```

* 현재 주문과 보관 주문에서 5만 원 초과 건 합치기

---

### 📄 예제 5: 중복 포함하려면 UNION ALL

```sql
SELECT name FROM customers
UNION ALL
SELECT supplier_name FROM suppliers;
```

* `UNION ALL`은 중복 행을 제거하지 않음 → 성능이 더 빠름

---

### 🧠 실무 팁

* UNION은 정렬이 필요하므로 UNION ALL보다 느림
* 컬럼 개수와 타입이 일치하지 않으면 오류 발생
* 중복 제거가 불필요하면 `UNION ALL`을 사용해 성능 향상

---

다음은 **58번 – UNION ALL** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
