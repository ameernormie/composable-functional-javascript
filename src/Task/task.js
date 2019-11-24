const Task = require("data.task");

/** Success case */
Task.of(1)
  .map(x => x + 1)
  .chain(x => Task.of(x + 1))
  .fork(
    e => console.log("error ", e),
    s => console.log("success ", s)
  );

/**
 * Error case.
 * Even if is map between it. it will show the failure scenario
 */
Task.rejected(1)
  .map(x => x + 1)
  .fork(
    e => console.log("error ", e),
    s => console.log("success ", s)
  );

const launchMissiles = () =>
  new Task((rej, res) => {
    console.log("launch missiles!");
    res("missile");
  });

launchMissiles()
  .map(x => x + "!")
  .fork(
    e => console.log("err ", e),
    x => console.log("success ", x)
  );

/** IF we don't fork it it will not run */

const app = launchMissiles().map(x => x + "!");

app.fork(
  e => console.log("lazy error ", e),
  x => console.log("lazy success ", x)
);
