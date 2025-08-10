좋습니다.
**25번 – DELETE + 조건절** 예제를 설명드리겠습니다.

---

## ✅ 25. DELETE + 조건절

### 📌 개념

`DELETE` 문에서 `WHERE` 절을 사용하면 **특정 조건에 맞는 행만 삭제**할 수 있습니다.
데이터 손실을 방지하려면 반드시 조건을 정확히 지정하는 것이 중요합니다.

---

### 📄 예제 1: 특정 이메일 도메인 사용 고객 삭제

```sql
DELETE FROM customers
WHERE email LIKE '%@test.com';
```

* 이메일이 `@test.com`으로 끝나는 고객만 삭제

---

### 📄 예제 2: 가입일이 오래된 고객 삭제

```sql
DELETE FROM customers
WHERE created_at < '2023-01-01';
```

* 2023년 1월 1일 이전 가입 고객만 삭제

---

### 📄 예제 3: 복합 조건 삭제

```sql
DELETE FROM customers
WHERE grade = 'Bronze'
  AND last_login < '2024-01-01';
```

* 등급이 Bronze이고 마지막 로그인 날짜가 2024년 1월 1일 이전인 고객 삭제

---

### 🧠 실무 팁

* 조건을 잘못 작성하면 의도치 않은 대량 삭제가 발생할 수 있으니
  **DELETE 전에는 반드시 같은 WHERE 조건으로 SELECT를 실행**하세요.

```sql
SELECT * FROM customers
WHERE grade = 'Bronze'
  AND last_login < '2024-01-01';
```

* 대량 삭제 시에는 **백업** 후 진행하거나, **트랜잭션**으로 감싸서 필요 시 롤백 가능하도록 하세요.

```sql
START TRANSACTION;
DELETE FROM customers WHERE ...;
ROLLBACK; -- 또는 COMMIT
```

* 대량 조건 삭제 시 인덱스가 없으면 성능 저하가 발생할 수 있으니,
  삭제 대상 컬럼에 인덱스를 설정하는 것이 좋습니다.

---

다음은 **26번 – AUTO\_INCREMENT** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
