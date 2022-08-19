console.log('Hello from the module');

module.exports = () => {
  console.log(
    'Hello from the function export! Subsiquent calls will come from cache...'
  );
};
