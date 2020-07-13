const Order = require('../controllers/order')

console.log(Order.create)

const router = require('koa-router')()

router.prefix('/order')

router.get('/list/valid', Order.getList)

router.get('/list/close', Order.getCloseList)

router.post('/create', Order.create)

router.get('/detail', Order.getDetail)

router.get('/close', Order.close)

router.post('/edit', Order.edit)

module.exports = router