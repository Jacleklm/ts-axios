const express = require('express')
const bodyParser = require('body-parser') // body-parser 是 express 的一个中间件，解析 body 数据用的
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware') // express 的 webpack 中间件
const webpackHotMiddleware = require('webpack-hot-middleware') // express 的 webpack 中间件
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig) // 读取webpack配置

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

//  server 端要实现对应的路由接口
router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)

const port = process.env.PORT || 8081 // 跑在8081端口
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})