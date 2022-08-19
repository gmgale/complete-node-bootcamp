// We can see the args of the parent wrapper function of the module.
// This shows we are now in a wrapper function.
console.log(arguments);

// Internally node uses the module 'module' to wrap modules into a func.
<<<<<<< HEAD
console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
=======
console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
>>>>>>> ef6373c (Add to tracking.)
const calc1 = new C();

// console.log(calc1.add(3, 7));

// exports
// - adds properties directly to te exports object.
// We can use ES6 destructing to assign them directly to variables:
const { add, multiply } = require("./test-module-2");
console.log(add(3, 7));

// Caching
//                         / call immediatly.
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
