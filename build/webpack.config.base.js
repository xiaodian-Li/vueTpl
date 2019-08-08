const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const DebugPlugin = require("debugtool-webpack-plugin");
const { templateFunction } = require("./util");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin"); // 缓存编译过程中的中间结果
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const webpack = require("webpack");

const baseConf = {
  entry: { app: path.resolve(__dirname, "../src/app.js") },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: ""
  },
  mode: "none",
  resolve: {
    modules: ["../node_modules", "../src/assets/generated"]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new VueLoaderPlugin(),
    new DebugPlugin({ enable: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      title: "项目模板"
    }),
    // 将dll文件添加到html中，必须放在htmlwebpackPlugin后面使用
    new AddAssetHtmlPlugin({
      // 需要将哪些文件插入到html中
      filepath: path.resolve(__dirname, "../dll/*.dll.js"),
      // 将dll文件输出到哪个目录
      outputPath: "js",
      // dll文件在页面中最终的引用路径
      publicPath: "js"
    }),
    new webpack.DllReferencePlugin({
      // webpack需要根据manifest.json找到对应dll文件中的模块。
      manifest: require("../dll/vue.manifest.json")
    }),
    new StyleLintPlugin({
      files: ["src/**/*.{vue, css, sass, scss}", "!src/assets/generated/"]
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "../src/assets/sprites"),
        glob: "*.png"
      },
      customTemplates: {
        function_based_template: templateFunction
      },
      target: {
        image: path.resolve(__dirname, "../src/assets/generated/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "../src/assets/generated/sprite2.scss"),
            {
              format: "function_based_template"
            }
          ],
          path.resolve(__dirname, "../src/assets/generated/sprite.scss")
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
  ]
};
module.exports = baseConf;
