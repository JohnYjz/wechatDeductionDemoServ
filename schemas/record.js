const { ORDER_STATE, PAY_ID } = require('../constant')


const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RecordSchema = new Schema({
  order: {
    type: ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    default: 0,
  },
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

RecordSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

RecordSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort({'meta.updateAt':-1})
			.exec(cb)
	},
	findById:function(id, cb){
		return this
			.findOne({ _id:id })
			.exec(cb)
	},
}
module.exports = RecordSchema