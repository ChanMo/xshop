const api = require('../../api')
const app = getApp()

Page({
  data: {
   iscart: false,
   goodList:[],
    cart: [],
    checked: false,
    price: 0,
    checkAll: false,
    totalPrice: 0,
    goods_sku_id: ''
  },
  onShow: function() {
    this._fetchCart()
  },
  /** 结算操作 **/
  submit: function() {
    var goodList = this.data.goodList;
    var goods_sku_id = '';
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalPrice += good.total_price * 1;
        goods_sku_id = goods_sku_id + good.goods_sku_id + ',';
      }
    }
    if (totalPrice > 0) {
      goods_sku_id = goods_sku_id.slice(0, -1);
      wx.navigateTo({ url: '/pages/buy/buy?goods_sku_id=' + goods_sku_id})
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
    this.calculateTotal();
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
            goodList: res.data.data.goods_list,
           // price: res.data.data.order_total_price
          })
          //console.log(res.data)
          self.calculateTotal();
        }
      }
    })
  },
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalPrice += good.total_price*1;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalPrice': totalPrice
    })
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
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {

   // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].goods_sku_id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }
    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },
  /**
  * 用户点击全选
  */
  selectalltap: function (e) {
    // console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }
    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }
    
    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    this.calculateTotal();
  },
})
