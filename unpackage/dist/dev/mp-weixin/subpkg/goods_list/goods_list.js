"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0,
      defaultPic: "",
      isLoading: false
    };
  },
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    this.getGoodsList();
  },
  onPullDownRefresh() {
    this.goodsList = [];
    this.queryObj.pagenum = 1;
    this.getGoodsList();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 3e3);
  },
  onReachBottom() {
    if (this.isLoading)
      return;
    this.queryObj.pagenum = this.queryObj.pagenum + 1;
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return common_vendor.index.showToast({
        title: "加载完毕",
        duration: 1500
      });
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      this.isLoading = true;
      const { data: res } = await common_vendor.index.$http.get("/goods/search", this.queryObj);
      this.total = res.message.total;
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.isLoading = false;
      console.log(res);
    },
    gotoGoodsDetail(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsList, (item, i, i0) => {
      return {
        a: item.goods_small_logo || $data.defaultPic,
        b: common_vendor.t(item.goods_name),
        c: common_vendor.t(item.goods_price.toFixed(2)),
        d: i,
        e: common_vendor.o(($event) => $options.gotoGoodsDetail(item), i)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/subpkg/goods_list/goods_list.vue"]]);
wx.createPage(MiniProgramPage);
