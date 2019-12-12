import Vue from 'vue'

export default {
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