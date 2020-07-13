const User = require('../controllers/user')

const router = require('koa-router')()

router.prefix('/user')

router.get('/info', User.getInfo)

module.exports = router
