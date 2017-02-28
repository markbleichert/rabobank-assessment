const FluxDispatcher = require('flux').Dispatcher;
const assign = require('object-assign');

const Dispatcher = assign(new FluxDispatcher(), {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action
    });
  }
});

module.exports = Dispatcher;
