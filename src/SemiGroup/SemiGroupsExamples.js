/**
 * Let's say that user `Ameer` made two accidental accounts and wants to merge it
 */

const { Map } = require("immutable-ext");

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});

const acct1 = Map({
  name: First("Ameer"),
  isPaid: All(true),
  points: Sum(10),
  friends: ["Adil"]
});

const acct2 = Map({
  name: First("Ameer"),
  isPaid: All(false),
  points: Sum(2),
  friends: ["Rafay"]
});

const result = acct1.concat(acct2).toJS();

console.log("combined accounts are ", result);
