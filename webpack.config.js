var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/main.js',
  output: {
    path: 'public',
    filename: 'bundle.js',
    // need for webpack-dev-server
    publicPath: '/public/',
  },
  module: {
    preLoaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.(png|svg|eot|ttf|woff)$/,
        loader: 'file-loader',
      },
      {
        test: /\.xml$/,
        loader: 'raw-loader',
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader',
      },
    ],
  },

  eslint: {
    configFile: './.eslintrc'
  },

  plugins: [
    // takes text out of bundle.js and puts it in style.css
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  devtool: 'source-map'
};
