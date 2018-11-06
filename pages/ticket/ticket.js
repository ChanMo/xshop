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

  // 选择规格
  setSpec: function(e) {
    let value = e.currentTarget.dataset.id
    let group = e.currentTarget.dataset.group
    let current = this.data.spec_ids
    current[group] = value
    this.setData({spec_ids: current})
    this.getSpecItem()
  },

  // 获取spec单条数据
  getSpecItem: function() {
    let ids = this.data.spec_ids.join('_')
    let result = this.data.commodity.detail.spec.filter(
      item => item.spec_sku_id == ids
    )
    console.log(result)
    if(result.length > 0) {
      this.setData({spec: result[0]})
    }
  },

  call: function(e) {
    let mobile = e.currentTarget.dataset.value
    wx.makePhoneCall({phoneNumber:mobile})
  },
  buy: function() {
    wx.navigateTo({url:'/pages/buy/buy?commodity='+this.data.id+'&count=1&sku='+this.data.spec.spec_sku_id+'&is_virtual=1'})
  },
  onMapClick: function() {
    wx.navigateTo({url:'/pages/map/map'})
  }
})
