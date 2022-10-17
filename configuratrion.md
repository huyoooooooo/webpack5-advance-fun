
# 2. 开发环境配置

## 2.1 开发服务器

+ 服务器配置：[静态文件](https://webpack.js.org/configuration/dev-server/#devserverstatic)地址, 是否压缩，端口，自动打开等属性

```bash
npm install webpack-dev-server --save-dev
```

```javascript
module.exports = {
  devServer: {
    // static: ['public'],
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/assets',
    }
    compress: true,
    port: 8080,
    open: true,
  },
}
```

`static` 属性：
  + 配置数组，同时配置多个静态文件地址
  + 配置对象，可以修改静态文件的访问路径
  + 组合使用

配置指定脚本 `webpack serve` 指令执行 `npm start` 启动服务。该指令相较于 webpack4 版本发生较大改变

```json
"scripts": {
  "start": "webpack serve"
}
```

## 2.2 支持 css & sass

+ 使用 loader 对样式进行处理，需注意：loader 的处理顺序是从右往左执行

```bash
npm install style-loader css-loader node-sass sass-loader -D
```

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },                  // 处理 css 文件
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }   // 处理 scss 文件
    ]
  }
}
```

## 2.3 支持图片

图片有多种不同的格式，在检测文件类型时可以同时匹配多种。如果对文件处理还有特殊要求，可以通过配置 use 的 options 属性，比如文件名称, 是否是 es6 模块等。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [
          {
            loader: 'file-loader',            // 使用 file-loader 处理图片
            options: {                        // options 添加额外配置
              name: '[hash:10].[ext]',
              esModule: false
            }
          }
        ]
      }
    ]
  }
}
```

### 2.3.1 静态资源

将图片放置在静态文件根目录下，通过 img 标签的 src 属性对图片进行地址引用。

```html
<img src="/assets/scene.jpg" alt="风景">
```

### 2.3.2 JS 引入图片

通过 require 或者 import 引入图片，图片通过 file-loader 或 url-loader(配置 limit 转 base64) 处理，转为绝对路径。

```javascript
let Street = require('./images/street.jpg')   // 返回图片路径
let Img = new Image()
Img.src = Street

document.body.appendChild(Img)
```

### 2.3.3 CSS 引入图片

在 css 中通过 url 引入图片, 通过 css-loader 处理

```css
#image-container {
  width: 580px;
  height: 326px;
  background-image: url('./images/street.jpg')
}
```

### 2.3.4 资源模块

在 webpack5 中内置了[资源模块(asset modules)]((https://webpack.js.org/guides/asset-modules/))，在处理资源文件时，可以通过配置资源模块而无需配置额外 loader。支持[自定义文件名](https://webpack.js.org/configuration/output/#template-strings)，也支持文件配置。


> 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

+ asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
+ asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
+ asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
+ asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, type: 'asset/source' },
      { 
        test: /\.(jpg|png|gif|bmp)$/, 
        type: 'asset/resource',
        generator: {
          filename: '[hash][ext][query]'
        }
      }
    ]
  }
}
```

## 2.7 转义 ES6/ES7/JSX

### 2.7.1 安装依赖
+ babel-loader 允许使用 babel 和 webpack 转译 Javascript 文件
  - @babel/core 编译核心包
  - @babel/preset-env 环境预设

loader 本质是一个函数，`babel-loader` 内部调用 `@babel/core` —— 其本身提供一个过程管理功能，将源代码转化成抽象语法树进行遍历、解析。通过 `@babel/preset-env` 的预设转成低级版本。

  ```javascript
  module.exports = {
    modules: {
      rules: [
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
    }
  }
  ```