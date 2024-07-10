"use strict";
const store_user = require("../../store/user.js");
const common_vendor = require("../../common/vendor.js");
const store = store_user.useUserStore();
const _sfc_main = {
  data() {
    return {
      store
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  const _easycom_my_userInfo2 = common_vendor.resolveComponent("my-userInfo");
  (_easycom_my_login2 + _easycom_my_userInfo2)();
}
const _easycom_my_login = () => "../../components/my-login/my-login.js";
const _easycom_my_userInfo = () => "../../components/my-userInfo/my-userInfo.js";
if (!Math) {
  (_easycom_my_login + _easycom_my_userInfo)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.store.token === ""
  }, $data.store.token === "" ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/pages/My/My.vue"]]);
wx.createPage(MiniProgramPage);
