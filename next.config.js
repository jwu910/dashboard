const Dotenv = require('dotenv-webpack')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
	target: 'serverless',
	webpack: config => {
		config.plugins.push(new Dotenv({ path: './.env' }))
		return config
	},
})
