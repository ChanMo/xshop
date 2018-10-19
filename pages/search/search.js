Page({
  data: {
    search: null
  },
  onLoad: function() {
  },
  // set search value
  setValue: function(e) {
    let value = e.detail.value
    wx.navigateTo({url: '/pages/commodityList/commodityList?search='+value})
  }
})
