const api = require('../../api')
const app = getApp()

Page({
  data: {
    article: null
  },
  onLoad: function(option) {
    this.setData({id:option['id']})
    this._fetchArticle()
  },
  _fetchArticle: function() {
    let data = {
      'title': '【今日推荐】DOYOU品牌折扣活动',
      'content': '<p>在今天上午举办的 Synology 2019 会议中，Synology 发布了自家的新一代 DiskStation Manager 7.0（DSM 7.0）管理系统。在诸多网通公司中，鲜少有如此重视操作界面的体验和功能的，而在这方面持续的改进，也依然是 DSM 7.0 的重心所在。</p><p>DSM 7.0首要的就是继续简化安装与操作，除了简单到不用电脑，只要通过手机就能完成安装程序之外，也新增了一个统一的网页二维码登录系统，只要用手机上的 Synology app 扫一下，就可以直接完成登录，并且取决扫的时候所使用的 app，直接打开对应的软件。</p>',
      'commodities': [
        {'id':1,'name':'面膜三部曲10片','price':120.00,'cover':'https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg'},
        {'id':1,'name':'面膜三部曲10片','price':120.00,'cover':'https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg'},
        {'id':1,'name':'面膜三部曲10片','price':120.00,'cover':'https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg'},
        {'id':1,'name':'面膜三部曲10片','price':120.00,'cover':'https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg'}
      ]
    }
    this.setData({'article':data})
  }
})
