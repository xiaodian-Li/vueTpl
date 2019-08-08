const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");
module.exports = {
  src_folders: ["test/e2e/specs"], // 指定测试用例所在的目录
  output_folder: "test/e2e/reports", // 测试报告的输出目录
  globals_path: "globalsModule.js",
  // webdriver会被test_settings中的webdriver继承和覆盖
  webdriver: {
    start_process: true // 否自动管理WebDriver的进程
  },
  test_settings: {
    default: {
      webdriver: {
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
        port: 4444
      },
      desiredCapabilities: {
        browserName: "firefox"
      }
    }
  }
};
