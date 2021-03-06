const fs = require("fs");

const {
  fold,
  left,
  right,
  map,
  //   fromNullable,
  tryCatch,
  isRight,
  isLeft
} = require("fp-ts/lib/Either");
const { pipe } = require("fp-ts/lib/pipeable");

const findColor = name => {
  // prettier-ignore
  const found = { red: "#ff4444", white: "#ffffff", black: "#000000" }[name];
  return found ? right(found) : left(found);
};

const colorFound = pipe(
  findColor("red"),
  map(x => x.slice(1)),
  fold(
    e => "no color",
    x => x.toUpperCase()
  )
);

console.log("simple found color ", colorFound);

const fromNullable = x => (x != null ? right(x) : left(x));

const findColorImproved = name => {
  // prettier-ignore
  return fromNullable({ red: "#ff4444", white: "#ffffff", black: "#000000" }[name])
};

const colorFoundImproved = pipe(
  findColorImproved("asdf"),
  map(x => x.slice(1)),
  fold(
    e => "no color",
    x => x.toUpperCase()
  )
);

console.log("improved find color ", colorFoundImproved);

// const tryCatch = f => {
//   try {
//     return right(f());
//   } catch (e) {
//     return left(e);
//   }
// };

const getPort = () =>
  tryCatch(
    () => fs.readFileSync("config.json"),
    x => x
  ).map(x => JSON.parse(x));

const result = getPort();

console.log("result ", result);
