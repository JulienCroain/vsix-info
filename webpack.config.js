const path = require('path')

module.exports = {
  mode: 'production', // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: './src/index', // string | object | array  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      'node_modules',
      path.resolve(__dirname, 'lib')
    ],
    // directories where to look for modules
    extensions: ['.js']
  },
  target: 'node'
}