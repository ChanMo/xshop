const api = require('../../api')
const app = getApp()

Page({
  data: {
    image: null
  },
  onLoad: function() {
    this._fetchQrcode()
  },
  _fetchQrcode: function() {
    let url = api.qrcode + '?token=' + app.globalData.token
    wx.request({url,success:res=>this.setData({image:res.data.data.img_path})})
  }
})
