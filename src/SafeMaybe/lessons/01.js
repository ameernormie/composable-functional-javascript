const { inc } = require("../utils");
const Maybe = require("crocks/Maybe");

// Maybe = Just x | Nothing

const input = Maybe.Just(2);
const result = input.map((n) => console.log("calling inc") || inc);

console.log(result);
