좋습니다.
**47번 – SELF JOIN** 예제를 설명드리겠습니다.

---

## ✅ 47. SELF JOIN

### 📌 개념

* **같은 테이블을 자기 자신과 조인**하는 방법
* 계층 구조(부모-자식 관계)나 같은 그룹 내 비교를 할 때 사용
* 반드시 **별칭(alias)** 을 사용해야 함

---

### 📄 예제 1: 직원-관리자 관계

```sql
SELECT e.employee_id, e.name AS employee_name,
       m.name AS manager_name
FROM employees e
LEFT JOIN employees m
  ON e.manager_id = m.employee_id;
```

* 같은 `employees` 테이블에서 직원과 관리자 정보를 매칭
* `e`는 직원, `m`은 관리자 역할

---

### 📄 예제 2: 같은 도시의 고객 매칭

```sql
SELECT c1.name AS customer1, c2.name AS customer2, c1.city
FROM customers c1
JOIN customers c2
  ON c1.city = c2.city
  AND c1.id < c2.id;
```

* 같은 도시의 서로 다른 고객 쌍 조회
* `c1.id < c2.id` 조건으로 중복 방지

---

### 📄 예제 3: 제품 가격 비교

```sql
SELECT p1.product_name AS product_a, p2.product_name AS product_b
FROM products p1
JOIN products p2
  ON p1.category_id = p2.category_id
  AND p1.price > p2.price;
```

* 같은 카테고리 내에서 가격이 더 높은 제품과 낮은 제품 비교

---

### 📄 예제 4: 계층 구조 (부서)

```sql
SELECT d1.department_name AS sub_dept, d2.department_name AS parent_dept
FROM departments d1
LEFT JOIN departments d2
  ON d1.parent_id = d2.department_id;
```

* 하위 부서와 상위 부서 관계 조회

---

### 📄 예제 5: 날짜 차이 계산

```sql
SELECT o1.order_id AS order_a, o2.order_id AS order_b,
       DATEDIFF(o2.order_date, o1.order_date) AS days_diff
FROM orders o1
JOIN orders o2
  ON o1.customer_id = o2.customer_id
  AND o1.order_date < o2.order_date;
```

* 같은 고객의 주문 간 날짜 차이 계산

---

### 🧠 실무 팁

* SELF JOIN은 데이터 양이 많으면 급격히 느려질 수 있음 → 인덱스 필수
* 조건을 잘 설정하지 않으면 **카테시안 곱(Cartesian Product)** 발생
* 계층 구조 데이터는 MySQL 8 이상에서 **CTE(재귀 쿼리)** 를 쓰면 더 깔끔하게 구현 가능

---

다음은 **48번 – JOIN + GROUP BY** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
