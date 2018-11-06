const api = require('../../api')
const app = getApp()

Page({
  data: {
    cart: [],
    checked: [],
    price: 0
  },
  onShow: function() {
    this._fetchCart()
  },
  /** 结算操作 **/
  submit: function() {
    if(this.data.checked.length == 0) {
      wx.navigateTo({url:'/pages/buy/buy'})
    } else {
      wx.showToast({mask:true, title:'请选择商品',icon:'none'})
    }
  },

  /** 减少 **/
  onDecrease: function(e) {
    if(e.currentTarget.dataset.value == 1) {
      console.log('no more to reduce')
      return
    }
    wx.showLoading({title:'处理中',mask:true})
    const goods_id = e.currentTarget.dataset.id
    const goods_sku_id = e.currentTarget.dataset.sku
    const url = api.decreaseFromCart
    wx.request({url:url,
      method: 'POST',
      data: {
        "goods_id": goods_id,
        "goods_sku_id": goods_sku_id,
        "token": app.globalData.token
      },
      success: res=>this._fetchCart(),
      fail: error=>wx.showToast({title:'服务器错误'}),
      complete: ()=>wx.hideLoading()
    })
  },

  /** 增加 **/
  onIncrease: function(e) {
    wx.showLoading({title:'处理中',mask:true})
    const goods_id = e.currentTarget.dataset.id
    const goods_sku_id = e.currentTarget.dataset.sku
    const url = api.addToCart
    wx.request({url:url,
      method: 'POST',
      data: {
        "goods_id": goods_id,
        "goods_sku_id": goods_sku_id,
        "goods_num": 1,
        "token": app.globalData.token
      },
      success: res=>this._fetchCart(),
      fail: error=>wx.showToast({title:'服务器错误'}),
      complete: ()=>wx.hideLoading()
    })

  },

  _fetchCart: function() {
    let self = this
    let url = api.cart
    wx.request({url,
      method: 'POST',
      data: {token:app.globalData.token},
      success: function(res) {
        if(res.data.code > 0) {
          self.setData({
            cart: res.data.data.goods_list,
            price: res.data.data.order_total_price
          })
          //self._makePrice()
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
    return
    let checked = e.detail.value
    this._updateCart(checked)
  },

  /** 全选 **/
  _checkAll: function(e) {
    return
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
  },

  // 删除按钮
  onDelete: function(e) {
    let self = this
    let goods_id = e.currentTarget.dataset.id
    let goods_sku_id = e.currentTarget.dataset.sku
    wx.showModal({title:'提醒',content:'确认删除此商品?',success:res=>{
      if(res.confirm) {
        wx.showLoading({title:'处理中',mask:true})
        wx.request({
          url: api.deleteFromCart,
          method: 'POST',
          data: {
            token: app.globalData.token,
            goods_id: goods_id,
            goods_sku_id: goods_sku_id
          },
          success: res => {
            self._fetchCart()
          },
          fail: error => {
            wx.showToast({title:'删除失败'})
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    }})
  }
})
