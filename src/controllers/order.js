const Order = require('../models/Order')
const User = require('../models/User')
const { ORDER_STATE } = require('../constant')
const { SuccessModel } = require('../models/resModel')
const xss = require('xss')


exports.getList = async function(ctx) {
  const userid = await ctx.cookies.get('userid')
  const orders = await Order.find({ user: userid, state: ORDER_STATE.VALID })
  ctx.body =  new SuccessModel(orders)
}

exports.getCloseList = async function(ctx) {
  const userid = ctx.cookies.get('userid')
  const orders = await Order.find({ user: userid, state: ORDER_STATE.CLOSE })
  ctx.body =  new SuccessModel(orders)
}

exports.getDetail = async function(ctx) {
  const { id } = ctx.query
  const order = await Order.findById(id).populate('user','userName')
  ctx.body =  new SuccessModel(order)
}

exports.create = async function(ctx) {
  const {
    payId,
    bussinessName,
    description,
    remarks,
  } = ctx.request.body
  const userid = ctx.cookies.get('userid')
  const _orderObj = new Order({
    payId,
    bussinessName: xss(bussinessName),
    description: xss(description),
    remarks: xss(remarks),
    user: userid
  })
  const orderObj = await _orderObj.save()
  const userObj = await User.findById(userid)
  userObj.orders.push(orderObj._id)
  await userObj.save()
  ctx.body = new SuccessModel('创建成功')
}

exports.edit = async function(ctx) {
  const { id, payId } = ctx.request.body
  const orderObj = await Order.findById(id)
  orderObj.payId = payId
  const res = await orderObj.save()
  ctx.body = new SuccessModel(res)
}

exports.close = async function(ctx) {
  const { id } = ctx.query
  const orderObj = await Order.findById(id)
  orderObj.state = ORDER_STATE.CLOSE
  await orderObj.save()
  ctx.body = new SuccessModel('修改成功')
}