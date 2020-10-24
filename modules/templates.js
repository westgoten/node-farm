const fs = require('fs')

module.exports = {
	overview: fs.readFileSync(`${__dirname}/../templates/template-overview.html`, 'utf-8'),
	product: fs.readFileSync(`${__dirname}/../templates/template-product.html`, 'utf-8'),
	card: fs.readFileSync(`${__dirname}/../templates/template-card.html`, 'utf-8')
}
