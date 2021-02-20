const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  devtool: IS_DEVELOPMENT ? 'inline-cheap-module-source-map' : false,
  // devtool: !IS_DEVELOPMENT ? 'none' : 'source-map',
  watch: IS_DEVELOPMENT,
  watchOptions: {
    ignored: ['react-dom', 'react', 'node_modules/**'],
    poll: true
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          minimize: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  entry: {
    bundle: ['./src/js/index.js'],
    // vendors: ['react', 'react-dom'],
    style: ['./src/style/index.scss'],
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    publicPath: '/dist/js/',
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './view/index.html',
      minify: false,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify( NODE_ENV ),
    }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', 'scss', 'css']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /\/node_modules\//,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../images/',
            limit: 1024,
            esModule: false
          }
        }],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: IS_DEVELOPMENT }
          },
        ],
      },
    ]
  }
};