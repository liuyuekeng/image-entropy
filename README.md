
计算图像熵（复杂度）的工具

## 安装

```
$ npm i img-entropy
```

## 简单示例

```
var imgEntropy = require('img-entropy');
var entropy = imgEntropy('path/to/image');
entropy.getEntropy().then(function(res) {
    console.log(res);
});
entropy.get2DEntropy().then(function(res) {
    console.log(res);
});
```

## 文档

### imgEntropy()

```
imgEntropy('path/to/image');
```

创建一个imgEntropy实例，并开始加载图片;

### imgEntropy#getEntropy();

计算图像的一维熵（alph通道被忽略），表示色彩分布聚集特征

```
imgEntropy('path/to/image').getEntropy({
    normalize: true, colorGradation: 256
}).then(function(res) {
    console.log(res);
});
```

可选项

|字段|类型|默认值|意义|
|---|---|---|---|
|normalize|Boolean|false|为true时，将结果归一化至(0, 1)的区间内|
|colorGradation|Number|256|每个通道保留几个色阶，只能是2,4,8,16,...256，非法值被当做256|

### imgEntropy#get2DEntropy()

计算图像的二纬熵（alph通道被忽略）,在保留图像一维熵特征基础上，加入了色彩分布的空间特征

```
imgEntropy('path/to/image').get2DEntropy({
    normalize: true, colorGradation: 256
}).then(function(res) {
    console.log(res);
});
```

可选项

同`imgEntropy#getEntropy`