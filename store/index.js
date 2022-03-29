import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login: false,
		token: uni.getStorageSync('token') || '',
		isRealNameStatus: '',
		userInfo: {}
	},
	mutations: {
		LOGIN(state, payload) {
			uni.setStorageSync('token',payload.token)
			uni.setStorageSync('userInfo',payload.userInfo)
			state.token = payload.token
			state.userInfo = payload.userInfo
		},
		LOGOUT(state) {
			state.login = false
			state.token = ''
			uni.clearStorageSync()
		}
	},
	getters: {
		isLogin(state) {
			return state.token;
		},
		isRegisterRealName(state) {
			return state.login && state.isRealNameStatus;
		}
	},
	actions: {
		
	}
})

export default store