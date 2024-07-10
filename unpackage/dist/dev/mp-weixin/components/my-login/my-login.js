"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const store = store_user.useUserStore();
const defaultAvatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const _sfc_main = {
  name: "my-login",
  data() {
    return {
      avatarUrl: defaultAvatarUrl
    };
  },
  methods: {
    async chooseavatar(e) {
      const {
        avatarUrl
      } = e.detail;
      this.avatarUrl = avatarUrl;
      store.setAvatarUrl(avatarUrl);
      if (avatarUrl) {
        this.getUserInfo();
      }
    },
    async getUserInfo() {
      common_vendor.index.getUserProfile({
        desc: "登录",
        success(e) {
          console.log(e);
        }
      });
      const res = await common_vendor.index.login();
      const query = {
        code: res.code,
        encryptedData: store.userInfo.encryptedData,
        iv: store.userInfo.iv,
        rawData: store.userInfo.rawData,
        signature: store.userInfo.signature
      };
      const {
        data: login
      } = await common_vendor.index.$http.post("/users/wxlogin", query);
      if (login.meta.status) {
        store.setToken(
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
        );
        common_vendor.index.showToast({
          icon: "success",
          title: "登陆成功"
        });
        if (store.redirect && store.redirect.openType === "switchTab") {
          common_vendor.index.switchTab({
            url: store.redirect.from
          });
          store.redirectInfo({});
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "person",
      size: "100",
      color: "#AFAFAF"
    }),
    b: common_vendor.o((...args) => $options.chooseavatar && $options.chooseavatar(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
