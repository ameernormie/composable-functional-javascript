const { fold, left, right, map } = require("fp-ts/lib/Either");
const { pipe } = require("fp-ts/lib/pipeable");

const findColor = name => {
  // prettier-ignore
  const found = { red: "#ff4444", white: "#ffffff", black: "#000000" }[name];
  return found ? right(found) : left(found);
};

const result = pipe(
  findColor("red"),
  map(x => x.slice(1)),
  fold(
    e => "no color",
    x => x.toUpperCase()
  )
);

console.log("result ", result);
