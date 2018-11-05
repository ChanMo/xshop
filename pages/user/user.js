const api = require('../../api')
const app = getApp()

const link = [
  //{"name":"我的二维码","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/qrcode.png","tap":"goTo","value":"/pages/qrcode/qrcode"},
  {"name":"推广中心","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/point.png","tap":"goTo","value":"/pages/register/register"},
  {"name":"买家须知","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/book.png","tap":"goTo","value":"/pages/page/page?slug=2"},
  {"name":"客服电话","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/user.png","tap":"call","value":"18498985793","right":"18498985793"}
]

const order = [
  {"name":"待付款","icon":"../../images/gr1.png","param":"payment"},
  {"name":"待发货","icon":"../../images/gr2.png","param":"delivery"},
  {"name":"待收货","icon":"../../images/gr3.png","param":"received"},
  {"name":"已收货","icon":"../../images/gr4.png","param":"finished"},
  {"name":"退款","icon":"../../images/gr5.png","param":"refund"}
]

Page({
  data: {
    user: null,
    link: link,
    order: order
  },
  onLoad: function() {
    this.setData({user:app.globalData.userInfo})
  },
  onGotUserInfo: function(res) {
    let userInfo = res.detail.userInfo
    console.log(userInfo)
    app.globalData.userInfo = userInfo
    this.setData({user:userInfo})
  },
  getUserInfo: function(e) {
    if(!e.detail.userInfo) {
      return
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({user: e.detail.userInfo})
    // 更新用户数据
    const url = api.sync + '?token=' + app.globalData.token
    wx.request({
      url: url,
      method: 'POST',
      data: e.detail.userInfo
    })
  },
  goTo: function(e) {
    let path = e.currentTarget.dataset.value
    wx.navigateTo({url:path})
  },
  call: function(e) {
    let mobile = e.currentTarget.dataset.value
    wx.makePhoneCall({phoneNumber:mobile})
  }

})
