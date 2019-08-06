## 初始化项目重要前提
### 初始化项目
```
mkdir vueTpl & npm init -y
```
### 创建package.json
```
{
  "name": "vueTpl",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "rain_li",
  "license": "ISC"
}
```
### 安装webpack&webpack-cli
```
npm install --save-dev webpack webpack-cli
```
### 在根目录创建webpack.config.js等待操作  
### 安装vue，用模块打包器
```
npm install vue
```
会在package.json自动添加
```
"dependencies": {
    "vue": "^2.6.10"
 }
 ```
npm i 自动生成package-lock 的主要功能是锁定当前依赖包的版本，确保用户的环境和依赖的包是一致的，保证项目的稳定性
### 使用单文件组件
```
npm install -D vue-loader vue-template-compiler
```
### 在webpack.config.js中
```
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```
### 使用html模板
```
npm install --save-dev html-webpack-plugin
```


