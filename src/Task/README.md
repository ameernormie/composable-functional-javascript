### Task

Task acts like a box. It is used for lazy evaluation

```javascript
var Task = require("data.task");
var fs = require("fs");

// read : String -> Task(Error, Buffer)
function read(path) {
  return new Task(function(reject, resolve) {
    fs.readFile(path, function(error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// decode : Task(Error, Buffer) -> Task(Error, String)
function decode(task) {
  return task.map(function(buffer) {
    return buffer.toString("utf-8");
  });
}

var intro = decode(read("intro.txt"));
var outro = decode(read("outro.txt"));

// You can use `.chain` to sequence two asynchronous actions, and
// `.map` to perform a synchronous computation with the eventual
// value of the Task.
var concatenated = intro.chain(function(a) {
  return outro.map(function(b) {
    return a + b;
  });
});

// But the implementation of Task is pure, which means that you'll
// never observe the effects by using `chain` or `map` or any other
// method. The Task just records the sequence of actions that you
// wish to observe, and defers the playing of that sequence of actions
// for your application's entry-point to call.
//
// To observe the effects, you have to call the `fork` method, which
// takes a callback for the rejection, and a callback for the success.
concatenated.fork(
  function(error) {
    throw error;
  },
  function(data) {
    console.log(data);
  }
);
```
