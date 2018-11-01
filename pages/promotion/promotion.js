const app = getApp()

const link = [
  {'name':'分销佣金','icon':'../../images/fx1.png', 'sub':'20.00元'},
  {'name':'分销订单','icon':'../../images/fx2.png','sub':'5个','path':'/pages/sellOrder/sellOrder'},
  {'name':'我的团队','icon':'../../images/fx3.png','sub':'5人','path':'/pages/team/team'},
  {'name':'佣金明细','icon':'../../images/fx4.png','path':'/pages/walletLog/walletLog'},
  {'name':'推广码','icon':'../../images/fx5.png','path':'/pages/qrcode/qrcode'},
  {'name':'推广说明','icon':'../../images/fx6.png'},
]

Page({
  data: {
    link: link
  },
  onLoad: function() {

  },
  onPress: function(e) {
    const path = e.currentTarget.dataset.value
    if (path) {
      wx.navigateTo({url:path})
    }
  }
})
