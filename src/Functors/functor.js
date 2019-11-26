const Task = require("data.task");
const { List, Map } = require("immutable-ext");

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Right(${x})`
});

const fromNullable = x => (x != null ? Right(x) : Left(x));

/**
 * Laws of functor
 *
 * 1st Law:
 * any type `fx` (some functor holding x), when we map `f` over it
 * and then we map `g` over it should be the same as running map once over
 * it by saying first run `f` then `g` over it
 *
 * @example
 * fx.map(f).map(g) == fx.map(x => g(f(x)))
 *
 * 2nd Law:
 * @example
 * fx.map(id) == id(fx)
 */

const runningMapTwice = Box("squirrels")
  .map(s => s.substr(5))
  .map(s => s.toUpperCase());

console.log(runningMapTwice); // Box(RELS)

const runningMapOnce = Box("squirrels").map(x => x.substr(5).toUpperCase());

console.log(runningMapOnce); // Box(RELS)

/** From above two examples we know that both are same */
console.log(runningMapOnce, runningMapTwice); // Box(RELS) Box(RELS)

const id = x => x;

const res1 = Box("crayons").map(id);
const res2 = id(Box("crayons"));

console.log(res1, res2); // Box(crayons) Box(crayons)
