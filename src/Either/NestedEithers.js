// const Either = Left || Right;

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  chain: f => f(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  chain: f => Left(x),
  inspect: () => `Right(${x})`
});

const fromNullable = x => (x != null ? Right(x) : Left(x));

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const fs = require("fs");

// const getPort = () => {
//   try {
//     const str = fs.readFileSync("config.json");
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (error) {
//     return 3000;
//   }
// };

const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json")) // Right('')
    .chain(c => tryCatch(() => JSON.parse(c))) // Right('')
    .fold(e => 3000, c => c.port);

const result = getPort();
console.log(result);
