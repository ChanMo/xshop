const api = require('../../api')
const app = getApp()

Page({
  data: {
    cart: [],
    checked: [],
    price: 0
  },
  onLoad: function() {
    this._fetchCart()
  },
  /** 结算操作 **/
  submit: function() {
    if(this.data.checked.length > 0) {
      wx.navigateTo({url:'/pages/buy/buy'})
    } else {
      wx.showToast({mask:true, title:'请选择商品',icon:'none'})
    }
  },
  _fetchCart: function() {
    /**
    let data = [
      {"id":1,"name":"测试","price":120,"image":"https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg","checked":true,"count":1},
      {"id":2,"name":"测试","price":120,"image":"https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg","checked":false,"count":2}
    ]
     **/
    let self = this
    let url = api.cart
    wx.request({url,
      method: 'POST',
      data: {token:app.globalData.token},
      success: function(res) {
        if(res.data.code > 0) {
          self.setData({cart: res.data.data.goods_list})
          self._makePrice()
        }
      }
    })
    //let checked = data.filter(item=>item.checked)
    //this.setData({cart:data, checked:checked.map(item=>item.id)})
    console.log(this.data.checked)
  },

  /** 计算价格 **/
  _makePrice: function() {
    let price = 0
    let checked = this.data.cart.filter(item => item.checked)
    checked.map(item => price += item.price * item.count)
    this.setData({price:price})
  },

  /** 更新数据库操作 **/
  _updateCart: function(checked) {
    console.log(checked)
    this.setData({checked:checked})
    this._makePrice()
  },

  /** 单个商品选中 **/
  _setChecked: function(e) {
    let checked = e.detail.value
    this._updateCart(checked)
  },

  /** 全选 **/
  _checkAll: function(e) {
    console.log(e.detail.value)
    let checked = []
    if(e.detail.value) {
      checked = this.data.cart.map(item=>item.id)
    }
    this._updateCart(checked)
  },

  // 跳转商品详情
  goToCommodity: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({url:'/pages/commodity/commodity?id='+id})
  }
})
