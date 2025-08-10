좋습니다.
**36번 – COUNT 함수** 예제를 설명드리겠습니다.

---

## ✅ 36. COUNT 함수

### 📌 개념

`COUNT()` 함수는 **행(row)의 개수**를 반환합니다.
특정 컬럼, 조건, 또는 전체 행의 수를 구할 수 있습니다.

---

### 📄 예제 1: 전체 행 개수

```sql
SELECT COUNT(*) AS total_customers
FROM customers;
```

* 테이블의 모든 행 개수를 반환

---

### 📄 예제 2: 특정 컬럼의 NULL 제외 개수

```sql
SELECT COUNT(email) AS email_count
FROM customers;
```

* `email` 컬럼 값이 NULL이 아닌 행만 계산

---

### 📄 예제 3: 조건부 COUNT

```sql
SELECT COUNT(*) AS vip_count
FROM customers
WHERE grade = 'VIP';
```

* VIP 등급 고객 수만 계산

---

### 📄 예제 4: 그룹별 COUNT

```sql
SELECT grade, COUNT(*) AS count_by_grade
FROM customers
GROUP BY grade;
```

* 등급별 고객 수 집계

---

### 📄 예제 5: DISTINCT 값 개수

```sql
SELECT COUNT(DISTINCT grade) AS unique_grades
FROM customers;
```

* 서로 다른 등급의 개수 계산

---

### 🧠 실무 팁

* `COUNT(*)`는 모든 행을 포함하므로 NULL 값도 포함됨
* 특정 컬럼 COUNT 시 NULL은 제외되므로 컬럼 데이터 유무 체크 가능
* 대규모 데이터 COUNT 성능이 중요한 경우, **인덱스 컬럼 COUNT**가 더 빠를 수 있음

---

다음은 **37번 – SUM 함수** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
