const User = require('../models/User')

exports.checkReferer = async function (ctx, next) {
  if (ctx.header.referer === 'http://localhost:8080/') {
    await next()
  } else {
    ctx.throw(403)
  }
}

exports.authenticate = async function (ctx, next) {
  // cookie-session 验证登录信息, 本来应该用redis，这里简化用mongodb验证一下
  // 如果是公司内部则是请求认证服务器
  const userid = await ctx.cookies.get('userid')
  const userObj = await User.findById(userid)
  if (userObj) {
    await next()
  } else {
    ctx.throw(403)
  }
}
