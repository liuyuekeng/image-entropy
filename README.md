```
var imgEntropy = require('img-entropy');
let entropy = imgEntropy('path/to/image');
entropy.getEntropy().then(function(res) {
    console.log(res);
});
entropy.get2DEntropy().then(function(res) {
    console.log(res);
});
```
计算图像的熵（alph通道被忽略）
getEntropy返回图像一维熵，表示色彩分布聚集特征
get2DEntropy返回图像二纬熵，表示色彩分布的空间特征