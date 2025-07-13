아래에 JavaScript에서 `import`와 `export`를 사용하는 다양한 예제들을 정리해 보았습니다.

---

### 1. **기본 내보내기와 가져오기 (Default Export & Import)**

#### `math.js`

```javascript
// 기본 내보내기
export default function add(a, b) {
    return a + b;
}
```

#### `main.js`

```javascript
// 기본 가져오기
import add from './math.js';

console.log(add(5, 3)); // 8
```

---

### 2. **이름 내보내기와 가져오기 (Named Export & Import)**

#### `math.js`

```javascript
// 이름 내보내기
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

#### `main.js`

```javascript
// 이름 가져오기
import { add, subtract } from './math.js';

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
```

---

### 3. **이름과 기본 내보내기 동시 사용**

#### `math.js`

```javascript
export function multiply(a, b) {
    return a * b;
}

export default function divide(a, b) {
    return a / b;
}
```

#### `main.js`

```javascript
import divide, { multiply } from './math.js';

console.log(divide(10, 2));    // 5
console.log(multiply(10, 2));  // 20
```

---

### 4. **모든 항목 한 번에 가져오기**

#### `math.js`

```javascript
export const PI = 3.14;

export function circleArea(radius) {
    return PI * radius * radius;
}

export function circleCircumference(radius) {
    return 2 * PI * radius;
}
```

#### `main.js`

```javascript
import * as MathUtils from './math.js';

console.log(MathUtils.PI);                        // 3.14
console.log(MathUtils.circleArea(10));            // 314
console.log(MathUtils.circleCircumference(10));   // 62.8
```

---

### 5. **가져오기 시 별칭 사용하기 (Alias)**

#### `math.js`

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

#### `main.js`

```javascript
import { add as addition, subtract as subtraction } from './math.js';

console.log(addition(10, 5));    // 15
console.log(subtraction(10, 5)); // 5
```

---

### 6. **재수출하기 (Re-exporting)**

#### `math.js`

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

#### `utils.js`

```javascript
export { add, subtract } from './math.js';

export function multiply(a, b) {
    return a * b;
}
```

#### `main.js`

```javascript
import { add, subtract, multiply } from './utils.js';

console.log(add(5, 5));        // 10
console.log(subtract(10, 5));  // 5
console.log(multiply(3, 5));   // 15
```

---

### 7. **동적 가져오기 (Dynamic Import)**

#### `math.js`

```javascript
export function greet() {
    console.log('Hello from math module!');
}
```

#### `main.js`

```javascript
// 동적 가져오기
import('./math.js').then(module => {
    module.greet(); // Hello from math module!
});
```

---

### 8. **조건부 가져오기**

#### `main.js`

```javascript
const useAdvancedMath = true;

if (useAdvancedMath) {
    import('./advancedMath.js').then(module => {
        console.log(module.advancedFunction(5, 10));
    });
} else {
    console.log('Using basic math functions');
}
```

---

### 9. **CSS 모듈 가져오기**

#### `styles.css`

```css
body {
    background-color: #f0f0f0;
    color: #333;
}
```

#### `main.js`

```javascript
import './styles.css';

console.log('CSS styles have been applied.');
```

---

### 10. **JSON 파일 가져오기**

#### `data.json`

```json
{
    "name": "John Doe",
    "age": 30
}
```

#### `main.js`

```javascript
import data from './data.json';

console.log(data.name); // John Doe
console.log(data.age);  // 30
```

---

이 예제들을 활용하면 다양한 상황에서 `import`와 `export`를 적절히 사용할 수 있습니다. 😊
