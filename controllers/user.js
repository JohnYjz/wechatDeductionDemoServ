const User = require('../models/User')
const { SuccessModel } = require('../models/resModel')

function setCookie (ctx, val) {
    const msgCookieOption = {
      path:'/',
      maxAge: 24 * 60 * 60 * 1000, 
      httpOnly: true,
    };
    ctx.cookies.set('userid', val, msgCookieOption);
}

exports.getInfo = async function(ctx, next) {
  // 这是一个mock方法，如果没登录则mock一份user信息，省略掉登录逻辑
  const { userid } = ctx.header
  if (userid) {
    const userObj = await User.findById(userid)
    setCookie(ctx, userid)
    ctx.body = new SuccessModel(userObj)
    return
  }
  const users = await User.fetch()
  if (users.length) {
    setCookie(ctx, users[0]._id)
    ctx.body = new SuccessModel(users[0])
    return
  }
  const data = {
    userName: '测试账号',
  }
  const _userObj = new User(data)
  const userObj = await _userObj.save()
  setCookie(ctx, userObj._id)
  ctx.body = new SuccessModel(userObj)
}