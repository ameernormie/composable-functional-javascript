/** Sum Monoid */
const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y)
});

Sum.empty = () => Sum(0);

/** Product Monoid */
const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y)
});

Product.empty = () => Product(1);

/** Product Monoid */
const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y)
});

All.empty = () => All(true);

/** Product Monoid */
const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y)
});

Any.empty = () => Any(true);

/** Product Monoid */
const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y)
});

Max.empty = () => Max(-Infinity);

/** Product Monoid */
const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y)
});

Min.empty = () => Min(Infinity);

const Right = x => ({
  fold: (f, g) => g(x),
  map: f => Right(f(x)),
  concat: o =>
    o.fold(
      e => Left(e),
      r => Right(x.concat(r))
    )
});

const Left = x => ({
  fold: (f, g) => f(x),
  map: f => Left(x),
  concat: o => Left(x)
});

const stats = List.of(
  { page: "Home", views: 40 },
  { page: "About", views: 10 },
  { page: "Contact", views: 4 }
);

stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum(0))); // Right(Sum(54))

const First = either => ({
  fold: f => f(either),
  concat: o => (either.isLeft ? o : First(either))
});

First.empty = () => First(Left());

const find = (xs, f) =>
  List(xs)
    .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x);

find([1, 2, 3, 4], x => x > 4); // Right(5)

const Pair = (x, y) => ({
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1))
});
