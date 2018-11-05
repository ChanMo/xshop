const api = require('../../api')
const app = getApp()

Page({
  data: {
  },
  onSubmit: function() {
    wx.showLoading({title:'申请中',mask:true})
    setTimeout(()=>{
      wx.showToast({title:'申请失败',icon:'cancel'})
    }, 2000)
  }
})
