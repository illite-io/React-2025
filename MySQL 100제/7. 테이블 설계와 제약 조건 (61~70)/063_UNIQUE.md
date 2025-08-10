좋습니다.
**63번 – UNIQUE** 예제를 설명드리겠습니다.

---

## ✅ 63. UNIQUE

### 📌 개념

* `UNIQUE` 제약 조건은 **컬럼 값이 중복되지 않도록** 보장
* `NULL`은 여러 개 가능 (MySQL 특성)
* 한 테이블에 여러 개의 UNIQUE 제약 가능
* **PRIMARY KEY**와 비슷하지만, `NULL` 허용 여부와 여러 개 생성 가능하다는 차이가 있음

---

### 📄 예제 1: UNIQUE 제약 조건 설정

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(50)
);
```

* `email` 컬럼 값이 중복될 수 없음

---

### 📄 예제 2: 다중 컬럼 UNIQUE

```sql
CREATE TABLE orders (
    order_id INT,
    product_id INT,
    quantity INT,
    UNIQUE (order_id, product_id)
);
```

* 주문 ID와 상품 ID 조합이 유일해야 함

---

### 📄 예제 3: 기존 테이블에 UNIQUE 추가

```sql
ALTER TABLE customers
ADD CONSTRAINT unique_email UNIQUE (email);
```

---

### 📄 예제 4: UNIQUE 제약 삭제

```sql
ALTER TABLE customers
DROP INDEX unique_email;
```

---

### 📄 예제 5: UNIQUE 위반 예시

```sql
INSERT INTO customers (email, name) VALUES ('test@example.com', '홍길동');
INSERT INTO customers (email, name) VALUES ('test@example.com', '김철수');
-- 두 번째 INSERT 시 Duplicate entry 오류 발생
```

---

### 🧠 실무 팁

* UNIQUE 인덱스는 데이터 무결성과 조회 성능 향상 모두에 유리
* 이메일, 사용자명, 주민등록번호 등 고유해야 하는 데이터에 적합
* 대소문자 구분 여부는 컬럼의 Collation 설정에 따라 다름 (`utf8mb4_general_ci` → 대소문자 구분 안 함)

---

다음은 **64번 – NOT NULL** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
