import { reqUserAddressList, reqGetOrderInfo } from "@/api"

const state = {
    addressList: [],
    orderInfo: {}
};

const mutations = {
    USERADDRESSLIST(state, data) {
        state.addressList = data
    },
    ORDERINFO(state, data) {
        state.orderInfo = data
    }
};

const actions = {
    async userAddressList({ commit }) {
        let result = await reqUserAddressList();
        if (result.code == 200) {
            commit("USERADDRESSLIST", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async orderInfo({ commit }) {
        let result = await reqGetOrderInfo();
        if (result.code == 200) {
            commit("ORDERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
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