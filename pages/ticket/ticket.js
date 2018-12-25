const api = require('../../api')
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    id: 0,
    ticket: null,
    modalVisible: false,
    count: 1,
    content: '',
  },
  onLoad: function(option) {
    let id = option['id']
    this.setData({id:id})
    this._fetchTicket()
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: '[特色抢购] '+this.data.commodity.detail.goods_name,
      path: '/pages/ticket/ticket?id=' + this.data.id + '&p=' + app.globalData.uid
    }
  },

  // 跳转海报
  onGoPost: function() {
    wx.navigateTo({url: '/pages/post/post?id='+this.data.id+'&name='+this.data.commodity.detail.goods_name})
  },

  _fetchTicket: function() {
    let self = this
    let url = api.commodity + '?goods_id=' + this.data.id
    wx.request({url, success:function(res){
      if(res.data.code > 0) {
        var content = res.data.data.detail.content.replace('<img', '<img style="max-width:100%;height:auto" ');
        WxParse.wxParse('article', 'html', content, self,5);
        self.setData({
          commodity: res.data.data,
          content: content,
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
    if(this.data.commodity.detail.grab == 20) {
      wx.navigateTo({url:'/pages/buy/buy?commodity='+this.data.id+'&count='+this.data.count+'&sku='+this.data.spec.spec_sku_id+'&is_virtual=1'})
      return
    }
    let start_time_str = this.data.commodity.detail.start_time
    let start_time = new Date(
      start_time_str.substr(0,4),
      parseInt(start_time_str.substr(5,2)) - 1,
      start_time_str.substr(8,2),
      start_time_str.substr(11,2),
      start_time_str.substr(14,2),
      start_time_str.substr(17,2),
    )
    let end_time_str = this.data.commodity.detail.end_time
    let end_time = new Date(
      end_time_str.substr(0,4),
      parseInt(end_time_str.substr(5,2)) - 1,
      end_time_str.substr(8,2),
      end_time_str.substr(11,2),
      end_time_str.substr(14,2),
      end_time_str.substr(17,2),
    )
    let now = new Date()
    if(start_time <= now && now <= end_time) {
      wx.navigateTo({url:'/pages/buy/buy?commodity='+this.data.id+'&count='+this.data.count+'&sku='+this.data.spec.spec_sku_id+'&is_virtual=1'})
    } else {
      wx.showToast({title:'抢购未开始'})
      return
    }
  }
})
