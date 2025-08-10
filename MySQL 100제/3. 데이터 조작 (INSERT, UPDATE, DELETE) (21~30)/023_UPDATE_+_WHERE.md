좋습니다.
**23번 – UPDATE + 조건절** 예제를 설명드리겠습니다.

---

## ✅ 23. UPDATE + 조건절

### 📌 개념

`UPDATE` 문에서 `WHERE` 조건을 사용하면 **특정 조건에 맞는 행만 수정**할 수 있습니다.
이는 대량 데이터 수정 시 **정확한 범위 지정**을 위해 반드시 사용해야 하는 패턴입니다.

---

### 📄 예제 1: 가입일이 2025년 1월 1일 이전인 고객의 등급 변경

```sql
UPDATE customers
SET grade = 'VIP'
WHERE created_at < '2025-01-01';
```

* 조건: 가입일이 2025년 1월 1일 이전
* 변경: `grade` 컬럼을 'VIP'로 수정

---

### 📄 예제 2: 특정 이메일 도메인을 사용하는 고객만 이름 변경

```sql
UPDATE customers
SET name = '이메일수정필요'
WHERE email LIKE '%@oldmail.com';
```

---

### 📄 예제 3: 복합 조건 사용

```sql
UPDATE customers
SET grade = 'Gold'
WHERE created_at BETWEEN '2025-01-01' AND '2025-06-30'
  AND email IS NOT NULL;
```

* `BETWEEN`으로 가입 기간 조건 지정
* `AND`로 이메일이 NULL이 아닌 조건 추가

---

### 🧠 실무 팁

* `WHERE` 조건이 잘못되면 원치 않는 행이 수정될 수 있으므로 **먼저 SELECT로 결과 확인**하세요.

```sql
SELECT * FROM customers
WHERE created_at < '2025-01-01';
```

* 대량 업데이트 전 **백업** 또는 **트랜잭션** 사용을 권장합니다.
* 조건이 복잡할수록 괄호로 묶어 **논리 우선순위를 명확히** 하는 습관이 좋습니다.

---

다음은 **24번 – DELETE 기본 사용법** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
