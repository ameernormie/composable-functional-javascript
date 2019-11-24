/** **`semi-group` is a type with a concat method** */

const res = "a".concat("b");

/** Semi group follows the mathematical laws such as associativity */

/** Creating our own Sum semi-group */
const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});

const result = Sum(1).concat(Sum(2));

result;

/** Creating our own All semi-group */
const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});

const allTrue = All(true).concat(All(false)); // All(false)
allTrue;

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

const firstValue = First("blah")
  .concat(First("no"))
  .concat("meta programming");
firstValue;
