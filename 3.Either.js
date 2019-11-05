// const Either = Left || Right;

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

/**
 * If its Right it will run the function `x => x`
 * If its Left it will return `error`
 */
const result = Right(3)
  .map(x => x + 3)
  .fold(x => "error", x => x);

/**
 * If no color is found then it will return undefined.
 * We should handle it in a better way
 * @param {string} name
 */
// const findColor = name =>
//   ({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

const fromNullable = x => (x != null ? Right(x) : Left(x));

const findColor = name =>
  fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

result;

/** Console will show `3B5998` */
console.log(
  findColor("blue")
    .map(c => c.slice(1))
    .fold(e => "no color found with that name", c => c.toUpperCase())
);

/** Console will show `no color found with that name` */
console.log(
  findColor("orange")
    .map(c => c.slice(1))
    .fold(e => "no color found with that name", c => c.toUpperCase())
);
