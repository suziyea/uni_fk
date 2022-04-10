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
	
}) => http.post('/api/fk/other-set/get', params, config)

// 添加银行卡
export const addBankCard = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/user-bank-card/save', params, config)

// get请求
export const getMenu = (data) => http.get('url', data)
