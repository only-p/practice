### **1. Flatten Nested Objects:**

**Question**:  
Flatten a deeply nested object into a single-level object where the nested keys are combined with their parent keys.

```js
const data = {
  user: {
    id: 1,
    details: {
      name: "John",
      location: {
        city: "New York",
      },
    },
  },
};
```

**Solution**:

```js
function flattenObject(obj, prefix = "") {
  let result = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

console.log(flattenObject(data));
```

**Output**:

```js
{
  "user.id": 1,
  "user.details.name": "John",
  "user.details.location.city": "New York"
}
```

---

### **2. Deep Search in Nested Object:**

**Question**:  
Write a function to get a value from a deeply nested object given a string path (e.g., `"user.details.location.city"`).

```js
const data = {
  user: {
    id: 1,
    details: {
      name: "John",
      location: {
        city: "New York",
      },
    },
  },
};
```

**Solution**:

```js
function getValueByPath(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
      obj
    );
}

console.log(getValueByPath(data, "user.details.location.city")); // New York
```

---

### **3. Clean Object: Remove Falsy or Empty Values:**

**Question**:  
Remove falsy or empty values from an object.

```js
const data = {
  name: "John",
  age: null,
  city: "",
  country: undefined,
  occupation: "Engineer",
};
```

**Solution**:

```js
function cleanObject(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
}

console.log(cleanObject(data));
// { name: "John", occupation: "Engineer" }
```

---

### **4. Transform Object: Rename Keys:**

**Question**:  
Rename keys in an object.

```js
const data = { name: "John", age: 30 };
const newKeys = { name: "firstName", age: "yearsOld" };
```

**Solution**:

```js
function renameKeys(obj, newKeys) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [newKeys[key] || key, value])
  );
}

console.log(renameKeys(data, newKeys));
// { firstName: "John", yearsOld: 30 }
```

---

### **5. Aggregate Data (Sum or Group Data):**

**Question**:  
Aggregate data by summing up the values or counting occurrences.

```js
const data = [
  { type: "apple", count: 3 },
  { type: "orange", count: 2 },
  { type: "apple", count: 5 },
];
```

**Solution**:

```js
const aggregateData = (data) =>
  data.reduce((acc, { type, count }) => {
    acc[type] = (acc[type] || 0) + count;
    return acc;
  }, {});

console.log(aggregateData(data));
// { apple: 8, orange: 2 }
```

---

### **6. EventEmitter (Custom Implementation):**

**Question**:  
Implement a basic `EventEmitter` class with `on`, `emit`, `off`, and `once` methods.

**Solution**:

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(data));
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  once(eventName, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }
}

const emitter = new EventEmitter();
emitter.on("greet", (name) => console.log(`Hello, ${name}!`));
emitter.emit("greet", "John"); // Hello, John!
```

---

### **7. Polyfill `bind`:**

**Question**:  
Polyfill for `bind` method, which creates a new function that, when invoked, has its `this` value set to a specific value.

**Solution**:

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

const person = {
  name: "John",
};

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const boundIntroduce = introduce.myBind(person, "Hello");
boundIntroduce("!"); // Hello, I'm John!
```

---

### **8. Polyfill Debounce:**

**Question**:  
Implement a debounce function that ensures a function is called only after a certain delay, with no calls in between.

**Solution**:

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedFunction = debounce(() => console.log("Debounced!"), 1000);
debouncedFunction(); // It will log 'Debounced!' after 1 second.
```

---

### **9. Polyfill Throttle:**

**Question**:  
Implement a throttle function that ensures a function is called at most once every specified delay.

**Solution**:

```js
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn(...args);
    }
  };
}

const throttledFunction = throttle(() => console.log("Throttled!"), 1000);
throttledFunction(); // Will log immediately
throttledFunction(); // Will be ignored if within 1 second
```

---

### **10. Custom Promise.all Polyfill:**

**Question**:  
Create a polyfill for `Promise.all` to handle multiple promises.

**Solution**:

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          completed += 1;

          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => reject(error));
    });
  });
}

myPromiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1, 2]
```

---

### **11. Rate Limiter (API Call Limit):**

**Question**:  
Implement a basic API rate limiter to limit the number of API calls within a certain period.

**Solution**:

```js
function rateLimiter(fn, limit, interval) {
  let calls = 0;
  let lastReset = Date.now();

  return function (...args) {
    const now = Date.now();
    if (now - lastReset > interval) {
      calls = 0;
      lastReset = now;
    }
    if (calls < limit) {
      calls += 1;
      return fn(...args);
    } else {
      return Promise.reject("Rate limit exceeded");
    }
  };
}

const limitedFn = rateLimiter(fetchData, 5, 10000); // 5 calls per 10 seconds
```
### **12. minHeap
```js
class MinHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }

    push(val) {
        this.data.push(val);
        this._heapifyUp();
    }

    pop() {
        const top = this.top();
        const bottom = this.data.pop();
        if (this.data.length) {
            this.data[0] = bottom;
            this._heapifyDown();
        }
        return top;
    }

    top() {
        return this.data[0];
    }

    size() {
        return this.data.length;
    }

    _heapifyUp() {
        let i = this.data.length - 1;
        const element = this.data[i];

        while (i > 0) {
            let parentIdx = Math.floor((i - 1) / 2);
            let parent = this.data[parentIdx];
            if (this.compare(element, parent) >= 0) break;
            this.data[i] = parent;
            i = parentIdx;
        }
        this.data[i] = element;
    }

    _heapifyDown() {
        let i = 0;
        const length = this.data.length;
        const element = this.data[0];

        while (true) {
            let leftIdx = 2 * i + 1;
            let rightIdx = 2 * i + 2;
            let smallest = i;

            if (
                leftIdx < length &&
                this.compare(this.data[leftIdx], this.data[smallest]) < 0
            ) {
                smallest = leftIdx;
            }

            if (
                rightIdx < length &&
                this.compare(this.data[rightIdx], this.data[smallest]) < 0
            ) {
                smallest = rightIdx;
            }

            if (smallest === i) break;
            [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
            i = smallest;
        }
    }
}

```

---

This list should give you an organized reference of common JavaScript challenges, including **data manipulation**, **functional programming**, **asynchronous handling**, and **polyfills**. If you want to dive deeper into any of these solutions or need more examples, feel free to ask!
