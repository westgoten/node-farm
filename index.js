const http = require('http')
const url = require('url')
const data = require('./modules/data')
const templates = require('./modules/templates')
const templateEngine = require('./modules/templateEngine')

const cardsHtml = templateEngine.getCardsHtml(templates.card, data.products)
const overviewHtml = templateEngine.getOverviewHtml(templates.overview, cardsHtml)

const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true)
	switch (pathname) {
		case '/':
		case '/overview':
			res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })
			res.end(overviewHtml)
			break
		case '/product':
			res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })
			const productHtml = templateEngine.getProductHtml(
				templates.product,
				data.products,
				Number(query.id)
			)
			res.end(productHtml)
			break
		case '/api':
			res.writeHead(200, { 'Content-type': 'application/json;charset=utf-8' })
			res.end(data.json)
			break
		default:
			res.writeHead(404, { 'Content-type': 'text/html;charset=utf-8' })
			res.end('<h1>Page not found!</h1>')
	}
})

server.listen('8000', 'localhost', () => {
	console.log('Listening to requests on port 8000')
})
