import parser from '../components/parser.js';

import xml from '../data/records.xml';
import csv from '../data/records.csv';

const DataSource = {
  loadXML(data = xml) {
    return new Promise((resolve, reject) => {
      parser.parseXml(data, (err, d) => {
        if (err) {
          reject(err);
        }
        resolve(d);
      });
    });
  },

  loadCSV(data = csv) {
    return new Promise((resolve, reject) => {
      try {
        const d = parser.parseCsv(data);
        resolve(d);
      } catch (e) {
        reject(e);
      }
    });
  },

  loadAll() {
    const p1 = this.loadXML(xml);
    const p2 = this.loadCSV(csv);

    // merge the results of to promise calls
    return Promise.all([p1, p2]).then(arr => [].concat(...arr));
  }
};

module.exports = DataSource;
