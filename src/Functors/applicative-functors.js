const Box = require("../Box/Box");

// We have a box of a function and want to apply it to a box of a value
const res = Box(x => x + 1).ap(Box(2)); // Box(3)

const res2 = Box(x => y => x + y).ap(Box(2)); // Box(y => 2 + y)
const res3 = res2.ap(Box(5)); // Box(7)

const add = x => y => x + y;
const res4 = Box(add)
  .ap(Box(2))
  .ap(Box(7)); // Box(7)
console.log(res);

// Laws
// F(x).map(f) == F(f).ap(F(x))

const liftA2Alternate = (f, fx, fy) =>
  F(f)
    .ap(fx)
    .ap(fy);

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);

// Both liftA2One and liftA2Two are equal

const res6 = liftA2(add, Box(2), Box(4)); // Box(6)
