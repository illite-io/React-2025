`urlEndPoint` 함수는 일반적으로 URL에서 마지막 경로(엔드포인트)를 추출하는 데 사용됩니다. 아래는 다양한 방식의 예시입니다:

---

### ✅ 예시 1: 단순 URL에서 엔드포인트 추출

```javascript
function urlEndPoint(url) {
  // URL을 /로 나누고 마지막 값을 반환
  const parts = url.split('/');
  return parts.pop() || parts.pop(); // 끝에 /가 있을 경우를 대비해 두 번 pop
}

// 사용 예시
console.log(urlEndPoint("https://example.com/api/user/123")); // 123
console.log(urlEndPoint("https://example.com/api/user/"));    // user
```

---

### ✅ 예시 2: 쿼리스트링 제거하고 추출

```javascript
function urlEndPoint(url) {
  // 쿼리 스트링 제거
  const cleanUrl = url.split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/');
  return parts.pop() || parts.pop();
}

// 사용 예시
console.log(urlEndPoint("https://example.com/api/user/123?token=abc")); // 123
```

---

### ✅ 예시 3: `URL` 객체 사용 (권장 방식)

```javascript
function urlEndPoint(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    return parts.pop() || parts.pop();
  } catch (e) {
    return null; // 유효하지 않은 URL 처리
  }
}

// 사용 예시
console.log(urlEndPoint("https://example.com/api/user/123")); // 123
console.log(urlEndPoint("invalid-url")); // null
```

---

### ✅ 예시 4: 확장자 제거까지 고려한 엔드포인트 추출

```javascript
function urlEndPoint(url) {
  const u = new URL(url);
  let last = u.pathname.split('/').filter(Boolean).pop();
  return last?.split('.')[0] || null;
}

// 사용 예시
console.log(urlEndPoint("https://example.com/files/report.pdf")); // report
```

---

원하는 방식에 맞춰 커스터마이징 가능합니다. 특정 규칙이 있다면 알려주세요, 그에 맞게 수정해드릴 수 있습니다.
