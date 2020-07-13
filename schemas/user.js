const { PAY_WAYS_MOCK } = require('../constant')

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  userName: {
    type: String,
  },
  payWays: {
    type: Array,
    default: PAY_WAYS_MOCK,
  },
  orders: [
    {
      type: ObjectId,
      ref: 'Order'
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

UserSchema.pre('save',function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

UserSchema.statics = {
	fetch:function(){
		return this
			.find({})
			.sort({'meta.updateAt':-1})
	},
	findById:function(id){
		return this.findOne({ _id: id })
	},
}
module.exports = UserSchema