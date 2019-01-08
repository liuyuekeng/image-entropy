const {chunk} = require('lodash');
const {Pixel} = require('./pixel');

class PixelArray {
    constructor(imageData, width, height) {
        this.width = width;
        this.height = height;
        this.value = chunk(imageData.data, 4).map(v => {
            return (new Pixel(v));
        });
        this.length = this.value.length;
    }
    getPixelByCoordinate(x, y) {
        let index = this.coordinate2Index(x, y);
        return this.value[index];
    }
    getPixelByIndex(index) {
        return this.value[index];
    }
    getPixelsByCoordinateArray(arr) {
        let res = arr.map(v => {
            return v ? this.getPixelByCoordinate(...v) : false;
        });
        return res;
    }
    getNeighborPixelByCoordinate(x, y, size = 1) {
        let neiborCoordinates = this.getNeighborCoordinateByCoordinate(x, y, size);
        return this.getPixelsByCoordinateArray(neiborCoordinates);
    }
    getNeighborPixelByIndex(index, size) {
        let neiborCoordinates = this.getNeighborCoordinateByIndex(index, size);
        return this.getPixelsByCoordinateArray(neiborCoordinates);
    }
    coordinate2Index(x, y) {
        if (!this.isCoordinateInRange(x, y)) {
            return false;
        }
        let index = this.width * y + x;
        return index;
    }
    index2coordinate(index) {
        let x = index % this.width;
        let y = Math.floor(index / this.width);
        return [x, y];
    }
    getNeighborCoordinateByIndex(index, size) {
        let coordinate = this.index2coordinate(index);
        return this.getNeighborCoordinateByCoordinate(...coordinate, size);
    }
    getNeighborCoordinateByCoordinate(x, y, size = 1) {
        let res = [];
        for (let i = y - size; i <= y + size; i ++) {
            for (let j = x - size; j <= x + size; j ++) {
                res.push(this.isCoordinateInRange(j, i) ? [j, i] : false);
            }
        }
        return res;
    }
    isCoordinateInRange(x, y) {
        return (x < this.width && x >=0 && y < this.height && y >= 0);
    }
}

PixelArray.prototype.getAvgPixel = function (pixelArray) {
    let chunk = [0, 0, 0, 0];
    let count = 0;
    pixelArray.forEach(v => {
        if (v) {
            count ++;
            chunk.forEach((vv, kk) => {
                chunk[kk] += v.chunk[kk];
            });
        }
    });
    chunk.forEach((v, k) => {
        chunk[k] = Math.floor(chunk[k] / count);
    });
    return new Pixel(chunk);
}

module.exports = {
    PixelArray
}