## Either

#### const Either = Left || Right

`Left` and `Right` are two subclasses of `Either`. And `Either` doesn't come in to play when we use it. It will always represent one of its subclasses i.e. `Left` and `Right`

Either allows us to do:

- Pure functional Error handling
- Code branching
- Null checks
- All concepts that capture disjunction

`The main difference is how we define fold for both Right and Left`

#### How to `fold`:

For defining `fold` in the `Right` we can't simply unbox the value becuase we now have two types `Right` and `Left` and we don't know which one it is. So, we'll have to take it into consideration while defining `fold` on `Right`.
If our `fold` has to handle either of these cases, it needs to take two functions. If it is the `Right`, we need to run the 2nd function `g` here and if its the `Left`, we need to run the 1st function `f`.

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

##### Example

```javascript
/**
 * First case for Right
 */
const result = Right(2) // Let's assume it is Right (we don't know for sure)
  .map(x => x * 2)
  .fold(
    x => "error", // Runs if it's the Left
    x => x // Runs if it's the Right
  );

result; // 4

/**
 * Second case for Left
 */
const result = Left(2) // Let's assume it is Right (we don't know for sure)
  .map(x => x * 2)
  .fold(
    x => "error", // Runs if it's the Left
    x => x // Runs if it's the Right
  );

result; // error
```
