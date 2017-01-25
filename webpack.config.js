module.exports = {
  entry: './lib/entry.jsx',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  }
};
