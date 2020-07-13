const Record = require('../models/Record')
const Order = require('../models/Order')
const { SuccessModel, ErrorModel } = require('../models/resModel')


exports.getList = async function(ctx) {
  const { id } = ctx.query
  console.log('getList', id)
  const records = await Record.find({ order: id })
  ctx.body =  new SuccessModel(records)
}

exports.create = async function(ctx) {
  const data = ctx.request.body
  const _recordObj = new Record({
    ...data,
  })
  const recordObj = await _recordObj.save()
  const orderObj = await Order.findById(data.order)
  orderObj.records.push(recordObj._id)
  await orderObj.save()
  ctx.body = new SuccessModel('创建成功')
}