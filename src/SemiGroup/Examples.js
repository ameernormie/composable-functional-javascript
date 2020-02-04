/**
 * Let's say that user `Ameer` made two accidental accounts and wants to merge it
 */

const { Map } = require("immutable-ext");
const { All, First, Sum } = require("./SemiGroups");

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

/**
 combined accounts are  {
    name: {
      x: 'Ameer',
      concat: [Function: concat],
      inspect: [Function: inspect]
    },
    isPaid: {
      x: false,
      concat: [Function: concat],
      inspect: [Function: inspect]
    },
    points: { x: 12, concat: [Function: concat], inspect: [Function: inspect] },
    friends: [ 'Adil', 'Rafay' ]
  }
 */
