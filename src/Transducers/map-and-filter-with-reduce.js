// const { doubleTheNumber, evenOnly } = require("./utils");

const doubleTheNumber = (num) => num * 2;
const evenOnly = (num) => num % 2 === 0;

/** Types mismatch - evenOnly returs a predicate whereas doubleTwice returns a number - This will not work */
const doubleAndEven = (num) => doubleTwice(evenOnly(num));
const toUpper = (str) => str.toUpperCase();

// const filter = (predicate) => {
//   return (accumulation, value) => {
//     if (predicate(value)) accumulation.push(value);
//     return accumulation;
//   };
// };

// console.log(
//   [1, 2, 3, 4].reduce(filter(evenOnly), []).reduce(map(doubleTheNumber), [])
// );

const map = (transform) => (reducer) => {
  return (accumulation, value) => {
    reducer(accumulation, transform(value));
    return accumulation;
  };
};

const filter = (predicate) => (reducer) => {
  return (accumulation, value) => {
    if (predicate(value)) return reducer(accumulation, value);
    return accumulation;
  };
};

const isEvenFilter = filter(evenOnly);
const isNotTwoFilter = filter((v) => v !== 2);

// Mapping reducer that double the values
const doubleMap = map(doubleTheNumber);

const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

const compose = (...fns) =>
  fns.reduce(
    (accumulation, fn) => (...args) => accumulation(fn(...args)),
    (x) => x
  );
// console.log(
//   [1, 2, 3, 4, 5, 6].reduce(
//     isNotTwoFilter(isEvenFilter(doubleMap(pushReducer))),
//     []
//   )
// );

const cleanNumsXf = compose(isNotTwoFilter, isEvenFilter, doubleMap);

console.log([1, 2, 3, 4, 5, 6].reduce(cleanNumsXf(pushReducer), []));

const transduce = (xf, reducer, seed, collection) => {
  let accumulation = seed;
  const transformReducer = xf(reducer);
  for (const value of collection) {
    accumulation = transformReducer(accumulation, value);
  }
  return accumulation;
};

console.log(transduce(cleanNumsXf, pushReducer, [], [1, 2, 3, 4, 5, 6, 7, 8]));

console.log((map(toUpper), (str, char) => str + char, "", "ameer"));

// console.log("ameer".split('').reduce(map(toUpper)((acc, val) => acc + val), ""))

const into = (to, xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);

  throw new Error("Into only works for arrays");
};

const multipleBy2And3 = into(
  [],
  compose(
    map((x) => x * 2),
    map((x) => x * 3)
  ),
  [1, 2, 3, 4]
);

multipleBy2And3;
