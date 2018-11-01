const api = require('../../api')
const app = getApp()

Page({
  data: {
    address: null,
    data: null,
    price: 0,
    commodity: 0,
    count: 0,
    sku: null
  },
  onLoad: function(options) {
    if(options['commodity']) {
      this.setData({
        from: 'goods',
        commodity: options['commodity'],
        count: options['count'],
        sku: options['sku']
      })
    } else {
      this.setData({from:'cart'})
    }
    this._fetchData()
  },
  _fetchData: function() {
    let url = api.buy
    let data = {
      token: app.globalData.token,
      act: 'confirm',
      from: this.data.from,
      //address: this.data.address
    }
    if(this.data.from == 'goods') {
      data['goods_id'] = this.data.commodity
      data['goods_sku_id'] = this.data.sku
      data['goods_num'] = this.data.count
    }
    wx.request({
      url:url,
      method:'post',
      data: data,
      success:res=>this.setData({data:res.data.data})})
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
      return
    }
    let self = this
    let url = api.buy
    let data = {
      token: app.globalData.token,
      act: 'submit',
      from: this.data.from,
      address: this.data.address
    }
    if(this.data.from == 'goods') {
      data['goods_id'] = this.data.commodity
      data['goods_sku_id'] = this.data.sku
      data['goods_num'] = this.data.count
    }
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        wx.navigateTo({url:'/pages/pay/pay?amount=120.00&order=1'})
      },
      fail: function(error) {
        wx.shotToast({title:'服务器错误'})
      }
    })
  }
})
