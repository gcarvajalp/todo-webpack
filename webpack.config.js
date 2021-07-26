const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  mode: 'development',

  output: {
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: false
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
      filename: '[name].css', //'[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: "assets/" }
      ]
    })
  ]


}