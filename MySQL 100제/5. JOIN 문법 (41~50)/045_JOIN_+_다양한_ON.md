좋습니다.
**45번 – JOIN + 다양한 ON 조건** 예제를 설명드리겠습니다.

---

## ✅ 45. JOIN + 다양한 ON 조건

### 📌 개념

* `JOIN`의 `ON` 절에는 단순 동등 비교(=)뿐만 아니라
  부등호, BETWEEN, LIKE, 복합 조건 등을 사용할 수 있습니다.
* 조건을 잘 설계하면 불필요한 데이터 조인을 줄여 성능을 높일 수 있습니다.

---

### 📄 예제 1: 기본 조인 + 날짜 범위 조건

```sql
SELECT o.order_id, c.name, o.order_date
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
  AND o.order_date BETWEEN '2025-01-01' AND '2025-01-31';
```

* 특정 기간의 주문만 고객 정보와 함께 조회

---

### 📄 예제 2: 가격 조건을 ON에 포함

```sql
SELECT o.order_id, c.name, o.total_price
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
  AND o.total_price >= 100000;
```

* 금액이 10만 원 이상인 주문만 조인

---

### 📄 예제 3: 문자열 매칭 조건

```sql
SELECT o.order_id, c.name
FROM orders o
JOIN customers c
  ON o.customer_id = c.id
  AND c.name LIKE '김%';
```

* 고객 이름이 '김'으로 시작하는 주문만 조회

---

### 📄 예제 4: 여러 컬럼 비교

```sql
SELECT s.student_id, s.name, e.exam_date
FROM students s
JOIN exams e
  ON s.student_id = e.student_id
  AND s.class_id = e.class_id;
```

* 학생 ID와 반 ID가 둘 다 일치하는 경우만 조인

---

### 📄 예제 5: ON 조건과 WHERE 조건의 차이

```sql
-- ON 조건
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
  AND o.total_price >= 100000;

-- WHERE 조건
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
WHERE o.total_price >= 100000;
```

* ON 조건 → 금액 조건을 만족하지 않는 고객도 표시 (주문은 NULL)
* WHERE 조건 → 조건 불만족 고객은 아예 제외

---

### 🧠 실무 팁

* 불필요한 조인을 줄이려면 WHERE보다 ON에 조건을 넣는 것이 효과적일 수 있음
* 단, LEFT JOIN에서 ON과 WHERE 위치에 따라 결과가 크게 달라짐
* 조건에 인덱스를 잘 활용하면 조인 속도 향상 가능

---

다음은 **46번 – 다중 테이블 JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
