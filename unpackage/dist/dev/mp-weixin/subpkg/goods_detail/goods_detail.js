"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const store = store_cart.useCartStore();
const _sfc_main = {
  data() {
    return {
      store,
      id: 0,
      goodsInfo: {},
      options: [
        {
          icon: "shop",
          text: "店铺"
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
          color: "#fff"
        },
        {
          text: "立即购买",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff"
        }
      ]
    };
  },
  onLoad(option) {
    this.options[1].info = store.setTotal;
    this.id = option.goods_id;
    this.getGoodsDetail();
  },
  methods: {
    async getGoodsDetail() {
      const { data: res } = await common_vendor.index.$http.get("/goods/detail?goods_id=" + this.id);
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, "jpg");
      this.goodsInfo = res.message;
    },
    preview(i) {
      common_vendor.index.previewImage({
        current: i,
        urls: this.goodsInfo.pics.map((i2) => i2.pics_big)
      });
    },
    onClick(e) {
      if (e.content.text === "购物车") {
        common_vendor.index.switchTab({
          url: "/pages/Cart/Cart"
        });
      }
    },
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        const goods = {
          goods_id: this.goodsInfo.goods_id,
          goods_name: this.goodsInfo.goods_name,
          goods_price: this.goodsInfo.goods_price,
          goods_count: 1,
          goods_small_logo: this.goodsInfo.goods_small_logo,
          goods_state: true
        };
        this.store.addCart(goods);
        this.options[1].info = this.store.setTotal;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.goodsInfo.goods_name
  }, $data.goodsInfo.goods_name ? {
    b: common_vendor.f($data.goodsInfo.pics, (item, i, i0) => {
      return {
        a: item.pics_big,
        b: common_vendor.o(($event) => $options.preview(i))
      };
    }),
    c: common_vendor.t($data.goodsInfo.goods_price),
    d: common_vendor.t($data.goodsInfo.goods_name),
    e: common_vendor.p({
      type: "star",
      size: "18",
      color: "gray"
    }),
    f: $data.goodsInfo.goods_introduce,
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      options: $data.options,
      fill: true,
      ["button-group"]: $data.buttonGroup
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
