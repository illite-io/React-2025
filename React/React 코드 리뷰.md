아래는 첨부해주신 코드를 기반으로, 줄마다 무슨 역할을 하는지 아주 자세하게 주석을 달아드린 버전입니다.

```javascript
// init 함수를 비동기(async) 함수로 선언
const init = async () => {
  // pageIds 배열에서 현재 pageNumber와 같은 page 객체를 찾고, 해당 page의 pageId를 가져옴
  const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;

  // pageId가 존재하는 경우에만 실행
  if (pageId) {
    // 사용자 제출 데이터와 제출 여부를 API에서 불러옴
    const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

    // 사용자 제출 데이터가 하나라도 있는 경우
    if (userSubmissionList.length > 0) {
      // setCardData로 기존 데이터(prev)를 유지하면서 해당 pageKey 데이터만 갱신
      setCardData(prev => ({
        ...prev, // 기존 데이터 복사
        [pageKey]: { // 현재 페이지 키에 해당하는 데이터 덮어쓰기
          ...prev[pageKey], // 기존 페이지 데이터 복사
          // 첫 번째 입력값(캔버스 경로) 가져오거나, 기존 cardData의 canvasPath1 값 유지
          canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasPath1,
          // 두 번째 입력값(캔버스 Data URL) 가져오거나, 기존 cardData의 canvasDataURL 값 유지
          canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].canvasDataURL,
          // 제출 여부 저장
          isSubmitted,
        },
      }));
    }

    // 제출되지 않은 경우
    if (!isSubmitted) {
      // 캔버스 Data URL이 있으면
      if (userSubmissionList[0].inputData[1]?.value || cardData[pageKey].canvasDataURL) {
        // 사용자 제출 데이터의 두 번째 값이 있으면 해당 값으로 캔버스 이미지 세팅
        if (userSubmissionList[0].inputData[1]?.value)
          canvasRef.current?.settingCanvasImageWithTempData(
            dataURLToBlob(userSubmissionList[0].inputData[1]?.value)
          );
        // 없으면 기존 cardData의 canvasDataURL 값으로 세팅
        else
          canvasRef.current?.settingCanvasImageWithTempData(
            dataURLToBlob(cardData[pageKey].canvasDataURL)
          );
      }
    }
    // 제출된 경우
    else {
      // 캔버스 경로 값이 있으면
      if (userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasPath1) {
        // 캔버스 이미지를 서버에서 불러오는 메서드 호출
        canvasRef.current?.settingCanvasImage({
          subjectCode: subjectCode, // 과목 코드
          // 사용자 제출 경로 값 또는 기존 경로 값
          uploadPath: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].canvasPath1,
        });
      }
    }
  }

  // initData 함수를 호출하여 초기 데이터 세팅
  initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
};
```

---

### 주요 동작 요약

1. **pageId 찾기**

   * 현재 `pageNumber`에 해당하는 `pageId`를 `pageIds` 배열에서 검색.
2. **사용자 제출 데이터 불러오기**

   * `getUserSubmission` API 호출로 `userSubmissionList`와 `isSubmitted` 가져옴.
3. **데이터 세팅**

   * `setCardData`를 통해 현재 페이지 데이터(`pageKey`)를 업데이트.
4. **제출 여부에 따라 다른 처리**

   * **미제출**: 로컬에 있는 Data URL 값으로 캔버스 이미지 설정.
   * **제출됨**: 서버의 저장 경로(`canvasPath1`)를 사용해 캔버스 이미지 불러오기.
5. **마지막 초기화**

   * `initData` 호출로 최종 상태 세팅.

---

원하시면 제가 이 코드를 **흐름 다이어그램**으로 시각화해서, 데이터가 어떤 조건에서 어디로 흐르는지도 같이 정리해드릴 수 있습니다.
그렇게 하면 이해가 훨씬 빨라집니다.

그걸 진행할까요?
