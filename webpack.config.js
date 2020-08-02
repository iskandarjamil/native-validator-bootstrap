const package = require("./package.json");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    validator: "./src/index.js",
    "validator.min": "./src/index.js",
  },
  devtool: "source-map",
  output: {
    library: "Validator",
    libraryTarget: "umd",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin(
      [
        package.name + " v" + package.version,
        "Copyright 2020 " + package.author,
      ].join("\n")
    ),
  ],
};
