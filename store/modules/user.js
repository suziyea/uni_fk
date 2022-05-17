import {
	getUserInfo
} from "@/config/api/user.js";
export default {
	state: {
		login: false,
		token: uni.getStorageSync('token') || '',
		isRealNameStatus: '',
		refresh_token: uni.getStorageSync('refresh_token') || '',
		userInfo: uni.getStorageSync('userInfo') || {},
		deviceId: uni.getStorageSync('deviceId') || '',
		osType: uni.getStorageSync('osType') || '',
		insufficient_balance: false,
	},
	mutations: {
		LOGIN(state, payload) {
			uni.setStorageSync('userInfo', payload.userInfo)
			state.userInfo = payload.userInfo
		},
		LOGOUT(state) {
			state.login = false
			state.token = ''
			state.refresh_token = ''
			state.isRealNameStatus = ''
			state.userInfo = {}
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
			state.login = true;
			state.refresh_token = payload.refresh_token;
		},
		PAY_ERROR(state,payload) {
			state.insufficient_balance = payload;
		}
	},
	getters: {
		isLogin(state) {
			return state.token && state.userInfo ? true : false;
		},
		isRegisterRealName(state) {
			return state.login && state.isRealNameStatus;
		},
		getUserInfos(state) {
			return state.userInfo;
		},
		getInsufficientBalance(state) {
			return state.insufficient_balance;
		},
	},
	actions: {
		setLogin({
			commit
		}, data) {
			commit("LOGIN", data);
		},
		async setCurrentUserInfo (context) {
			let currentUser =  await getUserInfo();
			let params = {
				userInfo: {}
			}
			if (currentUser.code === 100000) {
				params.userInfo = currentUser.data
				context.commit('LOGIN', params)

			}
		},
	},
}
