  const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: true
  },
  entry: path.resolve(__dirname, "./src/index.js")
};