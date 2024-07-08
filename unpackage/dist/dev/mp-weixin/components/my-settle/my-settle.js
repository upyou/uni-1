"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const store = store_cart.useCartStore();
const { checkedCount } = common_vendor.storeToRefs(store);
const _sfc_main = {
  name: "my-settle",
  data() {
    return {
      store,
      checkedCount
    };
  },
  computed: {
    isFullChecked() {
      return this.store.setTotal === this.store.checkedCount;
    }
  },
  watch: {
    checkedCount() {
      store.setBadge();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.store.setChecked(!$options.isFullChecked)),
    b: $options.isFullChecked,
    c: common_vendor.t($data.store.checkedCountPrice),
    d: common_vendor.t($data.store.checkedCount)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
