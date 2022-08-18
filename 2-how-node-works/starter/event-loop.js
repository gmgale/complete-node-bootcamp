const fs = require("fs");
const fs = require("crypto");

// Note the order of the output due to the order of the event loop processing.
setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("immediate 1 finished"));

fs.readFile("text-file.txt", () => {
  console.log("I/O finised");

  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);
  setTimeout(() => console.log("timer 4 finished"), 4000);

  process.nextTick(() => console.log("Process.nextTick"));

  // Having multuiple of the below would execute in parallel using the thread
  // pool provided by libuv. Default size is 4, max 1024, and can be explicitly
  // set using procss.env.UV_THREADPOOL_SIZE=<number>.
  // Note if we made these Sync, they would not be offloaded and wold block the
  // execution.
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log("password encrypted")
  );
});

console.log("Hello from the top level code");
