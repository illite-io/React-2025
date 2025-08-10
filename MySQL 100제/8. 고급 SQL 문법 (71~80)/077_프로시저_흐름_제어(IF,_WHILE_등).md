좋습니다.
**77번 – 프로시저 흐름 제어(IF, WHILE 등)** 예제를 설명드리겠습니다.

---

## ✅ 77. 프로시저 흐름 제어 (IF, WHILE 등)

### 📌 개념

* 저장 프로시저 내에서는 **조건문(IF, CASE)**, **반복문(WHILE, LOOP, REPEAT)** 등을 사용 가능
* 로직을 제어하여 더 복잡한 비즈니스 처리가 가능
* BEGIN ... END 블록 내부에서만 사용 가능

---

### 📄 예제 1: IF 조건문

```sql
DELIMITER //

CREATE PROCEDURE check_vip_status(IN cust_id INT)
BEGIN
    DECLARE total_amount DECIMAL(10,2);

    SELECT SUM(amount) INTO total_amount
    FROM orders
    WHERE customer_id = cust_id;

    IF total_amount >= 100000 THEN
        SELECT 'VIP 고객입니다' AS status;
    ELSE
        SELECT '일반 고객입니다' AS status;
    END IF;
END //

DELIMITER ;
```

* 고객의 총 구매액을 기준으로 VIP 여부 판단

---

### 📄 예제 2: CASE 문

```sql
DELIMITER //

CREATE PROCEDURE grade_customer(IN cust_id INT)
BEGIN
    DECLARE total_amount DECIMAL(10,2);

    SELECT SUM(amount) INTO total_amount
    FROM orders
    WHERE customer_id = cust_id;

    CASE
        WHEN total_amount >= 200000 THEN SELECT '플래티넘';
        WHEN total_amount >= 100000 THEN SELECT '골드';
        ELSE SELECT '실버';
    END CASE;
END //

DELIMITER ;
```

---

### 📄 예제 3: WHILE 반복문

```sql
DELIMITER //

CREATE PROCEDURE countdown(IN start_num INT)
BEGIN
    DECLARE counter INT DEFAULT start_num;

    WHILE counter > 0 DO
        SELECT counter;
        SET counter = counter - 1;
    END WHILE;
END //

DELIMITER ;
```

* 지정한 숫자부터 1까지 카운트다운

---

### 📄 예제 4: LOOP + LEAVE

```sql
DELIMITER //

CREATE PROCEDURE simple_loop()
BEGIN
    DECLARE i INT DEFAULT 1;
    loop_label: LOOP
        IF i > 5 THEN
            LEAVE loop_label;
        END IF;
        SELECT i;
        SET i = i + 1;
    END LOOP;
END //

DELIMITER ;
```

---

### 📄 예제 5: REPEAT UNTIL

```sql
DELIMITER //

CREATE PROCEDURE repeat_example()
BEGIN
    DECLARE i INT DEFAULT 1;
    REPEAT
        SELECT i;
        SET i = i + 1;
    UNTIL i > 5
    END REPEAT;
END //

DELIMITER ;
```

---

### 🧠 실무 팁

* 로직이 복잡할수록 조건문과 반복문을 적극 활용
* 무한 루프 방지를 위해 반드시 종료 조건을 설정
* 데이터 처리량이 많으면 반복문 대신 SQL 집합 연산을 고려 (성능 향상)

---

다음은 **78번 – TRIGGER** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
