const Record = require('../controllers/record')

const router = require('koa-router')()

router.prefix('/record')

router.get('/list', Record.getList)
router.post('/create', Record.create)

module.exports = router