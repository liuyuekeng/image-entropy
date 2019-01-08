class Pixel {
    constructor(chunk) {
        this.chunk = chunk;
        [this.r, this.g, this.b, this.a] = chunk;
        let [r, g, b] = chunk;
        this.hashKey = ([r, g, b]).toString;
    }
    diff(pixel) {
        let res = [];
        this.chunk.forEach((v, k) => {
            res[k] = this.chunk[k] - pixel.chunk[k];
        });
        return res;
    }
}

module.exports = {
    Pixel
}