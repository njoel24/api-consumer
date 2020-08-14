const HtmlWebPackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const platform = process.argv[2].substring(2);

module.exports = {
	mode: "production",
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css", ".svg", ".json", "*.eot", "*.woff"]
	},
	entry:platform === 'server-ssr' ? { server: "./src/server/index.tsx" } : {
		main: "./src/client-ssr/index.tsx",
		vendors: [
			"axios",
			"react",
			"react-dom",
			"react-test-renderer"
		]
	},
	target: platform === 'server-ssr' ? "node": undefined,
	externals: platform === 'server-ssr' ? [nodeExternals()] : [],
	output: {
		path: path.join(__dirname, './dist'),
		filename: platform === 'server-ssr' ? 'server.js' : '[name].js',
		publicPath: '/',
	},
	optimization: platform === 'server-ssr' ? {} : {
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
				loader: [platform === "server-ssr" ? 'isomorphic-style-loader': 'style-loader',
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