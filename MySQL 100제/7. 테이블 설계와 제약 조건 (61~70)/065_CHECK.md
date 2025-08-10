좋습니다.
**65번 – CHECK** 예제를 설명드리겠습니다.

---

## ✅ 65. CHECK

### 📌 개념

* `CHECK` 제약 조건은 컬럼 값이 **특정 조건을 만족하는지** 검사
* 조건에 맞지 않으면 INSERT/UPDATE 시 오류 발생
* MySQL 8.0.16 이상에서만 **실제로 동작** (그 이전 버전은 구문만 허용하고 무시됨)

---

### 📄 예제 1: 나이 제한

```sql
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 18)
);
```

* 나이가 18세 이상만 입력 가능

---

### 📄 예제 2: 특정 값만 허용

```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    status VARCHAR(10) CHECK (status IN ('판매중', '품절', '단종'))
);
```

* `status`는 지정된 3개 값만 가능

---

### 📄 예제 3: 기존 테이블에 CHECK 추가

```sql
ALTER TABLE members
ADD CONSTRAINT chk_age CHECK (age >= 18);
```

---

### 📄 예제 4: CHECK 제약 삭제

```sql
ALTER TABLE members
DROP CHECK chk_age;
```

---

### 📄 예제 5: CHECK 제약 위반 예시

```sql
INSERT INTO members (name, age) VALUES ('홍길동', 15);
-- 오류: Check constraint 'chk_age' is violated.
```

---

### 🧠 실무 팁

* 데이터 무결성 보장에 유용하지만, 너무 많은 CHECK 제약은 성능에 영향을 줄 수 있음
* 범위나 허용 값이 바뀔 가능성이 있다면 **애플리케이션 레벨**에서 검증하는 것도 고려
* MySQL 8.0.16 이상인지 반드시 확인 후 사용

---

다음은 **66번 – DEFAULT** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
