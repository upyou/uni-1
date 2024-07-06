"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateListl2: [],
      scrollTop: 0
    };
  },
  onLoad() {
    this.getSystemInfo();
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await common_vendor.index.$http.get("/categories");
      console.log(res.message);
      this.cateList = res.message;
      this.cateListl2 = res.message[0].children;
    },
    async getSystemInfo() {
      const wh = await common_vendor.index.getSystemInfo();
      this.wh = wh.windowHeight - 60;
    },
    onClickChange(i) {
      this.active = i;
      this.cateListl2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotoGoodsList(item) {
      common_vendor.index.navigateTo(
        {
          url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
        }
      );
    },
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.cateList, (itme, i, i0) => {
      return {
        a: common_vendor.t(itme.cat_name),
        b: common_vendor.n(i === $data.active ? "active" : ""),
        c: common_vendor.o(($event) => $options.onClickChange(i), i),
        d: i
      };
    }),
    c: $data.wh + "px",
    d: common_vendor.f($data.cateListl2, (item, i, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.f(item.children, (item2, i2, i1) => {
          return {
            a: item2.cat_icon,
            b: common_vendor.t(item2.cat_name),
            c: i2,
            d: common_vendor.o(($event) => $options.gotoGoodsList(item2), i2)
          };
        }),
        c: i
      };
    }),
    e: $data.wh + "px",
    f: $data.scrollTop
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/pages/Cate/Cate.vue"]]);
wx.createPage(MiniProgramPage);
