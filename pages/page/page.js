const api = require('../../api')
const app = getApp()

Page({
  data: {
    slug: null,
    page: null
  },
  onLoad: function(option) {
    let slug = option['slug']
    this.setData({slug:slug})
    this._fetchPage()
  },
  _fetchPage: function() {
    let self = this
    let url = api.page + this.data.slug + '/'
    wx.request({url:url, success:function(res){
      self.setData({page:res.data})
    }})
  }
})
