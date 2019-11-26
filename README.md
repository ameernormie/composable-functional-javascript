## Composable-functional-javascript

**`map` isn't so much about the iteration. It's more about composition within a context**
**`fold` is the idea of removing the value from its context- Taking it out of the box(Right, Left)**
**`chain` expects you to run a function and return another one**
**`semi-group` is a type with a concat method**
**`monoid` a semi-group with a special element in there that acts like an identity**
**`functor` any type with a map method. It must obey some laws**

Functional programming is the first step towards error free coding

## Concepts

- Box
- Either
- Left
- Right

**How composability helps us make our code clean?**

- What are functors (composable map)

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
