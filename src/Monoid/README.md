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
  concat: _o_ => First(x)
});

const res = First("blah").concat(First("ice cream"));

res; // First(blah)
```
