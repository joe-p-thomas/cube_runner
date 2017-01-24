module.exports = {
  entry: './lib/entry.js',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx' ]
  }
};
