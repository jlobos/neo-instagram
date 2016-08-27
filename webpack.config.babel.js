
import webpack from 'webpack'
import { name } from './package.json'

const config = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.browser.js',
    library: name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.BROWSER': JSON.stringify('BROWSER') }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: { warnings: false }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}

export default config
