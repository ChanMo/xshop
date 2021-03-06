const api = require('../../api')
const app = getApp()

Page({
  data: {
    order: 0
  },
  onLoad: function(options) {
    this.setData({order: options['order']})
  },
  onReturn: function() {
    wx.navigateBack()
  },
  onCancel: function() {
    wx.showLoading({title:'处理中',mask:true})
    const token = app.globalData.token
    const url = api.cancel + '?token=' + token + '&order_id=' + this.data.order
    wx.request({url,
      success:res=>{
        wx.showToast({title:'取消成功'})
        setTimeout(()=>wx.navigateBack(), 1500)
      },
      fail:error=>wx.showToast({title:'服务器错误'}),
      complete: ()=>wx.hideLoading()})
  }
})
