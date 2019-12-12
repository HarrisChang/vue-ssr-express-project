import homeService from '../../api/home'
import home from '../../api/home'

const state = () => ({
    totalRegister: 44,
    totalActiver: 32,
    topMouthActiver: 22,
    todayLogin: 11
})

const getters = {
    totalRegister(state) {
        return state.totalRegister
    },

    totalActiver(state) {
        return state.totalActiver
    },

    topMouthActiver(state) {
        return state.topMouthActiver
    },

    todayLogin(state) {
        return state.todayLogin
    }
}

const mutations = {
    SET_TOTALREGISTER: (state, num) => {
        state.totalRegister = num
    },

    SET_TOTALACTIVER: (state, num) => {
        state.totalActiver = num
    },

    SET_TOPMOUTHACTIVER: (state, num) => {
        state.topMouthActiver = num
    },

    SET_TODAYLOGIN: (state, num) => {
        state.todayLogin = num
    }
}

const actions = {
    getAllData({ commit }) {
        return homeService.getAll().then(res => {
            commit('SET_TOTALREGISTER', res.totalRegister)
            commit('SET_TOTALACTIVER', res.totalActiver)
            commit('SET_TOPMOUTHACTIVER', res.topMouthActiver)
            commit('SET_TODAYLOGIN', res.todayLogin)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}