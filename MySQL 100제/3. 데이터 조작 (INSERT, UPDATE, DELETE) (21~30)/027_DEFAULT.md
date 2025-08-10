좋습니다.
**27번 – DEFAULT 값 설정** 예제를 설명드리겠습니다.

---

## ✅ 27. DEFAULT 값 설정

### 📌 개념

`DEFAULT`는 컬럼에 값을 넣지 않았을 때 **자동으로 채워질 기본값**을 지정하는 기능입니다.
주로 **생성일, 상태값, 초기 설정값** 등에 사용됩니다.

---

### 📄 예제 1: 기본 상태값 설정

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'Active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

* `status`를 입력하지 않으면 자동으로 `'Active'` 저장
* `created_at`을 입력하지 않으면 현재 시간이 자동 저장

---

### 📄 예제 2: DEFAULT 값 적용 확인

```sql
INSERT INTO customers (name)
VALUES ('홍길동');

SELECT * FROM customers;
```

**결과 예시:**

| id | name | status | created\_at         |
| -- | ---- | ------ | ------------------- |
| 1  | 홍길동  | Active | 2025-08-10 10:20:00 |

---

### 📄 예제 3: 기존 컬럼에 DEFAULT 추가

```sql
ALTER TABLE customers
ALTER COLUMN status SET DEFAULT 'Active';
```

---

### 📄 예제 4: DEFAULT 값 제거

```sql
ALTER TABLE customers
ALTER COLUMN status DROP DEFAULT;
```

---

### 🧠 실무 팁

* DEFAULT 값은 **INSERT 시 컬럼을 생략할 경우**에만 적용됩니다.
  NULL을 명시하면 DEFAULT가 적용되지 않고 NULL이 저장됩니다.
* 날짜 컬럼의 DEFAULT로 `NOW()`를 직접 사용할 수 없고, `CURRENT_TIMESTAMP`를 사용해야 합니다.
* DEFAULT 값 설정은 **데이터 무결성 유지와 코드 단순화**에 유용합니다.

---

다음은 **28번 – ON DUPLICATE KEY UPDATE** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
