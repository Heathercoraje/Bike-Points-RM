const path = require('path');
const fs = require('fs');

const findMatches = (str, callback) => {
  const filePath = path.join(__dirname, "..", "bike-stations.txt");
  var result = [];
  var newStr = str.replace(/\./, '');
  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    } else {
      file.toLowerCase().split(",").forEach((station) => {
        if (station.startsWith(newStr) && result.length <= 3) {
          result.push(station);
        }
      });
      if (result.length <= 3) {
        file.toLowerCase().split(",").forEach((station) => {
          if ((station.indexOf(newStr) !== -1) && (result.length <= 3) && (result.indexOf(station) === -1)) {
            result.push(station);
          }
        })

      };
      callback(result);
    }
  });
}


module.exports = findMatches