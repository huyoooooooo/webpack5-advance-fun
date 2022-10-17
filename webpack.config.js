const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    // static: ['public']
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/assets'
    },
    compress: true,   // gzip 压缩
    port: 8081,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        // use: 'raw-loader'
        type: 'asset/source'
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        // 解决方案一
        type: 'asset/resource',
        generator: {
          filename: '[hash][ext][query]'
        }

        // 解决方案二
        // type: 'javascript/auto',

        // 解决方案三
        // dependency: { not: ['url'] },
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[hash:10].[ext]',
        //       esModule: false
        //     }
        //   }
        // ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    })
  ]
}