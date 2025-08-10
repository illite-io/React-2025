좋습니다.
**72번 – LOCK** 예제를 설명드리겠습니다.

---

## ✅ 72. LOCK (잠금)

### 📌 개념

* **LOCK**은 여러 사용자가 동시에 데이터를 수정할 때 **데이터 무결성을 보호**하는 기능
* MySQL의 주요 잠금 종류

  * **테이블 락(Table Lock)**: 테이블 전체 잠금
  * **행 락(Row Lock)**: 특정 행만 잠금 (InnoDB에서 지원)
* 트랜잭션과 함께 사용하여 데이터 충돌 방지

---

### 📄 예제 1: 테이블 잠금

```sql
LOCK TABLES customers WRITE;
UPDATE customers SET name = '홍길동' WHERE id = 1;
UNLOCK TABLES;
```

* `customers` 테이블을 쓰기 잠금 → 다른 세션이 읽기/쓰기 불가

---

### 📄 예제 2: 읽기 잠금

```sql
LOCK TABLES customers READ;
SELECT * FROM customers;
UNLOCK TABLES;
```

* 다른 세션은 읽기만 가능, 쓰기는 불가

---

### 📄 예제 3: SELECT FOR UPDATE (행 락)

```sql
START TRANSACTION;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;
```

* 해당 행을 다른 세션에서 수정 불가 (읽기는 가능)

---

### 📄 예제 4: SELECT LOCK IN SHARE MODE

```sql
START TRANSACTION;
SELECT * FROM accounts WHERE id = 1 LOCK IN SHARE MODE;
COMMIT;
```

* 다른 세션이 읽기는 가능하지만, 쓰기는 불가

---

### 📄 예제 5: 현재 잠금 확인

```sql
SHOW OPEN TABLES WHERE In_use > 0;
```

---

### 🧠 실무 팁

* 불필요한 락은 트랜잭션 병목을 유발 → 최소 범위/시간만 사용
* `SELECT FOR UPDATE`는 반드시 트랜잭션 내에서만 사용
* 높은 동시성 환경에서는 테이블 락보다 **행 락(Row Lock)** 사용이 유리
* InnoDB는 기본적으로 **자동 행 락** 지원

---

다음은 **73번 – VIEW 생성** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
