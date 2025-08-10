좋습니다.
**108번 – 대용량 INSERT 시 성능 최적화 전략** 예제를 설명드리겠습니다.

---

## ✅ 108. 대용량 INSERT 시 성능 최적화 전략

### 📌 개념

* 수십만\~수백만 건 데이터를 한 번에 INSERT하면 성능 저하 및 락 경합 발생
* MySQL 설정과 쿼리 작성 방식을 조정하여 속도를 크게 개선 가능

---

### 📄 예시 1: 다중 VALUES 사용

```sql
INSERT INTO Orders (주문ID, 고객ID, 주문일자)
VALUES 
('O100001', 'C01', '2025-08-10'),
('O100002', 'C02', '2025-08-10'),
('O100003', 'C03', '2025-08-10');
```

* 개별 INSERT보다 훨씬 빠름
* 단, 한 쿼리당 패킷 크기(`max_allowed_packet`) 제한 고려

---

### 📄 예시 2: LOAD DATA INFILE 사용

```sql
LOAD DATA INFILE '/var/lib/mysql-files/orders.csv'
INTO TABLE Orders
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
(주문ID, 고객ID, 주문일자);
```

* CSV → MySQL로 직접 로드
* 수백만 건도 매우 빠르게 처리 가능
* `secure_file_priv` 설정 필요

---

### 📄 예시 3: 인덱스 비활성화 후 삽입

```sql
ALTER TABLE Orders DISABLE KEYS;

-- 대량 INSERT 작업 실행

ALTER TABLE Orders ENABLE KEYS;
```

* MyISAM에서만 지원, InnoDB는 자동 처리 불가
* 인덱스 재구성이 한 번만 수행되므로 빠름

---

### 📄 예시 4: 트랜잭션 활용

```sql
START TRANSACTION;

INSERT INTO Orders (...) VALUES (...);
INSERT INTO Orders (...) VALUES (...);

COMMIT;
```

* 다수의 INSERT를 하나의 트랜잭션으로 묶어 COMMIT 횟수 감소

---

### 📄 예시 5: 외래키 체크 해제

```sql
SET FOREIGN_KEY_CHECKS = 0;

-- 대량 INSERT 실행

SET FOREIGN_KEY_CHECKS = 1;
```

* 외래키 검사를 끄면 성능 향상
* 단, 데이터 무결성에 주의

---

### 🧠 실무 팁

1. **다중 VALUES** 또는 **LOAD DATA INFILE** 우선 고려
2. 트랜잭션으로 COMMIT 횟수 최소화
3. 인덱스와 외래키 체크는 작업 전후로 관리
4. 작업 전후 테이블 분석(`ANALYZE TABLE`)과 최적화(`OPTIMIZE TABLE`) 수행

---

다음은 **109번 – 서브쿼리보다 JOIN이 유리한 경우** 예제로 넘어갑니다.
계속하시려면 `.` 을 입력해주세요.
