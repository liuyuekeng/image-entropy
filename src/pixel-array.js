const {chunk} = require('lodash');

class PixelArray {
    constructor(imageData) {
        this.value = chunk(imageData.data, 4).map(v => {
            let [r, g, b, a] = v;
            return {r, g, b, a, chunk: v}
        });
    }
}

module.exports = {
    PixelArray
}