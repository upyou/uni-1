"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      timer: null,
      kw: "",
      searchResults: [],
      historyList: []
    };
  },
  onLoad() {
    this.historyList = JSON.parse(common_vendor.index.getStorageSync("kw") || "[]");
  },
  methods: {
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.kw = e;
        console.log(e);
        this.getSearch();
        this.historyList.push(e);
        this.saveHistoryList();
      }, 500);
    },
    async getSearch(e) {
      if (this.kw.length === 0)
        return;
      const { data: res } = await common_vendor.index.$http.get(`/goods/qsearch?query=${this.kw}`);
      this.searchResults = res.message;
    },
    gotoDetail(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
      });
    },
    saveHistoryList() {
      const set = new Set(this.historyList);
      set.delete(this.kw);
      set.add(this.kw);
      this.historyList = Array.from(set);
      common_vendor.index.setStorageSync("kw", JSON.stringify(this.historyList));
    },
    clears() {
      this.historyList = [];
      common_vendor.index.setStorageSync("kw", "[]");
    },
    search(item) {
      this.kw = item;
    }
  },
  computed: {
    historys() {
      return [...this.historyList].reverse();
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_tag2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_tag)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.input),
    b: common_vendor.o(_ctx.cancel),
    c: common_vendor.o(_ctx.clear),
    d: common_vendor.o(($event) => $data.kw = $event),
    e: common_vendor.p({
      focus: true,
      cancelButton: "none",
      radius: "10",
      bgColor: "#fff",
      modelValue: $data.kw
    }),
    f: $data.searchResults.length !== 0
  }, $data.searchResults.length !== 0 ? {
    g: common_vendor.f($data.searchResults, (item, i, i0) => {
      return {
        a: common_vendor.t(item.goods_name),
        b: "5e8e80ec-1-" + i0,
        c: i,
        d: common_vendor.o(($event) => $options.gotoDetail(item), i)
      };
    }),
    h: common_vendor.p({
      type: "right",
      size: "16"
    })
  } : {
    i: common_vendor.o($options.clears),
    j: common_vendor.p({
      type: "trash-filled"
    }),
    k: common_vendor.f($options.historys, (item, i, i0) => {
      return {
        a: "5e8e80ec-3-" + i0,
        b: common_vendor.p({
          text: item,
          ["custom-style"]: "background-color:#f8f8fa; color:#000; font-weight: bold;"
        }),
        c: i,
        d: common_vendor.o(($event) => $options.search(item), i)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderX/uni-1/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
