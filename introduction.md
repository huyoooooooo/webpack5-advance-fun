# 1. 介绍
webpack 是一个 JS 应用程序的静态模块打包工具. 当处理应用程序时, 会在内部构件一个依赖图(dependency graph),此依赖图映射到项目所需每个模块, 并生成一个或多个bundle

## 1.1 安装

```bash
npm install webpack webpack-cli --save-dev
```

`webpack` 是 webpack 的核心包, `webpack-cli` 是 webpack 的命令行工具包

## 1.2 入口(entry)

+ 入口起点指示 webpack 应该使用哪个模块作为内部依赖图的开始.进入入口起点后, webpack 会找出那些模块和库是入口起点(直接和间接)依赖的.
+ 默认值是 `src/index.js`, 也可以通过配置项的 entry 属性,指定一个或(多个)不同的入口起点.

### 1.2.1 webpack.config.js
```javascript
const path = require('path')
module.exports = {
  entry: './src/index.js'
}
```

默认指定配置文件为 webpack.config.js 文件, 指令中可以省略.
```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

## 1.3 输出(output)

+ output 属性指定 webpack 输出所创建的 bundle 存储的文件位置, 以及如何命名这些文件
+ 主要输出文件的默认值为 `./dist/main.js`, 其他文件默认在 dist 目录中

```javascript
module.exports = {
  entry: './src/index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
```

## 1.4 loader

+ webpack 只能理解 javascript 和 json 文件
+ loader 让 webpack 有能力去处理其他类型文件, 并且转化为有效模块供应用程序使用并被添加到依赖图中

```javascript
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
  }
}
```

## 1.5  插件(plugin)

+ 插件可以用来执行范围更广的任务,包括:打包优化、资源管理、注入环境变量.

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

可以在命令行中指定,也可以在配置文件中配置

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

```bash
npm install webpack-dev-server --save-dev
```

```javascript
module.exports = {
  devServer: {
    // static: ['assets'],
    static: {
      directory: path.join(__dirname, 'assets'),
      publicPath: '/public',
    }
    compress: true,
    port: 8080,
    open: true,
  },
}
```
