import path from 'path';
import nodeExternals from 'webpack-node-externals';


export default {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'react-metawidget',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
};
