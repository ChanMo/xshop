//index.js
//获取应用实例
const api = require('../../api')
const app = getApp()

const link = [
  {'name':'限时抢购','image':'../../images/按钮1.png',"link":"/pages/index/index"},
  {'name':'热门活动','image':'../../images/按钮2.png',"link":"/pages/index/index"},
  {'name':'特色旅游','image':'../../images/按钮3.png',"link":"/pages/index/index"},
  {'name':'立刻拼团','image':'../../images/按钮4.png',"link":"/pages/index/index"},
  {'name':'特色产品','image':'../../images/按钮5.png',"link":"/pages/index/index"},
  {'name':'产地直发','image':'../../images/按钮6.png',"link":"/pages/index/index"},
  {'name':'9.9元专区','image':'../../images/按钮7.png',"link":"/pages/index/index"},
  {'name':'会员中心','image':'../../images/按钮8.png',"link":"/pages/index/index"},
]

Page({
  data: {
    userInfo: {},
    banner: [],
    link: link,
    hot: []
  },

  // 获取轮播图数据
  _fetchBanner: function() {
    let self = this
    wx.request({url:api.banner, success:function(res){
      if(res.data.code > 0) {
        self.setData({banner: res.data.data})
      }
    }})
  },

  // 获取链接
  _fetchLink: function() {
    let self = this
    wx.request({url: api.link, success: function(res) {
      if(res.data.code > 0) {
        self.setData({link: res.data.data})
      }
    }})
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
    //this.setData({link:data})
  },

  // 获取推荐商品
  _fetchHot: function() {
    let self = this
    let url = api.recommand
    wx.request({url, success:function(res){
      self.setData({hot:res.data.data})
    }})
  },

  // 首次加载
  onLoad: function () {
    this._fetchBanner()
    //this._fetchLink()
    this._fetchHot()
  },
  handleImage: function(src) {
    let url = new URL(src)
    url.hostname = 'maybe.findchen.com'
    return url.href
  }
})
