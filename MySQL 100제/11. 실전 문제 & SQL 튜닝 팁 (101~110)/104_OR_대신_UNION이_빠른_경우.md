좋습니다.
**104번 – OR 대신 UNION이 빠른 경우** 예제를 설명드리겠습니다.

---

## ✅ 104. OR 대신 UNION이 빠른 경우

### 📌 개념

* WHERE 절에 **OR** 조건을 사용하면 인덱스를 비효율적으로 사용하거나 아예 사용하지 못하는 경우가 있음
* 이럴 때는 **UNION** 또는 **UNION ALL**로 쿼리를 분리하면 인덱스 효율이 높아질 수 있음

---

### 📄 예시 1: OR 사용 (비효율적)

```sql
EXPLAIN
SELECT * FROM Orders
WHERE 고객ID = 'C01' OR 주문일자 = '2025-08-01';
```

* OR 조건이 서로 다른 컬럼에 걸려 있으면 인덱스 사용이 제한됨
* `type=ALL`로 Full Table Scan 발생 가능

---

### 📄 예시 2: UNION으로 분리 (효율적)

```sql
EXPLAIN
SELECT * FROM Orders
WHERE 고객ID = 'C01'
UNION
SELECT * FROM Orders
WHERE 주문일자 = '2025-08-01';
```

* 각 SELECT가 독립적으로 실행되며, 해당 컬럼 인덱스 활용 가능
* MySQL 옵티마이저가 두 결과를 합치는 방식이 더 빠를 수 있음

---

### 📄 예시 3: UNION vs UNION ALL

```sql
-- UNION: 중복 제거 (정렬 발생 → 추가 비용)
SELECT * FROM Orders WHERE 고객ID = 'C01'
UNION
SELECT * FROM Orders WHERE 주문일자 = '2025-08-01';

-- UNION ALL: 중복 제거 안 함 (더 빠름)
SELECT * FROM Orders WHERE 고객ID = 'C01'
UNION ALL
SELECT * FROM Orders WHERE 주문일자 = '2025-08-01';
```

* 중복 데이터가 없거나 중요하지 않다면 `UNION ALL`이 성능상 유리

---

### 🧠 실무 팁

1. **OR** 조건이 같은 컬럼에 걸릴 경우 → 인덱스 사용 가능
2. 서로 다른 컬럼 조건이면 **UNION** 또는 **UNION ALL**로 분리 고려
3. `UNION`은 내부적으로 정렬이 발생하므로, 가능하면 `UNION ALL` 사용
4. 항상 `EXPLAIN`으로 실행 계획 비교 후 결정

---

다음은 **105번 – SELECT \* vs SELECT 컬럼 지정 성능 비교** 예제로 넘어가겠습니다.
계속하시려면 `.` 을 입력해주세요.
