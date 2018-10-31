const api = require('../../api')
const app = getApp()

Page({
  data: {
    active: 'payment',
    orders: []
  },
  onLoad: function(option) {
    option['active'] && this.setData({active:option['active']})
  },
  onShow: function() {
    this._fetchOrder()
  },
  setActive: function(e) {
    let value = e.currentTarget.dataset.value
    this.setData({active:value})
    this._fetchOrder()
  },
  _fetchOrder: function() {
    let self = this
    let url = api.orderList + '?token=' + app.globalData.token
    wx.request({url:url,
      data: {'dataType':self.data.active},
      method: 'POST',
      success: function(res) {
        self.setData({orders: res.data.data.list})
      }
    })
  }
})
