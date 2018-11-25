const api = require('../../api')
const app = getApp()

Page({
  data: {
    id: 0, // 商品ID
    name: null, // 商品名称
    image: null // 海报图片
  },

  onLoad: function(options) {
    this.setData({
      id: options['id'],
      name: options['name']
    })
    this._fetchPost()
  },

  /**
   * 分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '[特色抢购] '+this.data.name,
      path: '/pages/commodity/commodity?id=' + this.data.id + '&p=' + app.globalData.uid
    }
  },

  /**
   * 获取海报
   */
  _fetchPost: function() {
    wx.showLoading({title:'生成中...'})
    const url = api.post + '?token=' + app.globalData.token + '&goods_id=' + this.data.id
    wx.request({
      url,
      success:(res)=>this.setData({image: res.data.data.img_path}),
      complete: ()=>wx.hideLoading()
    })
  },

  /**
   * 长按保存图片
   */
  onSave: function(e) {
    const self = this
    wx.showModal({
      title: '提示',
      content: '是否保存图片?',
      success: (res) => {
        if(res.confirm) {
          self._authForImageSave()
        }
      }
    })

  },

  /**
   * 授权图片存储
   */
  _authForImageSave() {
    const self = this
    wx.getSetting({
      success(res) {
        if(!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self._saveImage()
            }
          })
        } else {
          self._saveImage()
        }
      }
    })
  },

  /**
   * 保存图片
   */
  _saveImage() {
    wx.showLoading({title:'正在下载图片...', mask:true})
    wx.getImageInfo({
      src:this.data.image,
      success:(res)=>{
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success:(ress)=>wx.showToast({title:'保存成功'})})
      },
      complete: ()=>wx.hideLoading()
    })
  }
})
