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

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})
router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/error/get', function(req, res) {
  // 随机返回，有时返回正常有时返回错误
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

app.use(router)

const port = process.env.PORT || 8081 // 跑在8081端口
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})