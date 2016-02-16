import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

var node_modules_dir = path.join(__dirname, '/../node_modules');

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    alias:{},
    unsafeCache:[],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=` +
          `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader?parser=postcss-scss',
        ],
      }, {
        test: /\.less$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=` +
          `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader',
          'less-loader?noIeCompat',
        ],
      }, {
        test: /\.css$/,
        loaders: [
          'style-loader',
          `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules` +
          `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      }, {
        test: /\.jade$/,
        loader: "wkc-react-jade-loader?split=true",
      },
    ],
    noParse:[],
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
    ];
  },
};


var deps = [
  ['react', 'react/dist/react-with-addons.js', false],
  ['react-dom', 'react-dom/dist/react-dom.js', true],
  ['react-router', 'react-router/umd/ReactRouter.js', true],
  ['jquery', 'jquery/dist/jquery.min.js', false],
  ['moment', 'moment/min/moment.min.js', false],
  ['react-bootstrap', 'react-bootstrap/dist/react-bootstrap.js', true],
];


deps.forEach(function ([name, dep ,resolve], index) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[name] = depPath;
  if(!resolve){
    config.module.noParse.push(depPath);
  }
});

// var util = require('util');
// console.log(util.inspect(config));

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: DEBUG?'./src/client.js':{
    main: './src/client.js',
    vendor: ['react', 'react-dom', 'react-router', 'moment', 'react-bootstrap', 'jquery', 'lodash'],
  },
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new AssetsPlugin({
      path: path.join(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    ...(!DEBUG ? [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          screw_ie8: true,

          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
});

export default [clientConfig];
