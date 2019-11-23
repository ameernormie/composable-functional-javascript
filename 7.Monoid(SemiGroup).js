/** **`monoid` a semi-group with a special element in there that acts like an identity** */

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});

/** Adding a Neutral element to Sum(Semi group) to make it a monoid */
Sum.empty = () => Sum(0);

const sumRes = Sum.empty()
  .concat(Sum(1))
  .concat(Sum(5));

sumRes;

/** Creating our own All semi-group */
const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});

/** Adding a Neutral element to All(Semi group) to make it a monoid */
All.empty = x => All(true);

const allTrue = All.empty()
  .concat(All(true))
  .concat(All(false));

allTrue;

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

First.empty = x => First();

const firstValue = First("blah")
  .concat(First("no"))
  .concat("meta programming");
firstValue;

const sum = xs => xs.reduce((acc, x) => acc + x, 0);

const all = xs => xs.reduce((acc, x) => Boolean(acc && x), true);

console.log(all([1, 2, 3]));
