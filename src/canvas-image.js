const {createCanvas, loadImage} = require('canvas');
const {PixelArray} =require('./pixel-array');

class CanvasImage {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;
    }
    init() {
        let self = this;
        return loadImage(this.imageSrc).then(image => {
            self.loaded = true;
            let {width, height} = image;
            self.image = image;
            self.width = width;
            self.height = height;
            self.canvas = createCanvas(width, height);
            self.ctx = self.canvas.getContext('2d');
            self.ctx.drawImage(self.image, 0, 0, width, height);
            self.imageData = self.ctx.getImageData(0, 0, width, height);
            self.pixelArray = new PixelArray(self.imageData);
        });
    }
    getEntropy(colorGradation = 256) {
        let scale = 256 / colorGradation;
        let distribution = {};
        let pixelCount = this.pixelArray.value.length;
        this.pixelArray.value.forEach(v => {
            let hashKey = v.chunk.slice(0, 3).map(v => Math.floor(v / scale)).toString();
            distribution[hashKey] = distribution[hashKey] ? ++distribution[hashKey] : 1;
        })
        var res = Object.keys(distribution).reduce((r, v) => {
            let p = distribution[v] / pixelCount;
            r += p * -Math.log(p, 2);
            return r;
        }, 0);
        return res;
    }

}

module.exports = {
    CanvasImage
}