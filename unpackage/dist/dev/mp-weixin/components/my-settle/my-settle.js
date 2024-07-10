"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const store_user = require("../../store/user.js");
const store = store_cart.useCartStore();
const ustore = store_user.useUserStore();
const {
  checkedCount
} = common_vendor.storeToRefs(store);
const _sfc_main = {
  name: "my-settle",
  data() {
    return {
      store,
      checkedCount,
      ustore
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
  },
  methods: {
    settlement() {
      if (store.checkedCount === 0)
        return common_vendor.index.showToast({
          title: "请选择要结算的商品",
          icon: "none"
        });
      if (ustore.addr === "")
        return common_vendor.index.showToast({
          title: "请选择收货地址",
          icon: "none"
        });
      if (ustore.token === "") {
        const redirect = {
          openType: "switchTab",
          from: "/pages/Cart/Cart"
        };
        ustore.redirectInfo(redirect);
        common_vendor.index.switchTab({
          url: "/pages/My/My"
        });
        return common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
      }
      this.payOrder();
    },
    async payOrder() {
      const orderInfo = {
        order_price: 0.01,
        consignee_addr: ustore.addr,
        goods: store.cart.filter((x) => x.goods_state).map((x) => ({
          goods_id: x.goods_id,
          goods_number: x.goods_count,
          goods_price: x.goods_price
        }))
      };
      const {
        data: res
      } = await common_vendor.index.$http.post("/my/orders/create", orderInfo);
      const orderNumber = res.message.order_number;
      console.log(orderNumber);
      const {
        data: res2
      } = await common_vendor.index.$http.post("/my/orders/req_unifiedorder", {
        order_number: orderNumber
      });
      console.log(res2);
      if (res2.message.pay) {
        common_vendor.index.showToast({
          icon: "success",
          title: "购买成功"
        });
        store.clearCart();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.store.setChecked(!$options.isFullChecked)),
    b: $options.isFullChecked,
    c: common_vendor.t($data.store.checkedCountPrice),
    d: common_vendor.t($data.store.checkedCount),
    e: common_vendor.o((...args) => $options.settlement && $options.settlement(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
