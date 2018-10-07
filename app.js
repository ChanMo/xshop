//app.js
const api = require('./api')

App({
  globalData: {
    userInfo: null,
    token: null
  },
  onLaunch: function () {
    let self = this
    const token = wx.getStorageSync('token')
    if(token) {
      // 如果已经登录
      self.globalData.token = token
    } else {
      // 登录
      wx.login({
        success: res => {
          console.log(res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // let url = api.login
          // wx.request({url:url, success:function(res){
          //    let token = res.data.token
          //    wx.setStorageSync('token', token)
          // }})
        }
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          //} else {
          //} wx.showModal({
          //}   title:'授权登录',
          //}   content:'允许获取您的微信昵称等信息',
          //}   showCancel: false,
          //}   success: res => {
          //}     wx.openSetting()
          //}   }
          //} })
        }
      }
    })
  }
})
