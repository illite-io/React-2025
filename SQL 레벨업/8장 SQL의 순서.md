

# 8장. SQL의 순서

## 8-1. 레코드에 순번 붙이기

SQL에서 행마다 번호를 매기는 방법은 **윈도우 함수**를 사용합니다.

---

### 예제 1: 전체 순번

```sql
SELECT
  ROW_NUMBER() OVER (ORDER BY order_date) AS rownum,
  order_id,
  order_date,
  total_amount
FROM orders;
-- 주석:
-- ROW_NUMBER() → 1부터 시작하는 순번 부여
-- ORDER BY로 순번 부여 기준 결정
```

---

### 예제 2: 그룹별 순번

```sql
SELECT
  customer_id,
  order_id,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS seq_in_customer
FROM orders;
-- 주석:
-- PARTITION BY → 고객별로 순번을 따로 부여
```

---

### 예제 3: 순위 (동점 처리)

```sql
SELECT
  customer_id,
  order_id,
  RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS rank_in_customer
FROM orders;
-- 주석:
-- RANK() → 동점 시 같은 순위, 다음 순위 건너뜀
-- DENSE_RANK() → 동점 시 같은 순위, 다음 순위 건너뛰지 않음
```

---

## 8-2. 시퀀스 객체, IDENTITY 필드

### PostgreSQL: 시퀀스 객체

```sql
-- 시퀀스 생성
CREATE SEQUENCE order_seq START 1000 INCREMENT 1;

-- 시퀀스 값 가져오기
SELECT nextval('order_seq'); -- 1000
SELECT currval('order_seq'); -- 1000
SELECT nextval('order_seq'); -- 1001

-- 시퀀스 사용하여 INSERT
INSERT INTO orders(order_id, customer_id, order_date, status, total_amount)
VALUES (nextval('order_seq'), 1, CURRENT_DATE, 'PAID', 500);
```

---

### MySQL: AUTO\_INCREMENT

```sql
CREATE TABLE sample (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);
-- INSERT 시 id는 자동 증가
INSERT INTO sample(name) VALUES ('Test');
```

---

### SQL Server: IDENTITY

```sql
CREATE TABLE sample (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(50)
);
```

---

## 8-3. 채번 테이블

채번 테이블은 별도의 테이블을 두고, 그 안에서 마지막 번호를 관리하는 방식입니다.
동시성 문제가 있어 **트랜잭션 잠금**이 필요합니다.

---

### 예제 4: 채번 테이블 생성

```sql
CREATE TABLE number_table (
  name VARCHAR(50) PRIMARY KEY,
  last_number INT NOT NULL
);

INSERT INTO number_table VALUES ('order', 1000);
```

---

### 예제 5: 채번 사용

```sql
-- 1) 현재 번호 읽기 + 증가
UPDATE number_table
SET last_number = last_number + 1
WHERE name = 'order';

-- 2) 새 번호 가져오기
SELECT last_number FROM number_table WHERE name = 'order';
```

---

## 요약

* ROW\_NUMBER / RANK / DENSE\_RANK로 순번·순위 부여 가능
* PostgreSQL은 SEQUENCE, MySQL은 AUTO\_INCREMENT, SQL Server는 IDENTITY 사용
* 채번 테이블은 직접 번호 관리 시 사용하지만 동시성 처리 필요

