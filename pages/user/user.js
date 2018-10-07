const api = require('../../api')
const app = getApp()

Page({
  data: {
    user: null,
    link: [],
    order: []
  },
  onLoad: function() {
    this.setData({user:app.globalData.userInfo})
    this._setOrder()
    this._fetchLink()
  },
  onGotUserInfo: function(res) {
    let userInfo = res.detail.userInfo
    console.log(userInfo)
    app.globalData.userInfo = userInfo
    this.setData({user:userInfo})
  },
  _fetchLink: function() {
    let data = [
      {"name":"我的二维码","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/qrcode.png","path":"/pages/qrcode/qrcode"},
      {"name":"我的分销","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/user.png","path":"/pages/point/point"},
      {"name":"积分规则","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/point.png","path":"/pages/page/page?slug=jifenguize"},
      {"name":"买家须知","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/book.png","path":"/pages/page/page?slug=maijiaxuzhi"}
    ]
    this.setData({link:data})
  },
  _setOrder: function() {
    let data = [
      {"name":"待付款","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/nopay.png","param":"unpay"},
      {"name":"待发货","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/gift.png","param":"undelivery"},
      {"name":"待收货","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/delivery.png","param":"unreceive"},
      {"name":"已收货","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/send.png","param":"finished"},
      {"name":"退款","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/refund.png","param":"refund"}
    ]
    this.setData({order:data})
  }
})
