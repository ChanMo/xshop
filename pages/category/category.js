const api = require('../../api')
const app = getApp()

Page({
  data: {
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    category: null,
    active: 0
  },
  onLoad: function() {
    this._fetchCategory()
  },
  _fetchCategory: function() {
    let url = api.category
    let data = [
      {'name':'品牌区','image':'','items':[
        {'id':1,'name':'雅诗兰黛','image':'https://img.alicdn.com/imgextra/i8/T10UtTXjBrXXb1upjX.jpg_70x70.jpg'},
        {'id':2,'name':'欧莱雅','image':'https://img.alicdn.com/imgextra/i5/T1CdCHXjFbXXb1upjX.jpg_70x70.jpg'},
        {'id':3,'name':'兰蔻','image':'https://img.alicdn.com/imgextra/i7/T1dTOJXoRvXXb1upjX.jpg_70x70.jpg'},
        {'id':4,'name':'悦诗风吟','image':'https://img.alicdn.com/imgextra/i2/T1Q4H7FU8bXXXa78nI-400-200.png_70x70.jpg'},
        {'id':5,'name':'香奈儿','image':'https://img.alicdn.com/imgextra/i6/T1XeGKXltrXXb1upjX.jpg_70x70.jpg'}
      ]},
      {'name':'美妆','image':'','items':[
        {'id':1,'name':'粉底液','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'},
        {'id':2,'name':'粉饼','image':'https://img.alicdn.com/tps/i3/TB1lwhQGXXXXXbLXFXXwxCdHXXX-50-50.png'},
        {'id':3,'name':'BB霜','image':'https://img.alicdn.com/tps/i2/TB1dpdLGXXXXXaCXVXXwxCdHXXX-50-50.png'},
        {'id':4,'name':'眼线','image':'https://img.alicdn.com/tps/i4/TB1STtRGXXXXXbmXFXXwxCdHXXX-50-50.png'},
        {'id':5,'name':'腮红','image':'https://img.alicdn.com/tps/i3/TB1SWNYGXXXXXc9XXXXwxCdHXXX-50-50.png'}
      ]},
      {'name':'护肤','image':'','items':[
        {'id':1,'name':'卸妆','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'},
        {'id':2,'name':'洁面','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'},
        {'id':3,'name':'化妆水','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'},
        {'id':4,'name':'乳液','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'},
        {'id':5,'name':'防晒','image':'https://img.alicdn.com/tps/i1/TB1LtVRGXXXXXahXFXXwu0bFXXX.png'}
      ]}
    ]
    this.setData({category:data})
  },
  setActive: function(e) {
    this.setData({'active':e.currentTarget.dataset.index})
  }
})
