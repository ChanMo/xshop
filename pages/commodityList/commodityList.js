const api = require("../../api")

Page({
  data: {
    sort: 'all',
    category: 0,
    search: null,
    data: []
  },
  onLoad: function(options) {
    if(options.category) {
      this.setData({category: options.category})
    }
    if(options.search) {
      this.setData({search: options.search})
    }
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
    let url = api.commodities
    wx.request({
      url:url,
      data: {
        category_id: this.data.category,
        sortType: this.data.sort,
        sortPrice: 'true',
        search: this.data.search
      },
      method: 'POST',
      success:function(res){
      if(res.data.code > 0) {
        self.setData({data:res.data.data.data})
      }
    }})
  }
})
