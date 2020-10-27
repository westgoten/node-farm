module.exports = {
	getOverviewHtml: (template, cardsHtml) => template.replace(/{%PRODUCT_CARDS%}/, cardsHtml),
	getCardsHtml: (template, productsData) =>
		productsData.map((product) => replaceTemplate(template, product)).join(''),
	getProductHtml: (template, productsData, productId) => {
		const product = productsData.find((product) => product.id === productId)
		return replaceTemplate(template, product)
	}
}

function replaceTemplate(template, product) {
	let output = template
		.replace(/{%ID%}/g, product.id)
		.replace(/{%PRODUCTNAME%}/g, product.productName)
		.replace(/{%IMAGE%}/g, product.image)
		.replace(/{%FROM%}/g, product.from)
		.replace(/{%NUTRIENTS%}/g, product.nutrients)
		.replace(/{%QUANTITY%}/g, product.quantity)
		.replace(/{%PRICE%}/g, product.price)
		.replace(/{%DESCRIPTION%}/g, product.description)

	if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

	return output
}
