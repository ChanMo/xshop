Page({
  data: {
    data: []
  },
  onLoad: function() {
    this._fetchData()
  },
  _fetchData: function() {
    let data = [
      {'id':1,'title':'【今日推荐]DOYOU系列面膜，超低折扣','images':['https://img.alicdn.com/bao/uploaded/TB1GcCfHXXXXXbQaXXXd0E9FFXX_095524.jpg_160x160.jpg','https://img.alicdn.com/bao/uploaded/T1BvLzXgdfXXaeH.Z9_104831.jpg_160x160.jpg','https://img.alicdn.com/bao/uploaded/TB1nzqkLXXXXXbIXXXX8YQp8XXX_021604.jpg_160x160.jpg','https://img.alicdn.com/imgextra/i1/2670830951/TB1PgvSbyrpK1RjSZFhXXXSdXXa_!!0-item_pic.jpg_270x270.jpg']},
      {'id':2,'title':'炒鸡好看的，物流很快，去年购买的不小心丢了，今年又来买了','description':'','images':['https://img.alicdn.com/bao/uploaded/i8/TB1aRucGXXXXXcgXVXX1xrH8XXX_021231.jpg_200x200.jpg','https://img.alicdn.com/bao/uploaded/i8/T18PlKFIxdXXbjtjc3_050458.jpg_200x200.jpg']}
    ]
    this.setData({'data':data})
  }
})
