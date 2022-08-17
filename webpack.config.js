// webpack.config.js 抜粋
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "/src/main/resources/static/js/main.js"),
    style: path.join(__dirname, "/src/main/resources/static/css/style.css"),
    vendor: [
      "axios",
      "jquery",
      "tailwindcss",
    ],
  },
  target: 'node',
  output: {
    path: path.join(__dirname, "/src/main/resources/static"), // eslint-disable-line
    publicPath: "/",
    filename: "js/[name].bundle.js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vender: {
          chunks: "initial",
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/css",
            },
          },
          // .css 内の URL パスなどをそれぞれの publicPath に合わせてくれる
          "css-loader",
          // .sass のビルド
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules"],
  },
};
