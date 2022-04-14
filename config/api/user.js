const http = uni.$u.http

// post请求，登录
export const login = (params, config = {}) => {
	return http.post('/api/security/user/login', params, config)
}
// 实名认证
export const HandleRealName = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/user/verified/save', params, config)

// 短信验证码
export const sendSMS = (params, config = {}) => http.post('/api/public/sms/send', params, config)

// 获取额度
export const getEdu = (params, config = {

}) => http.post('/api/public/other-set/get', params, config)

// 添加银行卡
export const addBankCard = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/user-bank-card/save', params, config)

// 获取用户信息
export const getUserInfo = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/user/data/get', params, config)

// 添加反馈
export const addFeedback = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/feedback/save', params, config)

// 评估结果页
export const assessResult = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/home/evaluation-result', params, config)

// 评估结果页 二级
export const getAssessResult = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/home/evaluation-result-second', params, config)

// 第一次付款
export const setFirstPay = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/home/first-pay', params, config)

// 第二次付款
export const setSecondPay = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/home/second-pay', params, config)

// 获取开屏页
export const getStartBg = (params, config = {

}) => http.post('/api/public/image-collection/get', params, config)


// 获取权益
export const getQy = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/qy/authentication', params, config)
// get请求
export const getMenu = (data) => http.get('url', data)
