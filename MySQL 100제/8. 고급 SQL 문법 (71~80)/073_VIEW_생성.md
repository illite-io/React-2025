좋습니다.
**73번 – VIEW 생성** 예제를 설명드리겠습니다.

---

## ✅ 73. VIEW 생성

### 📌 개념

* **VIEW**는 실제 데이터를 저장하지 않고, **SELECT 쿼리 결과를 가상의 테이블처럼** 사용하는 객체
* 복잡한 쿼리를 단순하게 재사용 가능
* 보안적으로 특정 컬럼만 노출할 때도 활용 가능

---

### 📄 예제 1: 기본 VIEW 생성

```sql
CREATE VIEW customer_view AS
SELECT id, name, email
FROM customers
WHERE status = 'ACTIVE';
```

* 활성 상태 고객만 보여주는 뷰 생성

---

### 📄 예제 2: 별칭 사용

```sql
CREATE VIEW order_summary AS
SELECT customer_id, COUNT(*) AS total_orders
FROM orders
GROUP BY customer_id;
```

* 고객별 주문 건수 요약 뷰

---

### 📄 예제 3: 기존 뷰 삭제 후 재생성

```sql
CREATE OR REPLACE VIEW customer_view AS
SELECT id, name
FROM customers;
```

* 기존 뷰가 있으면 덮어쓰기

---

### 📄 예제 4: 뷰 조회

```sql
SELECT * FROM customer_view;
```

* 뷰는 일반 테이블처럼 SELECT 가능

---

### 📄 예제 5: 뷰 목록 확인

```sql
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

---

### 🧠 실무 팁

* 뷰는 읽기 전용일 수 있으며, 업데이트 가능한 뷰는 제한적
* 인덱스는 뷰에 직접 걸 수 없고, 뷰 쿼리가 사용하는 테이블 인덱스에 의존
* 복잡한 조인/집계 쿼리를 자주 재사용할 경우 뷰로 관리하면 유지보수 편리

---

다음은 **74번 – VIEW 수정/삭제** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
