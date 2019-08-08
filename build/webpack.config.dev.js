const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const path = require("path");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");
const devServer = {
  proxy: {
    "/api": "http://localhost:8081"
  },
  contentBase: path.resolve(__dirname, "../dist"),
  hot: true,
  compress: true,
  overlay: true,
  open: true,
  port: 3000
};
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
