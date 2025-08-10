좋습니다.
**66번 – DEFAULT** 예제를 설명드리겠습니다.

---

## ✅ 66. DEFAULT

### 📌 개념

* `DEFAULT` 제약은 INSERT 시 해당 컬럼 값을 지정하지 않으면 **자동으로 기본값을 설정**
* `NOT NULL`과 함께 자주 사용
* 날짜, 숫자, 문자열 모두 가능
* MySQL에서는 `CURRENT_TIMESTAMP` 같은 함수도 DEFAULT로 지정 가능

---

### 📄 예제 1: 기본값 설정

```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    status VARCHAR(10) DEFAULT '판매중'
);
```

* `status`를 입력하지 않으면 기본값 `'판매중'` 적용

---

### 📄 예제 2: 날짜 기본값

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE DEFAULT (CURRENT_DATE)
);
```

* 주문일을 지정하지 않으면 오늘 날짜가 저장됨

---

### 📄 예제 3: 타임스탬프 기본값

```sql
CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

* 자동으로 현재 시각 기록

---

### 📄 예제 4: 기존 테이블에 DEFAULT 추가

```sql
ALTER TABLE products
ALTER status SET DEFAULT '판매중';
```

---

### 📄 예제 5: DEFAULT 제거

```sql
ALTER TABLE products
ALTER status DROP DEFAULT;
```

---

### 🧠 실무 팁

* DEFAULT 값은 **비즈니스 로직에서 자주 사용하는 값**으로 설정하면 좋음
* 날짜/시간 컬럼은 `CURRENT_TIMESTAMP`를 활용하면 편리
* NULL을 허용하는 컬럼에 DEFAULT를 지정하면 값 미입력 시 기본값이 적용되지만, NULL을 직접 넣으면 NULL 저장됨

---

다음은 **67번 – INDEX 생성** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
