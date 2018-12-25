const api = require('../../api')
const app = getApp()

Page({
  data: {
    address: null,
    data: null,
    price: 0,
    commodity: 0,
    count: 0,
    sku: null,
    is_virtual: 0, // 是否为虚拟商品
    name: null,
    mobile: null,
    remark: null, //备注
    check: 0,
    isAgreement: false,
    goods_sku_id:''
  },
  onLoad: function(options) {
    if(options['commodity']) {
      this.setData({
        from: 'goods',
        commodity: options['commodity'],
        count: options['count'],
        sku: options['sku'],
        is_virtual: options['is_virtual'] ? parseInt(options['is_virtual']) : 0
      })
    } else if (options['goods_sku_id']) {
      this.setData({ from: 'cart', goods_sku_id:options['goods_sku_id']})
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
    if (this.data.from == 'cart') {
      data['goods_sku_id'] = this.data.goods_sku_id
    }
    wx.request({
      url:url,
      method:'post',
      data: data,
      success:res=>this.setData({data:res.data.data})
    })
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
      console.log(result)
      e.setData({address: result})
    }})
  },
  submit: function() {
    wx.showLoading({title:'处理中',mask:true})

    // 如果是普通商品
    if(!this.data.address && this.data.is_virtual == 0) {
      wx.showToast({mask:true,title:'请选择收货地址',icon:'error'})
      return
    }

    // 如果是门票
    if(this.data.is_virtual == 1) {
      // 如果姓名或手机为空
      if(!this.data.name) {
        wx.showToast({mask:true,title:'请输入真实姓名'})
        return
      }
      if (!this.data.mobile) {
        wx.showToast({mask:true,title:'请输入手机号码'})
        return
      }
      if (this.data.check == 0) {
        wx.showToast({ mask: true, title: '请同意购买须知' })
        return
      }
    }

    let self = this
    let url = api.buy
    let data = {
      token: app.globalData.token,
      act: 'submit',
      from: this.data.from,
      address: this.data.address,
      name: this.data.name,
      mobile: this.data.mobile,
      remark: this.data.remark
    }
    // 如果是来自商品详情
    if(this.data.from == 'goods') {
      data['goods_id'] = this.data.commodity
      data['goods_sku_id'] = this.data.sku
      data['goods_num'] = this.data.count
    }
    if (this.data.from == 'cart') {
      data['goods_sku_id'] = this.data.goods_sku_id
    }
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        console.log(res)
        if(res.data.code == 1) {
          wx.navigateTo({url:'/pages/pay/pay?amount='+res.data.data.order_amount+'&order='+res.data.data.order_id})
        } else {
          wx.showToast({title:res.data.msg})
        }
      },
      fail: function(error) {
        wx.showToast({title:'服务器错误'})
      },
      complete: ()=>wx.hideLoading()
    })
  },

  // 输入姓名
  inputName: function(e) {
    this.setData({'name': e.detail.value})
  },

  // 输入手机
  inputMobile: function(e) {
    this.setData({'mobile': e.detail.value})
  },

  // 输入备注
  inputRemark: function(e) {
    this.setData({'remark': e.detail.value})
  },

  //改变协议
  agreeMent: function (e) {
    if (e.detail.value == '') {
      this.setData({ 'check': 0 })
    } else {
      this.setData({ 'check': 1 })
    }
  },
  showAgreement: function () {
    this.setData({ 'isAgreement': true })
  },
  close: function () {
    this.setData({ 'isAgreement': false })
  }
})
