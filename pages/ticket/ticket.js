const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0,
    ticket: null
  },
  onLoad: function(option) {
    let id = option['id']
    this.setData({id:id})
    this._fetchTicket()
  },
  _fetchTicket: function() {
    let self = this
    let url = api.commodity + '?goods_id=' + this.data.id
    wx.request({url, success:function(res){
      if(res.data.code > 0) {
        self.setData({
          commodity: res.data.data,
          spec: res.data.data.detail.spec[0],
          spec_ids: res.data.data.detail.spec[0].spec_sku_id.split('_')
        })
      }
    }})
  },
  call: function(e) {
    let mobile = e.currentTarget.dataset.value
    wx.makePhoneCall({phoneNumber:mobile})
  },
  buy: function() {
    wx.navigateTo({url:'/pages/buy/buy'})
  }
})
