---
marp: true
---

# markdown-it-nested-container DEMO

## author: kazumatu981

---

<!-- Scoped style -->
<style scoped>
div.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
div.grid-item {
  margin: 3px;
}
</style>

## Two up contents

:::grid

+++grid-item
### 😖bad code

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
### 😊good code

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = numbers.filter(num => num % 2 == 0);

console.log(result);
```

+++


:::

> You MAY use `Array` built in methods !!!!


---

<!-- Scoped style -->
<style scoped>
div.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
div.grid-item {
  margin: 3px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  color:white;
  color:#F0F7D4;
  background:#110934;
}

div.pattern1 {
  background:#B2D732;
}
div.pattern2 {
  background:#4424D6;
}
div.pattern3 {
  background:#FC600A;
}
</style>

## Metro like contents

:::grid

+++grid-item
item1
+++
+++grid-item
item2
+++
+++grid-item
item3
+++

+++grid-item[pattern1]
item4
+++
+++grid-item[pattern2]
item5
+++
+++grid-item[pattern3]
item6
+++

+++grid-item[pattern2]
item7
+++
+++grid-item[pattern3]
item8
+++
+++grid-item[pattern1]
item9
+++
:::