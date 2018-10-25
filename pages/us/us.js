const api = require('../../api')
const app = getApp()

Page({
  data: {
    page: null
  },
  onLoad: function() {
    let self = this
    let url = api.page + '?code=3'
    wx.request({url, success:res=>self.setData({page:res.data.data})})
  }
})
