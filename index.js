const {CanvasImage} = require('./src/canvas-image');

function imgEntropy (src) {
  let canvasImage = new CanvasImage(src);
  let loaded = false;
  let holdingList = [];
  function runHoldingList() {
    holdingList.forEach(v => v());
  }
  function getEntropy(opt) {
    return invokWhilLoaded('getEntropy', opt);
  }
  function get2DEntropy(opt) {
    return invokWhilLoaded('get2DEntropy', opt);
  }
  function invokWhilLoaded(method, ...args) {
    if (loaded) {
      return Promise.resolve(canvasImage[method](...args));
    } else {
      return new Promise((resolve, reject) => {
        holdingList.push(() => {
          resolve(canvasImage[method](...args));
        })
      })
    }
  }
  canvasImage.init().then(() => {
    loaded = true;
    runHoldingList()
  });
  return {getEntropy, get2DEntropy};
}

module.exports = imgEntropy;