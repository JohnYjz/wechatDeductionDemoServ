const xss = require('xss')
const Record = require('../models/Record')
const Order = require('../models/Order')
const { SuccessModel } = require('../models/resModel')


exports.getList = async function(ctx) {
  const { id } = ctx.query
  const records = await Record.find({ order: id })
  ctx.body =  new SuccessModel(records)
}

exports.create = async function(ctx) {
  const { order, amount } = ctx.request.body
  const _recordObj = new Record({
    order,
    amount: xss(amount)
  })
  const recordObj = await _recordObj.save()
  const orderObj = await Order.findById(order)
  orderObj.records.push(recordObj._id)
  await orderObj.save()
  ctx.body = new SuccessModel('创建成功')
}