var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: "./app/main.js",
	output: {
		path: 'public',
		filename: "bundle.js",
		// need for webpack-dev-server
		publicPath: "/public/"
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.(png|svg|eot|ttf|woff)$/,
				loader: "file-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
      {
        test: /\.xml$/,
        loader: 'raw-loader'
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
		]
	},

	plugins: [
		// takes text out of bundle.js and puts it in style.css
		new ExtractTextPlugin("style.css", { allChunks: true })
	],

	devtool: 'source-map'
};
