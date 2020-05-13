// arrayOfRandoms :: Int -> Int -> [Int]
const arrayOfRandoms = (randomCeil) => (length) =>
  Array.from({ length: length }, (v, i) =>
    Math.floor(Math.random(), randomCeil)
  );

const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

const arrOfThousands = arrayOfRandoms(100)(1000);
const arrOfMillion = arrayOfRandoms(100)(1e6);

const isEven = (val) => val % 2 === 0;
const tripleIt = (val) => val * 3;

timeIt("thousand - map", () => {
  const resultFrom1000 = arrOfThousands.map(tripleIt); // 0.195ms
});

timeIt("thousand - map & filter", () => {
  const resultFrom1000 = arrOfThousands.map(tripleIt).filter(isEven); // 0.373ms
});

timeIt("million - map", () => {
  const resultFrom1000 = arrOfMillion.map(tripleIt); // 36.308ms
});

timeIt("million - map & filter", () => {
  const resultFrom1000 = arrOfMillion.map(tripleIt).filter(isEven); // 98.625ms
});

timeIt("million - imperitive", () => {
  const result = [];
  arrOfMillion.forEach((val) => {
    const triple = tripleIt(val);
    if (isEven(triple)) result.push(triple); // 109.541ms
  });
});
