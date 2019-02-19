require('dotenv').config()

const { Base64 } = require('js-base64')
const app = require('express')()
const axios = require('axios')

const credential = Base64.encode(
	`${process.env.JIRA_USER}:${process.env.JIRA_PASS}`
)

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.get('/api/jira', (req, res) => {
	try {
		axios
			.get(`https://issues.liferay.com/rest/api/${req.query.query}`, {
				headers: { Authorization: `Basic ${credential}` },
			})
			.then(({ data }) => res.json(data))
			.catch(err => console.log('err', err))
	} catch (error) {
		console.error(`Error ===>`)
	}
})

app.listen(3001, () => console.log('Proxy server listening on 3001'))
