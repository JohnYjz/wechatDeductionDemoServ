const Order = require('../controllers/order')
const MiddleWare = require('../middlewares')

console.log(Order.create)

const router = require('koa-router')()

router.prefix('/order')

router.get('/list/valid', MiddleWare.authenticate, Order.getList)

router.get('/list/close', MiddleWare.authenticate, Order.getCloseList)

router.post('/create', MiddleWare.authenticate,  Order.create)

router.get('/detail', MiddleWare.authenticate, Order.getDetail)

router.get('/close', MiddleWare.authenticate, Order.close)

router.post('/edit', MiddleWare.authenticate, Order.edit)

module.exports = router