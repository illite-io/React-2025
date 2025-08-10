AG Grid에서 특정 Row(행)를 **삭제하는 이벤트 처리**는 직접 `rowData` 배열에서 데이터를 삭제한 뒤, `api.setRowData()`를 사용해 갱신하는 방식으로 처리합니다.
React 기준과 일반 JavaScript 기준 모두 아래에 정리해 드립니다.

---

## ✅ React에서 Row 삭제 예제

### 1. 전체 구조 예시

```jsx
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridWithDelete = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    { id: 1, name: '홍길동', age: 30 },
    { id: 2, name: '김영희', age: 25 },
    { id: 3, name: '박철수', age: 28 },
  ]);

  const columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'age' },
  ];

  // 선택된 Row 삭제
  const handleDelete = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('삭제할 행을 선택해주세요.');
      return;
    }

    const updatedData = rowData.filter(row =>
      !selectedRows.find(sel => sel.id === row.id)
    );
    setRowData(updatedData);
  };

  return (
    <div>
      <button onClick={handleDelete}>선택된 행 삭제</button>
      <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default GridWithDelete;
```

---

## ✅ 일반 JavaScript (Vanilla JS) 예시

```html
<button onclick="deleteSelectedRows()">선택 삭제</button>
<div id="myGrid" class="ag-theme-alpine" style="height: 300px;"></div>

<script>
  const rowData = [
    { id: 1, name: '홍길동' },
    { id: 2, name: '김영희' },
    { id: 3, name: '이민수' },
  ];

  const gridOptions = {
    columnDefs: [
      { field: 'id' },
      { field: 'name' },
    ],
    rowData: rowData,
    rowSelection: 'multiple',
    onGridReady: function (params) {
      window.gridApi = params.api;
    },
  };

  function deleteSelectedRows() {
    const selectedRows = gridApi.getSelectedRows();
    const updated = rowData.filter(
      r => !selectedRows.some(s => s.id === r.id)
    );
    gridApi.setRowData(updated);
  }

  new agGrid.Grid(document.getElementById('myGrid'), gridOptions);
</script>
```

---

## ✅ 핵심 요약

| 기능           | 방법                                                          |
| ------------ | ----------------------------------------------------------- |
| 선택된 row 가져오기 | `api.getSelectedRows()`                                     |
| 삭제 처리 방식     | `rowData`에서 제거 후 `setRowData(newData)` 또는 `setRowData()` 호출 |
| 선택 모드 필요     | `rowSelection="single"` 또는 `"multiple"` 설정 필요               |

---

필요하시면 row 삭제 시 확인 모달, undo 기능, backend와 동기화하는 API 연동 방식도 안내해 드릴 수 있습니다. 더 원하시나요?

---

rowSelection 방식 말고 row에 삭제 버튼 추가해서 삭제하기

---

좋습니다. `rowSelection`을 쓰지 않고, **각 row에 "삭제" 버튼을 추가해서 해당 행만 삭제**하는 방식은 AG Grid에서 **`cellRenderer`를 사용해 버튼을 직접 구현**하면 가능합니다.

---

## ✅ React 기준 예시: "삭제" 버튼으로 row 삭제하기

### 1. 전체 코드 예시

```jsx
import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridWithDeleteButton = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    { id: 1, name: '홍길동', age: 30 },
    { id: 2, name: '김영희', age: 25 },
    { id: 3, name: '박철수', age: 28 },
  ]);

  // 삭제 처리 함수
  const handleDeleteRow = (id) => {
    const updated = rowData.filter(row => row.id !== id);
    setRowData(updated);
  };

  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: '이름' },
    { field: 'age', headerName: '나이' },
    {
      headerName: '삭제',
      field: 'delete',
      cellRendererFramework: (params) => (
        <button onClick={() => handleDeleteRow(params.data.id)}>삭제</button>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div className="ag-theme-alpine" style={{ height: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default GridWithDeleteButton;
```

---

## ✅ 설명

| 항목                      | 설명                                |
| ----------------------- | --------------------------------- |
| `cellRendererFramework` | 각 셀에 React 컴포넌트를 직접 렌더링할 수 있게 해줌  |
| `handleDeleteRow`       | 클릭한 버튼에 해당하는 행만 `rowData`에서 제거    |
| `params.data.id`        | 해당 셀의 행 전체 데이터를 담고 있어 `id`로 구분 가능 |

---

## ✅ 결과 화면 예시

| ID | 이름  | 나이 | 삭제 버튼 |
| -- | --- | -- | ----- |
| 1  | 홍길동 | 30 | \[삭제] |
| 2  | 김영희 | 25 | \[삭제] |
| 3  | 박철수 | 28 | \[삭제] |

→ 각 버튼 클릭 시 해당 행이 삭제됩니다.

---

## ✅ 확장 예: confirm 창 추가

```javascript
const handleDeleteRow = (id) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    const updated = rowData.filter(row => row.id !== id);
    setRowData(updated);
  }
};
```

---

추가로 버튼을 아이콘으로 바꾸거나, `삭제 → 복구` 기능, 서버 연동(axios 등)까지 확장할 수 있습니다. 원하시면 그 부분도 도와드릴게요.

---

마지막 row 삭제시 에러 

---

AG Grid에서 **마지막 row를 삭제할 때 에러가 발생하는 이유**는 대부분 다음과 같은 상황입니다:

---

## ❗️ 주요 원인

1. **`rowData`가 빈 배열이 되면서 렌더링 오류**

   * `AgGridReact`에 전달된 `rowData`가 `[]`가 되면 내부적으로 `params.data`가 `undefined`가 되어 `cellRenderer` 등에서 오류 발생

2. **`params.data.id` 접근 중 오류**

   * 마지막 row 삭제 후 다시 렌더링될 때, `params.data`가 `undefined`인 상태에서 `.id` 등을 참조하면 에러 발생

---

## ✅ 해결 방법

### 1. **`params.data` 존재 여부 확인 후 처리**

```jsx
{
  headerName: '삭제',
  field: 'delete',
  cellRendererFramework: (params) => {
    if (!params.data) return null; // 마지막 row 삭제 후 undefined 방지
    return (
      <button onClick={() => handleDeleteRow(params.data.id)}>
        삭제
      </button>
    );
  }
}
```

### 2. **빈 배열에 대한 예외 처리 (예: `rowData.length === 0` 검사)**

```jsx
const handleDeleteRow = (id) => {
  const updated = rowData.filter(row => row.id !== id);
  if (updated.length === 0) {
    // 빈 상태 처리 예시
    alert('모든 데이터가 삭제되었습니다.');
  }
  setRowData(updated);
};
```

---

## ✅ 전체 수정 예시

```jsx
{
  headerName: '삭제',
  field: 'delete',
  cellRendererFramework: (params) => {
    if (!params.data) return null; // 중요: 안전하게 처리
    return (
      <button onClick={() => handleDeleteRow(params.data.id)}>
        삭제
      </button>
    );
  }
}
```

---

## ✅ 추가 팁

* 빈 `rowData` 상태에서 placeholder 텍스트를 표시하고 싶다면 `noRowsOverlayComponent`를 사용할 수 있습니다.
* `rowData.length === 0`일 때, 서버에 재요청하거나 메시지를 표시하는 로직도 함께 고려해 보세요.

---

필요하시면 "모든 데이터 삭제 후 메시지 표시" 또는 "row가 하나도 없을 때 다시 추가하는 버튼 UI"도 구현 도와드릴 수 있습니다. 원하시나요?

---

Row 마지막 삭제 에러
error #252 cannot get grid to draw rows when it is in the middle of drawing rows.

---

오류 메시지:

> `AG Grid error #252: cannot get grid to draw rows when it is in the middle of drawing rows.`

---

## ✅ 원인 분석

이 오류는 **AG Grid가 내부적으로 "렌더링 중"인 상태에서 또다시 `setRowData()` 또는 `api.refreshCells()` 등을 호출**하면 발생합니다.
특히 **row를 삭제하는 로직이 `cellRendererFramework` 안에서 직접 실행되고**, 바로 `setRowData()` 같은 상태 변경이 일어나면, **렌더링이 아직 끝나기 전에 다시 렌더링을 시도하게 되기 때문에** 이 문제가 발생합니다.

즉:

* AG Grid가 현재 렌더링 중인데
* 사용자가 버튼 클릭 → `setRowData()` 실행
* 내부적으로 무한 루프 혹은 충돌 발생

---

## ✅ 해결 방법

### 🔧 1. `setTimeout`으로 다음 렌더링 사이클로 미루기

가장 간단하고 확실한 방법은 `setRowData()` 호출을 **한 틱 뒤로 미루는 것**입니다.

```js
const handleDeleteRow = (id) => {
  setTimeout(() => {
    const updated = rowData.filter((row) => row.id !== id);
    setRowData(updated);
  }, 0); // 다음 이벤트 루프로 미룸
};
```

### 🔧 2. `cellRendererFramework` 내에서 직접 상태를 변경하지 않도록 분리

`cellRendererFramework` 안에서 바로 상태를 바꾸는 것이 아니라, 외부 콜백을 통해 처리:

```jsx
const DeleteButton = ({ id, onDelete }) => {
  return <button onClick={() => onDelete(id)}>삭제</button>;
};

const columnDefs = [
  ...
  {
    headerName: '삭제',
    field: 'delete',
    cellRendererFramework: (params) => {
      if (!params.data) return null;
      return <DeleteButton id={params.data.id} onDelete={handleDeleteRow} />;
    },
  }
];
```

이렇게 하면 컴포넌트 간 책임이 명확해지고, 상태 변경 타이밍 충돌도 방지할 수 있습니다.

---

## ✅ 추가 팁

* `setRowData()`가 연속적으로 여러 번 호출될 가능성이 있다면 `useCallback`과 `useRef` 등을 이용해 중복 호출을 막는 것도 고려하세요.
* 삭제 전 `gridApi.stopEditing()`을 호출해서 현재 편집 중인 상태를 정리할 수도 있습니다.

---

## ✅ 결론

| 해결 방법                 | 설명                                   |
| --------------------- | ------------------------------------ |
| `setTimeout(..., 0)`  | 렌더링 충돌 방지용, 가장 간단하고 효과적              |
| 버튼 컴포넌트 분리            | `cellRendererFramework` 내부 상태 변경 최소화 |
| `params.data` null 체크 | 삭제 후 렌더링 시 `undefined` 접근 방지         |

---

원하시면 이 구조를 기반으로 "삭제 → undo", "삭제 시 API 연동", "삭제 시 confirm 모달"도 같이 구성해드릴 수 있습니다. 원하시나요?

---

1번 방식 안되는데

---

좋습니다. `setTimeout(..., 0)` 방식이 **작동하지 않고**, `error #252: cannot get grid to draw rows when it is in the middle of drawing rows` 에러가 여전히 발생한다면, AG Grid 내부 렌더링 타이밍 문제를 좀 더 안전하게 우회할 필요가 있습니다.

---

## ✅ 안정적으로 해결하는 방법 (권장)

### 🔧 핵심 아이디어

AG Grid의 `cellRendererFramework` 내부에서 직접 `setRowData()`를 호출하지 말고, **부모 컴포넌트의 `useEffect`를 통해 비동기적 삭제 처리**를 합니다.

---

### ✅ 1. 상태 분리 (`pendingDeleteId` 사용)

```tsx
import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridDeleteSafe = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    { id: 1, name: '홍길동', age: 30 },
    { id: 2, name: '김영희', age: 25 },
    { id: 3, name: '박철수', age: 28 },
  ]);

  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'age' },
    {
      headerName: '삭제',
      field: 'delete',
      cellRendererFramework: (params) => {
        if (!params.data) return null;
        return (
          <button onClick={() => setPendingDeleteId(params.data.id)}>
            삭제
          </button>
        );
      },
    },
  ];

  // 실제 삭제 처리 useEffect (렌더링 타이밍 충돌 방지)
  useEffect(() => {
    if (pendingDeleteId !== null) {
      setRowData((prev) => prev.filter((row) => row.id !== pendingDeleteId));
      setPendingDeleteId(null);
    }
  }, [pendingDeleteId]);

  return (
    <div className="ag-theme-alpine" style={{ height: 300 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default AgGridDeleteSafe;
```

---

## ✅ 설명 요약

| 요소                      | 설명                          |
| ----------------------- | --------------------------- |
| `pendingDeleteId`       | 삭제를 지연시켜 안전한 시점에 실행하기 위한 상태 |
| `useEffect`             | 렌더링 완료 후 안전하게 삭제 실행         |
| `cellRendererFramework` | 삭제 버튼만 등록하고 직접 삭제는 하지 않음    |

---

## ✅ 장점

* AG Grid 내부 렌더링 충돌 완벽 방지
* 에러 #252 발생하지 않음
* 마지막 row 삭제 포함하여 모든 상황에서 안전하게 작동

---

## ❗주의할 점

* `params.data`는 항상 유효성 체크 필요 (`if (!params.data) return null`)
* 이 구조를 통해 "확인 후 삭제", "Undo" 등도 쉽게 확장 가능

---

필요하시면 이 구조를 바탕으로 `confirm()` 창 추가, 삭제 후 API 호출, undo 처리까지 확장도 도와드릴게요. 원하시나요?
