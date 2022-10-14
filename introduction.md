# 1. 介绍
webpack 作为 JS 应用程序的静态模块打包工具。在处理应用程序时, 会先在内部构件一个依赖图(dependency graph)，此依赖图映射到项目所需每个模块，并生成一个或多个bundle。

## 1.1 安装

`webpack` 是 webpack 的核心包， `webpack-cli` 是 webpack 的命令行工具包。这也是 webpack 核心的两个包。

```bash
npm install webpack webpack-cli --save-dev
```

## 1.2 入口(entry)

+ 入口起点指示 webpack 应该使用哪个模块作为内部依赖图的开始。进入入口起点后， webpack 会找出那些模块和库是入口起点(直接和间接)依赖的。
+ 默认值是 `src/index.js` 文件，也可以通过配置项的 entry 属性，指定一个或(多个)不同的入口起点。

```javascript
const path = require('path')
module.exports = {
  entry: './src/index.js'       // 指定输入文件
}
```

默认打包时的配置文件为 webpack.config.js 文件， 在该指令中可以省略。

```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

## 1.3 输出(output)

+ output 属性指定 webpack 输出时，创建的 bundle 文件的文件名以及所存储的文件夹
+ 主要输出文件的默认值为 `./dist/main.js`， 其他文件默认在 dist 目录中

```javascript
module.exports = {
  entry: './src/index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),    // 指定输出文件夹
    filename: 'main.js'                       // 指定输出文件名
  }
}
```

## 1.4 loader

+ webpack 只能理解 javascript 和 json 文件
+ loader 让 webpack 有能力去处理其他类型文件， 并且转化为有效模块供应用程序使用并被添加到依赖图中

```javascript
module.exports = {
  entry: './src/index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }       // 通过 raw-loader 处理 txt 结尾文件
    ]
  }
}
```

## 1.5  插件(plugin)

+ 插件可以用来执行范围更广的任务,包括：打包优化、资源管理、注入环境变量.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    })
  ]
}
```

## 1.6 模式(mode)

日常开发过程中一般会有两套构建环境

+ 一套开发时使用, 构建结果用于本地开发测试
  - 生成 sourceMap 文件
  - 需要打印 debug 信息
  - 需要 live reload 或者 hot reload
+ 一套构建后的结果应用于线上
  - 可能需要分离 css 成单独文件, 以便多个页面共享同一 css 文件
  - 需要压缩 HTML/CSS/JS 代码
  - 需要压缩图片

可以在命令行中指定，也可以在配置文件中配置

```json
"scripts": {
  "build": "webpack --mode=production"
}
```

```javascript
module.exports = {
  mode: "development"
}
```

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

### 2.3.4 重大变化

在 webpack5 中内置了资源模块(asset modules)，在处理资源文件时，可以通过配置资源模块而无需配置额外 loader。同样也支持自定义文件名，以及图片转 base64 的配置项。具体可以参看[官网说明](https://webpack.js.org/guides/asset-modules/)

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
