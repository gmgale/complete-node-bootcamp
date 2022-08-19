const fs = require('fs');
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

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    // By returning the promise, we can chain on another .then
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  // .then only handles fuflled promises, not rejected (see .catch)
  // the 'res' is the resolved promise of the previous handler (superagent.get)
  .then((res) => {
    // Again, by returning the promise, we can chain on another .then
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Dog image saved to file.');
  })
  // Catches all rejected promises from any above promise
  .catch((err) => {
    console.log(err.message);
  });
