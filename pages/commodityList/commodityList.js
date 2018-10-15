const api = require("../../api")

Page({
  data: {
    sort: 'default',
    data: []
  },
  onLoad: function() {
    this._fetchData()
  },
  onPullDownRefresh: function() {
    this._fetchData()
    wx.stopPullDownRefresh()
  },
  // 设置排序方式
  setSort: function(e) {
    const value = e.currentTarget.dataset.value
    this.setData({sort: value})
    this._fetchData()
  },
  // 获取数据
  _fetchData: function() {
    let self = this
    let url = api.commodity + '?sort=' + this.data.sort
    wx.request({url, success:function(res){
      self.setData({data:res.data.results})
    }})
  }
})
