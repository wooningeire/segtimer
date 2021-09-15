import {VueLoaderPlugin} from "vue-loader";
// import {CleanWebpackPlugin} from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

// console.log(process.env.NODE_ENV);

export default {
	mode: process.env.NODE_ENV,
	devtool: process.env.NODE_ENV === "development" ? "cheap-source-map" : false,

	plugins: [
		// new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					context: "./index/static/",
					from: "*",
				},
			],
		}),
		new VueLoaderPlugin(),
	],

	module: {
		rules: [{
			test: /\.vue$/,
			use: {
				loader: "vue-loader",
				options: {
					compilerOptions: {
						isCustomElement: tagName => tagName.includes("-"),
					},
				},
			},
		}, {
			test: /\.css$/,
			use: ["vue-style-loader", "css-loader"],
		}],
	},

	devServer: {
		contentBase: "./.dist/",
		port: 8000,
	},

	entry: {
		index: "./index/index.js",
	},
	output: {
		path: path.resolve("./.dist/"),
		filename: "[name].js",
		clean: true,
	},
};