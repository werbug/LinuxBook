"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _swig = require("swig");

var _swig2 = _interopRequireDefault(_swig);

var _book_router = require("./router/book_router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//实例化 express
var app = (0, _express2.default)();

//系统模块 路径模块
/*require('./css/index.css');
require('./css/index1.less');
require('./css/index2.scss');*/

//引入 swig 模块

//配置 swig
_swig2.default.setDefaults({
  cache: false //不缓存文件
});

//加载 book 路由模块

//实例化 book 路由模块
new _book_router.Main(app);

app.get("/", function (req, res) {
  res.render("index");
});

// 设置文件后缀的解释器  配置 render 输出的文件的解释器，编译
app.engine('html', _swig2.default.renderFile);
//设置 页面的后缀  配置 render 输出文件的默认后缀
app.set('view engine', 'html');
//设置 页面的 跟目录  配置 render 输出文件的 根目录
app.set("views", _path2.default.join(__dirname, "../dist/html"));
//把一个静态文件当做服务器
//可以直接从浏览器请求这个文件
app.use(_express2.default.static(_path2.default.join(__dirname, "../dist")));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("http:", host, port);
});