const api = require('../../api')
const app = getApp()

Page({
  data: {
  },
  onSubmit: function(e) {
    wx.showLoading({title:'申请中',mask:true})
    const url = api.register + '?token=' + app.globalData.token
    if(!e.detail.value.name || !e.detail.value.mobile) {
      wx.showToast({title:'请输入正确信息'})
      return
    }
    wx.request({
      url: url,
      method: 'POST',
      data: e.detail.value,
      success: res=>{
        wx.showToast({title:res.data.msg})
      },
      fail: error=>wx.showToast({title:'服务器失败'}),
      complete: ()=>wx.hideLoading()
    })
  }
})
