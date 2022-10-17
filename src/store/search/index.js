import { reqGetSearchInfo } from "@/api";
// search 模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit }, params = {}) {
        // params形参: 是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
// 为了简化数据
// 可以把将来在组件中需要用到的数据简化一下
const getters = {
    // 当前仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    total(state) {
        return state.searchList.total
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}