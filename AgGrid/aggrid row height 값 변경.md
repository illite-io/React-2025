AG Grid에서 `rowHeight` 값을 변경하는 방법은 여러 가지가 있습니다.
기본적으로는 `gridOptions` 또는 컴포넌트의 속성으로 설정할 수 있고, 동적으로도 변경 가능합니다.

---

## 1. **초기 rowHeight 설정**

```javascript
const gridOptions = {
  rowHeight: 50, // 기본 행 높이를 50px로 설정
  columnDefs: [...],
  rowData: [...],
};
```

또는 React 컴포넌트에서:

```jsx
<AgGridReact
  rowHeight={50} // 기본 row 높이 설정
  columnDefs={columnDefs}
  rowData={rowData}
/>
```

---

## 2. **행마다 높이 다르게 설정 (동적 설정)**

`getRowHeight` 함수를 사용해서 각 행의 높이를 조건에 따라 다르게 설정할 수 있습니다.

```javascript
const gridOptions = {
  getRowHeight: params => {
    if (params.data.type === 'big') {
      return 80;
    }
    return 40;
  },
};
```

React 예시:

```jsx
<AgGridReact
  getRowHeight={(params) => {
    return params.data.isExpanded ? 100 : 40;
  }}
  columnDefs={columnDefs}
  rowData={rowData}
/>
```

---

## 3. **실시간으로 rowHeight 변경 (API 사용)**

예를 들어 버튼 클릭 시 전체 행 높이를 변경하고 싶을 경우:

```jsx
<button onClick={() => gridRef.current.api.resetRowHeights()}>
  행 높이 리셋
</button>
```

또는 특정 row만 업데이트하려면:

```javascript
gridApi.getDisplayedRowAtIndex(index).setRowHeight(80);
gridApi.onRowHeightChanged();
```

---

## 참고 사항

* `rowHeight`나 `getRowHeight`를 사용하면 **모든 행의 높이가 고정 또는 조건에 따라 동적으로 설정**됩니다.
* 동적으로 높이를 설정할 경우 성능에 영향을 줄 수 있으니 주의가 필요합니다.

---

필요하신 경우 React에서 `gridRef` 사용법이나 스타일 관련 CSS 설정도 함께 설명드릴 수 있습니다. 원하시나요?
