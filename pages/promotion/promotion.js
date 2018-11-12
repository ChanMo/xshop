const api = require('../../api')
const app = getApp()

Page({
  data: {
    link: []
  },
  onLoad: function() {
    this._fetchData()
  },
  _fetchData: function() {
    const url = api.promotion + '?token=' + app.globalData.token
    wx.request({url, success:res=>{
      this.setData({
        link: [
          {'name':'分销佣金','icon':'../../images/fx1.png', 'sub':res.data.data.userInfo.money+'元'},
          {'name':'分销订单','icon':'../../images/fx2.png','sub':res.data.data.order_count+'个','path':'/pages/sellOrder/sellOrder'},
          {'name':'我的团队','icon':'../../images/fx3.png','sub':res.data.data.team+'人','path':'/pages/team/team'},
          {'name':'佣金明细','icon':'../../images/fx4.png','path':'/pages/walletLog/walletLog'},
          {'name':'推广码','icon':'../../images/fx5.png','path':'/pages/qrcode/qrcode'},
          {'name':'推广说明','icon':'../../images/fx6.png','path':'/pages/page/page?slug=4'},
        ],
        data: res.data.data
      })
    }})
  },
  onPress: function(e) {
    const path = e.currentTarget.dataset.value
    if (path) {
      wx.navigateTo({url:path})
    }
  }
})
