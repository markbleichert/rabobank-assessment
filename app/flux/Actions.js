const Constants = require('./Constants.js');
const Dispatcher = require('./Dispatcher.js');
const DataSource = require('./DataSource.js');

const Actions = {
  fetchData(id = 'xml') {
    const map = {
      xml: 'loadXML',
      csv: 'loadCSV',
      all: 'loadAll'
    };

    let method = null;

    if (id in map) {
      method = map[id];
    } else {
      this.loadingFailed('Unknow data type request.');
      // stop data loading execution below
      return;
    }

    DataSource[method]()
      .then((data) => {
        this.updateData(data);
      })
      .catch((errorMessage) => {
        this.loadingFailed(errorMessage);
      });
  },

  loadingFailed(errorMessage) {
    Dispatcher.handleViewAction({
      actionType: Constants.LOADING_FAILED,
      data: errorMessage
    });
  },

  updateData(data) {
    Dispatcher.handleViewAction({
      actionType: Constants.UPDATE_DATA,
      data
    });
  },

  sortData(property) {
    Dispatcher.handleViewAction({
      actionType: Constants.SORT_DATA,
      data: property
    });
  }
};

module.exports = Actions;
