const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const config = require("../app.config");
const path = require("path");
let devServer = {
  proxy: config.proxy || {},
  contentBase: path.resolve(__dirname, "../dist"),
  hot: true,
  clientLogLevel: "warning",
  compress: true,
  overlay: true,
  open: config.autoOpenBrowser || true,
  port: config.devServerport || 3000
};
const {configureBabelLoader } = require("./util");

module.exports = merge(baseConf, {
  // 将mode设置为development，启用webpack内置的优化
  mode: "development",
  cache: true, // 启用缓存
  devtool: "eval-source-map",
  devServer,
  module: {
    rules: [
      configureCSSLoader(),
      configureBabelLoader(),
      ...configureURLLoader(),
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 在babel-loader之前添加thread-loader。
          { loader: "thread-loader" },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
});
