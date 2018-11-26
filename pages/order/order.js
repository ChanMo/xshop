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
        if(res.data.data.order.virtual == 1) {
          const drawQrcode = require('../../utils/weapp.qrcode.min.js')
          drawQrcode({
            width: 200,
            height: 200,
            canvasId: 'myQrcode',
            text: res.data.data.order.order_no
          })
        }
      }
    })
  }
})
