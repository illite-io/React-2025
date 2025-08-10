좋습니다.
**68번 – 복합 INDEX** 예제를 설명드리겠습니다.

---

## ✅ 68. 복합 INDEX

### 📌 개념

* \*\*복합 인덱스(Composite Index)\*\*는 두 개 이상의 컬럼을 묶어서 만든 인덱스
* 다중 조건 검색에 효과적
* 인덱스 컬럼의 **순서가 매우 중요**
* MySQL은 \*\*왼쪽 접두사 원칙(Leftmost Prefix Rule)\*\*을 따름 → 첫 번째 컬럼을 포함하지 않으면 인덱스를 사용하지 못함

---

### 📄 예제 1: 복합 인덱스 생성

```sql
CREATE INDEX idx_city_age
ON customers(city, age);
```

* `city` → `age` 순서로 인덱스 생성
* `WHERE city = 'Seoul' AND age > 30` 같은 쿼리에 최적화

---

### 📄 예제 2: 인덱스 사용 가능/불가능 비교

```sql
-- 인덱스 사용 가능
SELECT * FROM customers WHERE city = 'Seoul';
SELECT * FROM customers WHERE city = 'Seoul' AND age > 30;

-- 인덱스 사용 불가능 (첫 번째 컬럼 누락)
SELECT * FROM customers WHERE age > 30;
```

---

### 📄 예제 3: 세 개 컬럼 복합 인덱스

```sql
CREATE INDEX idx_city_age_name
ON customers(city, age, name);
```

* `city`만 또는 `city + age` 또는 `city + age + name` 조건에서 인덱스 사용 가능
* 하지만 `age + name` 조합만으로는 사용 불가

---

### 📄 예제 4: 기존 테이블에 복합 인덱스 추가

```sql
ALTER TABLE orders
ADD INDEX idx_customer_date (customer_id, order_date);
```

---

### 📄 예제 5: EXPLAIN으로 인덱스 확인

```sql
EXPLAIN SELECT * FROM customers WHERE city = 'Seoul' AND age = 40;
```

* `key` 컬럼에 `idx_city_age`가 표시되면 인덱스 사용 중

---

### 🧠 실무 팁

* WHERE 조건 컬럼 순서에 맞춰 인덱스를 설계
* `ORDER BY`와 `GROUP BY`에도 복합 인덱스 활용 가능
* 너무 많은 컬럼을 묶으면 인덱스 크기 커져 성능 저하
* 인덱스 설계 전 `쿼리 패턴 분석`이 필수

---

다음은 **69번 – INDEX 삭제** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
