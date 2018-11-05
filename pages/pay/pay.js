const api = require('../../api')
const app = getApp()

Page({
  data: {
    order: 0,
    amount: 0.00
  },
  onLoad: function(options) {
    this.setData({
      order: options['order'],
      amount: options['amount']
    })
  },
  pay: function() {
    wx.showLoading({title:'支付请求中',mask:true})
    const url = api.pay + '?token=' + app.globalData.token + '&order_id=' + this.data.order
    wx.request({url, success:res=>{
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.nonceStr,
        package: 'prepay_id='+res.data.data.prepay_id,
        signType: 'MD5',
        paySign: res.data.data.paySign,
        success: ress=>{
          console.log(ress)
          wx.navigateBack({delta:1})
        },
        fail: error=>{
          //wx.showToast({title:error.errMsg})
          console.log(error)
        }
      })
    }, complete:()=>{
      wx.hideLoading()
    }})
    //wx.showToast({title:'支付成功'})
  }
})
