const api = require('../../api')
const app = getApp()

const data = [
  {'title':'[普通用户]购买了某某某','amount':50,'datetime':'2018-10-10 12:00'},
  {'title':'[一级用户]购买了某某','amount':50,'datetime':'2018-10-10 14:00'},
  {'title':'提现','amount':-100,'datetime':'2018-10-12 12:00'},
]

Page({
  data: {
    data: data
  }
})
