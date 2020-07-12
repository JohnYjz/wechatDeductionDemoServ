const router = require('koa-router')()

router.prefix('/order')

router.get('/list', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/create', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/stop', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/edit', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router