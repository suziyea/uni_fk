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
// get请求
export const getMenu = (data) => http.get('url', data)
