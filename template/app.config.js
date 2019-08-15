module.exports =  {
    // 配置dll入口
    dllEntry: {vue: 'vue', lodash: 'lodash'},
    // 静态资源的路径
    publicPath: "//static.cdn.com/assets/myproject",
    // 资源输出目录，默认为dist
    outputDir: "dist",
    // 是否启用页面调试工具
    enableDebugTool: true,
    // 配置代理
    proxy: {
        '/api': 'http://localhost:8000'
    },
    // 是否默认打开浏览器
    autoOpenBrowser: true,
  
    // devserver 默认端口号
    devServerport: 3000,
    mockServerPort: 8000,
  
    // 部署的服务器类型：ecs|oss。默认为oss
    deployType: "oss",
  
    // 只有当deployType为ecs时才需要配置该选项
    ECSAccount: {
      host: "",
      port: "",
      user: ""
    },
  
    // 只有当deployType为oss时才需要配置该选项
    ftpAccount: {
      host: "",
      port: "",
      user: "",
      password: ""
    },
  
    // 部署的目录
    deployDir: "",
  
    // 指定浏览器的范围
    browserslist: {
        legacy: ["> 1%", "last 2 versions", "not ie <= 8"],
        modern: [
          "last 2 Chrome versions",
          "not Chrome < 60",
          "last 2 Safari versions",
          "not Safari < 10.1",
          "last 2 iOS versions",
          "not iOS < 10.3",
          "last 2 Firefox versions",
          "not Firefox < 54",
          "last 2 Edge versions",
          "not Edge < 15"
        ]
      }
      
  };