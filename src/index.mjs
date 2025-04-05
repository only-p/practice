const nums = [1, 2, 3, 4];
const x = nums.map((num, idx, nums) => {
  return num * 2;
});

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};

// const y = nums.myMap((item, idx, arr) => {
//   return item * 3;
// });

// console.log(y);

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};
// console.log("--", nums);
// const z = nums.myFilter((num, i, arr) => {
//   return num > 1;
// });
// console.log("filter", z);

// const sumf = nums.reduce((cumm,curr)=>{
//   return cumm+=curr;
// },0)
// console.log('reduce',sumf);

Array.prototype.myReduce = function (cb, initalval) {
  let ans = !isNaN(initalval) ? initalval : this[0];
  for (let i = 0; i < this.length; i++) {
    ans = cb(ans, this[i], i, this);
  }
  return ans;
};

const sum1 = nums.myReduce((cumm, num, idx, arr) => {
  return (cumm += num);
}, 0);
// console.log("myreduce", sum);

for (var i = 0; i < 4; i++) {
  function fn(i) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
  // fn(i);
}

// currey

function infiniteSum(a) {
  return function x(b) {
    if (b) {
      return infiniteSum(a + b);
    } else return a;
  };
}

// console.log(infiniteSum(1)(2)(3)());

// curry implemention
//  sum(a,b,c)=> sum(a)(b)(c)

function curry(fn) {
  return function curriedFunction(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...next) {
        return curriedFunction(...args, ...next);
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curried = curry(sum);
const x1 = curried(1)(1)(1);
// console.log(x1);

const Person = {
  name: "pramod",
};
function sayHi(age, height) {
  console.log(`hi ${this.name} my age is ${age} and height is ${height}`);
}

// sayHi.call(Person, 25, 6);
// sayHi.apply(Person, [26, 7]);

// const bind = sayHi.bind(Person);
// bind(28,8)

Function.prototype.myCall = function (context, ...args) {
  // console.log("args", args);
  console.log("this", this);
  context.fn = this;
  context.fn(...args);
};
sayHi.myCall(Person, 25, 6);
