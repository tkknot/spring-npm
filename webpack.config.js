const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptySctiptsPlugin = require("webpack-remove-empty-scripts");

module.exports = {
  entry: {
    // バンドル対象ファイルが一つの場合
    // 生成されるファイル名:対象ファイルの位置
    main: path.join(__dirname, '/src/main/resources/static/js/main.js'),
    style: path.join(__dirname, '/src/main/resources/static/css/style.scss'),
    // バンドル対象のファイルが複数の場合
    vendor: ['axios', 'jquery'],
  },
  target: 'node',
  // バンドルファイルの出力先
  output: {
    path: path.join(__dirname, '/src/main/resources/static'), // eslint-disable-line
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      // cssを別ファイルとして書き出し
      filename: './css/[name].css',
    }),

    // バンドルの際に不要なファイルを削除
    new RemoveEmptySctiptsPlugin(),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // .css 内の URL パスなどをそれぞれの publicPath に合わせてくれる
          'css-loader',
          // .sass のビルド
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
};
