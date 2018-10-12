const api = require('../../api')
const app = getApp()

Page({
  data: {
    active: 'unpay',
  },
  onLoad: function(option) {
    option['active'] && this.setData({active:option['active']})
  },
  setActive: function(e) {
    let value = e.currentTarget.dataset.value
    this.setData({active:value})
  }
})
