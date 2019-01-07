const fs = require('fs');
const path = require('path');
const {getEntropy} = require('../index');

const imgDirPath = path.resolve(__dirname, './imgs');
fs.readdir(imgDirPath, (err, files) => {
  if (err) {
    console.warn(err);
  }
  let p = [];
  files.forEach(fileName => {
    let filePath = path.resolve(imgDirPath, fileName);
    p.push(getEntropy(filePath));
    /*
    let canvasImage = new CanvasImage(filePath);
    canvasImage.init().then(() => {
      console.log(fileName + '::', canvasImage.getEntropy());
    });
    */
  });
  Promise.all(p).then(res => {
    res.forEach((v, k) => {
      console.log(`${files[k]}::${v}`);
    });
  });
});