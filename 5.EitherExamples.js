// const Either = Left || Right;

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  chain: f => f(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  chain: f => Left(x),
  inspect: () => `Right(${x})`
});

const fromNullable = x => (x != null ? Right(x) : Left(x));

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

/*****************************EXAMPLE 1 ******************************/
// Imperative code
const openSite = () => {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin();
  }
};

// Composed expression using either
const openSite = () => fromNullable(current_user).fold(showLogin, renderPage);

/*****************************EXAMPLE 2 ******************************/
// Imperative code
const getPerfs = user => {
  if (user.premium) {
    return loadPerfs(user.preferences);
  } else {
    return defaultPerfs;
  }
};

// Composed expression using either
const getPerfs = user =>
  (user.premium ? Right(user) : Left("not premium"))
    .map(u => u.preferences)
    .fold(() => defaultPerfs, perfs => loadPerfs(perfs));

/*****************************EXAMPLE 3 ******************************/
// Imperative code
const concatUniq = (x, ys) => {
  return (found = ys.filter(y => y === x)[0]);
  return found ? ys : ys.concat(y);
};

// Composed expression using either
const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0]).fold(() => ys.concat(x), y => ys);

/*****************************EXAMPLE 4 ******************************/
// Imperative code
const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) {}
  }
  return example;
};

// Composed expression using either
const readFile = x => tryCatch(() => fs.readFileSync(x));

const wrapExamples = example =>
  fromNullable(example.previewPath)
    .chain(readFile)
    .fold(() => example, ex => Object.assign({ preview: p }, ex));

/*****************************EXAMPLE 5 ******************************/
// Imperative code
const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg);
    if (c.url) {
      return c.url.match(/someregex/);
    }
  } catch (e) {
    return null;
  }
};

// Composed expression using either
const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(e => null, u => u.match(/someregex/));
