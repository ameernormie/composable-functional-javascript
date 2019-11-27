const add = x => y => x + y;

const inc = add(1);

res = inc(2);

res; // 3

const modulo = divisor => divident => divident % divisor;

const isOdd = modulo(2);
const res2 = isOdd(5);
res2; // 1

const filter = pred => xs => xs.filter(pred);

const getAllOdds = filter(isOdd);

const res3 = getAllOdds([1, 2, 3, 4, 5, 6, 7]);
res3; // [1,3,5,7]

const replace = regex => replace => str => str.replace(regex, replace);

const censor = replace(/[aeiou]/gi)("*");

const res4 = censor("hello world");
res4; // h*ll* w*rld

const map = f => xs => xs.map(f);

const censorAll = map(censor);
const res5 = censorAll(["hello", "world", "how", "are", "you"]);
res5; // ['h*ll*', 'w*rld', 'h*w', '*r*', 'y**']
