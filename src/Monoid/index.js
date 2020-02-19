const Sum = x => ({
  x,
  concat: o => Sum(x + o.x)
});
Sum.empty = () => Sum(0);

const All = x => ({
  x,
  concat: o => All(x && o.x)
});
All.empty = () => All(true);

const Product = x => ({
  x,
  concat: o => Product(x * o.x)
});
Product.empty = () => Product(1);

const Any = x => ({
  x,
  concat: o => Any(x || o.x)
});
Any.empty = () => Any(false);

const Max = x => ({
  x,
  concat: o => Max(x > o.x ? x : o.x)
});
Max.empty = () => Max(-Infinity);

const Min = x => ({
  x,
  concat: o => Min(x < o.x ? x : o.x)
});
Min.empty = () => Min(Infinity);

module.exports.Min = Min;
module.exports.Max = Max;
module.exports.Any = Any;
module.exports.Product = Product;
module.exports.All = All;
module.exports.Sum = Sum;
