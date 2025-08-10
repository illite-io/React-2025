AG Grid에서 `rowSelection`을 사용해 사용자가 선택한 **row(행)의 데이터**를 가져오려면, `gridApi.getSelectedRows()`를 사용합니다. 아래에 React와 일반 JavaScript 기준으로 모두 예시를 정리해드립니다.

---

## ✅ 1. 기본 설정 (`rowSelection="single"` 또는 `"multiple"`)

```jsx
<AgGridReact
  rowSelection="multiple" // 또는 "single"
  onGridReady={onGridReady}
  rowData={rowData}
  columnDefs={columnDefs}
/>
```

---

## ✅ 2. 선택된 행 데이터 가져오기 (React 기준)

```jsx
const gridRef = useRef();

const onGridReady = (params) => {
  gridRef.current = params.api;
};

// 예: 버튼 클릭 시 선택된 행 데이터 가져오기
const handleGetSelectedRows = () => {
  const selectedRows = gridRef.current.getSelectedRows();
  console.log('선택된 행 데이터:', selectedRows);
};
```

```jsx
<button onClick={handleGetSelectedRows}>선택된 행 확인</button>
```

---

## ✅ 3. 일반 JavaScript (Vanilla JS)

```javascript
const gridOptions = {
  rowSelection: 'multiple',
  onGridReady: function (params) {
    window.gridApi = params.api;
  }
};

// 버튼 클릭 시
function getSelectedRows() {
  const selectedRows = gridApi.getSelectedRows();
  console.log(selectedRows);
}
```

---

## ✅ 4. 선택 변경 이벤트 사용하기 (`onSelectionChanged`)

React 예시:

```jsx
<AgGridReact
  rowSelection="multiple"
  onSelectionChanged={(e) => {
    const selected = e.api.getSelectedRows();
    console.log('선택 변경됨:', selected);
  }}
  ...
/>
```

---

## ✅ 5. 선택된 row의 특정 필드만 가져오기

```javascript
const selected = gridApi.getSelectedRows();
const names = selected.map(row => row.name); // 예: name 필드만 추출
```

---

## 정리

| 방법                        | 설명                     |
| ------------------------- | ---------------------- |
| `rowSelection="multiple"` | 다중 선택 허용               |
| `api.getSelectedRows()`   | 선택된 행 전체 데이터 배열로 반환    |
| `onSelectionChanged`      | 선택 시마다 자동으로 감지하여 처리 가능 |

---

필요하시면 `checkboxSelection`, `headerCheckboxSelection`, `select all` 기능 연동이나, 선택된 row 색상 커스터마이징도 도와드릴 수 있습니다. 원하시나요?

---

선택 초기화

---

AG Grid에서 \*\*선택 초기화(선택 해제)\*\*를 하려면 `gridApi.deselectAll()` 메서드를 사용하면 됩니다. 아래에 상황별 예시를 정리해드립니다.

---

## ✅ 1. React에서 선택 초기화

```jsx
const gridRef = useRef();

const onGridReady = (params) => {
  gridRef.current = params.api;
};

// 버튼 클릭 시 선택 초기화
const handleClearSelection = () => {
  gridRef.current.deselectAll(); // 모든 선택 해제
};
```

```jsx
<button onClick={handleClearSelection}>선택 초기화</button>
```

---

## ✅ 2. 일반 JavaScript에서 선택 초기화

```javascript
const gridOptions = {
  rowSelection: 'multiple',
  onGridReady: function (params) {
    window.gridApi = params.api;
  }
};

// 버튼 클릭
function clearSelection() {
  gridApi.deselectAll(); // 선택 해제
}
```

---

## ✅ 3. 조건부 선택 해제

특정 row만 선택 해제하려면:

```javascript
const selectedNodes = gridApi.getSelectedNodes();
selectedNodes.forEach(node => {
  if (node.data.type === 'temporary') {
    node.setSelected(false); // 조건에 맞는 행만 선택 해제
  }
});
```

---

## ✅ 4. 단일 선택 모드(single)에서도 가능

```jsx
<AgGridReact
  rowSelection="single"
  onGridReady={(params) => {
    gridRef.current = params.api;
  }}
/>

// 단일 선택도 deselectAll() 사용 가능
gridRef.current.deselectAll();
```

---

필요하시면 체크박스 컬럼에서 선택 초기화하는 방법, 조건에 따라 자동 초기화하는 방법도 안내해 드릴 수 있습니다. 추가로 알려드릴까요?
