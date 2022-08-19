const fs = require('fs');
const superagent = require('superagent');

// Example of nested callbacks
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      // One line error handling
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, () => {
        console.log('Dog image saved to file.');
      });
    });
});

// Consuming promises (superagent has built in support)
// Chaining callbacks instead of nesting
// Pending promise -> Resolved promise (can be 'fufilled promise' or 'reqected promise')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)

    // .then only handles fuflled promises, not rejected (see .catch)
    .then((res) => {
      // One line error handling
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, () => {
        console.log('Dog image saved to file.');
      });
    })
    // Catches a rejected promise
    .catch((err) => {
      console.log(err.message);
    });
});
