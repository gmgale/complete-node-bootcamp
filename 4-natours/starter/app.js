const fs = require('fs');
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     // Express auto sets Content-type: application/json wjem we use .json
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });
//
// app.post('/', (req, res) => {
//     res
//         .status(200)
//         .send("You can post to this endpoint.")
// })

// Read data before event loop

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // .json sends the request so no need to use app.send();
      // // 201 = updated
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  // req.params will parse :id into an Object. Can also have /:x/:y/:z that will
  // be split into the object but are manadtory in the URL and will throw err.
  // /x? will make it optional. /api/.../:id/:y?/:z?
  console.log(req.params);
  const id = req.params.id * 1; // Type coersion string->number

  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(200).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// patch is used were the client sends just the info to be updated, not all.
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(200).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // patch logic goes here...
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
});

// put is used were the client has to send all the info to be updated.
app.put('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // put logic goes here...
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // put logic goes here...
  res.status(204).json({
    status: 'success',
    data: {
      tour: 'null',
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
