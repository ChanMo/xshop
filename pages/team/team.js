const api = require('../../api')
const app = getApp()

Page({
  data: {
    data: []
  },
  onLoad: function() {
    this._fetchData()
  },
  _fetchData: function() {
    const url = api.team + '?token=' + app.globalData.token
    wx.request({url, success:res=>this.setData({data: res.data.data})})
  }
})
