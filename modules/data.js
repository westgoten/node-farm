const fs = require('fs')

const productsJson = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8')
const productsData = JSON.parse(productsJson)

module.exports = {
	json: productsJson,
	products: productsData
}
