좋습니다.
**62번 – FOREIGN KEY** 예제를 설명드리겠습니다.

---

## ✅ 62. FOREIGN KEY

### 📌 개념

* **외래 키**: 다른 테이블의 기본 키(Primary Key) 또는 고유 키(Unique Key)를 참조하는 제약 조건
* 테이블 간 **참조 무결성**을 보장
* 기본적으로 참조 대상 값이 존재해야만 INSERT 가능
* 참조 대상이 삭제/수정될 때 연쇄 동작(`CASCADE`)을 설정 가능

---

### 📄 예제 1: 외래 키 설정

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

* `orders.customer_id`는 `customers.id`를 참조

---

### 📄 예제 2: CASCADE 옵션 사용

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) 
        REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

* 고객 삭제 시 해당 고객의 주문도 자동 삭제
* 고객 ID 변경 시 주문의 `customer_id`도 자동 변경

---

### 📄 예제 3: 기존 테이블에 외래 키 추가

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES customers(id);
```

---

### 📄 예제 4: 외래 키 삭제

```sql
ALTER TABLE orders
DROP FOREIGN KEY fk_customer;
```

---

### 📄 예제 5: FOREIGN KEY 제약 위반 예시

```sql
INSERT INTO orders (customer_id, order_date) 
VALUES (999, '2025-08-10');
-- customers.id=999가 없으면 오류 발생
```

---

### 🧠 실무 팁

* 외래 키를 사용하면 데이터 무결성 보장 가능하지만, **대규모 트래픽 환경에서는 성능 이슈** 발생 가능
* 많은 서비스는 **애플리케이션 레벨에서 무결성 관리**를 하고 DB 외래 키는 생략
* MySQL InnoDB에서만 외래 키 지원, MyISAM에서는 지원하지 않음
* `CASCADE` 옵션은 삭제/수정 시 대량의 연쇄 변경이 발생할 수 있어 주의

---

다음은 **63번 – UNIQUE** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
