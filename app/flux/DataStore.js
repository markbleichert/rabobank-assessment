import { EventEmitter } from 'events';
import Constants from './Constants.js';
import Dispatcher from './Dispatcher.js';

import Validator from '../components/validator.js';

class DataStore extends EventEmitter {
  constructor(data = []) {
    super();

    this.data = data;

    this.registerDispatcher();
  }

  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeChangeListener('change', callback);
  }

  updateData(data) {
    this.data = data;
  }

  getList() {
    this.validator = new Validator(this.data);
    this.validator.run();

    return this.data;
  }

  sortBy(field) {
    const key = x => x[field];

    /*eslint-disable */
    return (a, b) => {
      // @todo: refactor this as its unreadable and inconcise
      return a = key(a), b = key(b), ((a > b) - (b > a));
    }
    /*eslint-enable */
  }

  sortData(field = 'reference') {
    const fnc = this.sortBy(field, false);
    this.data.sort(fnc);
  }

  hasInvalidProps(ref) {
    return this.validator.hasInvalidProps(ref);
  }

  getInvalidProps(ref) {
    return this.validator.getInvalidProps(ref);
  }

  isBalanced(ref) {
    return this.validator.isBalanced(ref);
  }

  isDuplicate(ref) {
    return this.validator.isDuplicate(ref);
  }

  registerDispatcher() {
    return Dispatcher.register((payload) => {
      const action = payload.action;

      switch (action.actionType) {
        case Constants.UPDATE_DATA:
          this.updateData(payload.action.data);
          break;

        case Constants.SORT_DATA:
          this.sortData(payload.action.data);
          break;

        case Constants.LOADING_FAILED:
          // for now just log it !
          console.log(payload.action.data);
          break;

        default:
            // do nothing
      }

      this.emitChange();

      return true;
    });
  }
}

module.exports = DataStore;
