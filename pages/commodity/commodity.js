const api = require('../../api')
const app = getApp()
Page({
  data: {
    id: 0,
    modalVisible: false,
    modalAnimation: null,
    commodity: {}
  },
  onLoad: function(option) {
    let id = option['id']
    this.setData({id:id})
    this._fetchCommodity()
  },
  onShow: function() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    animation.translateY(120)
    this.setData({modalAnimation:animation.export()})
  },
  // 加入购物车
  addToCart: function() {
    wx.showToast({'title':'加入成功'})
    this.closeModal()
  },
  // 获取商品信息
  _fetchCommodity: function() {
    let self = this
    let url = api.commodity + '?goods_id=' + this.data.id
    wx.request({url, success:function(res){
      if(res.data.code > 0) {
        self.setData({commodity:res.data.data})
      }
    }})
  },
  // 关闭modal
  closeModal: function() {
    this.setData({modalVisible:false})
  },
  // 开启modal
  openModal: function() {
    this.setData({modalVisible:true})
  },
  buy: function() {
    wx.navigateTo({url:'/pages/buy/buy'})
  }
})
