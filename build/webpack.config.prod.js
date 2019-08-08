const merge = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const webpack = require("webpack");
const {
  configureBabelLoader,
  configureURLLoader,
  configureCSSLoader
} = require("./util");
const ModernBuildPlugin = require("./modernBuildPlugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function(
  options = {
    env: "test",
    buildMode: "common",
    browserslist: nullsplitChunks
  }
) {
  let { env, buildMode, browserslist } = options;

  env = env === "prod" ? env : "test";
  if (buildMode !== "legacy" && buildMode !== "modern") {
    buildMode = "common";
  }
  if (!Array.isArray(browserslist)) {
    browserslist = null;
  }
  let filename = "js/[name].js";
  let plugins = [
    new TerserPlugin(),
    new OptimizeCSSPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ];
  let modern = buildMode === "common" ? false : true;
  let postfix = buildMode === "common" ? "" : `-${buildMode}`;
  let rules = [
    configureCSSLoader(env),
    configureBabelLoader(modern, browserslist),
    ...configureURLLoader(env)
  ];

  // 生产环境
  if (env === "prod") {
    filename = `js/[name]${postfix}.[chunkhash:8].js`;
    plugins.push(new ExtractTextPlugin("css/[name].[hash:8].css"));
  } else {
    filename = `js/[name]${postfix}.js`;
    plugins.push(new ExtractTextPlugin("css/[name].css"));
  }

  // 构建模式是modern时
  if (buildMode === "modern") {
    plugins.push(
      new ModernBuildPlugin({ modern: true }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!js", "!js/*"]
      })
    );
  }

  // 构建模式是legacy时
  if (buildMode === "legacy") {
    plugins.push(
      new ModernBuildPlugin({ modern: false }),
      new CleanWebpackPlugin()
    );
  }
  // 构建模式是普通构建
  if (buildMode === "common") {
    plugins.push(new CleanWebpackPlugin());
  }
  const prodConf = {
    // 启用production模式，启用该模式下内置的优化。
    mode: "production",
    output: {
      filename
    },
    module: { rules },
    plugins,
    optimization: {
      // 与dll文件作用重复，删除splitChunks配置
      // splitChunks: {
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: "vendors",
      //       chunks: "all",
      //       reuseExistingChunk: true
      //     }
      //   }
      // },
      runtimeChunk: "single"
    }
  };
  return merge(baseConf, prodConf);
};
