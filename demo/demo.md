---
marp: true
---

## Two up contents

:::grid

+++grid-item
### good code

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = [];

for(let idx = 0; idx < numbers; idx) {
    if(numbers[idx] % 2 == 0) {
        result.push(numbers[idx]);
    }
}

console.log(result);
```

+++

+++grid-item
### bad code

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = numbers.filter(num => num % 2 == 0);

console.log(result);
```

+++

:::
---