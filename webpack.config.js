const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/video/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/video/index.jsx',
  output: {
    path: path.resolve('dist/video'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}