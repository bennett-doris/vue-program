import { deleteCart, reqCartList, reqCheckCart } from "@/api";


const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    async deleteCart({ commit }, skuId) {
        let result = await deleteCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async checkCart({ commit }, { skuId, isChecked }) {
        let result = await reqCheckCart(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    deleteAllChecked({ dispatch, getters }) {
        let promise_array = []
        getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch("deleteCart", item.skuId) : ""
                promise_array.push(promise)
            })
            // 全部为真则为真
        return Promise.all(promise_array)
    },
    totalCheck({ dispatch, getters }, checked) {
        let promise_array = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked != checked ? dispatch("checkCart", { skuId: item.skuId, isChecked: checked }) : ""
            promise_array.push(promise)
        })
        return Promise.all(promise_array)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}