"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const store = store_user.useUserStore();
const _sfc_main = {
  name: "my-userInfo",
  data() {
    return {
      store,
      panelBody: [
        {
          count: 8,
          text: "收藏的店铺"
        },
        {
          count: 14,
          text: "收藏的商品"
        },
        {
          count: 18,
          text: "关注的商品"
        },
        {
          count: 84,
          text: "足迹"
        }
      ],
      panelBody2: [{
        image: "../../static/my-icons/icon1.png",
        text: "待付款"
      }, {
        image: "../../static/my-icons/icon2.png",
        text: "待收货"
      }, {
        image: "../../static/my-icons/icon3.png",
        text: "退款/退货"
      }, {
        image: "../../static/my-icons/icon4.png",
        text: "全部订单"
      }],
      panelBody3: [{
        text: "收货地址"
      }, {
        text: "联系客服"
      }, {
        text: "退出登录"
      }]
    };
  },
  methods: {
    Exit(i) {
      if (i.text === "退出登录") {
        common_vendor.index.showModal({
          content: "确定要退出吗？",
          success(e) {
            if (e.confirm) {
              store.clearUserInfo();
            }
          }
        });
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
    a: $data.store.avatar,
    b: common_vendor.f($data.panelBody, (item, i, i0) => {
      return {
        a: common_vendor.t(item.count),
        b: common_vendor.t(item.text),
        c: i
      };
    }),
    c: common_vendor.f($data.panelBody2, (item, i, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.text),
        c: i
      };
    }),
    d: common_vendor.f($data.panelBody3, (item, i, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: "b0d30c28-0-" + i0,
        c: i,
        d: common_vendor.o(($event) => $options.Exit(item), i)
      };
    }),
    e: common_vendor.p({
      type: "right",
      size: "15"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/components/my-userInfo/my-userInfo.vue"]]);
wx.createComponent(Component);
