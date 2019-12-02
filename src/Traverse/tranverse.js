const fs = require("fs");
const Task = require("data.task");
const futurize = require("futurize").futurize(Task);
const { List } = require("immutable-ext");

const readFile = futurize(fs.readFile);

function withoutTraversing() {
  const files = ["config.json", "config2.json"];

  const res = files.map(fn => readFile(fn, "utf-8"));
  console.log(res);

  // As a result we get list of Tasks
  // [ Task { fork: [λ], cleanup: [λ] },
  //   Task { fork: [λ], cleanup: [λ] } ]

  // What we want is to turn [Task] ==> Task([])
  // Essentially turn these types inside out
}

withoutTraversing();

function withTraversing() {
  const files = List(["/config.json", "/config2.json"]);

  /**
   * We need to give it a typeup. Because we are not in a type setting and
   * it cannot figure out what the outer type should be in the case of failure,
   * in the case of not ever running the function
   */
  files
    .traverse(Task.of, fn => readFile(__dirname + fn, "utf-8"))
    .fork(console.error, console.log);

  // List of results
  // List [ "{\n  \"config\": \"something\"\n}\n", "{\n  \"config2\": \"something2\"\n}\n" ]
}

withTraversing();
