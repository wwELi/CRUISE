
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const publicPath = '/';
const SRC = path.join(__dirname, './', 'src');

const PREFIX = "/api";
const target = 'http://localhost:3001';

module.exports = function () {

  return {
    entry: path.join(__dirname, 'src', 'index.js'),
    resolve: {
      alias: {
        '@assets': path.join(SRC, 'assets'),
        '@components': path.join(SRC, 'components'),
        '@utils': path.join(SRC, 'utils'),
        '@modules': path.join(SRC, 'modules')
      },
      modules: [SRC, 'node_modules'],
      extensions: ['*', '.js', '.json']
    },
    output: {
      filename: '[name].js',
      publicPath
    },
    devServer: {
      open: true,
      port: 8081,
      hot: true,
      publicPath,
      clientLogLevel: 'warning',
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: {
        [PREFIX]: {
          target,
          pathRewrite: {'^/api' : ''}
        }
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [{ loader: 'url-loader', options: { limit: 10000 } }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PREFIX': JSON.stringify(PREFIX),
      }),
      new htmlWebpackPlugin({
        template: './index.html'
      })
    ],
  }

};
