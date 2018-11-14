const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0,
    order: {},
    data: {},
    list: []
  },
  onLoad: function(options) {
    this.setData({id: options['order']})
    this._fetchOrder()
    this._fetchData()
  },
  _fetchOrder: function() {
    let self = this
    let url = api.order + '?token=' + app.globalData.token
    wx.request({url:url,
      method: 'POST',
      data: {'order_id':self.data.id},
      success: function(res) {
        self.setData({order:res.data.data.order})
      }
    })
  },
  _fetchData: function() {
    const self = this
    const url = api.delivery + '?token=' + app.globalData.token + '&order_id=' + this.data.id
    wx.request({url,
      success: res=>{
        const list = res.data.data.Traces.reverse()
        let newList = []
        list.map(item=>newList.push({
          'date': item.AcceptTime.substr(5,5),
          'time':item.AcceptTime.substr(14,5),
          'title': item.AcceptStation
        }))
        self.setData({
          data:res.data.data,
          list: newList
        })
      },
      fail: error=>wx.showToast({title:'服务器失败'})
    })
  }
})
