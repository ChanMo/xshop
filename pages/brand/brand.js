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
    let self = this
    let url = api.commodity
    wx.request({url, success:function(res){
      self.setData({data:res.data.results})
    }})
  }
})
