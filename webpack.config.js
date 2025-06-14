const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VuetifyPlugin } = require("webpack-plugin-vuetify");
require("dotenv").config();

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `@use "@/assets/styles/variables.scss" as *; @use "@/assets/styles/mixins.scss" as *;`,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff2?)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg)$/i,
        type: "asset/resource",
        generator: {
          filename: "videos/[name][hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(false),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
    new VuetifyPlugin({ autoImport: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".vue", ".json", ".scss"],
  },
  devServer: {
    static: [path.resolve(__dirname, "dist")],
    static: [path.resolve(__dirname, "public")],
    hot: true,
    host: "0.0.0.0",
    allowedHosts: "all",
    compress: true,
  },
  devtool: "source-map",
};
