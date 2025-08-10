좋습니다.
**67번 – INDEX 생성** 예제를 설명드리겠습니다.

---

## ✅ 67. INDEX 생성

### 📌 개념

* **인덱스**는 테이블의 데이터를 빠르게 검색하기 위한 자료 구조
* MySQL에서는 기본적으로 **B-Tree 인덱스** 사용 (InnoDB)
* SELECT 성능을 향상시키지만, INSERT/UPDATE/DELETE 성능은 약간 떨어질 수 있음
* 자주 조회되는 컬럼에 인덱스를 설정하는 것이 핵심

---

### 📄 예제 1: 단일 컬럼 인덱스 생성

```sql
CREATE INDEX idx_customer_name
ON customers(name);
```

* `customers` 테이블의 `name` 컬럼에 인덱스 생성

---

### 📄 예제 2: 여러 컬럼에 인덱스 생성 (복합 인덱스)

```sql
CREATE INDEX idx_customer_city_age
ON customers(city, age);
```

* **city → age** 순으로 검색 성능 향상
* 주의: 인덱스는 첫 번째 컬럼부터 순차적으로만 활용 가능

---

### 📄 예제 3: UNIQUE 인덱스 생성

```sql
CREATE UNIQUE INDEX idx_email_unique
ON customers(email);
```

* 중복 값 방지 + 조회 성능 향상

---

### 📄 예제 4: 기존 테이블에 인덱스 추가

```sql
ALTER TABLE orders
ADD INDEX idx_order_date (order_date);
```

---

### 📄 예제 5: 인덱스 확인

```sql
SHOW INDEX FROM customers;
```

---

### 🧠 실무 팁

* WHERE, JOIN, ORDER BY, GROUP BY에 자주 쓰이는 컬럼에 인덱스를 걸면 좋음
* 너무 많은 인덱스는 쓰기 성능 저하와 저장 공간 낭비를 유발
* `EXPLAIN` 명령으로 인덱스 활용 여부를 항상 확인
* 문자열 컬럼 인덱스 시 길이 제한 설정(`INDEX(col(50))`)으로 메모리 절약 가능

---

다음은 **68번 – 복합 INDEX** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
