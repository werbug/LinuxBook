"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Books = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Books = function () {
	function Books() {
		(0, _classCallCheck3.default)(this, Books);

		this.defaultOption = {
			"dtype": "json", //请求的数据类型
			"key": "54c0e02625bcb9e453503588fafe17c2" // key
		};
	}
	//查询图书分类


	(0, _createClass3.default)(Books, [{
		key: "getCatalog",
		value: function getCatalog(callback) {
			_request2.default.post({
				url: "http://apis.juhe.cn/goodbook/catalog",
				formData: this.defaultOption
				/**
     * error : 判断结果是否错误
     * response : 请求的头文件信息
     * data ： 返回的结果数据
     */
			}, function (error, response, data) {
				callback(error, data);
			});
		}
		//查询图书内容
		/**
   * catalog_id,pn,rn
   * option = {
   * 	catalog_id ： 目录编号
   *  pn : 数据返回起始
   *  rn : 数据返回条数，最大30
   * }
   */

	}, {
		key: "getBookContent",
		value: function getBookContent(option, callback) {
			_request2.default.post({
				url: "http://apis.juhe.cn/goodbook/query",
				formData: (0, _assign2.default)(option, this.defaultOption)
				/**
     * error : 判断结果是否错误
     * response : 请求的头文件信息
     * data ： 返回的结果数据
     */
			}, function (error, response, data) {
				callback(error, data);
			});
		}
	}]);
	return Books;
}();

exports.Books = Books;