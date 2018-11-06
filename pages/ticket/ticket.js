const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0,
    ticket: null,
    modalVisible: false,
    count: 1,
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

  onCall: function(e) {
    let mobile = e.currentTarget.dataset.value
    wx.makePhoneCall({phoneNumber:mobile})
  },
  onModalShow: function() {
    this.setData({modalVisible:true})
  },
  onModalHide: function() {
    this.setData({modalVisible:false})
  },
  onMapClick: function() {
    wx.navigateTo({url:'/pages/map/map'})
  },
  onDecrease: function() {
    if(this.data.count == 1) {
      return
    }
    this.setData({count:this.data.count-1})
  },
  onIncrease: function() {
    this.setData({count:this.data.count+1})
  },
  onBuy: function() {
    wx.navigateTo({url:'/pages/buy/buy?commodity='+this.data.id+'&count='+this.data.count+'&sku='+this.data.spec.spec_sku_id+'&is_virtual=1'})
  }
})
