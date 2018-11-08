const domain = "https://www.tsqgsc.com/v1/"
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
  "decreaseFromCart": domain + "cart/sub",
  "cart": domain + "cart/lists",
  "deleteFromCart": domain + "cart/delete",
  "buy": domain + "order/cart",
  "pay": domain + "user.order/pay",
  "qrcode": domain + "user/QrCode",
  "orderList": domain + "user.order/lists",
  "order": domain + "user.order/detail"
}
module.exports = api
