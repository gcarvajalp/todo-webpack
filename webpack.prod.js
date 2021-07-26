const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

  mode: 'production',

  output: {
    clean: true,
    filename: '[name].[contenthash].js'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: true
        },
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Webpack APP',
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css', //'[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: "assets/" }
      ]
    })
  ]


}