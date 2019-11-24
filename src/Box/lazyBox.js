const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const LazyBox = g => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g()),
  inspect: () => `LazyBox(${x})`
});

const result = Box(" 64 ")
  .map(abba => abba.trim())
  .map(trimmed => new Number(trimmed))
  .map(num => num + 1)
  .map(x => String.fromCharCode(x))
  .fold(x => x.toLowerCase());

/**
 * Lazy box will run when the fold is called. if we remove fold from end
 * none of the code will run.
 * We can check this if we put a console.log in a map
 */
const resultWithLazyBox = LazyBox(() => " 64 ")
  .map(abba => abba.trim())
  .map(trimmed => new Number(trimmed))
  .map(num => num + 1)
  .map(x => String.fromCharCode(x))
  .fold(x => x.toLowerCase());

console.log("result with simple box ", result);
console.log("result with lazy box ", resultWithLazyBox);
