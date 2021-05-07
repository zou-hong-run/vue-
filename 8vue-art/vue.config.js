const port = 7070;
const title = "Vue架构实现";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  devServer: {
    port,
  },
  configureWebpack: {
    name: title,
  },
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));
    // svg规则配置一下，排除icons目录
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]", //使用图片的名称
      });
  },
};
