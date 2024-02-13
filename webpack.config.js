const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply the loader to all .js files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // You might need Babel to transpile modern JavaScript syntax
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false, // Set esModule option to false
            },
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './src'),
      serveIndex: true,
    },
    open: ['/'],
    compress: true,
    port: 3000,
    hot: true,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:9000',  // Replace with the actual URL of your Socket.IO server
        ws: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
