좋습니다.
**69번 – INDEX 삭제** 예제를 설명드리겠습니다.

---

## ✅ 69. INDEX 삭제

### 📌 개념

* 불필요한 인덱스는 삭제하여 **쓰기 성능 향상** 및 **저장 공간 절약**
* 인덱스 이름을 지정해서 삭제
* PRIMARY KEY는 `DROP PRIMARY KEY`로 삭제, UNIQUE 인덱스도 `DROP INDEX`로 삭제 가능

---

### 📄 예제 1: 단일 인덱스 삭제

```sql
DROP INDEX idx_customer_name
ON customers;
```

* `customers` 테이블의 `idx_customer_name` 인덱스 삭제

---

### 📄 예제 2: ALTER TABLE로 인덱스 삭제

```sql
ALTER TABLE customers
DROP INDEX idx_customer_name;
```

* `DROP INDEX`와 동일한 효과

---

### 📄 예제 3: 복합 인덱스 삭제

```sql
DROP INDEX idx_city_age
ON customers;
```

* 복합 인덱스도 이름만 지정하면 삭제 가능

---

### 📄 예제 4: PRIMARY KEY 삭제

```sql
ALTER TABLE customers
DROP PRIMARY KEY;
```

* 기본 키는 인덱스 삭제 방식이 다름 (PRIMARY KEY 전용 명령)

---

### 📄 예제 5: 인덱스 존재 여부 확인 후 삭제

```sql
SHOW INDEX FROM customers;
-- 인덱스 이름 확인 후 DROP INDEX 실행
```

---

### 🧠 실무 팁

* 인덱스가 사용되지 않는 경우에도 유지비용이 발생 → 모니터링 후 정리
* `pt-index-usage`(Percona Toolkit) 같은 툴로 사용 빈도 분석 가능
* DELETE, UPDATE, INSERT 성능 저하를 유발하는 불필요한 인덱스는 과감히 제거

---

다음은 **70번 – 제약조건 조회/삭제** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
