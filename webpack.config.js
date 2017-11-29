const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = {
  entry: './_scripts/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?{"stage": 2}',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
};

exports.prod = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});

exports.dev = merge(common, {
  devtool: 'inline-source-map',
});
