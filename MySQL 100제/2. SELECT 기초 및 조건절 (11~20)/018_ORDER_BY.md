좋습니다.
**18번 – 정렬 (`ORDER BY`)** 예제를 자세히 설명드리겠습니다.

---

## ✅ 18. 정렬 (`ORDER BY`)

### 📌 개념

`ORDER BY`는 조회된 데이터를 **특정 컬럼을 기준으로 정렬**할 때 사용합니다.
오름차순(ASC) 또는 내림차순(DESC)으로 지정할 수 있습니다.

---

### 📄 예제 1: 이름 오름차순 정렬

```sql
SELECT * FROM customers
ORDER BY name ASC;
```

* `ASC`는 오름차순 (기본값)
* 가나다 순으로 정렬됨

---

### 📄 예제 2: 생성일 내림차순 정렬 (최신순)

```sql
SELECT * FROM customers
ORDER BY created_at DESC;
```

* `DESC`는 내림차순
* 가장 최근에 등록된 고객이 먼저 표시됨

---

### 📄 예제 3: 여러 컬럼 기준으로 정렬

```sql
SELECT * FROM customers
ORDER BY name ASC, created_at DESC;
```

* 이름 오름차순 → 같은 이름일 경우 생성일 내림차순

---

### 📘 정렬 기준으로 숫자 컬럼도 사용 가능

```sql
SELECT * FROM customers
ORDER BY id DESC;
```

→ id가 가장 큰 행부터 출력

---

### 🧠 실무 팁

* 성능 상 **ORDER BY는 인덱스를 사용하지 않으면 느릴 수 있음**
* 대용량 테이블에서는 **정렬 컬럼에 인덱스를 설정하거나 LIMIT과 함께 사용**하세요:

```sql
SELECT * FROM customers
ORDER BY created_at DESC
LIMIT 10;
```

→ 최신 10건만 조회 (페이지네이션 용도)

---

다음은 **19번 – 결과 개수 제한 (`LIMIT`)** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
