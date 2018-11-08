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
  },

  // 搜索事件
  onSearch: function(e) {
    const value = e.detail.value
    wx.navigateTo({url: '/pages/list/list?search='+value})
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
    this._fetchLink()
    this._fetchHot()
  },
  handleImage: function(src) {
    let url = new URL(src)
    url.hostname = 'maybe.findchen.com'
    return url.href
  }
})
