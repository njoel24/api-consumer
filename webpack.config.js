const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: "production",
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css", ".svg", ".json", "*.eot", "*.woff"]
	},
	entry: {
		main: "./src/index.tsx",
		vendors: [
			"axios",
			"react",
			"react-dom",
			"react-styleable",
			"react-test-renderer"
		]
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].js',
		publicPath: '/',
	},
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new TerserPlugin({cache: true,  parallel: 4, extractComments: false})
		],
		splitChunks: {
		  cacheGroups: {
			vendor: {
			  chunks: 'initial',
			  name: 'vendor',
			  test: '/node_modules/',
			  enforce: true
			},
		  }
		},
		runtimeChunk: false
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules|.spec.tsx/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|eot|woff)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
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
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]'
							},
							importLoaders: 1
						}
					}, 
					'postcss-loader']
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve( __dirname, 'public/index.html' ),
			filename: 'index.html'
		})
	],
	devServer: {
		compress: true,
		historyApiFallback: true,
		host: process.env.HOST || 'localhost',
		contentBase: path.join( __dirname, 'dist'),
		watchOptions: {
			ignored: /node_modules/
		},
		quiet: true,
		hot: true,
		http2: true,
		https: true
	},
};