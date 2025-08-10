좋습니다.
**109번 – 서브쿼리보다 JOIN이 유리한 경우** 예제를 설명드리겠습니다.

---

## ✅ 109. 서브쿼리보다 JOIN이 유리한 경우

### 📌 개념

* MySQL에서 **서브쿼리**는 가독성은 좋지만, 실행 성능이 떨어질 수 있음
* 특히 WHERE 절 안의 **비상관 서브쿼리**나 FROM 절 안의 서브쿼리는 임시 테이블 생성 비용이 발생
* 동일한 결과를 JOIN으로 구현하면 성능이 더 좋아질 수 있음

---

### 📄 예시 1: 서브쿼리 사용 (비효율)

```sql
SELECT 고객명
FROM Customers
WHERE 고객ID IN (
    SELECT 고객ID
    FROM Orders
    WHERE 주문금액 > 100000
);
```

* Orders에서 조건을 만족하는 고객ID 목록을 만든 뒤 Customers를 조회
* MySQL 버전에 따라 **임시 테이블**과 **중첩 루프**가 발생할 수 있음

---

### 📄 예시 2: JOIN으로 변경 (효율)

```sql
SELECT DISTINCT c.고객명
FROM Customers c
JOIN Orders o ON c.고객ID = o.고객ID
WHERE o.주문금액 > 100000;
```

* 두 테이블을 바로 JOIN
* 옵티마이저가 인덱스를 이용해 더 빠르게 처리 가능

---

### 📄 예시 3: EXISTS 사용

```sql
SELECT 고객명
FROM Customers c
WHERE EXISTS (
    SELECT 1
    FROM Orders o
    WHERE o.고객ID = c.고객ID
      AND o.주문금액 > 100000
);
```

* EXISTS는 조건 만족 시 즉시 TRUE 반환
* JOIN보다 가독성이 좋으면서도 서브쿼리의 비효율을 줄일 수 있음

---

### 🧠 실무 팁

1. JOIN은 한 번의 스캔으로 두 테이블을 결합하므로 일반적으로 빠름
2. WHERE 서브쿼리는 가급적 JOIN 또는 EXISTS로 변환
3. 단, 데이터 중복이 많은 경우 JOIN은 결과 중복이 발생할 수 있어 `DISTINCT` 필요
4. 항상 `EXPLAIN`으로 비교 후 선택

---

다음은 **110번 – 실전 튜닝 사례: 느린 쿼리 해결 과정 실습** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
