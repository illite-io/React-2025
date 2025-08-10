좋습니다.
**64번 – NOT NULL** 예제를 설명드리겠습니다.

---

## ✅ 64. NOT NULL

### 📌 개념

* `NOT NULL` 제약 조건은 해당 컬럼이 **NULL 값을 가질 수 없도록** 설정
* 데이터 무결성 보장을 위해 필수 컬럼에 자주 사용
* `DEFAULT` 값과 함께 사용하면 데이터 입력 시 자동 값 지정 가능

---

### 📄 예제 1: NOT NULL 기본 사용

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100)
);
```

* `name` 컬럼은 반드시 값이 있어야 함

---

### 📄 예제 2: DEFAULT 값과 함께 사용

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE NOT NULL DEFAULT (CURRENT_DATE)
);
```

* `order_date`는 입력하지 않으면 현재 날짜로 자동 설정

---

### 📄 예제 3: 기존 테이블 컬럼에 NOT NULL 추가

```sql
ALTER TABLE customers
MODIFY name VARCHAR(50) NOT NULL;
```

---

### 📄 예제 4: 기존 컬럼에서 NOT NULL 제거

```sql
ALTER TABLE customers
MODIFY name VARCHAR(50) NULL;
```

---

### 📄 예제 5: NOT NULL 제약 위반 예시

```sql
INSERT INTO customers (name, email) VALUES (NULL, 'test@example.com');
-- 오류 발생: Column 'name' cannot be null
```

---

### 🧠 실무 팁

* NOT NULL 컬럼은 저장소와 성능 측면에서 유리
* 가능하면 NULL 허용보다는 **명확한 기본값**을 설정하는 것이 유지보수에 좋음
* 필수 입력값은 애플리케이션 레벨에서도 한번 더 검증하는 것이 안전

---

다음은 **65번 – CHECK** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
