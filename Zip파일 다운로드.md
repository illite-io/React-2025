아래는 **React에서 ZIP 파일 다운로드 버튼**을 구현하는 예시입니다.
예시는 백엔드에서 `zip` 파일을 응답해줄 수 있는 상황을 가정하고, 타입스크립트 없이 JS로 설명합니다.
버튼 클릭 시 zip 파일을 API에서 받아서 다운로드하는 기능입니다.

---

## ✅ 파일 구조

```
src/
├── components/
│   └── DownloadZipButton.js
├── api/
│   └── fileApi.js
```

---

## 📁 `src/api/fileApi.js`

```js
import axios from 'axios';

// zip 파일을 blob 형태로 받아오기
export const downloadZipFile = async () => {
  const response = await axios.get('http://localhost:8080/api/download/zip', {
    responseType: 'blob', // blob 형식으로 응답받음
  });
  return response.data; // blob 반환
};
```

---

## 📁 `src/components/DownloadZipButton.js`

```js
import React from 'react';
import { downloadZipFile } from '../api/fileApi';

const DownloadZipButton = () => {
  const handleDownload = async () => {
    try {
      const blob = await downloadZipFile(); // blob 데이터를 받음

      // blob을 이용한 다운로드 처리
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my-files.zip'); // 저장될 파일명 설정
      document.body.appendChild(link);
      link.click();
      link.remove(); // 링크 제거
      window.URL.revokeObjectURL(url); // 메모리 해제
    } catch (error) {
      alert('다운로드에 실패했습니다.');
      console.error('ZIP 다운로드 오류:', error);
    }
  };

  return (
    <button onClick={handleDownload}>
      📦 ZIP 파일 다운로드
    </button>
  );
};

export default DownloadZipButton;
```

---

## ✅ 백엔드 응답 예시 (Spring Boot 기준)

```java
@GetMapping("/api/download/zip")
public ResponseEntity<Resource> downloadZip() throws IOException {
    Path zipPath = Paths.get("C:/files/archive.zip");
    Resource resource = new UrlResource(zipPath.toUri());

    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"archive.zip\"")
        .body(resource);
}
```

---

## ✅ 출력 예

```html
📦 ZIP 파일 다운로드 (버튼 클릭 시 ZIP 다운로드)
```

---

원하시면:

* `"여러 파일 선택 → 압축 → zip 다운로드"` 예시도 만들어 드릴 수 있어요.
* `"클라이언트에서 직접 zip 만들기 (JSZip)"` 예제도 가능합니다.

계속하려면 **`.`** 입력해주세요.
