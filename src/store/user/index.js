import { reqGetCode, reqGetUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from "@/api";

const state = {
    code: "",
    token: "",
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, data) {
        state.token = data
    },
    GETUSERINFO(state, data) {
        state.userInfo = data
    },
    USERLOGOUT(state) {
        state.token = "",
            state.userInfo = {}
    },

};
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async userRegister({ commit }, { phone, password, code }) {
        let result = await reqUserRegister({ phone, password, code })
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
                // 持久化存储token
            localStorage.setItem("TOKEN", result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
                // console.log(result)
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async userLogout({ commit }) {
        let result = await reqUserLogout();
        if (result.code == 200) {
            // console.log(result)
            localStorage.removeItem("TOKEN");
            commit("USERLOGOUT")
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}