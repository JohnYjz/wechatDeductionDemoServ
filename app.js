const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet') // 网络安全
const Middleware = require('./src/middlewares')

const env = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')
let dbUrl = 'mongodb://127.0.0.1:27017/deduction'
if (env === 'development') {
  dbUrl = 'mongodb://localhost/deduction'
}
mongoose.connect(dbUrl)

const user = require('./src/routes/user')
const order = require('./src/routes/order')
const record = require('./src/routes/record')

// error handler
onerror(app)

// middlewares
app.use(helmet())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  /* eslint-disable no-console */
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(Middleware.checkReferer)

// routes
app.use(user.routes(), user.allowedMethods())
app.use(order.routes(), order.allowedMethods())
app.use(record.routes(), record.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
