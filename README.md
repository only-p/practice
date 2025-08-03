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
class MaxHeap{
    constructor(){
        this.data = []
    }
    
    _heapifyUp(){
        let n = this.data.length-1;
        while(n>0){
            let parent = Math.floor((n-1)/2);
            if(this.data[parent]<this.data[n] ){
                [this.data[parent],this.data[n]] = [this.data[n],this.data[parent]];
                n = parent;
            }else{
                break;
            }
        }
    }
    _heapifyDown(){
        let i=0;
        const n = this.data.length
        while(i<n){
            let leftIdx = 2*i+1;
            let rightIdx =2*i+2;
            let larger = i;
            if(leftIdx<n && this.data[leftIdx]>this.data[i]){
                larger = leftIdx;
            }
             if(rightIdx<n && this.data[rightIdx]>this.data[i]){
                larger = rightIdx;
            }
            if(larger!==i){
                [this.data[i],this.data[larger]] = [this.data[larger],this.data[i]];
                i=larger;
            }else{
                break;
            }
        }
    }
    
    push(val){
        this.data.push(val)
        this._heapifyUp()
    }
    pop(){
        let n = this.data.length-1;
        let result = this.data[0];
        this.data[0] = this.data[n];
        this.data.pop();
        this._heapifyDown();
         return result;
    }
     top() {
        return this.data[0];
    }

    size() {
        return this.data.length;
    }
    print(){
        return console.log(this.data)
    }
   
}

const obj = new MaxHeap();
obj.push(3);
obj.push(2);
obj.push(1);
console.log(obj.pop())
obj.print();
console.log(obj.pop())
obj.print()

```

---
## heapify
```js
function maxHeapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // left child
    const right = 2 * i + 2; // right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        // Swap the values
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        // Recursively heapify the affected sub-tree
        maxHeapify(arr, n, largest);
    }
}


function buildMaxHeap(arr) {
    const n = arr.length;
    // Start from the last non-leaf node and work up
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, n, i);
    }
    return arr;
}
const arr = [4, 10, 3, 5, 1];
console.log(buildMaxHeap(arr));
```
**Question 13**:  
Polyfill of map.

**Solution**:
**Question 13**:  
```js
const arr = [1,2,3,4];
function double(x,y,z){
    return 2*x;
}


Array.prototype.myMap = function(cb,thisArg){
    const result = [];
    const context = thisArg || undefined;

    for(let i =0;i<this.length;i++){
        result.push(cb.call(context,this[i],i,this))
    }
    return result;
}

console.log('build in map')
const x = arr.map(double,arr)
console.log(x);

console.log('my map')
const y = arr.myMap(double,arr);
console.log(y)

```Polyfllof map.

**Souton**:

```j
consarr = [1,2,3,4];
functin dobe(x,y,z){
   rturn2*x;
}


Arra.prtotype.myMp= functin(cb,thisA){
    costsult = [];
    const contxt = thisAg || undfid;

 fo(let  =0;i<his.length;i++){
       result.pus(cb.c(cotxt,thi[i],this))
    }
    retur result;
}

onsoe.log('bil mp')
cons x = rr.map(double,arr)
console.log(x);

console.log('myp')
cost y = arr.myMa(dobe,rr);
console.log(y)

```
**Ques 14: 
Polyfill of filter.

Solution**:
```js
const arr = [1,2,3,4];
 greter(x,y,z){
   return x>2;
}

Array.totype.myFilter = function(cb,thisAr){
    const esult =[];
    const context = thsArg || udefined;
    for(let i=0;i<this.lenth;i++){
       if(cb.cll(context,thi[i],i,this)){
            result.push(this[i]);
        }
    }
    retur result;
}

onst x = arr.filter(greate);
csole.lg('bild in filter');
console.log(x)
cont y =arr.myFilter(greter);
cosole.og('my flter');
cosole.lo(y)


```
Questio15:  
Poreduce.


**Sltion**:
```js
constrr = [1,2,3,8,4];

fucionsum(ans,current,idx,hisArg){
    // console.lg(ans,current,ix,thsArg)
    rturnans+=current;
}
Array.prototype.MyReuc = function(cb,initialValu){
    lt statingIdx =iialVlue!==undefied?1:0;
    if(tpeof cb!=='functin'){
       row nw TypError(cb +'i nt a vaid fncn');
    }
    let a=iitialValu?initialValu:this[0];
   f(lti=startingId;i<this.ngth;i++){
       ans= cb(ans,thi[i],ithis);
    }
   rturn ans;
}

const rsut =arr.educ(sum,0);
consol.log('build inreduce');
console.log(resul);

cnst myResult =rr.MyReduce(sum,0);
console.log('my  reduce');
console.log(myReult);

```
**Question 14**:  
Polyfill of filter.

**Solution**:
```js
const arr = [1,2,3,4];
function greater(x,y,z){
    return x>2;
}

Array.prototype.myFilter = function(cb,thisArg){
    const result =[];
    const context = thisArg || undefined;
    for(let i=0;i<this.length;i++){
        if(cb.call(context,this[i],i,this)){
            result.push(this[i]);
        }
    }
    return result;
}

const x = arr.filter(greater);
console.log('build in filter');
console.log(x)
const y = arr.myFilter(greater);
console.log('my filter');
console.log(y)


```
**Question 15**:  
Polyfill of reduce.


**Solution**:
```js
const arr = [1,2,3,8,4];

function sum(ans,current,idx,thisArg){
    // console.log(ans,current,idx,thisArg)
    return ans+=current;
}
Array.prototype.MyReduce = function(cb,initialValue){
    let startingIdx = initialValue!==undefined?1:0;
    if(typeof cb !=='function'){
        throw new TypeError(cb + 'is not a valid function');
    }
    let ans = initialValue?initialValue:this[0];
    for(let i=startingIdx;i<this.length;i++){
       ans= cb(ans,this[i],i,this);
    }
    return ans;
}

const result = arr.reduce(sum,0);
console.log('build in reduce');
console.log(result);

const myResult = arr.MyReduce(sum,0);
console.log('my  reduce');
console.log(myResult);

```
**Question 16**:  
Polyfill of call apply bind.


**Solution**:
```js
let person = {
  firstname: "Kirtesh",
  lastname: "bansal"
}

let printName = function (country) {
  console.log(this.firstname + " " + this.lastname + " from " 
  + country[0]);
}
Function.prototype.myCall = function(obj,...args){
    // we can use symbol for unique key
   obj.fn = this;
   return obj.fn(...args)
}
Function.prototype.myApply = function(obj,args){
    console.log(args);
    obj.fn = this;
    return obj.fn(args);
}

function fn(...first){
    console.log(this.firstname+" "+ this.lastname+" "+ first)
}

Function.prototype.myBind = function(obj,...args){
   const sym = Symbol();
   obj[sym] = this
    return function(...nextArgs){
        return obj[sym](...args,...nextArgs);
    }
}

printName.myApply(person, ["India"]);
const x = fn.myBind(person,"first2");
x(1)

```
