require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');

// process.argvにreleaseが含まれていなかったら(npm startで起動していたら)ローカル開発時
const DEBUG = !process.argv.includes('release');

// webpackのpluginを変数宣言して条件分岐に備える
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin()
];
if(!DEBUG){
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      sourceMap: true // // minify時でもソースマップを利用する
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

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
  // ローカル開発用環境を立ち上げる
  // ブラウザで http://localhost:8081/ でアクセスできるようになる
  devServer: {
    contentBase: './',
    port: 8081,
    inline: true
  },
  plugins: plugins,
  // ソースマップを有効にする
  devtool: DEBUG ? 'source-map' : false, // debugの時はソースマップなし
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
