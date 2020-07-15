const { ORDER_STATE, PAY_ID } = require('../constant')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema({
  bussinessName: String,
  description: String,
  state: {
    type: Number,
    default: ORDER_STATE.VALID,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  payId: {
    type: String,
    default: PAY_ID.WECHAT_WALLET,
  },
  remarks: String,
  records: [
    {
      type: ObjectId,
      ref: 'Record',
    }
  ],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

OrderSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }
  next()
})

OrderSchema.statics = {
  fetch:function(){
    return this
      .find({})
      .sort({'meta.updateAt':-1})
  },
  findById:function(id){
    return this
      .findOne({ _id:id })
  },
}
module.exports = OrderSchema