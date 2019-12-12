import { getAll } from '../api/home'

export default {
    getAllData({ commit }) {
        return getAll().then(res => {
            commit('SET_TOTALREGISTER', res.totalRegister)
            commit('SET_TOTALACTIVER', res.totalActiver)
            commit('SET_TOPMOUTHACTIVER', res.topMouthActiver)
            commit('SET_TODAYLOGIN', res.todayLogin)
        })
    }
}