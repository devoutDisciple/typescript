const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "production",
	entry: {
		app: path.resolve(__dirname, "../src/index.tsx"),
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "../dist/bundle")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			// { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				},
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "vue demo",
			template: "index.html",
			filename: "index.html",
			hash: true,
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor", "app"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			},
			minify: true
		}),
		new CleanWebpackPlugin(path.resolve(__dirname, "../dist"), {
			root : path.resolve(__dirname, "../"),
			// exclude : 'a.js',
			verbose : true,
			dry : false
		}),
		// 打包moment.js的中文，防止local全部打包
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,/zh-cn/),
		// 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
	]
};
