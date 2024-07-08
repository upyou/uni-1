"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const store = store_cart.useCartStore();
common_vendor.storeToRefs(store);
const _sfc_main = {
  data() {
    return {
      store,
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#C00000"
          }
        }
      ]
    };
  },
  methods: {},
  watch: {
    setTotal() {
      store.setBadge();
    }
  }
};
if (!Array) {
  const _easycom_my_settle2 = common_vendor.resolveComponent("my-settle");
  const _easycom_my_address2 = common_vendor.resolveComponent("my-address");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_my_settle2 + _easycom_my_address2 + _easycom_uni_icons2 + _easycom_uni_number_box2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_my_settle = () => "../../components/my-settle/my-settle.js";
const _easycom_my_address = () => "../../components/my-address/my-address.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_my_settle + _easycom_my_address + _easycom_uni_icons + _easycom_uni_number_box + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.store.cart.length !== 0
  }, $data.store.cart.length !== 0 ? {
    b: common_vendor.p({
      type: "shop",
      size: "30"
    }),
    c: common_vendor.f($data.store.cart, (item, i, i0) => {
      return {
        a: common_vendor.o(($event) => $data.store.radioClick(i), i),
        b: item.goods_state,
        c: item.goods_small_logo || "",
        d: common_vendor.t(item.goods_name),
        e: common_vendor.t(item.goods_price.toFixed(2)),
        f: common_vendor.o((value) => $data.store.countChange(value, item), i),
        g: "3cfccbd8-5-" + i0 + "," + ("3cfccbd8-4-" + i0),
        h: common_vendor.p({
          value: item.goods_count,
          min: 1
        }),
        i: common_vendor.o(($event) => $data.store.swipeCilck(item), i),
        j: "3cfccbd8-4-" + i0 + ",3cfccbd8-3",
        k: i
      };
    }),
    d: common_vendor.p({
      ["right-options"]: $data.options
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/pages/Cart/Cart.vue"]]);
wx.createPage(MiniProgramPage);
