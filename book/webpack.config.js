var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var staticRoot = path.resolve(__dirname,"./src");
var distPath = path.resolve(__dirname,"./dist");
var babelrc = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./.babelrc"), 'utf8')
);
//抽取css单独打包的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//postcss-loader 需要的配置项
/*var precss = require('precss');*/
//自动补前缀
var autoprefixer = require('autoprefixer');
//自动生成HTML插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //设置忽略打包的模块 （易克思 特NO思：外控型）
    // 指定采用外部 CDN 依赖的资源，不被webpack打包
    externals: {
        'angular':'angular',
        'bootstrap':'bootstrap'
    },

	entry:{
		app:staticRoot+"/app",
        sass:staticRoot+"/css/index.scss"

	},
	output:{
		path:distPath,
		publicPath:staticRoot,
		filename:"./js/[name].bundle.js",
		sourceMapFilename:"[file].map"
	},
	module: {
        loaders: [
            {
                test: /\.js[x]?$/,        //检测以什么结尾的文件
                exclude: /node_modules/,  //排除某文件夹
                loader: ['babel'],        //使用什么模块来编译
                //配置
                query:babelrc
                /*query: {
                    presets: [
                        "es2015",
                        "react",
                        "stage-2"
                    ],
                    plugins: [
                        'transform-runtime',
                        'transform-es2015-classes'
                    ]
                }*/
            },{
                test: /\.css$/,
                loader:ExtractTextPlugin.extract('style', 'css!postcss')
            },{
                test:/\.less$/,
                //ExtractTextPlugin.extract 第二个参数(或拆分为多个参数)中 loader 的执行顺序是从右到左，即先对引入的 .sass 使用 sass loader 得到编译后的 css 再使用 css-loader 按照正常 css-loader 的方式处理。
                loader:ExtractTextPlugin.extract('style', 'css!postcss!less')
            },{
                test:/\.scss$/,
                loader:ExtractTextPlugin.extract('style', 'css!postcss!sass-loader-china')
            },{ 
                test: /\.(jpe?g|png|gif|svg|woff|woff2|ttf|eot)$/i, 
                loader: "url-loader?limit=51200&name=./images/[name].[ext]"
            }
        ]
    },
    postcss: [autoprefixer({browsers:['> 1%','Android >= 4.0']})],

    resolve: {
        //注意：配置的路径必须是绝对路径
        //模块之间依赖
        //在什么目录下去寻找依赖文件
        root: [ staticRoot ],
        //配置别名
        alias: [],
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.jsx','.css']
    },
    plugins: [
        //提前加载模块
        //在使用中可以不在使用 var xxx = require("xxxx");
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        //在插件中注册,独立打包css文件以外链形式加载,括号内为输出路径
        new ExtractTextPlugin('css/[name].bundle.css'),
        /*new HtmlWebpackPlugin()*/
    
    ]


};