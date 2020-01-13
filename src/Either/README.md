## Either

#### const Either = Left || Right

`Left` and `Right` are two subclasses of `Either`. And `Either` doesn't come in to play when we use it. It will always represent one of its subclasses i.e. `Left` and `Right`

`The main difference is how we define fold for both Right and Left`

#### How to `fold`:

For defining `fold` in the `Right` we can't simply unbox the value becuase we now have to types.
`Right` and `Left` and we don't know which one it is. So, we'll have to take it into consideration while defining `fold` on `Right`.
If our `fold` has to handle either of these cases, it needs to take two functions. If it is the `Right` case we need to run the 2nd function `g` here and if its the `Left` case we need to run the 1st function `f`.

### Right

```javascript
const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x), // Run the 2nd function in case of Right
  inspect: () => `Right(${x})`
});

const res = Right(3).map(x => x + 1);

res; // Right(4)
```

### Left

```javascript
const Left = x => ({
  map: f => Left(x), // Key difference - It will not run the f on x. It will ignore the f altogether
  fold: (f, g) => f(x), // Run the 1st function in case of Right
  inspect: () => `Left(${x})`
});

const res = Left(3).map(x => x + 1);

res; // Left(3) - Function wasn't applied - It just returned the original value
```
