좋습니다.
**101번 – EXPLAIN으로 쿼리 실행 계획 분석** 예제를 설명드리겠습니다.

---

## ✅ 101. EXPLAIN으로 쿼리 실행 계획 분석

### 📌 개념

* `EXPLAIN`은 MySQL에서 **쿼리가 어떻게 실행되는지** 분석하는 명령어
* MySQL 옵티마이저가 선택한 **인덱스 사용 여부**, **조인 순서**, **조회 방식** 등을 확인 가능
* 쿼리 성능 튜닝의 첫 단계

---

### 📄 예시 1: 기본 사용법

```sql
EXPLAIN
SELECT * 
FROM Orders
WHERE 고객ID = 'C01';
```

* 결과를 보고 인덱스를 타고 있는지(`type=ref`), 전체 테이블 스캔인지(`type=ALL`) 확인 가능

---

### 📄 예시 2: JOIN 쿼리 분석

```sql
EXPLAIN
SELECT c.고객명, o.주문ID
FROM Customers c
JOIN Orders o ON c.고객ID = o.고객ID
WHERE c.고객등급 = 'GOLD';
```

* JOIN 순서(`table` 컬럼)와 사용된 인덱스(`key` 컬럼) 확인
* `rows` 값이 크면 읽어야 하는 데이터 양이 많다는 의미 → 인덱스 최적화 필요

---

### 📄 주요 컬럼 설명

| 컬럼             | 의미                                               |
| -------------- | ------------------------------------------------ |
| id             | 쿼리 실행 순서                                         |
| select\_type   | SELECT의 유형 (SIMPLE, SUBQUERY 등)                  |
| table          | 액세스되는 테이블 이름                                     |
| type           | 접근 방식 (ALL, index, range, ref, eq\_ref, const 등) |
| possible\_keys | 사용할 수 있는 인덱스 목록                                  |
| key            | 실제 사용된 인덱스                                       |
| rows           | 읽을 것으로 예상되는 행 수                                  |
| Extra          | 추가 정보 (Using index, Using where 등)               |

---

### 📄 예시 3: JSON 포맷으로 보기

```sql
EXPLAIN FORMAT=JSON
SELECT * FROM Orders WHERE 고객ID = 'C01';
```

* 복잡한 쿼리 분석 시 JSON 포맷이 더 많은 세부 정보 제공

---

### 🧠 실무 팁

* `type=ALL`이면 **Full Table Scan** → 인덱스 고려
* `rows` 값이 지나치게 크면 WHERE 조건 최적화 필요
* `Extra`에서 `Using filesort`나 `Using temporary`가 뜨면 정렬/임시 테이블 최적화 필요
* EXPLAIN은 SELECT뿐 아니라 **DELETE, UPDATE**에도 적용 가능 (`EXPLAIN DELETE ...`)

---

다음은 **102번 – 인덱스 타기 확인: Index Scan vs Full Table Scan** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
