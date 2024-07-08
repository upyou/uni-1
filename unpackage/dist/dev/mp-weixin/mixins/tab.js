"use strict";
const store_cart = require("../store/cart.js");
const common_vendor = require("../common/vendor.js");
const store_store = require("../store/store.js");
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderX/uni-1/App.vue"]]);
const app = common_vendor.createSSRApp(App);
app.use(store_store.pinia);
const store = store_cart.useCartStore();
const tabBadge = {
  data() {
    return {
      store,
      total: store.setTotal
    };
  },
  onShow() {
    store.setBadge();
  }
};
exports.App = App;
exports.tabBadge = tabBadge;
