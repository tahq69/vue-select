const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")

let version = require("./../package.json").version
let parts = version.split(".")
let last = parts.splice(-1, 1)[0]
version = parts.join(".") + "." + (parseInt(last || 0) + 1)

let resolve = relativePath => path.resolve(__dirname, "./..", relativePath)

module.exports = {
  entry: {
    "crip-vue-select": resolve("src/main.ts"),
  },
  output: {
    path: resolve("lib"),
    filename: "crip-vue-select.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "CripVueSelect",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": resolve("src"),
      "#": resolve("app"),
      "$": resolve("types"),
      "&": resolve("test"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|vendor\/*/,
        loader: "ts-loader",
        include: [resolve("src"), resolve("test")],
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax",
            esModule: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
    ],
  },
  externals: [nodeExternals()],
  devtool: "inline-cheap-module-source-map",
}
