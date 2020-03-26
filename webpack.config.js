const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');
const config = require('./gulp/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function createConfig(env) {
  let isProduction,
    webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    mode: isProduction?'production':'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      // vendor: ['jquery'],
      app: './app.js',
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    devtool: isProduction ?
      '#source-map' :
      '#cheap-module-eval-source-map',
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.js',
        'Views': path.resolve(__dirname, 'src/js/views'),
        '@helpers': path.resolve(__dirname, 'src/js/helpers'),
        '@db': path.resolve(__dirname, 'src/js/database')
      },
    },
    optimization :{
      minimize: isProduction
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: __dirname + '/src/js/lib/'
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    ],
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
