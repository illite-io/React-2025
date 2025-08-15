

## 2장. SQL 기초

### 2-1. SELECT 구문 기본

**SELECT**는 데이터베이스에서 원하는 데이터를 조회하는 명령어입니다.

기본 구조:

```sql
SELECT [컬럼 목록]
FROM [테이블명]
WHERE [조건]
GROUP BY [그룹기준]
HAVING [그룹조건]
ORDER BY [정렬기준]
LIMIT [갯수];  -- MySQL, PostgreSQL에서 지원
```

---

### 예제 1: 전체 컬럼 조회

```sql
-- customers 테이블의 모든 데이터 보기
SELECT * FROM customers;
-- 주석:
-- *  → 모든 컬럼을 선택
-- 실제 서비스에서는 필요한 컬럼만 명시하는 것이 성능·유지보수에 유리
```

---

### 예제 2: 특정 컬럼만 조회

```sql
SELECT name, city
FROM customers;
-- 주석:
-- name과 city 컬럼만 가져옴
-- 불필요한 데이터 전송을 줄이는 습관이 중요
```

---

### 예제 3: WHERE로 조건 걸기

```sql
SELECT *
FROM orders
WHERE customer_id = 1;
-- 주석:
-- customer_id가 1인 고객의 주문만 가져옴
```

---

### 예제 4: AND / OR / 비교 연산

```sql
SELECT *
FROM orders
WHERE customer_id = 1
  AND total_amount >= 300;

SELECT *
FROM orders
WHERE status = 'PAID'
   OR status = 'SHIP';
-- 주석:
-- 첫 쿼리: 고객 ID가 1이고, 금액이 300 이상
-- 두 번째: 주문 상태가 'PAID' 또는 'SHIP'
```

---

### 예제 5: ORDER BY로 정렬

```sql
SELECT *
FROM orders
ORDER BY order_date DESC;
-- 주석:
-- 최근 주문부터 보여주기 위해 order_date를 내림차순(DESC) 정렬
```

---

### 예제 6: LIMIT로 상위 N개 가져오기

```sql
SELECT *
FROM orders
ORDER BY total_amount DESC
LIMIT 3;
-- 주석:
-- 금액이 큰 상위 3건만 가져옴
-- PostgreSQL/MySQL에서 지원
```

---

## 2-2. 조건 분기 (CASE)

조건에 따라 값을 다르게 표시할 때 사용합니다.

```sql
SELECT
  order_id,
  total_amount,
  CASE
    WHEN total_amount >= 1000 THEN 'VIP'
    WHEN total_amount >= 300  THEN 'STANDARD'
    ELSE 'BASIC'
  END AS customer_grade
FROM orders;
-- 주석:
-- 주문 금액에 따라 등급을 계산하여 customer_grade 컬럼으로 표시
```

---

## 2-3. 집합 연산 (UNION / UNION ALL)

여러 SELECT 결과를 합칠 수 있습니다.

```sql
-- 300 이상 주문
SELECT order_id, total_amount
FROM orders
WHERE total_amount >= 300

UNION

-- 2025년 6월 주문
SELECT order_id, total_amount
FROM orders
WHERE order_date BETWEEN DATE '2025-06-01' AND DATE '2025-06-30';
-- 주석:
-- UNION → 중복 제거 후 합침
-- UNION ALL → 중복 제거 없이 합침
```

---

## 2-4. 윈도우 함수 (ROW\_NUMBER, RANK 등)

그룹별 순위나 누적합 등을 계산할 때 사용합니다.

```sql
-- 고객별 주문 순번
SELECT
  order_id,
  customer_id,
  order_date,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq
FROM orders;
-- 주석:
-- PARTITION BY → 그룹 나누기 (고객별)
-- ORDER BY → 각 그룹 내에서 순번 매기기
```

---

## 2-5. 갱신 (UPDATE)

```sql
UPDATE customers
SET tier = 'A'
WHERE customer_id = 2;
-- 주석:
-- 고객 ID 2번의 tier를 'A'로 변경
```

---

## 2-6. 삭제 (DELETE)

```sql
DELETE FROM orders
WHERE order_id = 3;
-- 주석:
-- 주문 ID 3번 데이터 삭제
-- DELETE는 되돌리기 어려우므로 항상 WHERE 조건 필수
```

---

## 2-7. 삽입 (INSERT)

```sql
INSERT INTO customers(name, tier, city)
VALUES ('Frank', 'B', 'Gwangju');
-- 주석:
-- 새로운 고객 레코드 1건 추가
```

---

## 핵심 요약

* **SELECT**: 조회
* **WHERE**: 조건
* **ORDER BY**: 정렬
* **LIMIT**: 상위 일부만
* **CASE**: 조건 분기
* **UNION/UNION ALL**: 집합 결합
* **윈도우 함수**: 순위, 누적합, 그룹 내 계산
* **INSERT / UPDATE / DELETE**: 데이터 변경

