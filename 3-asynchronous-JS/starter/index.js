const fs = require('fs');
const { get } = require('http');
const superagent = require('superagent');

// // Example of nested callbacks
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       // One line error handling
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//
//       fs.writeFile('dog-img.txt', res.body.message, () => {
//         console.log('Dog image saved to file.');
//       });
//     });
// });

// Consuming promises (superagent has built in support)
// Chaining callbacks instead of nesting
// Pending promise -> Resolved promise (can be 'fufilled promise' or 'rejected promise')
//
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//
//     // .then only handles fuflled promises, not rejected (see .catch)
//     .then((res) => {
//       // One line error handling
//       console.log(res.body.message);
//
//       fs.writeFile('dog-img.txt', res.body.message, () => {
//         console.log('Dog image saved to file.');
//       });
//     })
//     // Catches a rejected promise
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// Promise wrapper for fs readFile
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      // If there is an error, resolve the rejected promise.
      if (err) reject(err);
      // If successful, resolve the fufilled promise.
      resolve(data);
    });
  });
};

const writeFilePro = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve('File written successfully!');
    });
  });
};

// Using promise
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     // By returning the promise, we can chain on another .then
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   // .then only handles fuflled promises, not rejected (see .catch)
//   // the 'res' is the resolved promise of the previous handler (superagent.get)
//   .then((res) => {
//     // Again, by returning the promise, we can chain on another .then
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Dog image saved to file.');
//   })
//   // Catches all rejected promises from any above promise
//   .catch((err) => {
//     console.log(err.message);
//   });

// Using async/await
const getDogPic = async () => {
  try {
    // Waits for the resolved promise and stores it in data.
    const data = await readFilePro(`${__dirname}/dog.txt`);
    readFilePro(`${__dirname}/dog.txt`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Dog image saved to file.');
  } catch (err) {
    // Use try/catch to catch errors for async/await
    console.log(err.message);
    throw err;
  }
  return 'READY';
};

//
// console.log('Getting dog pics');
// // getDogPic();
// console.log('Finished getting pics!');
// // ^^^ this line prints before getDogPic() has finished!
// // If we want to wait for the return value, we use .then as async is really a promise
//
// // However now the promise will always resolve fufilled.
// // We re-throw the error in the .catch
// getDogPic()
//   .then((x) => {
//     console.log(x);
//   })
//   .catch((err) => {
//     // Catching re-throw from async try/catch
//     console.log(err.message);
//   });

// the above mixes async and promises using .then etc...
/* IFFE Pattern 
(() => {

})();
*/

// Use this...
(async () => {
  try {
    console.log('Getting dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('Finished getting pics!');
  } catch (err) {
    console.log(err);
  }
})();

// Waiting/running muliple promises at the same time
// Store the pending promise in a vaiable
const getDogPic2 = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    // Run all 3 promises at the same time
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);

    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
  } catch (err) {}
};

getDogPic2();
