"use strict";

(function (x) {
  console.log(x);
})("yo");

// for (var i = 0; i < 5; i++) {
//   (function IIFE() {
//     var j = i;
//     setTimeout(() => {
//       console.log("j: " + j);
//     }, j * 1000);
//   })();
// }

function sleep(time) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

sleep(1000)
  .then(() => {
    console.log("one");
    throw new Error("yo");
    return sleep(1000);
  })
  .then(() => {
    console.log("two");
    return sleep(1000);
  })
  .then(() => {
    console.log("three");
    return sleep(1000);
  })
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log("error: ", err);
  });
