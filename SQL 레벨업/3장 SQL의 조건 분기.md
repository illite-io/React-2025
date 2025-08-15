

# 3장. SQL의 조건 분기

## 3-1. UNION을 사용한 쓸데없이 긴 표현

`UNION`은 결과 집합을 합치는 연산입니다.
하지만 조건 분기(조건에 따라 다른 데이터 집합)에서 잘못 쓰면 불필요하게 길어집니다.

### 나쁜 예

```sql
-- 300 이상 주문과 300 미만 주문을 각각 뽑아 합침 (불필요하게 복잡)
SELECT order_id, total_amount, 'HIGH' AS grade
FROM orders
WHERE total_amount >= 300

UNION

SELECT order_id, total_amount, 'LOW' AS grade
FROM orders
WHERE total_amount < 300;
```

주석

* 동일한 테이블을 두 번 스캔 → 성능 낭비
* 조건 분기라면 `CASE`로 한 번에 처리 가능

### 좋은 예

```sql
SELECT
  order_id,
  total_amount,
  CASE WHEN total_amount >= 300 THEN 'HIGH' ELSE 'LOW' END AS grade
FROM orders;
```

* 한 번만 읽고 조건 분기 처리
* 유지보수와 성능 모두 유리

---

## 3-2. 집계와 조건 분기

집계 시 조건 분기를 넣으면 여러 통계를 한 번에 구할 수 있습니다.

```sql
-- 상태별 주문 금액 합계를 한 번에 구하기
SELECT
  customer_id,
  SUM(CASE WHEN status = 'PAID' THEN total_amount ELSE 0 END) AS sum_paid,
  SUM(CASE WHEN status = 'SHIP' THEN total_amount ELSE 0 END) AS sum_ship,
  SUM(CASE WHEN status = 'CANCEL' THEN total_amount ELSE 0 END) AS sum_cancel
FROM orders
GROUP BY customer_id;
```

주석

* `CASE WHEN ...`을 SUM 안에 넣으면 조건에 맞는 값만 합산
* 여러 조건 집계를 한 번에 계산 가능 → 쿼리 효율 향상

---

## 3-3. 그래도 UNION이 필요한 경우

`CASE`로는 불가능하거나 비효율적인 경우가 있습니다.
예를 들어, 컬럼 수나 타입이 다를 경우 `UNION`이 필요합니다.

```sql
-- 서로 다른 테이블의 동일한 형식 데이터 합치기
SELECT name AS item_name, price
FROM products

UNION ALL

SELECT name, total_amount
FROM orders
WHERE total_amount < 50;
```

주석

* 구조(컬럼 수/타입)가 맞으면 UNION 가능
* ALL을 붙이면 중복 제거를 하지 않아 빠름

---

## 3-4. 절차 지향형과 선언형

* **절차 지향형**: “어떻게” 할지를 개발자가 직접 지시 (프로그래밍 언어 스타일)
* **선언형(SQL)**: “무엇”을 원한다고 선언, 방법은 옵티마이저가 결정

### 절차 지향형 접근 (비효율)

```sql
-- 1) 고객 목록 가져오기
-- 2) 각 고객의 주문을 따로 조회 (반복문처럼 동작)
-- => 반복 I/O 발생
```

* 이런 방식은 애플리케이션에서 루프를 돌며 SQL을 여러 번 호출하는 패턴과 유사

### 선언형 접근 (효율)

```sql
-- 한 번에 조인해서 결과를 가져오기
SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id;
```

* DBMS가 내부적으로 조인 최적화 → 반복 호출 없이 한번에 데이터 수집

---

## 요약

* 불필요한 `UNION`은 `CASE`로 대체해 성능 개선
* 집계와 조건 분기를 합치면 다중 집계를 한 번에 처리 가능
* `UNION`은 구조가 다르거나 반드시 별도 집합 결합이 필요할 때 사용
* SQL은 “선언형” 사고방식으로 작성해야 성능과 유지보수가 좋음
