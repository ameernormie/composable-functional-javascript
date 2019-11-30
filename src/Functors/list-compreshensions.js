const { List } = require("immutable-ext");

const merch = () =>
  List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(["teeshirt", "sweater"]))
    .ap(List(["large", "medium", "small"]))
    .ap(List(["white", "black"]));

console.log(merch());
