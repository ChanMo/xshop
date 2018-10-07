//index.js
//获取应用实例
const api = require('../../api')
const app = getApp()

Page({
  data: {
    userInfo: {},
    banner: [],
    link: [],
    hot: []
  },
  _fetchBanner: function() {
    let data = [
      {"image":"http://doyou.oss-cn-beijing.aliyuncs.com/images/bannar.jpg"},
    ]
    this.setData({banner:data})
  },
  _fetchLink: function() {
    let data = [
      {"name":"爆款", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home1.png"},
      {"name":"满减区", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home2.png"},
      {"name":"洗面奶", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home3.png"},
      {"name":"水乳液", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home4.png"},
      {"name":"水乳液", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home9.png"},
      {"name":"全部商品", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home6.png"},
      {"name":"粉刷", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home7.png"},
      {"name":"卸妆液", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home8.png"},
      {"name":"口红", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home9.png"},
      {"name":"口红", "icon":"http://doyou.oss-cn-beijing.aliyuncs.com/icon/home1.png"},
    ]
    this.setData({link:data})
  },
  _fetchHot: function() {
    let self = this
    let url = api.commodity
    wx.request({url, success:function(res){
      self.setData({hot:res.data.results})
    }})
  },
  onLoad: function () {
    this._fetchBanner()
    this._fetchLink()
    this._fetchHot()
  },
  handleImage: function(src) {
    let url = new URL(src)
    url.hostname = 'maybe.findchen.com'
    return url.href
  }
})
