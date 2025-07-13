JavaScript에서 "immutable"은 객체나 데이터를 변경할 수 없도록 만드는 개념을 말합니다. 이를 통해 데이터의 무결성을 유지하고, 예측 가능한 상태 관리를 할 수 있습니다.

### 불변성(Immutable)의 이점

1. **데이터 무결성**: 데이터가 생성된 후 변경되지 않기 때문에 신뢰성을 높입니다.
2. **변경 추적 용이**: 상태 변화가 명확하게 기록되므로 디버깅이 쉬워집니다.
3. **성능 최적화**: 불변 데이터 구조를 사용하면 참조 비교를 통해 빠르게 변화 감지를 할 수 있습니다.

### JavaScript에서 불변성을 구현하는 방법

1. **`Object.freeze` 사용**

   * 객체를 동결하여 객체의 속성을 추가, 삭제, 변경할 수 없게 만듭니다.

   ```javascript
   const obj = Object.freeze({a: 1});
   obj.a = 2;  // 무시됨
   console.log(obj.a);  // 1
   ```

2. **`const` 키워드 사용**

   * 변수 재할당을 방지하지만, 객체 자체의 속성은 변경될 수 있습니다.

   ```javascript
   const arr = [1, 2, 3];
   arr[0] = 4;  // 가능
   console.log(arr);  // [4, 2, 3]
   ```

3. **불변 데이터 구조 라이브러리 사용**

   * **Immutable.js**: 페이스북에서 만든 불변 데이터 구조 라이브러리로, 불변 리스트, 맵, 세트 등을 제공합니다.

   ```javascript
   const { Map } = require('immutable');
   let map1 = Map({a: 1, b: 2});
   let map2 = map1.set('a', 3);
   console.log(map1.get('a'));  // 1
   console.log(map2.get('a'));  // 3
   ```

4. **Spread 연산자와 객체 비구조화 할당 사용**

   * 새로운 객체나 배열을 만들어 원본을 변경하지 않으면서 변화를 적용할 수 있습니다.

   ```javascript
   const obj = {a: 1, b: 2};
   const newObj = {...obj, a: 3};
   console.log(obj);  // {a: 1, b: 2}
   console.log(newObj);  // {a: 3, b: 2}

   const arr = [1, 2, 3];
   const newArr = [...arr, 4];
   console.log(arr);  // [1, 2, 3]
   console.log(newArr);  // [1, 2, 3, 4]
   ```

5. **`Object.assign` 사용**

   * 새로운 객체를 만들어 원본 객체의 속성을 복사하면서 변경할 수 있습니다.

   ```javascript
   const obj = {a: 1, b: 2};
   const newObj = Object.assign({}, obj, {a: 3});
   console.log(obj);  // {a: 1, b: 2}
   console.log(newObj);  // {a: 3, b: 2}
   ```

JavaScript에서 불변성을 유지하는 방법을 이해하고 사용하면, 코드의 신뢰성과 유지보수성을 크게 향상시킬 수 있습니다.
