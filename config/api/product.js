const http = uni.$u.http

// 产品列表页
export const getProducts = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/product-recommend/list', params, config)


// 产品列表 banner
export const getBanner = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/public/banner/get', params, config)

// 银行卡列表
export const getBank = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/bank/list', params, config)

// 添加银行卡
export const addBankInfo = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/user-bank-card/sms-verify', params, config)


// 绑卡发送验证码
export const addBankInfoSms = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/user-bank-card/sms', params, config)

// 第一笔支付验证码发送
export const sendFirstOrderSms = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/first-order/sms', params, config)

// 第二笔支付验证码发送
export const sendSecondOrderSms = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/second-order/sms', params, config)


// 支付校验
export const payVerify = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/order/sms-verify', params, config)


// 我的订单
export const getMyOrderList = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/user-order/get', params, config)


// 推荐产品访问
export const clickProductItem = (params, config = {
	custom: {
		auth: true
	}
}) => http.post('/api/fk/product-recommend/click', params, config)
