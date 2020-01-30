## Semi-Group

**A semi-group is a type with a `concat` method**

A `Semi-Group` is a mathematical term that comes from algebra that has some rules like `Associativity`

- `const str = "a".concat("b")` will result in `ab`. So type `string` is a semi-group here.
- `const res = [1,2].concat([3,4])` will result in `[1,2,3,4]`. So type `Array` is a semi-group here.

If you think about it addition is a semi-group i.e. 1 + (1 + 1) = (1 + 1) + 1
but we can't call `concat` on a number. But we can define our own semi-group.
