좋습니다.
**32번 – ROUND, CEIL, FLOOR (숫자 함수)** 예제를 설명드리겠습니다.

---

## ✅ 32. ROUND, CEIL, FLOOR (숫자 함수)

### 📌 개념

* **`ROUND()`** : 숫자를 반올림
* **`CEIL()`** 또는 **`CEILING()`** : 숫자를 올림
* **`FLOOR()`** : 숫자를 내림

---

### 📄 예제 1: ROUND – 반올림

```sql
SELECT ROUND(123.456) AS round_no_decimal,      -- 소수점 없이 반올림 → 123
       ROUND(123.456, 2) AS round_two_decimal;  -- 소수점 2자리까지 반올림 → 123.46
```

---

### 📄 예제 2: CEIL – 올림

```sql
SELECT CEIL(123.001) AS ceil_value;  -- 124
```

---

### 📄 예제 3: FLOOR – 내림

```sql
SELECT FLOOR(123.999) AS floor_value;  -- 123
```

---

### 📄 예제 4: 할인율 계산 예시

```sql
SELECT product_name,
       price,
       ROUND(price * 0.9, 0) AS discounted_price
FROM products;
```

→ 가격의 90% 값을 **반올림**하여 할인된 가격 계산

---

### 🧠 실무 팁

* 금액, 퍼센트, 통계 수치에서 **반올림 방식**이 매우 중요
  (반올림 vs 올림 vs 내림)
* MySQL은 `TRUNCATE(number, decimals)`로 **내림과 비슷하게 원하는 소수점 자릿수 절삭** 가능
* `CEIL`과 `FLOOR`는 **정수 계산**뿐만 아니라 날짜 연산에도 응용 가능

---

다음은 **33번 – NOW, CURDATE (날짜 함수)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
