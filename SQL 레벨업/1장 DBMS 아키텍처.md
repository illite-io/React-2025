
# 1장. DBMS 아키텍처

## 1-1. DBMS 아키텍처 개요

DBMS는 대략 아래처럼 동작합니다.

1. 클라이언트가 SQL을 보냄
2. 파서(Parser)가 문법 검사
3. 옵티마이저(Optimizer)가 “어떻게” 실행할지 계획(=실행 계획) 수립
4. 실행기(Executor)가 버퍼 캐시(Buffer Pool)를 이용해 페이지(블록) 단위로 데이터 읽기/쓰기
5. 트랜잭션/로그(Write-Ahead Logging, Undo/Redo) 관리로 일관성 보장

실습을 위해 작은 스키마부터 만들고, 이후 장들에서도 계속 재사용하겠습니다.

### 실습 스키마 만들기 (PostgreSQL)

```sql
-- PostgreSQL: 샘플 스키마
-- MySQL이라면 SERIAL 대신 AUTO_INCREMENT, boolean 대신 TINYINT(1) 등으로 바꾸면 됩니다.

-- 0) 깨끗한 실습용 스키마
DROP SCHEMA IF EXISTS lab CASCADE;      -- 전체 삭제 (주의!)
CREATE SCHEMA lab;
SET search_path TO lab;

-- 1) 고객
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,      -- MySQL: INT AUTO_INCREMENT PRIMARY KEY
  name        VARCHAR(100) NOT NULL,
  tier        VARCHAR(10)  NOT NULL,   -- e.g., 'A','B','C'
  city        VARCHAR(50)  NOT NULL
);

-- 2) 상품
CREATE TABLE products (
  product_id  SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(50)  NOT NULL,
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- 3) 주문
CREATE TABLE orders (
  order_id     SERIAL PRIMARY KEY,
  customer_id  INT NOT NULL REFERENCES customers(customer_id),
  order_date   DATE NOT NULL,
  status       VARCHAR(20) NOT NULL,   -- e.g., 'PAID','CANCEL','SHIP'
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0)
);

-- 4) 주문 상세
CREATE TABLE order_items (
  order_id    INT NOT NULL REFERENCES orders(order_id),
  product_id  INT NOT NULL REFERENCES products(product_id),
  qty         INT NOT NULL CHECK (qty > 0),
  unit_price  NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  PRIMARY KEY (order_id, product_id)   -- 한 주문에서 같은 상품은 1행
);

-- 5) 조회 성능을 위한 인덱스(예시)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- 6) 샘플 데이터
INSERT INTO customers(name, tier, city) VALUES
('Alice','A','Seoul'),('Bob','B','Busan'),('Carol','A','Incheon'),
('Dave','C','Seoul'),('Eve','B','Daejeon');

INSERT INTO products(name, category, price) VALUES
('Keyboard','Peripherals', 55.00), ('Mouse','Peripherals', 25.00),
('Monitor 27"','Display', 299.00), ('USB-C Cable','Accessory', 9.90),
('Laptop 14"','Computer', 1299.00), ('Desk Lamp','Accessory', 19.90);

INSERT INTO orders(customer_id, order_date, status, total_amount) VALUES
(1,'2025-01-03','PAID',  380.00),
(1,'2025-02-10','PAID',  1349.00),
(2,'2025-02-12','CANCEL',  25.00),
(3,'2025-03-01','PAID',   55.00),
(4,'2025-03-05','SHIP',  1318.90),
(5,'2025-04-18','PAID',   334.90),
(2,'2025-05-02','PAID',   19.90),
(3,'2025-05-21','PAID',  1318.90),
(1,'2025-06-11','PAID',  1324.90),
(5,'2025-06-29','SHIP',   29.80);

INSERT INTO order_items(order_id, product_id, qty, unit_price) VALUES
-- order 1
(1,1,1,55.00),(1,2,1,25.00),(1,3,1,299.00),(1,4,1,9.90),(1,6,1, -0.90 +  -0.00 +  -0.00 +  -0.00 +  -0.00); -- 편의상 합계만 맞추면 됨(실습 핵심 아님)
-- 간단히: 이후 주문들은 합계가 대략 맞는 선에서 일부 품목만 기입
(2,5,1,1299.00),
(3,2,1,25.00),
(4,1,1,55.00),
(5,5,1,1299.00),(5,4,2,9.95),
(6,3,1,299.00),(6,1,1,35.90),
(7,4,2,9.95),
(8,5,1,1299.00),(8,4,2,9.95),
(9,5,1,1299.00),(9,4,2,12.95),
(10,4,3,9.93);
```

> 참고: 위 `order_items`의 단가/합계는 “실행 계획/조인/인덱스” 데모가 목적이라 엄밀한 합계를 맞추는 게 핵심은 아닙니다.

---

## 1-2. DBMS와 버퍼(Buffer)

디스크 I/O는 느립니다. DBMS는 “버퍼 캐시(Buffer Pool)”에 자주 쓰는 페이지를 메모리에 보관해 반복 접근을 빠르게 만듭니다. 첫 조회는 느릴 수 있지만, 다음 조회는 버퍼에 있어 훨씬 빠릅니다.

### 버퍼 캐시 체감 실습

```sql
-- PostgreSQL: 실제 실행 시간까지 보고 싶으면 ANALYZE를 붙입니다.
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE order_date BETWEEN DATE '2025-05-01' AND DATE '2025-06-30';
-- 첫 실행: 디스크에서 읽어올 가능성 높음 → 상대적으로 느림

EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE order_date BETWEEN DATE '2025-05-01' AND DATE '2025-06-30';
-- 두 번째 실행: 직전에 읽은 페이지가 버퍼에 남아있어 더 빠를 가능성
```

```sql
-- MySQL (5.7+/8.0):
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE order_date BETWEEN '2025-05-01' AND '2025-06-30';
-- 또는 EXPLAIN FORMAT=JSON SELECT ...; 로 계획을 JSON으로 확인
```

코드 주석 설명

* `EXPLAIN`/`EXPLAIN ANALYZE`

  * 실행 계획을 확인 (`ANALYZE`는 실제 실행 + 측정치까지 포함)
* `BETWEEN ...`

  * 범위 조건. 인덱스가 order\_date에 있으면 “인덱스 범위 스캔”이 가능

---

## 1-3. DBMS와 실행 계획(Execution Plan)

SQL은 “무엇을” 요청하는 언어이고, “어떻게” 가져올지는 옵티마이저가 결정합니다. 같은 결과라도 인덱스 사용 여부, 조인 방식에 따라 성능 차이가 큽니다.

### 실행 계획 확인 방법(요약)

```sql
-- PostgreSQL
EXPLAIN SELECT * FROM orders WHERE customer_id = 1;
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1;

-- MySQL
EXPLAIN SELECT * FROM orders WHERE customer_id = 1;
EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE customer_id = 1\G

-- Oracle
EXPLAIN PLAN FOR SELECT * FROM orders WHERE customer_id = 1;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- SQL Server
SET SHOWPLAN_ALL ON;      -- 계획만 보고 실제 실행은 하지 않음
SELECT * FROM orders WHERE customer_id = 1;
SET SHOWPLAN_ALL OFF;
```

### 인덱스에 따라 달라지는 계획

```sql
-- 1) 인덱스가 있어 효율적인 인덱스 스캔이 기대되는 쿼리
EXPLAIN
SELECT *
FROM orders
WHERE customer_id = 1
  AND order_date >= DATE '2025-06-01';
-- 주석: idx_orders_customer_date(customer_id, order_date)가 있어
--       (customer_id=1) → (order_date 범위) 순으로 인덱스 범위 스캔 가능

-- 2) 인덱스가 없거나 열 순서가 맞지 않으면
--    테이블 전체를 훑는 Seq Scan(=Full Table Scan)이 나올 수 있음
DROP INDEX IF EXISTS idx_orders_customer_date;
EXPLAIN
SELECT *
FROM orders
WHERE customer_id = 1
  AND order_date >= DATE '2025-06-01';
-- 주석: 복합 인덱스가 사라져서 풀스캔/필터 조합으로 나올 가능성 높음

-- 3) 다시 인덱스 생성(열 순서 주의: 자주 함께 쓰는 조건의 선행열부터)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
```

핵심

* “조건에서 자주 쓰고, 카디널리티(선택도)가 높은 열”을 **복합 인덱스의 선행열**로 잡으면 유리
* 인덱스는 많다고 무조건 좋은 게 아니라 “읽기/쓰기 트레이드오프”가 있음(5장, 10장에서 더 자세히)

---

## 1-4. 실행 계획이 SQL 구문의 성능을 결정

같은 결과를 “다른 SQL”로도 얻을 수 있지만, 비용(읽는 페이지 수/정렬/조인 방식)이 달라집니다.

### 예시 A: EXISTS vs IN vs JOIN

```sql
-- 목표: 상품이 'Accessory' 카테고리인 주문만 가져오기

-- A-1) EXISTS (상관 서브쿼리)
EXPLAIN
SELECT o.*
FROM orders o
WHERE EXISTS (
  SELECT 1
  FROM order_items oi
  JOIN products p ON p.product_id = oi.product_id
  WHERE oi.order_id = o.order_id
    AND p.category = 'Accessory'
);
-- 주석: o행마다 order_items/products를 조건으로 검사
--       보통 관련 인덱스 있으면 매우 효율적

-- A-2) IN (집합 포함)
EXPLAIN
SELECT *
FROM orders
WHERE order_id IN (
  SELECT oi.order_id
  FROM order_items oi
  JOIN products p ON p.product_id = oi.product_id
  WHERE p.category = 'Accessory'
);
-- 주석: 서브쿼리 결과 집합과 비교
--       옵티마이저가 반정규화/세미조인으로 바꾸어 효율적으로 실행하기도 함

-- A-3) JOIN 후 DISTINCT
EXPLAIN
SELECT DISTINCT o.*
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p    ON p.product_id  = oi.product_id
WHERE p.category = 'Accessory';
-- 주석: JOIN + DISTINCT는 불필요한 중복을 정리해야 해서 정렬/해시 비용이 들 수 있음
```

일반 팁

* “있다/없다” 여부만 확인할 때는 `EXISTS`가 불필요한 중복을 피워 깔끔한 경우가 많습니다.
* 하지만 DB/통계/인덱스 상황에 따라 옵티마이저가 셋 중 어느 것을 선택해도 비슷할 때도 있습니다. **실행 계획을 보고 판단**하세요.

### 예시 B: 정렬/Top-N 최적화

```sql
-- 최근 주문 5건만
EXPLAIN
SELECT *
FROM orders
ORDER BY order_date DESC
LIMIT 5;
-- 주석: (order_date DESC)로 정렬하는 비용 발생
--       인덱스가 order_date DESC/ASC로 유리하게 잡혀 있으면
--       Top-N 최적화로 '정렬 없이' 상단 일부만 가져올 수 있음(DBMS마다 다름)

-- 보조 인덱스로 Top-N 최적화 힌트를 주기
CREATE INDEX idx_orders_date_desc ON orders(order_date DESC);
EXPLAIN
SELECT *
FROM orders
ORDER BY order_date DESC
LIMIT 5;
-- 주석: 인덱스 스캔만으로 상위 5개를 가져오면 Sort 비용이 없거나 크게 줄어듦
```

### 예시 C: GROUP BY vs 윈도우 함수

```sql
-- 고객별 총 주문액
EXPLAIN
SELECT customer_id, SUM(total_amount) AS sum_amount
FROM orders
GROUP BY customer_id;
-- 주석: 그룹 단위로 모으는 집계. 인덱스/해시/정렬 전략에 따라 비용 달라짐

-- 고객별 총 주문액을 '행마다' 같이 보여주기(윈도우)
EXPLAIN
SELECT
  o.*,
  SUM(o.total_amount) OVER (PARTITION BY o.customer_id) AS sum_by_customer
FROM orders o;
-- 주석: 윈도우 함수는 행을 줄이지 않고 "옆 칼럼"처럼 합계를 붙임
--       상황에 따라 해시/정렬 기반 윈도우가 동원됨
```

---

## 1-5. 실행 계획의 중요성

왜 중요할까요?

* **인덱스가 있는데도 느리다** → 실행 계획을 보면 실제로 인덱스를 타는지, 왜 안 타는지(통계/형변환/함수 사용 등) 원인을 확인 가능
* **쿼리가 간단해 보여도** → 조인 순서, 카디널리티 추정 오류로 풀스캔/거대 정렬이 터질 수 있음
* **같은 결과라도** → EXISTS/IN/JOIN/윈도우/CTE 등 표현에 따라 계획이 크게 달라져 수십\~수백 배 차이가 날 수 있음

### 체크리스트(바로 써먹기)

1. 실행 계획에서 **Table/Seq Scan**이 과도한지 확인
2. 필터 조건 열에 맞춘 **복합 인덱스 선행열**이 적절한지
3. **정렬(Sort)** 비용이 큰데 `ORDER BY + LIMIT`의 Top-N 최적화를 유도할 수 있는지
4. JOIN에서 **드라이빙 테이블**(선행 접근) 선택이 타당한지, **조인 알고리즘**(Nested Loop/Hash/Merge)을 납득할 수 있는지
5. 통계가 낡아 **카디널리티 추정**이 엇나간 건 아닌지(ANALYZE/STATISTICS 갱신)

---

# 부록: 더 손에 잡히는 미니 실험들

### 1) “형변환/함수” 때문에 인덱스를 못 탈 수도 있음

```sql
-- 나쁜 예: 컬럼에 함수를 씌우면 인덱스 사용을 방해할 수 있음
EXPLAIN
SELECT *
FROM orders
WHERE TO_CHAR(order_date, 'YYYY-MM') = '2025-06';
-- 주석: order_date에 함수가 적용되어 인덱스 범위 스캔 곤란

-- 좋은 예: 값 쪽을 변환해서 비교 (DB별로 조금씩 다름)
EXPLAIN
SELECT *
FROM orders
WHERE order_date >= DATE '2025-06-01'
  AND order_date <  DATE '2025-07-01';
-- 주석: 인덱스 범위 스캔 유리
```

### 2) 커버링 인덱스(선택)

```sql
-- 필요한 컬럼이 전부 인덱스에 있으면 테이블로 내려가지 않아 더 빠를 수 있음
CREATE INDEX idx_orders_cov ON orders(customer_id, order_date, status);
EXPLAIN
SELECT customer_id, order_date, status
FROM orders
WHERE customer_id = 1
ORDER BY order_date DESC
LIMIT 3;
-- 주석: 일부 DB에선 'Index Only Scan' 가능 (가시성 판단 위해 힙 접근 필요할 수도 있음)
```

---

# 정리

* DBMS는 파서 → 옵티마이저 → 실행기 → 버퍼/트랜잭션 계층으로 이뤄집니다.
* “무엇을” 쓰는 SQL과 “어떻게” 실행하는 계획은 별개입니다. **실행 계획을 항상 확인**하세요.
* 인덱스 설계(복합 인덱스 선행열), 정렬/Top-N, EXISTS/IN/JOIN 선택, 함수/형변환 회피가 초기 체감 성능을 크게 좌우합니다.
* 다음 장부터는 SELECT 문법과 조건 분기(UNION/CASE/집합/윈도우)로 넘어가며, 여기서 만든 스키마를 계속 씁니다.

