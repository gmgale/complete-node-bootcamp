const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// It is good practice to extend the emmiter into a specfic emmier for ourr use case.
class Sales extends EventEmitter {
  constructor() {
    // Must call super() in constructor to access super methods. Sales is parent.
    super();
  }
}

myEmitter.on('newSale', () => console.log('"newSale!"'));
myEmitter.on('newSale', () => console.log('"customer: asdef"'));
myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items added to the order.`);
});

myEmitter.emit('newSale', 9);

///////////////////////////////////////////////////////////////////////////////
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  console.log('request received');
});
server.on('request', (req, res) => {
  console.log('request received again');
});

// This will hang because the event listeners are in the event loop waiting.
// Once we send a request to the server the event lister will respond.
server.listen(3000, '127.0.0.1', () => {
  console.log('Waiting for server...');
});
