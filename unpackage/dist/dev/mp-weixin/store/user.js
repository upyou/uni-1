"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    address: {}
  }),
  actions: {
    setUserAddress(i) {
      this.address = i;
    }
  },
  persist: {
    storage: {
      getItem: common_vendor.index.getStorageSync,
      setItem: common_vendor.index.setStorageSync
    }
  }
});
exports.useUserStore = useUserStore;
