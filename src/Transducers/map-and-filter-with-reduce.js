// const { doubleTheNumber, evenOnly } = require("./utils");

const doubleTheNumber = (num) => num * 2;
const evenOnly = (num) => num % 2 === 0;

/** Types mismatch - evenOnly returs a predicate whereas doubleTwice returns a number - This will not work */
const doubleAndEven = (num) => doubleTwice(evenOnly(num));

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
