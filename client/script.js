import {
	getItems,
	addItem,
	deleteItem,
	updateItem,
} from './modules/requests.js'
import { fillData } from './modules/fillData.js'

const URL = 'https://lesson-02-01-server.onrender.com'

const addButton = document.querySelector('.addItem')

const startFunction = async () => {
	let items, itemsOnSale
	try {
		items = await getItems(`${URL}/items`)
		itemsOnSale = await getItems(`${URL}/items/onsale`)
	} catch (err) {
		console.log(err)
	}
	const allItemsCont = document.querySelector('.allItemsCont')
	const salesCont = document.querySelector('.salesCont')

	// console.log(data)
	fillData(allItemsCont, items)
	fillData(salesCont, itemsOnSale)

	const allItems = document.querySelectorAll('.item')
	const allItemsOnSale = document.querySelectorAll('.onsale')

	allItems.forEach(el =>
		el.addEventListener('dblclick', async () => {
			console.log(el)
			await deleteItem(`${URL}/items/${el.id}`)
			window.location.reload()
		})
	)
	allItemsOnSale.forEach(el =>
		el.addEventListener('dblclick', async () => {
			console.log(el)
			await deleteItem(`${URL}/items/${el.id}`)
			window.location.reload()
		})
	)
}

const addItemFunc = async () => {
	const allItemsCont = document.querySelector('.allItemsCont')

	const nameInp = document.querySelector('.nameInput')
	const priceInp = document.querySelector('.priceInput')
	const onSale = document.querySelector('#onsales')
	console.log('nameInp', nameInp.value.length)
	console.log('priceInp', priceInp.value.length)

	if (
		nameInp.value.trim().length &&
		priceInp.value.trim().length &&
		!isNaN(+priceInp.value)
	) {
		const item = {
			name: nameInp.value,
			price: +priceInp.value,
			onSale: onSale.checked,
		}
		try {
			let res = await addItem(`${URL}/items`, item)
			console.log(res)
			if (res.status == 200) {
				fillData(allItemsCont, [item])
			}
		} catch (err) {
			console.log(err)
		}
	} else {
		alert('Некорректный ввод')
	}
}

addButton.addEventListener('click', addItemFunc)
document.addEventListener('DOMContentLoaded', startFunction)
