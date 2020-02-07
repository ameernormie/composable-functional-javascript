## Monoid

**A monoid is a semi-group that has a special element in there that acts as an identity**
**A semi-group is a type with a `concat` method that is associative**

Consider addition. `0` is an identity for addition

#### Sum Monoid:

```javascript
const Sum = x => ({
  x,
  concat: o => Sum(x + o.x)
});

Sum.empty = () => Sum(0);

// Doesn't make a difference because empty is acting like an identity
const res = Sum.empty()
  .Sum(1)
  .concat(Sum(2));

res; // Sum(3)
```

#### All Monoid:

This is a kind of concatination. We are combining two values and concating it to one.
`true && false` // false
`true && true` // true

```javascript
const All = x => ({
  x,
  concat: o => All(x && o.x)
});

All.empty = () => All(true);

// Doesn't make a difference because empty is acting like an identity
const res = All(true)
  .concat(All(false))
  .concat(All.empty());

res; // All(false)
```

#### First Semi-group:

We don't have a way to convert `First` semi-group to a `monoid` because `First.empty(?).concat(First('something'))` will throw away the second part, so it won't work as an identity for this

```javascript
const First = x => ({
  x,
  concat: o => First(x)
});

const res = First("blah").concat(First("ice cream"));

res; // First(blah)
```

#### First Monoid:

`First` can be converted to a monoid if it accepts an `Either` type

```javascript
const First = either => ({
  fold: f => f(either),
  concat: o => (either.isLeft ? o : First(either))
});

First.empty = () => First(Left());
```

#### Product Monoid:

```javascript
const Product = x => ({
  x,
  concat: o => Product(x * o.x)
});

Product.empty = () => Product(1);
```

#### Any Monoid:

```javascript
const Any = x => ({
  x,
  concat: o => Any(x || o.x)
});

Any.empty = () => Any(false);
```

#### Max Monoid:

```javascript
const Max = x => ({
  x,
  concat: o => Max(x > o.x ? x : o.x)
});

Max.empty = () => Max(-Infinity);
```

#### Min Monoid:

```javascript
const Min = x => ({
  x,
  concat: o => Min(x < o.x ? x : o.x)
});

Min.empty = () => Min(Infinity);
```

**A semi-group does not have an identity value so it does not have an element to return, so it is not a safe operation, whereas with a monoid we can take as many as possible even an none**

```javascript
// Starting point of reduce is 0, that is an identity for sum
const sum = xs => xs.reduce((acc, x) => acc + x, 0);

// If called on a list it will yield the sum of that list
const sumList = sum([1, 2, 3]); // 6
// If called on an empty list it will yield 0
const sumList = sum([]); // 0

// Starting point of reduce is true, that is an identity for all
const all = xs => xs.reduce((acc, x) => acc && x, true);

// If called on a list it will yield true or false
const allTrue = all([true, false, true]); // false
// If called on an empty list it will yield true
const allTrue = all([]); // true

// Starting point of reduce is nothing, because we don't have a starting value
const first = xs => xs.reduce((acc, x) => acc);

// If called on a non-empty list it will yield first element
const giveFirst = first([1, 2, 3]); // 1
// If called on an empty list it will blow up (Give error)
const gitFirst = first([]); // Error
```
