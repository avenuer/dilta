var webpack = require('webpack');
var path = require('path');
var TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var HappyPack = require('happypack');
// var WebpackShellPlugin = require('webpack-shell-plugin');
var nodeExternals = require('webpack-node-externals');

console.log(__dirname);

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.join(process.cwd(), 'main.ts'),
    cli: path.join(process.cwd(), 'modules', 'cli', 'cli.ts'),
    // gen: path.join(process.cwd(), 'modules', 'generator', 'populate.school.ts')
  },
  devtool: 'eval-source-map',
  // watch: true,
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.join(__dirname,  'tsconfig.electron.json') })
    ]
  },
  plugins: [
    // parrellization of build
    new HappyPack({
      id: 'ts',
      threads: 3,
      loaders: [
        {
          loader: 'ts-loader',
          options: { happyPackMode: true }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'happypack/loader?id=ts',
      }
    ]
  }
};
