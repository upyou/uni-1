"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const mixins_tab = require("./mixins/tab.js");
const store_store = require("./store/store.js");
const store_cart = require("./store/cart.js");
const store_user = require("./store/user.js");
if (!Math) {
  "./pages/Home/Home.js";
  "./pages/Cate/Cate.js";
  "./pages/Cart/Cart.js";
  "./pages/My/My.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
  "./subpkg/search/search.js";
}
function createApp() {
  const app = common_vendor.createSSRApp(mixins_tab.App);
  app.use(store_store.pinia);
  app.mixin(mixins_tab.tabBadge);
  const store = store_cart.useCartStore();
  const ustore = store_user.useUserStore();
  common_vendor.index.$http = common_vendor.$http;
  common_vendor.watch(store.setTotal, (n, o) => {
    store.setBadge();
  });
  common_vendor.$http.beforeRequest = function(options) {
    common_vendor.wx$1.showLoading({
      title: "数据加载中..."
    });
    if (options.url.indexOf("/my") !== -1) {
      options.header = {
        Authorization: ustore.token
      };
    }
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
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
