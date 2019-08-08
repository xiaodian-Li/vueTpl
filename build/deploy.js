const { spawn } = require("child_process");
const scp = spawn(
  "scp",
  [
    "-r",
    // 如果远程服务器防火墙为scp命令设置了指定的端口，我们需要使用 -P 参数来设置命令的端口号
    "-P",
    "29049",
    "dist/*",
    // 此处替换成自己的服务器ip和登录用户
    "root@45.78.12.135:/usr/local/webserver/nginx/html"
  ],
  // 如果不指定，子进程的信息无法输出到主进程中，无法弹出密码输入提示。
  { stdio: "inherit" }
);

scp.on("close", code => {
  if (!code) {
    process.stdout.write("恭喜你，部署成功！");
  }
});