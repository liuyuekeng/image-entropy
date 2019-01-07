const {CanvasImage} = require('./src/canvas-image');
const fs = require('fs');
const path = require('path');

const baseLineCanvasImage = new CanvasImage('./src/baseline.png');
baseLineCanvasImage.init().then(() => {
  console.log('base::', baseLineCanvasImage.getEntropy());
});

const imgDirPath = './imgs';
fs.readdir(imgDirPath, (err, files) => {
  if (err) {
    console.warn(err);
  }
  files.forEach(fileName => {
    let filePath = path.resolve(imgDirPath, fileName);
    let canvasImage = new CanvasImage(filePath);
    canvasImage.init().then(() => {
      console.log(fileName + '::', canvasImage.getEntropy());
    });
  })
});