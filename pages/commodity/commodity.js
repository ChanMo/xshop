const api = require('../../api')
const app = getApp()
Page({
  data: {
    id: 0,
    commodity: {}
  },
  onLoad: function(option) {
    let id = option['id']
    this.setData({id:id})
    this._fetchCommodity()
  },
  _fetchCommodity: function() {
    let self = this
    let url = api.commodity + this.data.id + '/'
    wx.request({url, success:function(res){
      self.setData({commodity:res.data})
    }})
  }
})
