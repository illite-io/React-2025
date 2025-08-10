좋습니다.
**31번 – CONCAT, LENGTH (문자열 함수)** 예제를 설명드리겠습니다.

---

## ✅ 31. CONCAT, LENGTH (문자열 함수)

### 📌 개념

* **`CONCAT()`** : 여러 문자열을 하나로 이어 붙임
* **`LENGTH()`** : 문자열의 바이트 길이 반환 (한글은 UTF-8에서 3바이트)

---

### 📄 예제 1: CONCAT – 이름과 이메일 결합

```sql
SELECT CONCAT(name, ' (', email, ')') AS user_info
FROM customers;
```

* `name`과 `email`을 한 문자열로 합쳐 `user_info` 컬럼으로 출력

---

### 📄 예제 2: CONCAT\_WS – 구분자와 함께 결합

```sql
SELECT CONCAT_WS(' - ', name, email) AS user_info
FROM customers;
```

* `CONCAT_WS(구분자, ...)`는 구분자를 넣어 결합
* NULL 값은 무시됨

---

### 📄 예제 3: LENGTH – 문자열 길이 확인

```sql
SELECT name, LENGTH(name) AS byte_length
FROM customers;
```

* 문자열의 **바이트 수**를 반환
* 예: '홍길동'은 UTF-8에서 9 (3바이트 × 3글자)

---

### 📄 예제 4: CHAR\_LENGTH – 글자 수 확인

```sql
SELECT name, CHAR_LENGTH(name) AS char_count
FROM customers;
```

* 글자 수를 반환 (한글은 1글자로 계산)
* '홍길동' → `3`

---

### 🧠 실무 팁

* `LENGTH()`와 `CHAR_LENGTH()` 차이를 반드시 구분해야 함
  (특히 다국어 데이터 처리 시)
* 문자열 결합 시 공백 처리를 주의하거나 `TRIM()`을 함께 사용
* `CONCAT()`에 NULL이 하나라도 있으면 결과가 NULL이므로, NULL 방지를 위해 `IFNULL()` 사용 권장

```sql
SELECT CONCAT(IFNULL(name, '이름없음'), ' - ', IFNULL(email, '이메일없음'))
FROM customers;
```

---

다음은 **32번 – ROUND, CEIL, FLOOR (숫자 함수)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
