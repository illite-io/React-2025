좋습니다.
**39번 – MIN, MAX 함수** 예제를 설명드리겠습니다.

---

## ✅ 39. MIN, MAX 함수

### 📌 개념

* **`MIN()`** : 지정된 컬럼의 최소값 반환
* **`MAX()`** : 지정된 컬럼의 최대값 반환
* 숫자, 날짜, 문자열 컬럼 모두 사용 가능

---

### 📄 예제 1: 숫자형 최소/최대값

```sql
SELECT MIN(price) AS lowest_price,
       MAX(price) AS highest_price
FROM products;
```

* 상품 가격 중 최저가와 최고가를 조회

---

### 📄 예제 2: 날짜형 최소/최대값

```sql
SELECT MIN(order_date) AS first_order,
       MAX(order_date) AS last_order
FROM orders;
```

* 첫 주문일과 마지막 주문일 조회

---

### 📄 예제 3: 문자열형 MIN/MAX

```sql
SELECT MIN(name) AS alphabet_first,
       MAX(name) AS alphabet_last
FROM customers;
```

* 알파벳/문자 순서상 첫 번째와 마지막 값 조회

---

### 📄 예제 4: 그룹별 MIN/MAX

```sql
SELECT category_id,
       MIN(price) AS min_price,
       MAX(price) AS max_price
FROM products
GROUP BY category_id;
```

* 카테고리별 최저가와 최고가 조회

---

### 📄 예제 5: 조건부 MIN/MAX

```sql
SELECT MIN(price) AS vip_min_price,
       MAX(price) AS vip_max_price
FROM orders
WHERE customer_grade = 'VIP';
```

* VIP 고객 주문의 최소/최대 금액 조회

---

### 🧠 실무 팁

* MIN/MAX는 인덱스가 걸린 컬럼에서 **매우 빠르게 동작**
* 하지만 GROUP BY와 함께 쓰면 풀스캔이 일어날 수 있으니 주의
* MySQL 8 이상에서는 윈도우 함수 `FIRST_VALUE`, `LAST_VALUE`로도 비슷한 작업 가능

---

다음은 **40번 – GROUP BY + HAVING** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
