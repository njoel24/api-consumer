const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require('path');

module.exports = {
	mode: "production",
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"]
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.module\.css$/,
				loader: ['style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1
						}
					}, 
					'postcss-loader']
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
		   template: path.resolve( __dirname, 'index.html' ),
		   filename: 'index.html'
		})
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
		host: process.env.HOST || 'localhost',
		contentBase: path.resolve( __dirname),
		watchOptions: {
			ignored: /node_modules/
		},
		quiet: true,
		hot: true,
		http2: true,
		https: true
	},
};