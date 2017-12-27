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
    filename: "[name].js",
    library: {
      root: "CripVueSelect",
      amd: "crip-vue-select",
      commonjs: "crip-vue-select",
    },
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts$/,
        loader: "tslint-loader",
        exclude: /node_modules|vue\/src|vendor\/*/,
        options: {
          configFile: "tslint.json",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|vendor\/*/,
        loader: "ts-loader",
        include: resolve("./src"),
      },
      {
        test: /\.scss$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
      {
        test: /\.ts$/,
        loader: "string-replace-loader",
        query: { search: "__VERSION__", replace: version },
      },
    ],
  },
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map'
}
