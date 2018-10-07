const api = require('../../api')
const app = getApp()

Page({
  data: {
    order: null
  },
  onLoad: function(option) {
    this.setData({id:option['id']})
  }
})
