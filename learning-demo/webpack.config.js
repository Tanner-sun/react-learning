var path = require('path');
var webpack = require('webpack');
var sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./src/app.js'
		],
		// vendors: ['react', 'react-dom', 'react-router']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			loaders: ['react-hot', 'babel']
		},{
			test: /\.scss$/,
			include: [
				path.resolve(__dirname, 'css')
			],
			loader: sassLoader
		}]
	},
	resolve: {
		alias: {
			'react': path.join(__dirname, 'node_modules', 'react')
		},
		extensions: ['', '.js', '.jsx', '.scss', '.css']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			__DEV__: true
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
}