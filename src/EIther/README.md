## Either

#### const Either = Left || Right

`Left` and `Right` are two subclasses of `Either`. And `Either` doesn't come in to play when we use it. It will always represent one of its subclasses i.e. `Left` and `Right`

### Right

```javascript
const Right = x => ({
  map: f => Right(f(x)),
  inspect: () => `Right(${x})`
});

const res = Right(3).map(x => x + 1);

res; // Right(4)
```

### Left

```javascript
const Left = x => ({
  map: f => Left(x), // Key difference - It will not run the f on x. It will ignore the f altogether
  inspect: () => `Left(${x})`
});

const res = Left(3).map(x => x + 1);

res; // Left(3) - Function wasn't applied - It just returned the original value
```
