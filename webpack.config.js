const path = require('path')
const webpack = require('webpack')

let version = require('./package.json').version
let parts = version.split('.')
let last = parts.splice(-1, 1)[0]
version = parts.join('.') + '.' + (parseInt(last || 0) + 1)

console.log(`Creating build of v${version}:`)

module.exports = {
    entry: {
      build: './src/main.js',
      example:  './examples/main.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            progress: true,
            hide_modules: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.BannerPlugin({
            banner: `/*!
* Crip Vue Select v${version}
* Forged by Igors Krasjukovs <tahq69@gmail.com>
* Released under the MIT License.
*/`,
            raw: true,
            entryOnly: true
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ])
}