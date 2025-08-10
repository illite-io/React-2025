좋습니다.
**20번 – 중복 제거 (`DISTINCT`)** 예제를 자세히 설명드리겠습니다.

---

## ✅ 20. 중복 제거 (`DISTINCT`)

### 📌 개념

`DISTINCT`는 SELECT 문에서 **중복된 값을 제거하고 유일한 값만 조회**할 때 사용합니다.
특정 컬럼 또는 컬럼 조합에 대해 중복된 결과를 하나로 묶어 출력합니다.

---

### 📄 예제 1: 중복 없이 모든 이메일 주소 조회

```sql
SELECT DISTINCT email
FROM customers;
```

→ 같은 이메일이 여러 번 있어도 **한 번만 출력됨**

---

### 📄 예제 2: 이름 + 이메일의 조합이 유일한 행 조회

```sql
SELECT DISTINCT name, email
FROM customers;
```

→ 이름, 이메일 조합이 같은 행은 1개로 처리됨
(단일 컬럼이 아닌 **컬럼 조합 기준 중복 제거**)

---

### ✅ 예시 결과 (예: 아래와 같은 데이터가 있을 때)

| name | email                                       |
| ---- | ------------------------------------------- |
| 홍길동  | [hong@example.com](mailto:hong@example.com) |
| 홍길동  | [hong@example.com](mailto:hong@example.com) |
| 김철수  | [kim@example.com](mailto:kim@example.com)   |

**DISTINCT name, email** 결과:

| name | email                                       |
| ---- | ------------------------------------------- |
| 홍길동  | [hong@example.com](mailto:hong@example.com) |
| 김철수  | [kim@example.com](mailto:kim@example.com)   |

---

### 🧠 실무 팁

* `DISTINCT`는 무조건 성능이 좋은 것은 아닙니다.
  → **GROUP BY**가 더 명확한 상황도 많습니다.
* `DISTINCT`와 `ORDER BY`를 함께 사용할 수 있습니다:

```sql
SELECT DISTINCT email
FROM customers
ORDER BY email ASC;
```

* `COUNT(DISTINCT ...)` 으로 **유일한 값의 개수**를 셀 수 있습니다:

```sql
SELECT COUNT(DISTINCT email)
FROM customers;
```

→ 서로 다른 이메일 수를 반환

---

다음은 **21번 – 다중 INSERT** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
