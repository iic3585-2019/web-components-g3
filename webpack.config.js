const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    module: {
      rules: [
        {
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    entry: {
      app: path.resolve(__dirname, 'src', 'index.js'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: 'http://localhost:8080/',
    },
    devServer: {
      contentBase: path.join(__dirname, 'src', 'static'),
      port: 8080,
      headers: {'Access-Control-Allow-Origin': 'http://localhost:8080'},
    },
    watch: true,
    entry: {
      app: path.resolve(__dirname, 'src', 'index.js'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: 'http://localhost:8080/',
    },
    devServer: {
      contentBase: path.join(__dirname, 'src', 'static'),
      port: 8080,
      headers: {'Access-Control-Allow-Origin': 'http://localhost:8080'},
    },
    watch: true,
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};
