const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  watch: true,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            // прописываем в опциях babel плагин для свойств классов
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test: /\.css$/, // регулярка для файлов CSS
        use: ['style-loader', {
          loader: 'css-loader',
          options: { modules: true }
        }]
      }
    ]
  }
};