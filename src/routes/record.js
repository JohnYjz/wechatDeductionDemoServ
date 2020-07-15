const Record = require('../controllers/record')
const MiddleWare = require('../middlewares')

const router = require('koa-router')()

router.prefix('/record')

router.get('/list', MiddleWare.authenticate, Record.getList)
router.post('/create', MiddleWare.authenticate, Record.create)

module.exports = router