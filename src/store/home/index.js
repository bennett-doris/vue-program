import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home 模块的小仓库
const state = {
    // state 中数据默认初始值不要乱写，服务器返回什么类型，则初始值为什么类型
    // 三级菜单的数据
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor 的数据
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("BANNERLIST", result.data)
        }
    },
    // 获取floor轮播图的数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}