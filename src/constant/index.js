const ORDER_STATE = {
  VALID: 1,
  CLOSE: 2,
}

const PAY_ID = {
  WECHAT_WALLET: 1,
}

const PAY_WAYS_MOCK = [
  {
    id: PAY_ID.WECHAT_WALLET,
    name: '零钱'
  },
  {
    id: 4456,
    name: '招商银行(4456)'
  }
]

exports.ORDER_STATE = ORDER_STATE
exports.PAY_ID = PAY_ID
exports.PAY_WAYS_MOCK = PAY_WAYS_MOCK