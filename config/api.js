const http = uni.$u.http

// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('url', params, config)

// get请求
export const getMenu = (data) => http.get('url', data)