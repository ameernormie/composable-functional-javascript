const doubleTheNumber = (num) => num * 2;
const evenOnly = (num) => num % 2 === 0;

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

const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

const compose = (...fns) =>
  fns.reduce(
    (accumulation, fn) => (...args) => accumulation(fn(...args)),
    (x) => x
  );

const transduce = (xf, reducer, seed, collection) => {
  let accumulation = seed;
  const transformReducer = xf(reducer);
  for (const value of collection) {
    accumulation = transformReducer(accumulation, value);
  }
  return accumulation;
};

const into = (to, xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);

  throw new Error("Into only works for arrays");
};

const seq = (xf, collection) => {
  if (Array.isArray(collection))
    return transduce(xf, pushReducer, [], collection);

  throw new Error("Into only works for arrays");
};

module.exports.doubleTheNumber = doubleTheNumber;
module.exports.evenOnly = evenOnly;
module.exports.compose = compose;
module.exports.map = map;
module.exports.filter = filter;
module.exports.transduce = transduce;
module.exports.into = into;
module.exports.seq = seq;
