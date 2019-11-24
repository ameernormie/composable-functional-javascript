const { Map, List } = require("immutable-ext");

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});

/** Adding a Neutral element to Sum(Semi group) to make it a monoid */
Sum.empty = () => Sum(0);

const simpleResult = [Sum(1), Sum(2), Sum(3)].reduce(
  (acc, x) => acc.concat(x),
  Sum.empty()
);

/**
 * What does fold do?
 * Extract one value.
 * Removal from a type. be it a collection or just a single value
 */
const resultWithFold = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty());

const resultWithMap = Map({ brian: 1, sara: 5 })
  .map(Sum)
  .fold(Sum.empty());

const resultWithList = List.of(1, 2, 3)
  .map(Sum)
  .fold(Sum.empty());

// We are doing mapping and folding
// Put everything in monoid then fold it down is so common we can use foldMap

/**
 * foldMap takes two values.
 * Take a function to run on each and an initial value
 */
const resultWithFoldMap = List.of(1, 2, 3).foldMap(Sum, Sum.empty());

console.log("simple result ", simpleResult);
console.log("result with fold ", resultWithFold);
console.log("result with map ", resultWithMap);
console.log("result with list ", resultWithList);
console.log("result with foldMap ", resultWithFoldMap);
// const res = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty());
