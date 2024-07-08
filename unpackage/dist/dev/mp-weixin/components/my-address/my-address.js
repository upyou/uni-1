"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const store = store_user.useUserStore();
const _sfc_main = {
  name: "my-address",
  data() {
    return {
      store,
      address: store.address || {}
    };
  },
  methods: {
    async setAddress() {
      const res = await common_vendor.index.chooseAddress();
      this.store.setUserAddress(res);
      this.address = this.store.address;
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
  return common_vendor.e({
    a: JSON.stringify($data.address) === "{}"
  }, JSON.stringify($data.address) === "{}" ? {
    b: common_vendor.o((...args) => $options.setAddress && $options.setAddress(...args))
  } : {
    c: common_vendor.t($data.address.userName),
    d: common_vendor.t($data.address.telNumber),
    e: common_vendor.p({
      type: "right",
      size: "16"
    }),
    f: common_vendor.t($data.address.provinceName + $data.address.cityName + $data.address.countyName + $data.address.detailInfo),
    g: common_vendor.o((...args) => $options.setAddress && $options.setAddress(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/components/my-address/my-address.vue"]]);
wx.createComponent(Component);
