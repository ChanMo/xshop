const api = require('../../api')
const app = getApp()

Page({
  data: {
    address: null,
    commodities: [],
    price: 0
  },
  onLoad: function() {
    this._fetchCommodities()
  },
  _fetchCommodities: function() {
    let data = [
      {'name':'面膜三部曲10片','price':120.00,'count':1,'cover':'https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg'}
    ]
    this.setData({commodities:data})
    this._makePrice()
  },

  /** 计算价格 **/
  _makePrice: function() {
    let price = 0
    this.data.commodities.map(item => price += item.price * item.count)
    this.setData({price:price})
  },

  chooseAddress: function() {
    let self = this
    wx.getSetting({success:function(res) {
      if(res.authSetting['scope.address']) {
        self._chooseAddress(self)
      } else {
        wx.authorize({scope:'scope.address',success:function(res) {
          self._chooseAddress(self)
        }})
      }
    }})
  },
  _chooseAddress: function(e) {
    wx.chooseAddress({success:function(result) {
      e.setData({address: result})
    }})
  },
  submit: function() {
    if(!this.data.address) {
      wx.showToast({mask:true,title:'请选择收货地址',icon:'error'})
    }
  }
})
