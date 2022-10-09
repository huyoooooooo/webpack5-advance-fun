import './index.css'
/* 
  Module parse failed: Unexpected character '@' (1:0)
  You may need an appropriate loader to handle this file type, 
  currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
*/
import './sass.scss'

const cls = require('./cls.txt')
console.log(cls)

let Street = require('./images/street.jpg')   // 返回图片路径
let Img = new Image()
Img.src = Street

document.body.appendChild(Img)