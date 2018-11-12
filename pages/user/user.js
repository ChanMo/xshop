const api = require('../../api')
const app = getApp()

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
    link: [],
    order: order
  },
  onShow: function() {
    this.setData({user:app.globalData.userInfo})
    this._fetchUser()
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
    const self = this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({user: e.detail.userInfo})
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
  },
  _fetchUser: function() {
    const self = this
    const url = api.sync + '?token=' + app.globalData.token
    wx.request({url,
      success: res=>{
        let promotionUrl
        if(res.data.data.status == 0) {
          promotionUrl = "/pages/register/register"
        } else if(res.data.data.status == 1) {
          promotionUrl = "/pages/promotion/promotion"
        } else {
          promotionUrl = "/pages/wait/wait"
        }
        self.setData({
          link: [
            {"name":"推广中心","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/point.png","tap":"goTo","value":promotionUrl},
            {"name":"买家须知","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/book.png","tap":"goTo","value":"/pages/page/page?slug=2"},
            {"name":"客服电话","icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/user.png","tap":"call","value":"18498985793","right":"18498985793"}
          ]
        })
      }
    })
  }
})
