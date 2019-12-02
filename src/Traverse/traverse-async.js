const fs = require("fs");
const Task = require("data.task");
const { List, Map } = require("immutable-ext");

const httpGet = (path, params) => Task.of(`${path} result`);

function withSimpleMap() {
  Map({ home: "/", about: "/about-us", blog: "/blog" }).map(route =>
    httpGet(route, {})
  );

  // This will end up giving us
  // Map({home: Task('/ result')})
}

function withTraverse() {
  Map({ home: "/", about: "/about-us", blog: "/blog" })
    .traverse(Task.of, route => httpGet(route, {}))
    .fork(console.error, console.log);
}

withTraverse(); // Map { "home": "/ result", "about": "/about-us result", "blog": "/blog result" }

function multipleTraverse() {
  Map({ home: ["/", "/home"], about: ["/about-us"] })
    .traverse(Task.of, routes =>
      List(routes).traverse(Task.of, route => httpGet(route, {}))
    )
    .fork(console.error, console.log);
}

multipleTraverse();
