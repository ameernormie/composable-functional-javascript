const doubleTheNumber = (num) => num * 2;
const doubleTwice = (num) => doubleTheNumber(doubleTheNumber(num));

console.log([1, 2, 3, 4].map(doubleTheNumber));
console.log([1, 2, 3, 4].map(doubleTwice));

const evenOnly = (num) => num % 2 === 0;

/** Types mismatch - evenOnly returs a predicate whereas doubleTwice returns a number - This will not work */
const doubleAndEven = (num) => doubleTwice(evenOnly(num));

const map = (transform, arr) => {
  return arr.reduce((accumulation, value) => {
    accumulation.push(transform(value));
    return accumulation;
  }, []);
};

console.log(map(doubleTheNumber, [1, 2, 3, 4]));

const filter = (predicate, arr) => {
  return arr.reduce((accumulation, value) => {
    if (predicate(value)) accumulation.push(value);
    return accumulation;
  }, []);
};

console.log(filter(evenOnly, [1, 2, 3, 4]));
