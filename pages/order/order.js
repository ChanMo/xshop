const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0,
    order: null
  },
  onLoad: function(option) {
    this.setData({id:option['id']})
  },
  onShow: function() {
    this._fetchData()
  },
  _fetchData: function() {
    let self = this
    let url = api.order + '?token=' + app.globalData.token
    wx.request({url:url,
      method: 'POST',
      data: {'order_id':self.data.id},
      success: function(res) {
        self.setData({order:res.data.data.order})
      }
    })
  }
})
