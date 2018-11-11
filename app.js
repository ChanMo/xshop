//app.js
const api = require('./api')

App({
  globalData: {
    userInfo: null,
    token: null
  },
  onLaunch: function (options) {
    let self = this
    let p = 0
    if(options.query.p) {
      p = options.query.p
    }
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
          let url = api.login + '?code=' + res.code + '&p=' + p
          wx.request({url:url, success:function(res){
            if(res.data.code > 0) {
              self.globalData.token = res.data.data.token
              self.globalData.uid = res.data.data.user_id
              wx.setStorageSync('token', res.data.data.token)
            } else {
              //wx.showToast({title:'登录失败'})
            }
            //let token = res.data.token
            //wx.setStorageSync('token', token)
          }})
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

              const url = api.sync + '?token=' + this.globalData.token
              wx.request({
                url: url,
                method: 'POST',
                data: res.userInfo
              })
            }
          })
        }
      }
    })
  }
})
