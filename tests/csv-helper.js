import csvtojson from 'csvtojson';

export default (data, cb) => {
  const arr = [];

  csvtojson({ noheader: true })
    .fromString(data)
    .on('csv', (csvRow) => {
      arr.push(csvRow);
    })
    .on('done', (err) => {
      if (err) {
        return cb(err);
      }
      return cb(null, arr);
    });
};
