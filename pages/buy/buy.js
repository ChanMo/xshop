const app = getApp()

Page({
  data: {
    address: null
  },
  onLoad: function() {
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
    }
  }
})
