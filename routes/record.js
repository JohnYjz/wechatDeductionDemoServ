const router = require('koa-router')()

router.prefix('/record')

router.get('/list', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

module.exports = router