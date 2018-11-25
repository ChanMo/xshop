const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0, // 商品ID
    name: null, // 商品名称
    image: null // 海报图片
  },

  onLoad: function(options) {
    this.setData({
      id: options['id'],
      name: options['name']
    })
    this._fetchPost()
  },

  /**
   * 分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '[特色抢购] '+this.data.name,
      path: '/pages/commodity/commodity?id=' + this.data.id + '&p=' + app.globalData.uid
    }
  },

  /**
   * 获取海报
   */
  _fetchPost: function() {
    wx.showLoading({title:'生成中...'})
    const url = api.post + '?token=' + app.globalData.token + '&goods_id=' + this.data.id
    wx.request({
      url,
      success:(res)=>this.setData({image: res.data.data.img_path}),
      complete: ()=>wx.hideLoading()
    })
  }
})
