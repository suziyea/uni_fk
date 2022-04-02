import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login: false,
		token: uni.getStorageSync('token') || '',
		isRealNameStatus: '',
		refresh_token: uni.getStorageSync('refresh_token') || '',
		userInfo: {},
		deviceId: uni.getStorageSync('deviceId') || '',
		osType: uni.getStorageSync('osType') || '',
	},
	mutations: {
		LOGIN(state, payload) {
			uni.setStorageSync('userInfo', payload.userInfo)
			state.userInfo = payload.userInfo
		},
		LOGOUT(state) {
			state.login = false
			state.token = ''
			uni.clearStorageSync()
		},
		SETDEVICE(state, payload) {
			uni.setStorageSync('deviceId', payload.deviceId)
			uni.setStorageSync('osType', payload.osType)
			state.deviceId = payload.deviceId
			state.osType = payload.osType
		},
		SET_TOKEN(state, payload) {
			uni.setStorageSync('token', payload.token)
			uni.setStorageSync('refresh_token', payload.refresh_token)
			state.token = payload.token;
			state.refresh_token = payload.refresh_token;

		},
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
		setLogin({
			commit
		}, data) {
			console.log('payload-----data', data);
			commit("LOGIN", data);
		},
	},
})

export default store
