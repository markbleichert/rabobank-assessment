import { parseString } from 'xml2js';

export default {
  sortBy(field) {
    const key = (x) => x[field];

    return (a, b) => {
      return a = key(a), b = key(b), ((a > b) - (b > a));
    }
  },

  parseXml(data, cb) {
    // use sax parser to process xml string
    parseString(data, (err, obj) => {
        if (err) {
          return cb(err);
        }

        // start processing at :
        const arr = obj.records.record;

        const newArray = arr.map((item, index) => {
          const newItem = {};
          // create key value pair objects
          Object.keys(item).forEach((key, i)=> {
            // reference is inside 'special' $ object
            if (key ==='$') {
              newItem.reference = item.$.reference;
            } else {
              // all other fields are array like objects
              newItem[key] = item[key][0];
            }
          });

          return newItem;
        });

        return cb(null, newArray);
    });
  },

  parseCsv(data) {
    // make a copy and leave original data as-is.
    const arr = data.slice(0);

    // get key names from array
    // and remove keys from original dataset
    var keysArray = arr.shift();
    // remove last item which is trash !
    arr.pop();

    // helper - determine key name by index
    // since it is a csv file this is all we
    // can go on to create a key value pair.
    const getKeyName = function(index) {
      var keyName = keysArray[index];
      // concat to one name
      keyName = keyName.replace(/\s/g, '');
      //make first letter lowercase
      return keyName.charAt(0).toLowerCase() + keyName.slice(1);
    }

    const newArray = arr.map((item) => {
       var newItem = {};
       item.forEach((value, index)=> {
         // get key names
         var keyName = getKeyName(index);
         // assign new key and value
         newItem[keyName] = value;
       });

       return newItem;
    });

    const sorter = this.sortBy('accountNumber');
    return newArray.sort(sorter);
  }
};
