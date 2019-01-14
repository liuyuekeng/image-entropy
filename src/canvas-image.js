const {createCanvas, loadImage} = require('canvas');
const {PixelArray} =require('./pixel-array');

function formula(distribution, total, normalize) {
    let distributionSize = 0;
    let res = Object.keys(distribution).reduce((r, v) => {
        let p = distribution[v] / total;
        r += p * -Math.log2(p);
        distributionSize ++;
        return r;
    }, 0); 
    if (normalize) {
        let k = Math.log2(distributionSize);
        res = k ? res / k : 0;
        if (res > 1) {
            res = 1;
        }
    }
    return res;
}

function getScale(colorGradation) {
    let n = Math.log2(colorGradation);
    if (n % 1 === 0 && n < 9 && n > 0) {
        return 256 / colorGradation;
    } else {
        return 1;
    }
}

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
            self.pixelArray = new PixelArray(self.imageData, width, height);
        });
    }
    getEntropy(opt = {}) {
        let {
            colorGradation = 256,
            normalize = false
        } = opt;
        let scale = getScale(colorGradation);
        let distribution = {};
        let pixelCount = this.pixelArray.length;
        this.pixelArray.value.forEach(v => {
            let hashKey = v.chunk.slice(0, 3).map(v => Math.trunc(v / scale)).toString();
            distribution[hashKey] = distribution[hashKey] ? ++distribution[hashKey] : 1;
        });
        return formula(distribution, pixelCount, normalize);
    }
    get2DEntropy(opt = {}) {
        let {
            colorGradation = 256,
            normalize = false
        } = opt;
        let scale = getScale(colorGradation);
        let distribution = {};
        let pixelCount = this.pixelArray.length;
        let array = this.pixelArray.value;
        array.forEach((v, k) => {
            let current = this.pixelArray.getPixelByIndex(k);
            let neighbor = this.pixelArray.getNeighborPixelByIndex(k);
            let avg = this.pixelArray.getAvgPixel(neighbor);
            let diff = current.diff(avg);
            let hashKey = diff.slice(0, 3).map(v => Math.trunc(v / scale)).toString();
            distribution[hashKey] = distribution[hashKey] ? ++ distribution[hashKey] : 1;
        });
        return formula(distribution, pixelCount, normalize);
    }
}

module.exports = {
    CanvasImage
}