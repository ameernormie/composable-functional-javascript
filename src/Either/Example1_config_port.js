const fs = require("fs");
const either = require("./Either");

/**
 * Old method
 */
// const getPort = () => {
//   try {
//     const str = fs.readFileSync(__dirname + "/config.json");
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return 3000;
//   }
// };

const getPort = () =>
  either
    .tryCatch(() => fs.readFileSync(__dirname + "/config.json")) // Right()
    .chain(c => either.tryCatch(() => JSON.parse(c))) // Right(Right())
    .fold(
      e => 3000,
      c => c.port
    );

const result = getPort();
console.log("result ", result);
