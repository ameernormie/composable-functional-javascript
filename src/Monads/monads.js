const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

/** Task example */
// httpget("/user").map(user => httpget(`/comments/${user.id}`)); // Task(Task([Comment]))

// httpget("/user").chain(user => httpget(`/comments/${user.id}`)); // Task([Comment])

/** m ==> monad */
const join = m => m.chain(x => x);

/** First Law */
m = Box(Box(Box("what")));
const res1 = join(m.map(join)); // Box(3)
const res2 = join(join(m)); // Box(3)

/** 2nd law */
const m = Box("wonder");
const res1 = join(Box.of(m)); // Box(wonder)
const res2 = join(m.map(Box.of)); // Box(wonder)
