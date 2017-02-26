import { parseString } from 'xml2js';

export default {
  sortBy(field) {
    const key = x => x[field];

    /*eslint-disable */
    return (a, b) => {
      // @todo: refactor this as its unreadable and inconcise
      return a = key(a), b = key(b), ((a > b) - (b > a));
    }
    /*eslint-enable */
  },

  parseXml(data, cb) {
    // use sax parser to process xml string
    parseString(data, (err, obj) => {
      if (err) {
        return cb(err);
      }

      let newArray = [];

      try {
        // start processing at :
        const arr = obj.records.record;

        newArray = arr.map((item) => {
          const newItem = {};
          // create key value pair objects
          Object.keys(item).forEach((key) => {
            // reference is inside 'special' $ object
            if (key === '$') {
              newItem.reference = item.$.reference;
            } else {
              // all other fields are array like objects
              newItem[key] = item[key][0];
            }
          });

          return newItem;
        });
      } catch (e) {
        return cb(e);
      }

      return cb(null, newArray);
    });
  },

  // @todo should be implemented with csvtojson module
  // this implementation assumes that webpack will have
  // parsed csv to json. This function nearly transforms
  // from one json format to another.
  //
  // for an example look in tests: csv-helper.js
  parseCsv(data) {
    // make a copy and leave original data as-is.
    const arr = data.slice(0);

    // get key names from array
    // and remove keys from original dataset
    const keysArray = arr.shift();
    // remove last item which is trash !
    arr.pop();

    // helper - determine key name by index
    // since it is a csv file this is all we
    // can go on to create a key value pair.
    const getKeyName = function (index) {
      let keyName = keysArray[index];
      // concat to one name
      keyName = keyName.replace(/\s/g, '');
      // make first letter lowercase
      return keyName.charAt(0).toLowerCase() + keyName.slice(1);
    };

    const newArray = arr.map((item) => {
      const newItem = {};
      item.forEach((value, index) => {
        // get key names
        const keyName = getKeyName(index);
        // assign new key and value
        newItem[keyName] = value;
      });

      return newItem;
    });

    const sorter = this.sortBy('accountNumber');
    return newArray.sort(sorter);
  }
};
