// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


const MarkerPath = path.join(__dirname, '..', 'projects', 'marker-web');

module.exports = {
  entry: {
    prender: path.join(MarkerPath, 'src' ,'prender.ts'),
    server: path.join(__dirname, '..', 'modules', 'server', 'server.ts')
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.join(MarkerPath,  'tsconfig.server.json') })
    ]
  },
  externals: [/(node_modules|main\..*\.js)/, nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), 'dist', 'marker-web', 'server'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader',options: {
      transpileOnly: true
    } }]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(MarkerPath, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(MarkerPath, 'src'),
      {}
    )
  ]
};
