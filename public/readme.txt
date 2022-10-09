静态文件路径设置, 文件夹可以设置 public, assets 等有效名字。

通过配置设置 —— 两种基本设置。数组可以设置多个静态文件地址, 对象可以修改访问地址，可以结合使用。

1. 数组形式
  static: ['public']

2. 对象形式
  static: {
    directory: path.resolve(__dirname, 'public'),
    publicPath: '/assets'
  }


引入图片方式

1. 放在静态图片根目录中, 通过 img 标签引入(属性值书写要结合 devServer 中的配置)
2. 通过 require 或 import 引入, 通过 file-loader 或 url-loader 处理
3. 在 css 中通过 url 引入图片, 通过 css-loader 处理