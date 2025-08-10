좋습니다.
**19번 – 결과 개수 제한 (`LIMIT`)** 예제를 자세히 설명드리겠습니다.

---

## ✅ 19. 결과 개수 제한 (`LIMIT`)

### 📌 개념

`LIMIT`은 **조회할 행(row)의 개수를 제한**할 때 사용합니다.
**페이징 처리**, **샘플 조회**, **최신 N건 출력** 등 다양한 상황에 사용됩니다.

---

### 📄 예제 1: 상위 5건만 조회

```sql
SELECT * FROM customers
LIMIT 5;
```

→ customers 테이블의 **앞에서 5행만 출력**

---

### 📄 예제 2: 정렬 후 상위 3건 조회

```sql
SELECT * FROM customers
ORDER BY created_at DESC
LIMIT 3;
```

→ 최근에 가입한 고객 3명만 조회

---

### 📄 예제 3: 페이징 (OFFSET 포함)

```sql
SELECT * FROM customers
ORDER BY id ASC
LIMIT 10 OFFSET 20;
```

→ 21번째 행부터 10건 출력 (21\~30번 행)
→ `OFFSET`은 0부터 시작

같은 의미 (MySQL 8+에서는 아래처럼도 가능):

```sql
LIMIT 20, 10;
```

→ `LIMIT 시작위치, 개수` 형태

---

### 🧠 실무 팁

* `LIMIT`은 많은 행을 다루는 페이지에서 **성능을 튜닝하기 위한 핵심 요소**입니다.
* **인덱스와 함께 정렬된 컬럼**을 기준으로 사용하는 것이 좋습니다.
* `OFFSET`이 클 경우 성능이 저하되므로 **커서 기반 페이지네이션**으로 전환 고려:

```sql
-- id가 100보다 큰 다음 페이지 10건
SELECT * FROM customers
WHERE id > 100
ORDER BY id ASC
LIMIT 10;
```

---

다음은 **20번 – 중복 제거 (`DISTINCT`)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
