import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid -- 生成一个随机字符串（不变）
import { getUUID } from "@/utils/uuid_token"

const state = {
    goodsInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}

const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

const actions = {
    // 获取产品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        }
    },
    // 将产品添加到购物车
    async addToCart({ commit }, { skuId, skuNum }) {
        // 服务器写入数据成功，并没有返回其他的数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            // console.log(result)
            // 当前函数的返回值为Promise
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}

// 简化数据而生
const getters = {
    categoryView(state) {
        // state.goodsInfo 初始状态为空对象，空对象的categoryView属性值为undefind
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {}
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}