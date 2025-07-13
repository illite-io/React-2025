자바스크립트의 `set`과 `get`은 객체의 프로퍼티에 대해 특수한 접근자를 설정할 때 사용됩니다. 이를 통해 객체 프로퍼티에 접근하거나 값을 설정할 때 추가 로직을 실행할 수 있습니다. 아래에 다양한 예제를 소개합니다.

---

### 1. 기본 `get`과 `set` 예제

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    const parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

console.log(person.fullName); // "John Doe"
person.fullName = 'Jane Smith';
console.log(person.firstName); // "Jane"
console.log(person.lastName);  // "Smith"
```

---

### 2. 클래스에서 `get`과 `set` 사용

```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    this.width = Math.sqrt(value);
    this.height = Math.sqrt(value);
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area); // 200
rect.area = 400;
console.log(rect.width); // 20
console.log(rect.height); // 20
```

---

### 3. 데이터 검증을 추가한 `set` 예제

```javascript
const user = {
  _age: 0,
  get age() {
    return this._age;
  },
  set age(value) {
    if (value < 0) {
      console.error('Age cannot be negative!');
    } else {
      this._age = value;
    }
  },
};

user.age = 25;
console.log(user.age); // 25
user.age = -5; // "Age cannot be negative!"
console.log(user.age); // 25
```

---

### 4. `get`과 `set`으로 의존적인 값 계산

```javascript
const circle = {
  _radius: 0,
  get radius() {
    return this._radius;
  },
  set radius(value) {
    this._radius = value;
  },
  get diameter() {
    return this._radius * 2;
  },
  set diameter(value) {
    this._radius = value / 2;
  },
};

circle.radius = 5;
console.log(circle.diameter); // 10
circle.diameter = 20;
console.log(circle.radius); // 10
```

---

### 5. Symbol을 사용한 `get`과 `set`

```javascript
const secretKey = Symbol('secret');
const vault = {
  [secretKey]: 'default-secret',
  get secret() {
    return this[secretKey];
  },
  set secret(value) {
    this[secretKey] = value;
  },
};

console.log(vault.secret); // "default-secret"
vault.secret = 'new-secret';
console.log(vault.secret); // "new-secret"
```

---

### 6. 고급 예제: 동적으로 `set`과 `get` 설정

```javascript
function createDynamicObject() {
  const data = {};
  return {
    get(key) {
      return data[key] || null;
    },
    set(key, value) {
      data[key] = value;
    },
  };
}

const dynamicObj = createDynamicObject();
dynamicObj.set('name', 'Alice');
console.log(dynamicObj.get('name')); // "Alice"
console.log(dynamicObj.get('age')); // null
```

---

이 예제들은 `get`과 `set`을 활용해 다양한 시나리오에서 사용할 수 있도록 구성되었습니다. 원하는 기능에 따라 커스터마이징해서 사용할 수 있습니다.
