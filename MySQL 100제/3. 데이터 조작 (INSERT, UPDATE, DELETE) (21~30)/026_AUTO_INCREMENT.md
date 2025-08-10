좋습니다.
**26번 – AUTO\_INCREMENT** 예제를 설명드리겠습니다.

---

## ✅ 26. AUTO\_INCREMENT

### 📌 개념

`AUTO_INCREMENT`는 테이블에서 **숫자 컬럼 값을 자동으로 증가**시켜주는 속성입니다.
주로 **기본 키(primary key)** 에 사용하여 각 행에 고유한 식별자를 부여합니다.

---

### 📄 예제 1: AUTO\_INCREMENT 기본 사용

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

* `id` 컬럼이 1부터 시작해서 새로운 행이 삽입될 때마다 자동으로 1씩 증가

---

### 📄 예제 2: 값 생략 시 자동 증가

```sql
INSERT INTO customers (name, email)
VALUES ('홍길동', 'hong@example.com');
```

→ `id` 값은 자동으로 증가하여 들어감

---

### 📄 예제 3: 시작 번호 변경

```sql
ALTER TABLE customers AUTO_INCREMENT = 100;
```

* 다음 삽입되는 행의 `id` 값이 100부터 시작

---

### 📄 예제 4: 현재 AUTO\_INCREMENT 값 확인

```sql
SHOW TABLE STATUS LIKE 'customers';
```

→ 결과의 `Auto_increment` 컬럼에서 현재 값 확인 가능

---

### 🧠 실무 팁

* AUTO\_INCREMENT는 삭제된 ID 값을 재사용하지 않음 (Gap 발생 가능)
* 여러 테이블 데이터를 통합하거나 복원할 때는 AUTO\_INCREMENT 값을 조정해야 할 수도 있음
* 기본 키를 복합키로 사용할 경우 AUTO\_INCREMENT는 오직 하나의 컬럼에만 적용 가능

---

다음은 **27번 – DEFAULT 값 설정** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
