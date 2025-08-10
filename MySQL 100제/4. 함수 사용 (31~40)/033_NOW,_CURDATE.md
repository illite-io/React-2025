좋습니다.
**33번 – NOW, CURDATE (날짜 함수)** 예제를 설명드리겠습니다.

---

## ✅ 33. NOW, CURDATE (날짜 함수)

### 📌 개념

* **`NOW()`** : 현재 날짜와 시간을 `YYYY-MM-DD HH:MM:SS` 형식으로 반환
* **`CURDATE()`** : 현재 날짜만 `YYYY-MM-DD` 형식으로 반환
* **`CURTIME()`** : 현재 시간만 `HH:MM:SS` 형식으로 반환

---

### 📄 예제 1: 현재 날짜와 시간 조회

```sql
SELECT NOW() AS current_datetime;
```

**결과 예시:**

```
2025-08-10 11:25:42
```

---

### 📄 예제 2: 현재 날짜 조회

```sql
SELECT CURDATE() AS current_date;
```

**결과 예시:**

```
2025-08-10
```

---

### 📄 예제 3: 현재 시간 조회

```sql
SELECT CURTIME() AS current_time;
```

**결과 예시:**

```
11:25:42
```

---

### 📄 예제 4: 데이터 삽입 시 NOW() 사용

```sql
INSERT INTO orders (customer_id, order_date)
VALUES (1, NOW());
```

---

### 📄 예제 5: 날짜 비교

```sql
SELECT * FROM orders
WHERE order_date >= CURDATE();
```

→ 오늘 주문한 내역 조회

---

### 🧠 실무 팁

* `NOW()`와 `CURRENT_TIMESTAMP`는 동일하게 동작
* `SYSDATE()`는 실행 시점마다 시간을 새로 계산 (멀티 호출 시 값이 달라질 수 있음)
* `DEFAULT CURRENT_TIMESTAMP`는 컬럼 생성 시 기본값으로 현재 시간 지정할 때 사용

---

다음은 **34번 – IF, IFNULL, COALESCE (조건 함수)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
