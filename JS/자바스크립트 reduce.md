자바스크립트의 `reduce()` 메서드는 배열의 모든 요소를 순회하며 값을 "누적(accumulate)"하여 단일 결과를 반환하는 고차 함수입니다.

기본적으로 \*\*"배열을 줄여서 하나의 값으로 만든다"\*\*는 개념으로 이해하면 됩니다. 이 값은 숫자, 배열, 객체 등 어떤 자료형이든 될 수 있습니다.

---

### **기본 문법**

```javascript
array.reduce(callback, initialValue)
```

* **`callback`**: 배열의 각 요소에 대해 실행할 함수.

  * **`accumulator`**: 누적된 값.
  * **`currentValue`**: 현재 처리 중인 배열 요소.
  * **`currentIndex`**: (선택 사항) 현재 처리 중인 요소의 인덱스.
  * **`array`**: (선택 사항) reduce가 호출된 배열 자체.

* **`initialValue`**: (선택 사항) 누적값(`accumulator`)의 초기값. 이 값을 제공하지 않으면 배열의 첫 번째 요소가 초기값이 됨.

---

### **동작 방식**

1. `reduce`는 배열의 첫 번째 요소부터 마지막 요소까지 순회하면서, `callback` 함수를 반복적으로 실행합니다.
2. `accumulator`는 이전 호출의 결과를 저장하며, `currentValue`는 현재 배열의 요소입니다.
3. 모든 요소를 처리한 후, 최종적으로 계산된 `accumulator` 값을 반환합니다.

---

### **간단한 예제: 배열의 합**

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 초기값 0
console.log(sum); // 10
```

#### 동작 흐름:

1. 초기값(`accumulator`)은 `0`이고, 첫 번째 요소 `1`을 더합니다. → `accumulator = 0 + 1 = 1`
2. 다음 요소 `2`를 더합니다. → `accumulator = 1 + 2 = 3`
3. 다음 요소 `3`을 더합니다. → `accumulator = 3 + 3 = 6`
4. 마지막 요소 `4`를 더합니다. → `accumulator = 6 + 4 = 10`
5. 최종 반환 값은 `10`.

---

### **초기값이 없는 경우**

초기값을 제공하지 않으면, 배열의 첫 번째 요소가 `accumulator`가 되고, 두 번째 요소부터 시작합니다.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});
console.log(sum); // 10
```

> **주의**: 초기값이 없고 배열이 비어 있으면 에러가 발생합니다. 따라서 초기값을 명시적으로 제공하는 것이 안전합니다.

---

### **`reduce()`가 유용한 이유**

1. **배열을 변환하거나 축소**할 때 유용합니다.

   * 합계, 곱셈, 평균 등 수학적 계산.
   * 중첩 배열의 평탄화.
   * 객체 배열에서 특정 속성 추출 및 합산.
2. **초기값을 사용해 다양한 자료 구조 생성**이 가능합니다.

   * 배열 → 객체 변환.
   * 배열 → 배열 변환.
   * 배열 → 문자열 변환 등.

---

### **장점**

* `for` 루프와 달리, 상태 관리가 필요 없이 간결하게 코드를 작성할 수 있습니다.
* **재사용 가능**한 코드를 작성할 수 있어 가독성이 향상됩니다.

---

### **주의사항**

1. **초기값 설정**: 초기값이 없으면 비어 있는 배열에서 에러가 발생하거나, 의도치 않은 동작이 일어날 수 있습니다.
2. **명확한 목적**: `reduce`는 강력하지만, 잘못 사용하면 가독성이 떨어질 수 있습니다. 단순한 작업은 `map`, `filter`와 같은 메서드가 더 적합할 수 있습니다.

---

### **개념 요약**

* `reduce()`는 배열의 요소를 누적하여 단일 값으로 줄이는 메서드입니다.
* 초기값을 통해 다양한 변형 작업을 할 수 있습니다.
* 배열을 숫자, 문자열, 객체, 배열 등 어떤 형태로든 변환할 수 있어 매우 강력한 도구입니다.



자바스크립트의 `reduce()` 메서드는 배열의 각 요소를 순회하면서 단일 값으로 줄이는 데 사용됩니다. 이를 통해 배열의 합, 곱, 객체 변환 등 다양한 작업을 수행할 수 있습니다. 아래에 다양한 예제를 정리해 드립니다.

---

### 1. 배열의 합 구하기

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15
```

---

### 2. 배열의 곱 구하기

```javascript
const numbers = [1, 2, 3, 4];
const product = numbers.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
console.log(product); // 24
```

---

### 3. 중복 요소 제거하기

```javascript
const items = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueItems = items.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }
  return acc;
}, []);
console.log(uniqueItems); // ['apple', 'banana', 'orange']
```

---

### 4. 배열을 객체로 변환

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const userObject = users.reduce((acc, user) => {
  acc[user.id] = user.name;
  return acc;
}, {});
console.log(userObject);
// { '1': 'Alice', '2': 'Bob', '3': 'Charlie' }
```

---

### 5. 특정 키를 기준으로 그룹화

```javascript
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Charlie', age: 30 },
  { name: 'David', age: 20 }
];

const groupedByAge = people.reduce((acc, person) => {
  if (!acc[person.age]) {
    acc[person.age] = [];
  }
  acc[person.age].push(person);
  return acc;
}, {});
console.log(groupedByAge);
// {
//   '20': [{ name: 'Bob', age: 20 }, { name: 'David', age: 20 }],
//   '30': [{ name: 'Alice', age: 30 }, { name: 'Charlie', age: 30 }]
// }
```

---

### 6. 최대값 찾기

```javascript
const numbers = [3, 7, 2, 5, 10, 6];
const max = numbers.reduce((acc, current) => (current > acc ? current : acc), -Infinity);
console.log(max); // 10
```

---

### 7. 중첩 배열 평탄화 (Flattening)

```javascript
const nestedArray = [[1, 2], [3, 4], [5, [6, 7]]];
const flatArray = nestedArray.reduce((acc, val) => acc.concat(val), []);
console.log(flatArray); // [1, 2, 3, 4, 5, [6, 7]]
```

---

### 8. 문자열 개수 세기

```javascript
const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const wordCount = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(wordCount);
// { apple: 3, banana: 2, orange: 1 }
```

---

### 9. 누적된 계산 결과 저장하기

```javascript
const numbers = [1, 2, 3, 4];
const cumulativeSum = numbers.reduce((acc, current) => {
  const lastSum = acc.length > 0 ? acc[acc.length - 1] : 0;
  acc.push(lastSum + current);
  return acc;
}, []);
console.log(cumulativeSum); // [1, 3, 6, 10]
```

---

### 10. 객체 배열의 특정 속성 합계 구하기

```javascript
const orders = [
  { id: 1, amount: 100 },
  { id: 2, amount: 200 },
  { id: 3, amount: 300 }
];

const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
console.log(totalAmount); // 600
```

---

이처럼 `reduce()`는 단순한 합계 계산뿐만 아니라, 배열을 변형하거나 객체를 생성하는 데에도 매우 유용합니다. 필요에 따라 초기값과 콜백 함수를 설계하여 다양한 작업에 활용할 수 있습니다!


자바스크립트 `reduce()` 예제 20개를 다양한 상황과 난이도로 정리해드릴게요. 실제 개발에서 유용하게 활용할 수 있는 예시들입니다.

---

### ✅ **기초 예제**

**1. 배열의 합 구하기**

```javascript
[1, 2, 3, 4].reduce((acc, val) => acc + val, 0); // 10
```

**2. 배열의 곱 구하기**

```javascript
[1, 2, 3, 4].reduce((acc, val) => acc * val, 1); // 24
```

**3. 최대값 구하기**

```javascript
[5, 1, 9, 3].reduce((acc, val) => (val > acc ? val : acc), -Infinity); // 9
```

**4. 최소값 구하기**

```javascript
[5, 1, 9, 3].reduce((acc, val) => (val < acc ? val : acc), Infinity); // 1
```

**5. 평균 구하기**

```javascript
const arr = [10, 20, 30];
const avg = arr.reduce((acc, val, i, { length }) => acc + val / length, 0); // 20
```

---

### ✅ **중급 예제**

**6. 중복 제거**

```javascript
['a', 'b', 'a', 'c'].reduce((acc, val) => acc.includes(val) ? acc : [...acc, val], []); // ['a', 'b', 'c']
```

**7. 문자열 연결**

```javascript
['안', '녕', '하', '세', '요'].reduce((acc, val) => acc + val, ''); // '안녕하세요'
```

**8. 객체의 특정 키의 합 구하기**

```javascript
const users = [{age: 30}, {age: 25}, {age: 20}];
users.reduce((acc, user) => acc + user.age, 0); // 75
```

**9. 다차원 배열 평탄화 (1단계)**

```javascript
[[1, 2], [3, 4]].reduce((acc, val) => acc.concat(val), []); // [1, 2, 3, 4]
```

**10. 등장 횟수 세기**

```javascript
['a', 'b', 'a'].reduce((acc, val) => {
  acc[val] = (acc[val] || 0) + 1;
  return acc;
}, {}); // { a: 2, b: 1 }
```

---

### ✅ **객체와 배열 변환**

**11. 배열 → 객체 변환 (key-value)**

```javascript
['a', 'b', 'c'].reduce((acc, val, idx) => {
  acc[idx] = val;
  return acc;
}, {}); // { 0: 'a', 1: 'b', 2: 'c' }
```

**12. 객체 배열을 ID로 묶기**

```javascript
const people = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Jane' }
];
people.reduce((acc, person) => {
  acc[person.id] = person;
  return acc;
}, {}); // {1: {...}, 2: {...}}
```

**13. 그룹핑 (group by key)**

```javascript
const list = [
  { type: 'fruit', name: 'apple' },
  { type: 'vegetable', name: 'carrot' },
  { type: 'fruit', name: 'banana' }
];
list.reduce((acc, item) => {
  acc[item.type] = acc[item.type] || [];
  acc[item.type].push(item.name);
  return acc;
}, {});
// { fruit: ['apple', 'banana'], vegetable: ['carrot'] }
```

---

### ✅ **고급 예제**

**14. 누적합 배열 만들기**

```javascript
[1, 2, 3, 4].reduce((acc, val) => {
  acc.push((acc[acc.length - 1] || 0) + val);
  return acc;
}, []); // [1, 3, 6, 10]
```

**15. 배열을 역순 문자열로 만들기**

```javascript
['a', 'b', 'c'].reduce((acc, val) => val + acc, ''); // 'cba'
```

**16. 중첩 객체의 키 추출**

```javascript
const obj = { a: 1, b: { c: 2, d: 3 } };
Object.entries(obj).reduce((acc, [key, val]) => {
  if (typeof val === 'object') {
    acc.push(...Object.keys(val));
  } else {
    acc.push(key);
  }
  return acc;
}, []); // ['a', 'c', 'd']
```

**17. 특정 조건 만족하는 값만 누적**

```javascript
[1, 2, 3, 4, 5].reduce((acc, val) => {
  if (val % 2 === 0) acc.push(val);
  return acc;
}, []); // [2, 4]
```

**18. 배열을 두 개의 그룹으로 나누기 (조건 기반)**

```javascript
[1, 2, 3, 4, 5].reduce((acc, val) => {
  (val % 2 === 0 ? acc.even : acc.odd).push(val);
  return acc;
}, { even: [], odd: [] }); // { even: [2, 4], odd: [1, 3, 5] }
```

**19. HTML 리스트 문자열 만들기**

```javascript
['Item1', 'Item2'].reduce((acc, item) => acc + `<li>${item}</li>`, ''); 
// "<li>Item1</li><li>Item2</li>"
```

**20. 프로미스 체이닝 만들기**

```javascript
const funcs = [
  () => Promise.resolve(1),
  (prev) => Promise.resolve(prev + 1),
  (prev) => Promise.resolve(prev * 2),
];

funcs.reduce((p, fn) => p.then(fn), Promise.resolve()).then(console.log); // 4
```

---

원하시면 이 중에서 특정 주제별로 (예: 문자열 처리, 객체 변환, API 결과 가공 등) 더 깊게 파고들 수도 있어요. 필요한 방향이 있다면 알려주세요!
