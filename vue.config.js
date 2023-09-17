module.exports = {
	publicPath: process.env.NOD_ENV === 'production' ? 'haixing' : './',
	devServer: {
		host: 'localhost',
		port: 8000,
		open: true, // 自动打开浏览器
		proxy: {
			'/backend': {
				target: 'http://localhost:8800',
				changeOrigin: true,
				pathRewrite: {
					'^/backend': ''
				}
			},
			'/thispersondoesnotexist': {
				target: 'https://thispersondoesnotexist.com',
				changeOrigin: true,
				pathRewrite: {
					'^/thispersondoesnotexist': ''
				}
			}
		}
	}
}
