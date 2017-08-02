const path = require('path');
const fs = require('fs');

const findMatches = (str, callback) => {
  const filePath = path.join(__dirname, "..", "bike-stations.txt");
  var result = [];
  fs.readFile(filePath, 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    }
    else {
        file.toLowerCase().split(",").forEach((station) => { //split at the comma and loop through the string
           if (station.startsWith(str) && result.length <= 10) {  //if string matches the first few inputs
             result.push(station); //push the star name into the auto result
           }
         });
         if (result.length <= 10) {
           file.toLowerCase().split(",").forEach((station) => {
             if ((station.indexOf(str) !== -1) && (result.length <= 10) && (result.indexOf(station) === -1)) {
               result.push(station);
             }
           })

};
       callback(result);
     }
   });
  }


module.exports = findMatches
