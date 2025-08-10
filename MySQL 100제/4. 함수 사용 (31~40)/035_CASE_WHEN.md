좋습니다.
**35번 – CASE WHEN (다중 조건 분기)** 예제를 설명드리겠습니다.

---

## ✅ 35. CASE WHEN (다중 조건 분기)

### 📌 개념

`CASE WHEN` 구문은 SQL에서 **여러 조건에 따라 다른 값을 반환**할 때 사용합니다.
프로그래밍 언어의 `if-else if-else` 구조와 비슷합니다.

---

### 📄 예제 1: 등급별 라벨 표시

```sql
SELECT name,
       grade,
       CASE 
         WHEN grade = 'VIP' THEN '우수 고객'
         WHEN grade = 'Gold' THEN '골드 회원'
         WHEN grade = 'Silver' THEN '실버 회원'
         ELSE '일반 고객'
       END AS grade_label
FROM customers;
```

* 조건을 위에서부터 순차적으로 평가
* 일치하는 첫 번째 조건의 값을 반환

---

### 📄 예제 2: 가격대 분류

```sql
SELECT product_name,
       price,
       CASE 
         WHEN price >= 100000 THEN '고가'
         WHEN price >= 50000  THEN '중가'
         ELSE '저가'
       END AS price_category
FROM products;
```

---

### 📄 예제 3: NULL 처리

```sql
SELECT name,
       CASE 
         WHEN email IS NULL THEN '이메일 없음'
         ELSE email
       END AS email_display
FROM customers;
```

---

### 📄 예제 4: CASE + 집계 함수

```sql
SELECT 
  SUM(CASE WHEN grade = 'VIP' THEN 1 ELSE 0 END) AS vip_count,
  SUM(CASE WHEN grade = 'Gold' THEN 1 ELSE 0 END) AS gold_count
FROM customers;
```

→ 등급별 고객 수를 하나의 쿼리에서 집계

---

### 🧠 실무 팁

* `CASE`는 SELECT, WHERE, ORDER BY 절 모두에서 사용 가능
* WHERE 절에서 사용 시, 조건식을 간결하게 만들 수 있음
* 복잡한 다중 조건 로직을 SQL 내부에서 처리할 때 유용

---

다음은 **36번 – COUNT 함수** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
