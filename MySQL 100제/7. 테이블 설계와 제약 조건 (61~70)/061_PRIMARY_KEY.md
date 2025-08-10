좋습니다.
**61번 – PRIMARY KEY** 예제를 설명드리겠습니다.

---

## ✅ 61. PRIMARY KEY

### 📌 개념

* **기본 키**: 테이블에서 각 행을 **고유하게 식별**하는 컬럼(또는 컬럼 조합)
* 한 테이블에 **하나만 존재**
* `PRIMARY KEY`는 **자동으로 UNIQUE + NOT NULL** 제약이 적용됨
* 일반적으로 `AUTO_INCREMENT`와 함께 많이 사용

---

### 📄 예제 1: 기본 키 설정

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100)
);
```

* `id` 컬럼이 기본 키이자 자동 증가 값

---

### 📄 예제 2: 다중 컬럼 기본 키

```sql
CREATE TABLE orders (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

* 주문 ID + 상품 ID 조합이 유일해야 함

---

### 📄 예제 3: 기존 테이블에 기본 키 추가

```sql
ALTER TABLE customers
ADD PRIMARY KEY (id);
```

---

### 📄 예제 4: 기본 키 삭제

```sql
ALTER TABLE customers
DROP PRIMARY KEY;
```

---

### 📄 예제 5: INSERT 시 기본 키 중복 오류

```sql
INSERT INTO customers (id, name) VALUES (1, '홍길동'); 
-- 이미 id=1이 존재하면 Duplicate entry 오류 발생
```

---

### 🧠 실무 팁

* 기본 키는 조회 성능과 데이터 무결성 모두에 중요한 역할
* 정수형 PK가 성능상 유리 (특히 InnoDB에서는 클러스터 인덱스이기 때문)
* 자연 키보다 \*\*인조 키(surrogate key)\*\*를 권장 (예: AUTO\_INCREMENT id)
* MySQL InnoDB에서는 PK가 클러스터 인덱스로 동작 → PK 크기가 작을수록 성능 향상

---

다음은 **62번 – FOREIGN KEY** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
