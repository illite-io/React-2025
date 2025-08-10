좋습니다.
**34번 – IF, IFNULL, COALESCE (조건 함수)** 예제를 설명드리겠습니다.

---

## ✅ 34. IF, IFNULL, COALESCE (조건 함수)

### 📌 개념

* **`IF(조건, 참일 때, 거짓일 때)`** → 조건에 따라 값을 선택
* **`IFNULL(값, 대체값)`** → 값이 NULL이면 대체값 반환
* **`COALESCE(값1, 값2, ...)`** → NULL이 아닌 첫 번째 값을 반환

---

### 📄 예제 1: IF – 조건부 값 선택

```sql
SELECT name,
       grade,
       IF(grade = 'VIP', '우수 고객', '일반 고객') AS grade_label
FROM customers;
```

* `grade`가 'VIP'면 '우수 고객', 아니면 '일반 고객' 출력

---

### 📄 예제 2: IFNULL – NULL 처리

```sql
SELECT name,
       IFNULL(email, '이메일 없음') AS email_display
FROM customers;
```

* `email`이 NULL이면 '이메일 없음'으로 표시

---

### 📄 예제 3: COALESCE – 여러 값 중 첫 번째 NULL이 아닌 값 반환

```sql
SELECT name,
       COALESCE(nickname, name, '이름없음') AS display_name
FROM customers;
```

* `nickname`이 있으면 사용, 없으면 `name`, 그것도 없으면 '이름없음'

---

### 📄 예제 4: 계산식에 IF 사용

```sql
SELECT order_id,
       total_price,
       IF(total_price >= 100000, total_price * 0.9, total_price) AS discounted_price
FROM orders;
```

* 총액이 10만원 이상이면 10% 할인 적용

---

### 🧠 실무 팁

* `IF` 문은 단순 조건 분기에 적합하지만, 복잡한 조건은 `CASE WHEN`이 더 가독성이 좋음
* `COALESCE`는 파라미터를 여러 개 받을 수 있어서 다중 NULL 처리에 유리
* `IFNULL`은 두 개의 인자만 처리 가능

---

다음은 **35번 – CASE WHEN (다중 조건 분기)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
