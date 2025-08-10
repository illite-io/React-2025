좋습니다.
**106번 – LIMIT OFFSET 쿼리 성능 최적화** 예제를 설명드리겠습니다.

---

## ✅ 106. LIMIT OFFSET 쿼리 성능 최적화

### 📌 개념

* `LIMIT offset, count` 구문은 페이지네이션에 자주 사용
* OFFSET이 커질수록 불필요하게 많은 행을 읽게 되어 성능 저하 발생
* 대용량 데이터에서는 최적화가 필요

---

### 📄 예시 1: 기본 OFFSET 사용 (비효율)

```sql
-- 100페이지, 페이지당 10개씩 조회
SELECT * 
FROM Orders
ORDER BY 주문ID
LIMIT 990, 10;
```

* MySQL은 **앞의 990행도 모두 읽고 버림** → 느려짐

---

### 📄 예시 2: WHERE 조건으로 최적화

```sql
-- 마지막으로 본 주문ID를 기억하고 그 이후 데이터만 가져옴
SELECT * 
FROM Orders
WHERE 주문ID > 990
ORDER BY 주문ID
LIMIT 10;
```

* 불필요한 행 스캔 없이 바로 원하는 위치부터 조회 → 빠름

---

### 📄 예시 3: 서브쿼리로 최적화

```sql
SELECT * 
FROM Orders o
JOIN (
    SELECT 주문ID
    FROM Orders
    ORDER BY 주문ID
    LIMIT 990, 10
) t ON o.주문ID = t.주문ID;
```

* 필요한 주문ID만 먼저 찾고, 나중에 JOIN → 메모리 사용량 감소

---

### 📄 예시 4: 커버링 인덱스 활용

```sql
CREATE INDEX idx_order_id ON Orders(주문ID);

SELECT 주문ID, 고객ID, 주문일자
FROM Orders
WHERE 주문ID > 990
ORDER BY 주문ID
LIMIT 10;
```

* `Using index`로 처리되면 성능 향상

---

### 🧠 실무 팁

1. OFFSET이 큰 경우 → **마지막 키 기반 조회** 방식 사용
2. 페이지네이션 구현 시 인덱스 컬럼을 이용하면 효율적
3. 대규모 데이터에서 무한 스크롤 방식(다음 키 조회)이 더 성능 좋음

---

다음은 **107번 – JOIN 최적화 순서와 필터 조건 위치 조정** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
