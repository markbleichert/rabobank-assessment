const FluxDispatcher = require('flux').Dispatcher;
const assign = require('object-assign');

const Dispatcher = assign(new FluxDispatcher(), {
  handleViewAction(action) {
    this.dispatch({ action });
  }
});

module.exports = Dispatcher;
