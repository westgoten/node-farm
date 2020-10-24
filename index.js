const http = require('http')
const url = require('url')
const data = require('./modules/data')
const templates = require('./modules/templates')
const replaceTemplate = require('./modules/replaceTemplate')

const cardsHtml = getCardsHtml(templates.card, data.products)
const overviewHtml = templates.overview.replace(/{%PRODUCT_CARDS%}/, cardsHtml)

function getCardsHtml(template, productsData) {
	return productsData.map((product) => replaceTemplate(template, product)).join('')
}

const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true)
	switch (pathname) {
		case '/':
		case '/overview':
			res.writeHead(200, {
				'Content-type': 'text/html;charset=utf-8'
			})
			res.end(overviewHtml)
			break
		case '/product':
			res.writeHead(200, {
				'Content-type': 'text/html;charset=utf-8'
			})
			res.end(getProductHtml(templates.product, data.products, Number(query.id)))
			break
		case '/api':
			res.writeHead(200, {
				'Content-type': 'application/json;charset=utf-8'
			})
			res.end(data.json)
			break
		default:
			res.writeHead(404, {
				'Content-type': 'text/html;charset=utf-8'
			})
			res.end('<h1>Page not found!</h1>')
	}
})

function getProductHtml(template, productsData, productId) {
	const product = productsData.find((product) => product.id === productId)
	return replaceTemplate(template, product)
}

server.listen('8000', 'localhost', () => {
	console.log('Listening to requests on port 8000')
})
