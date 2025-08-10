좋습니다.
**40번 – GROUP BY + HAVING** 예제를 설명드리겠습니다.

---

## ✅ 40. GROUP BY + HAVING

### 📌 개념

* **`GROUP BY`** : 특정 컬럼을 기준으로 데이터를 그룹화
* **`HAVING`** : 그룹화된 결과에 조건을 적용 (WHERE는 그룹화 전에, HAVING은 그룹화 후에 적용)

---

### 📄 예제 1: 기본 GROUP BY

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id;
```

* 카테고리별 상품 개수 집계

---

### 📄 예제 2: GROUP BY + HAVING

```sql
SELECT category_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id
HAVING product_count >= 5;
```

* 카테고리별 상품 개수를 집계한 후, 5개 이상인 카테고리만 조회

---

### 📄 예제 3: GROUP BY 여러 컬럼

```sql
SELECT category_id, supplier_id, COUNT(*) AS product_count
FROM products
GROUP BY category_id, supplier_id;
```

* 카테고리와 공급업체별로 그룹화

---

### 📄 예제 4: 집계 함수와 함께 HAVING

```sql
SELECT customer_id, SUM(total_price) AS total_sales
FROM orders
GROUP BY customer_id
HAVING SUM(total_price) >= 100000;
```

* 고객별 총 매출이 10만 원 이상인 고객만 조회

---

### 📄 예제 5: WHERE vs HAVING 차이

```sql
-- WHERE: 그룹화 전에 조건 적용
SELECT customer_id, SUM(total_price) AS total_sales
FROM orders
WHERE status = 'Completed'
GROUP BY customer_id;

-- HAVING: 그룹화 후 조건 적용
SELECT customer_id, SUM(total_price) AS total_sales
FROM orders
GROUP BY customer_id
HAVING total_sales >= 50000;
```

---

### 🧠 실무 팁

* **WHERE**은 그룹핑 전 필터, **HAVING**은 그룹핑 후 필터
* HAVING 절에서 집계 함수 사용 가능
* 성능상 가능하면 WHERE로 먼저 데이터 양을 줄이고 HAVING으로 최종 조건 적용

---

다음은 **41번 – INNER JOIN** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
