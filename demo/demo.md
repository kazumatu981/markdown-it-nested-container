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
  text-align: center;
  color:white;
  background:#000;
}
div.gray {
  background:#DDD;
}
div.red {
  background:#D00;
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

+++grid-item[gray]
item4
+++
+++grid-item
item5
+++
+++grid-item
item6
+++

+++grid-item[red]
item7
+++
+++grid-item
item8
+++
+++grid-item
item9
+++
:::