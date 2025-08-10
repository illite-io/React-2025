좋습니다.
**107번 – JOIN 최적화 순서와 필터 조건 위치 조정** 예제를 설명드리겠습니다.

---

## ✅ 107. JOIN 최적화 순서와 필터 조건 위치 조정

### 📌 개념

* MySQL 옵티마이저는 보통 **작은 테이블부터 JOIN**하는 것이 유리
* WHERE 조건을 적절히 배치하면 불필요한 데이터 읽기를 줄일 수 있음

---

### 📄 예시 1: 비효율적인 JOIN

```sql
EXPLAIN
SELECT o.주문ID, c.고객명
FROM Orders o
JOIN Customers c ON o.고객ID = c.고객ID
WHERE c.고객등급 = 'GOLD';
```

* Customers 전체를 읽은 후 Orders와 JOIN → Orders에서 불필요한 데이터까지 조회

---

### 📄 예시 2: 효율적인 JOIN (필터 조건 적용 순서 변경)

```sql
EXPLAIN
SELECT o.주문ID, c.고객명
FROM (
    SELECT * FROM Customers WHERE 고객등급 = 'GOLD'
) c
JOIN Orders o ON o.고객ID = c.고객ID;
```

* 먼저 `고객등급='GOLD'` 조건으로 Customers를 줄인 후 Orders와 JOIN
* 읽는 데이터 양이 크게 감소

---

### 📄 예시 3: 작은 테이블 먼저 JOIN

```sql
EXPLAIN
SELECT o.주문ID, c.고객명
FROM Customers c
JOIN Orders o ON o.고객ID = c.고객ID
WHERE c.고객등급 = 'GOLD';
```

* 고객 수가 주문 수보다 훨씬 적으면 Customers를 드라이빙 테이블로 사용

---

### 📄 예시 4: 인덱스 활용

```sql
CREATE INDEX idx_customer_grade ON Customers(고객등급);

EXPLAIN
SELECT o.주문ID, c.고객명
FROM Customers c
JOIN Orders o ON o.고객ID = c.고객ID
WHERE c.고객등급 = 'GOLD';
```

* 고객등급 조건이 인덱스를 타면 JOIN 전에 데이터 양을 줄일 수 있음

---

### 🧠 실무 팁

1. 작은 테이블(또는 조건으로 줄인 테이블)부터 JOIN
2. WHERE 조건은 가능하면 JOIN 전에 적용
3. 드라이빙 테이블(먼저 읽는 테이블)의 크기를 최소화
4. 항상 `EXPLAIN`으로 실제 JOIN 순서 확인

---

다음은 **108번 – 대용량 INSERT 시 성능 최적화 전략** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
