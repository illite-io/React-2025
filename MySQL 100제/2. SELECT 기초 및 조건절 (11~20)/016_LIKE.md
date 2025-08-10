좋습니다.
**16번 – LIKE 연산자 + 와일드카드 `%`, `_`** 예제를 자세히 설명드리겠습니다.

---

## ✅ 16. LIKE 연산자 + 와일드카드 (`%`, `_`)

### 📌 개념

`LIKE`는 **문자열 패턴 일치 검색**을 할 때 사용합니다.
`=`는 정확히 일치할 때만 찾지만, `LIKE`는 일부 포함, 시작, 끝 등 **유사한 문자열 검색**이 가능합니다.

---

### 📄 와일드카드 종류

| 기호  | 의미                       |
| --- | ------------------------ |
| `%` | **0개 이상의 임의 문자** (부분 포함) |
| `_` | **정확히 한 글자**             |

---

### 📄 예제 1: 이름이 '김'으로 시작하는 고객

```sql
SELECT * FROM customers
WHERE name LIKE '김%';
```

→ '김민수', '김영희', '김' 포함한 이름 모두 조회됨

---

### 📄 예제 2: 이메일에 'naver' 가 포함된 고객

```sql
SELECT * FROM customers
WHERE email LIKE '%naver%';
```

→ `hong@naver.com`, `test.naver@abc.com` 등 모두 포함

---

### 📄 예제 3: 이름 두 번째 글자가 '철'인 고객

```sql
SELECT * FROM customers
WHERE name LIKE '_철%';
```

→ '이철수', '김철민' 등 조회됨

* 첫 글자는 아무거나 (`_`)
* 두 번째 글자는 '철'
* 이후는 0글자 이상 (`%`)

---

### 📘 반대 조건: `NOT LIKE`

```sql
SELECT * FROM customers
WHERE email NOT LIKE '%@gmail.com';
```

→ Gmail 사용자가 아닌 고객 조회

---

### 🧠 실무 팁

* LIKE `%단어%` 형태는 **인덱스를 타지 못해 성능 저하**가 발생할 수 있습니다.
* 전체 검색이 필요한 경우 **풀텍스트 인덱스 (FULLTEXT INDEX)** 를 고려하세요.
* `ILIKE`는 MySQL에는 없으며, PostgreSQL 전용입니다. MySQL에서 대소문자 구분 없이 검색하려면 `LOWER()`와 함께 사용합니다:

```sql
SELECT * FROM users
WHERE LOWER(email) LIKE '%naver%';
```

---

다음은 **17번 – NULL 값 조회 (`IS NULL`, `IS NOT NULL`)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
