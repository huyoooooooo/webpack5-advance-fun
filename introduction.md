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
