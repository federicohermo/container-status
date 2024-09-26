const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx', // Your entry point file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Regex for file types
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
          }
        },
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Handle images
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Use 'static' instead of 'contentBase'
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'source-map', // Enable source maps for debugging
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
