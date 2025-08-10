좋습니다.
**22번 – UPDATE 기본 사용법** 예제를 설명드리겠습니다.

---

## ✅ 22. UPDATE 기본 사용법

### 📌 개념

`UPDATE` 문은 테이블의 **기존 데이터 값을 수정**할 때 사용합니다.
`WHERE` 절이 없으면 **모든 행이 수정**되니 반드시 주의해야 합니다.

---

### 📄 예제 1: 특정 고객의 이메일 수정

```sql
UPDATE customers
SET email = 'hong_new@example.com'
WHERE name = '홍길동';
```

* `SET` 뒤에 수정할 컬럼과 새로운 값을 지정
* `WHERE`로 수정할 대상을 제한

---

### 📄 예제 2: 여러 컬럼 동시에 수정

```sql
UPDATE customers
SET name = '김철수',
    email = 'kim_new@example.com'
WHERE id = 3;
```

---

### 📄 예제 3: 모든 고객의 이메일 도메인 변경

```sql
UPDATE customers
SET email = REPLACE(email, '@old.com', '@new.com');
```

→ `WHERE` 절이 없으므로 **모든 행에 적용**

---

### 🧠 실무 팁

* `WHERE` 절 없이 실행 시 **전체 데이터 변경**되므로 테스트 환경에서 먼저 실행하는 습관이 좋습니다.
* 수정 전 데이터를 백업하거나 `SELECT`로 대상 행을 먼저 확인하세요.

```sql
SELECT * FROM customers WHERE name = '홍길동';
```

* 대규모 업데이트는 트랜잭션을 사용해 롤백할 수 있도록 준비하세요.

```sql
START TRANSACTION;

UPDATE customers
SET email = 'test@example.com'
WHERE id < 100;

ROLLBACK; -- 또는 COMMIT
```

---

다음은 **23번 – UPDATE + 조건절** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
