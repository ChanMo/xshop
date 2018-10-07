Page({
  data: {
    cart: [],
    checked: []
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
    let data = [
      {"id":1,"name":"测试","price":120,"image":"https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg","checked":false},
      {"id":2,"name":"测试","price":120,"image":"https://img.alicdn.com/bao/uploaded/TB1lO6XJpXXXXc_XFXXLhc5_XXX_054423.jpg_160x160.jpg","checked":false}
    ]
    let checked = data.filter(item=>item.checked)
    this.setData({cart:data, checked:checked.map(item=>item.id)})
    console.log(this.data.checked)
  },

  /** 更新数据库操作 **/
  _updateCart: function(checked) {
    console.log(checked)
    this.setData({checked:checked})
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
  }
})
