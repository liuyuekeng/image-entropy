const fs = require('fs');
const path = require('path');
const imgEntropy = require('../index');

const imgDirPath = path.resolve(__dirname, './imgs');
fs.readdir(imgDirPath, (err, files) => {
  if (err) {
    console.warn(err);
  }
  let p = [];
  files.forEach(fileName => {
    let filePath = path.resolve(imgDirPath, fileName);
    var img = imgEntropy(filePath);
    p.push(Promise.all([img.getEntropy(), img.get2DEntropy()]))
  });
  Promise.all(p).then(res => {
    res.forEach((v, k) => {
      console.log(`${files[k]}::${v}`);
    });
  });
});