## Composable-functional-javascript

**`map` isn't so much about the iteration. It's more about composition within a context**
**`fold` is the idea of removing the value from its context- Taking it out of the box(Right, Left)**
**`chain` expects you to run a function and return another one. Also called foldMap in some languages**
**`semi-group` is a type with a concat method**
**`monoid` a semi-group with a special element in there that acts like an identity**
**`functor` any type with a `map` method. It must obey some laws**
**`monads` any type with an `of` function on them that places a value into the type and a `chain(flatMap, bind)` method**

Functional programming is the first step towards error free coding

## Concepts

- Box
- Either
- Left
- Right
- map
- fold
- chain
- semi-group
- monoid
- functor
- monads
- Applicative Functors

**How composability helps us make our code clean?**

- What are functors (composable map)
- What are monads
- What is ad-hoc polymorphism?
- What are type-classes?

### Functors:

`any type with a map method. It must obey two laws`

1. Associativity:

   - any type `fx` (some functor holding x), when we map `f` over it and then we map `g` over it should be the same as running map once over it by saying first run `f` then `g` over it.

   ```javascript
   // fx.map(f).map(g) == fx.map(x => g(f(x)))
   const runningMapTwice = Box("squirrels")
     .map(s => s.substr(5))
     .map(s => s.toUpperCase());
   const runningMapOnce = Box("squirrels").map(x => x.substr(5).toUpperCase());

   runningMapOnce; // Box(RELS)
   runningMapTwice; // Box(RELS)
   ```

2. Identity:

   - It must have an identity function

   ```javascript
   // fx.map(id) == id(fx)

   const id = x => x;

   const res1 = Box("crayons").map(id);
   const res2 = id(Box("crayons"));

   console.log(res1, res2); // Box(crayons) Box(crayons)
   ```

### Monads

**`monads` any type with an `of` function on them that places a value into the type and a `chain(flatMap, bind)` method**
`Monads actually allow us to nest computation`

```javascript
http.get("/user").map(user => http.get(`comments/${user}`)); // Task(Task([Comment]))

http.get("/user").chain(user => http.get(`comments/${user}`)); // Task([Comment])
```

1. `join(m.map(join)) == join(join(m))`
   join just joins two types together

```javascript
const join = m => m.chain(x => x);

/** First Law */
m = Box(Box(Box("what")));
const res1 = join(m.map(join)); // Box(3)
const res2 = join(join(m)); // Box(3)
```

2. `join(Box.of(m)) == join(m.map(Box.of))`

```javascript
const join = m => m.chain(x => x);
/** 2nd law */
const m = Box("wonder");
const res1 = join(Box.of(m)); // Box(wonder)
const res2 = join(m.map(Box.of));
```

3. `chain`
   Monads have a chain method on them. `chain` basically is `flatmap`.
   Example:

```javascript
import { map, flatten, chain } from "ramda";
const arr = [1, 2, 3, 4];

// duplicate takes a value and returns an other type(array) with value in it
const duplicate = x => [x, x];

// Normally
console.log(flatten(map(duplicate, arr))); // [1,1,2,2,3,3,4,4]

// Using chain (flatMap) is automatically applied
console.log(chain(duplicate, arr)); // [1,1,2,2,3,3,4,4]
```














