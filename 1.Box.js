// const nextCharForNumberString = str => {
//   const trimmed = str.trim();
//   const number = parseInt(trimmed);
//   const nextNumber = number + 1;
//   return String.fromCharCode(nextNumber);
// };

/** Actually confusing */
// const nextCharForNumberString = str =>
//   String.fromCharCode(parseInt(str.trim()) + 1);

/** Take the help of the array */
// const nextCharForNumberString = str =>
//   [str]
//     .map(s => s.trim())
//     .map(s => parseInt(s))
//     .map(i => i + 1)
//     .map(ch => String.fromCharCode(ch));

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(ch => String.fromCharCode(ch))
    .fold(ch => ch.toLowerCase());

const result = nextCharForNumberString(" 64 ");

result;
