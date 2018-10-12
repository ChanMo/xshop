const api = require('../../api')
const app = getApp()

Page({
  data: {
    alphabet: 'abcdefghijklmnopqrstuvwxyz#'.toUpperCase().split(''),
    category: null,
    brands: [],
    active: 0,
    language: 'zh',
    activeAlphabet: null,
    activeBrands: [],
  },
  onLoad: function() {
    this._fetchBrands()
    this._fetchCategory()
  },
  // 获取品牌数据
  _fetchBrands: function() {
    let url = api.brand
    let data = [
      {'id':1,'name':'雅诗兰黛','pinyin':'yashilandai','en_name':'YASI','image':'https://img.alicdn.com/imgextra/i8/T10UtTXjBrXXb1upjX.jpg_70x70.jpg'},
      {'id':2,'name':'欧莱雅','pinyin':'oulaiya','en_name':'ouly','image':'https://img.alicdn.com/imgextra/i5/T1CdCHXjFbXXb1upjX.jpg_70x70.jpg'},
      {'id':3,'name':'兰蔻','pinyin':'lankou','en_name':'rank','image':'https://img.alicdn.com/imgextra/i7/T1dTOJXoRvXXb1upjX.jpg_70x70.jpg'},
      {'id':4,'name':'悦诗风吟','pinyin':'yueshi','en_name':'shiyin','image':'https://img.alicdn.com/imgextra/i2/T1Q4H7FU8bXXXa78nI-400-200.png_70x70.jpg'},
      {'id':5,'name':'香奈儿','pinyin':'xiangnaier','en_name':'sher','image':'https://img.alicdn.com/imgextra/i6/T1XeGKXltrXXb1upjX.jpg_70x70.jpg'}
    ]
    this.setData({brands:data})
    this._filterBrands()
  },

  // 选择字母表
  choiceAlphabet: function(e) {
    let value = e.currentTarget.dataset.value
    let actived = this.data.activeAlphabet
    let result = null
    if (actived != value) {
      result = value
    }
      /**
    let result = []
    if(actived.some(item=>item == value)) {
      result = actived.filter(item=>item != value)
    } else {
      result = actived.concat([value])
    }
       **/
    this.setData({activeAlphabet:result})
    this._filterBrands()
  },

  // 设置筛选后品牌
  _filterBrands: function() {
    let language = this.data.language
    let activeAlphabet = this.data.activeAlphabet
    let brands = this.data.brands
    let activeBrands = brands
    if (activeAlphabet) {
      if (language == 'zh') {
        activeBrands = brands.filter(item => item.pinyin.substr(0,1).toUpperCase() == activeAlphabet)
      } else {
        activeBrands = brands.filter(item => item.en_name.substr(0,1).toUpperCase() == activeAlphabet)
      }
    }
    this.setData({activeBrands:activeBrands})
    /**
    let activeAlphabets = this.data.activeAlphabets
    let activeBrands = this.data.brands
    let language = this.data.language
    if(activeAlphabets.length > 0) {
      if(language == 'zh') {
        activeBrands = this.data.brands.filter(item=>activeAlphabets.some(item2=>item2 == item.pinyin.substr(0,1).toUpperCase()))
      } else {
        activeBrands = this.data.brands.filter(item=>activeAlphabets.some(item2=>item2 == item.en_name.substr(0,1).toUpperCase()))
      }
    }
    console.log(activeBrands)
    this.setData({activeBrands: activeBrands})
     **/
  },

  // 获取分类数据
  _fetchCategory: function() {
    let url = api.category
    let data = [
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
    data.unshift({'name':'品牌'})
    this.setData({category:data})
  },

  // 设置左侧分类
  setActive: function(e) {
    this.setData({'active':e.currentTarget.dataset.index})
  },

  // 设置中英文状态
  setLanguage: function(e) {
    this.setData({'language':e.currentTarget.dataset.language})
    this._filterBrands()
  }
})
