const api = require('../../api')
const app = getApp()

Page({
  data: {
    data: []
  },
  onLoad: function() {
    const url = api.log + '?token=' + app.globalData.token
    wx.request({url, success:res=>this.setData({data:res.data.data})})
  }
})
