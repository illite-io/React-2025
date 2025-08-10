AG Grid에서 **row의 내용(특히 셀 텍스트 등)을 위아래(수직)로 중앙 정렬**하려면, **CSS**를 사용해서 처리해야 합니다.
기본적으로 AG Grid의 셀은 `div.ag-cell` 안에 텍스트가 들어 있으며, 셀 높이가 커지면 위쪽에 정렬되는 경우가 많습니다.

---

## 1. **전역적으로 모든 셀을 수직 중앙 정렬하기**

```css
.ag-cell {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
}
```

또는 React에서 스타일을 `<style>` 태그로 직접 지정:

```jsx
<style>
{`
  .ag-cell {
    display: flex;
    align-items: center;
  }
`}
</style>
```

---

## 2. **특정 컬럼만 수직 중앙 정렬하고 싶을 때**

`cellClass` 또는 `cellClassRules`로 특정 컬럼에 클래스 추가:

```javascript
{
  headerName: '내용',
  field: 'content',
  cellClass: 'vertical-center',
}
```

그리고 CSS:

```css
.vertical-center {
  display: flex;
  align-items: center;
}
```

---

## 3. **기본 rowHeight와 조합해서 자연스럽게 만들기**

```jsx
<AgGridReact
  rowHeight={60} // 행 높이를 크게 설정
  columnDefs={columnDefs}
  rowData={rowData}
/>
```

그리고 `.ag-cell`에 `align-items: center`를 추가하면, 행이 커져도 텍스트가 가운데로 정렬됩니다.

---

## 4. **주의할 점**

* AG Grid는 내부에서 `div.ag-cell` 구조로 렌더링되므로, `display: flex`가 잘 동작합니다.
* 셀 안에 `input`, `button` 등이 있는 경우 `justify-content`도 조절해야 할 수 있습니다.

---

필요하시면 셀 안에 이미지+텍스트 정렬하는 방법이나, 텍스트를 수직으로 가운데 정렬하면서도 줄바꿈하는 방법도 알려드릴 수 있습니다.
