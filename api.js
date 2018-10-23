//const domain = "http://192.168.0.109:8000/"
const domain = "http://wx.lcpxj.com/v1/"
const api = {
  "login": domain + "user/login",
  "sync": domain + "user/userInfo",
  "banner": domain + "index/ad",
  "link": domain + "index/navbar",
  "recommand": domain + "index/best",
  "brand": domain + "category/brand",
  "category": domain + "category/lists",
  "commodities": domain + "goods/lists",
  "commodity": domain + "goods/detail",
  "page": domain + "content/index",
  "addToCart": domain + "cart/add",
  "cart": domain + "cart/lists"
}
module.exports = api
