const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		app: path.resolve(__dirname, "../src/index.tsx"),
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../dist")
	},
	devServer: {
		contentBase: path.resolve(__dirname, "../dist"),
		port: 8888,
		open: true,
		historyApiFallback: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
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
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor", "app"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			},
			hash: true,
			minify: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"), // 一定要用json.stringify，如果是单引号的'development',不正确，是定义不了process.env.NODE_ENV的
			"process.env.DEBUG": JSON.stringify("debug")
		}),
		// new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
		new webpack.NoEmitOnErrorsPlugin(), //允许js出错不中断服务
		new webpack.HotModuleReplacementPlugin(), // 热更新

	]
};
