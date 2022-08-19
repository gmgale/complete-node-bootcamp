const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1

  //   // Whole file is read into memory before node can send it.
  //   fs.readFile('./test-file.txt', (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.end(data);
  //     }
  //   });

  // Solution 2: Streams

  //   const readable = fs.createReadStream('./test-file.txt');
  //   // Each tme data is avalible to be read a 'data' event is emitted.
  //   readable.on('data', (chunk) => {
  //     // write to writable stream (send read chunk directly to client).
  //     res.write(chunk);
  //   });
  //   // When there is no more data, an 'end' event is emitted.
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //     // Handle read stream error
  //   readable.on('error', (err) => {
  //     res.writeHead(500);
  //     console.log(err);
  //     res.end('File not found');
  //   });

  // Solution 3: Handing back-preesure with pipe
  // This is used because the readable stream will be much faster than the
  // writable stream. This will handle the speed automatically.

  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writableDestination)
});

server.listen(3000, '127.0.0.1', () => {
  console.log('listening');
});
