"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Home/Home.js";
  "./pages/Cate/Cate.js";
  "./pages/Cart/Cart.js";
  "./pages/My/My.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
  "./subpkg/search/search.js";
}
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
function createApp() {
  common_vendor.index.$http = common_vendor.$http;
  common_vendor.$http.beforeRequest = function(options) {
    common_vendor.wx$1.showLoading({
      title: "数据加载中..."
    });
  };
  common_vendor.$http.afterRequest = function() {
    common_vendor.wx$1.hideLoading();
  };
  common_vendor.index.$showMsg = function(title = "请求失败", duration = 1500) {
    common_vendor.index.showToast({
      title,
      duration,
      icon: "error"
    });
  };
  common_vendor.$http.baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
