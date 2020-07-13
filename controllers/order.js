const Order = require('../models/Order')
const User = require('../models/User')
const { ORDER_STATE } = require('../constant')
const { SuccessModel, ErrorModel } = require('../models/resModel')


exports.getList = async function(ctx) {
  const { userid } = ctx.header
  const orders = await Order.find({ user: userid, state: ORDER_STATE.VALID })
  ctx.body =  new SuccessModel(orders)
}

exports.getCloseList = async function(ctx) {
  const { userid } = ctx.header
  const orders = await Order.find({ user: userid, state: ORDER_STATE.CLOSE })
  ctx.body =  new SuccessModel(orders)
}

exports.getDetail = async function(ctx) {
  const { id } = ctx.query
  const order = await Order.findById(id).populate('user','userName')
  ctx.body =  new SuccessModel(order)
}

exports.create = async function(ctx) {
  const data = ctx.request.body
  const { userid } = ctx.header
  const _orderObj = new Order({
    ...data,
    user: userid
  })
  const orderObj = await _orderObj.save()
  const userObj = await User.findById(userid)
  userObj.orders.push(orderObj._id)
  await userObj.save()
  ctx.body = new SuccessModel('创建成功')
}

exports.edit = async function(ctx, next) {
  const { id, payId } = ctx.request.body
  const orderObj = await Order.findById(id)
  orderObj.payId = payId
  const res = await orderObj.save()
  ctx.body = new SuccessModel(res)
}

exports.close = async function(ctx, next) {
  const { id } = ctx.query
  const orderObj = await Order.findById(id)
  orderObj.state = ORDER_STATE.CLOSE
  await orderObj.save()
  ctx.body = new SuccessModel('修改成功')
}