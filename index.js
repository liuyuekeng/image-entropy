const {CanvasImage} = require('./src/canvas-image');

module.exports = {
  getEntropy(src, colorGradation = 256) {
    let canvasImage = new CanvasImage(src);
    return canvasImage.init().then(() => canvasImage.getEntropy());
  }
}