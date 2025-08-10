좋습니다.
**78번 – TRIGGER** 예제를 설명드리겠습니다.

---

## ✅ 78. TRIGGER (트리거)

### 📌 개념

* **트리거**는 특정 이벤트(INSERT, UPDATE, DELETE)가 발생할 때 **자동 실행**되는 SQL 코드
* 데이터 변경 전(`BEFORE`) 또는 후(`AFTER`)에 동작 가능
* 로깅, 데이터 검증, 자동 연계 작업 등에 사용

---

### 📄 예제 1: INSERT 트리거 (AFTER)

```sql
DELIMITER //

CREATE TRIGGER after_customer_insert
AFTER INSERT ON customers
FOR EACH ROW
BEGIN
    INSERT INTO logs(action, description, created_at)
    VALUES ('INSERT', CONCAT('신규 고객 등록: ', NEW.name), NOW());
END //

DELIMITER ;
```

* 고객 등록 후 로그 테이블에 기록

---

### 📄 예제 2: UPDATE 트리거 (BEFORE)

```sql
DELIMITER //

CREATE TRIGGER before_customer_update
BEFORE UPDATE ON customers
FOR EACH ROW
BEGIN
    IF NEW.email NOT LIKE '%@%' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '유효하지 않은 이메일 형식';
    END IF;
END //

DELIMITER ;
```

* 이메일 형식이 잘못되면 UPDATE 차단

---

### 📄 예제 3: DELETE 트리거 (AFTER)

```sql
DELIMITER //

CREATE TRIGGER after_customer_delete
AFTER DELETE ON customers
FOR EACH ROW
BEGIN
    INSERT INTO logs(action, description, created_at)
    VALUES ('DELETE', CONCAT('삭제된 고객 ID: ', OLD.id), NOW());
END //

DELIMITER ;
```

* 삭제된 고객 정보를 로그에 기록

---

### 📄 예제 4: 트리거 목록 확인

```sql
SHOW TRIGGERS;
```

---

### 📄 예제 5: 트리거 삭제

```sql
DROP TRIGGER IF EXISTS after_customer_insert;
```

---

### 🧠 실무 팁

* 트리거는 자동 실행되므로 디버깅 어려움 → 로직이 복잡해지지 않게 관리
* 트리거 안에서 다른 테이블 변경 시 **무한 루프** 방지 필요
* 데이터 변경 추적(감사 로그) 구현 시 매우 유용

---

다음은 **79번 – 사용자 정의 함수 (UDF)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
