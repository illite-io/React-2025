좋습니다.
**102번 – 인덱스 타기 확인: Index Scan vs Full Table Scan** 예제를 설명드리겠습니다.

---

## ✅ 102. 인덱스 타기 확인: Index Scan vs Full Table Scan

### 📌 개념

* **Index Scan**: 인덱스를 이용해 필요한 데이터만 검색 → 빠름
* **Full Table Scan**: 인덱스를 사용하지 않고 전체 테이블을 스캔 → 느림
* 인덱스 사용 여부를 확인하려면 `EXPLAIN` 분석이 필수

---

### 📄 예시 1: Index Scan

```sql
-- 고객ID에 인덱스 생성
CREATE INDEX idx_customer_id ON Orders(고객ID);

EXPLAIN
SELECT * FROM Orders
WHERE 고객ID = 'C01';
```

* `EXPLAIN` 결과 `type=ref` 또는 `type=range`
* `key` 컬럼에 `idx_customer_id` 표시됨 → 인덱스 사용

---

### 📄 예시 2: Full Table Scan

```sql
EXPLAIN
SELECT * FROM Orders
WHERE YEAR(주문일자) = 2025;
```

* `YEAR(주문일자)`는 컬럼에 함수 적용 → 인덱스 사용 불가
* `type=ALL`로 표시되고 `key=NULL` → 전체 테이블 스캔 발생

---

### 📄 Index Scan이 유리한 경우

1. WHERE 조건이 **인덱스 컬럼에 직접 적용**될 때
2. 범위 검색 (`BETWEEN`, `>`, `<`)이 인덱스 컬럼에 걸릴 때
3. JOIN 시 ON 조건이 인덱스 컬럼일 때

---

### 📄 Full Table Scan이 발생하는 경우

1. WHERE 절에서 컬럼에 함수나 연산 적용 (`YEAR()`, `+1` 등)
2. 인덱스가 없는 컬럼을 조건으로 검색
3. 데이터 대부분을 조회하는 경우 (옵티마이저가 인덱스보다 Full Scan이 빠르다고 판단)

---

### 🧠 실무 팁

* 인덱스 컬럼은 가공하지 않고 그대로 비교하는 것이 좋음
* 범위 검색과 정렬 조건을 함께 쓰면 **복합 인덱스** 고려
* `EXPLAIN` + `SHOW INDEX FROM 테이블명`으로 인덱스 사용 현황을 항상 점검

---

다음은 **103번 – WHERE 조건 최적화: 인덱스를 타는 조건 만들기** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
