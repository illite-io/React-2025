좋습니다.
**24번 – DELETE 기본 사용법** 예제를 설명드리겠습니다.

---

## ✅ 24. DELETE 기본 사용법

### 📌 개념

`DELETE` 문은 테이블에서 **데이터 행(row)을 삭제**할 때 사용합니다.
`WHERE` 절을 생략하면 **모든 데이터가 삭제**되므로 주의해야 합니다.

---

### 📄 예제 1: 특정 고객 삭제

```sql
DELETE FROM customers
WHERE id = 5;
```

* `id`가 5인 고객만 삭제

---

### 📄 예제 2: 모든 데이터 삭제 (주의)

```sql
DELETE FROM customers;
```

* `WHERE` 절이 없으므로 전체 데이터가 삭제됨
* 테이블 구조는 남아있음

---

### 📄 예제 3: 조건부 삭제 – 오래된 데이터 제거

```sql
DELETE FROM customers
WHERE created_at < '2024-01-01';
```

---

### 🧠 실무 팁

* 삭제 전 항상 **SELECT로 대상을 먼저 확인**하세요.

```sql
SELECT * FROM customers
WHERE created_at < '2024-01-01';
```

* 대량 삭제 시 한 번에 삭제하지 말고, 작은 단위로 나누어 처리하면 성능과 잠금 문제를 줄일 수 있습니다.

```sql
DELETE FROM customers
WHERE created_at < '2024-01-01'
LIMIT 1000;
```

* 테이블 전체 데이터 삭제 시 `TRUNCATE TABLE`이 더 빠를 수 있지만, 트랜잭션 롤백이 불가능합니다.

---

다음은 **25번 – DELETE + 조건절** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
