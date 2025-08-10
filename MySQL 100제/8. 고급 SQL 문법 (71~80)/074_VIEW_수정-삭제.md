좋습니다.
**74번 – VIEW 수정/삭제** 예제를 설명드리겠습니다.

---

## ✅ 74. VIEW 수정/삭제

### 📌 개념

* **VIEW 수정**: `CREATE OR REPLACE VIEW` 또는 `ALTER VIEW` 사용
* **VIEW 삭제**: `DROP VIEW` 사용
* 뷰 수정 시 기존 권한, 의존성 관계를 고려해야 함

---

### 📄 예제 1: CREATE OR REPLACE VIEW로 수정

```sql
CREATE OR REPLACE VIEW customer_view AS
SELECT id, name, email, status
FROM customers
WHERE status IN ('ACTIVE', 'PENDING');
```

* 기존 `customer_view`를 새 정의로 덮어쓰기

---

### 📄 예제 2: ALTER VIEW로 수정

```sql
ALTER VIEW order_summary AS
SELECT customer_id, COUNT(*) AS total_orders, SUM(amount) AS total_amount
FROM orders
GROUP BY customer_id;
```

* `order_summary` 뷰에 총 금액 컬럼 추가

---

### 📄 예제 3: DROP VIEW로 삭제

```sql
DROP VIEW customer_view;
```

* `customer_view` 삭제

---

### 📄 예제 4: 여러 뷰 동시에 삭제

```sql
DROP VIEW customer_view, order_summary;
```

* 여러 뷰를 한 번에 삭제 가능

---

### 📄 예제 5: 뷰 존재 여부 확인 후 삭제

```sql
DROP VIEW IF EXISTS customer_view;
```

* 뷰가 없을 경우 오류 방지

---

### 🧠 실무 팁

* 뷰 수정 시 이를 참조하는 다른 뷰나 프로시저도 영향 받을 수 있음
* 대규모 뷰 변경 전 반드시 종속 객체 확인 (`INFORMATION_SCHEMA.VIEWS`)
* DROP 시 권한 및 애플리케이션 코드 의존성도 고려

---

다음은 **75번 – 저장 프로시저** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
