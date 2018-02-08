require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');

// ここ追記
const DEBUG = !process.argv.includes('--release');
console.log(DEBUG); // ここは記事用に書いてるだけなので後で消す

module.exports = {
  // エントリーポイントの指定
  entry: path.join(__dirname, 'src/app.js'),
  // ファイルの出力設定
  output: {
    // 出力先のフォルダー名
    path: `${__dirname}/build`,
    // 出力ファイル名
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  // ソースマップを有効にする
  devtool: DEBUG ? 'source-map' : false, // debugの時はソースマップなし
  // plugins: [
  //   // JSファイルのminifyを実行する
  //   new webpack.optimize.UglifyJsPlugin({
  //     // minify時でもソースマップを利用する
  //     sourceMap: true
  //   })
  // ],

  // ローカル開発用環境を立ち上げる
  // ブラウザで http://localhost:8081/ でアクセスできるようになる
  devServer: {
    contentBase: './',
    port: 8081,
    inline: true
  }
};
