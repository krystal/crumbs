const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const libraryName = "Crumbs";

module.exports = {
  entry: ["./src/main.js"],
  mode: "none",
  plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin({
      //   parallel: true,
      // }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].chunk.js",
    publicPath: "/dist/",
    filename: "[name].js",
    library: {
      name: libraryName,
      type: "window",
    },
  },

  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
};
