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
}) => http.post('/api/fk/user-bank-card/save', params, config)
