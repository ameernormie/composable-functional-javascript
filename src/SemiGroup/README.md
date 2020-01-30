## Semi-Group

**A semi-group is a type with a `concat` method**

A `Semi-Group` is a mathematical term that comes from algebra that has some rules like `Associativity`

- `const str = "a".concat("b")` will result in `ab`. So type `string` is a semi-group here.
- `const res = [1,2].concat([3,4])` will result in `[1,2,3,4]`. So type `Array` is a semi-group here.

If you think about it addition is a semi-group i.e. 1 + (1 + 1) = (1 + 1) + 1
but we can't call `concat` on a number. But we can define our own semi-group.

#### Sum Semi-Group:

```javascript
const Sum = x => ({
  x,
  concat: o => Sum(x + o.x)
});

const res = Sum(1).concat(Sum(2));

res; // Sum(3)
```

#### All Semi-Group:

This is a kind of concatination. We are combining two values and concating it to one.
`true && false` // false
`true && true` // true

```javascript
const All = x => ({
  x,
  concat: o => All(x && o.x)
});

const res = All(true).concat(All(false));

res; // All(false)
```

#### First Semi-Group:

It will always keep the first one

```javascript
const First = x => ({
  x,
  concat: _o_ => First(x)
});

const res = First("blah").concat(First("ice cream"));

res; // First(blah)
```
