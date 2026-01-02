import Item from '../models/itemModel.js'
import { checkInvalidFields } from '../utils/checkFields.js'

export default class UserController {
	static async getItems(req, res) {
		try {
			const items = await Item.find()
			console.log(items)
			return res.status(200).json(items)
		} catch (error) {
			console.log('Возникла ошибка при получении товаров: ', error.message)
			return res.status(500).json({ message: error.message })
		}
	}
	static async getItemsOnSale(req, res) {
		try {
			const items = await Item.find({ onSale: true })
			console.log(items)
			return res.status(200).json(items)
		} catch (error) {
			console.log('Возникла ошибка при получении товаров: ', error.message)
			return res.status(500).json({ message: error.message })
		}
	}
	static async addItem(req, res) {
		try {
			const { name, price, onSale } = req.body
			// const userExists = await User.findOne({ $or: [{ email }, { name }] })

			// if (userExists){
			// 	console.log('Пользователь уже существует')
			// 	return res.status(400).json({})
			// }

			const item = new Item({
				name,
				price,
				onSale,
			})

			await item.save()

			res.status(200).json({ message: `Товар ${item.name} успешно добавлен` })
		} catch (error) {
			console.log('Произошла ошибка при добавлении товара: ', error.message)
			return res.status(500).json({ message: error.message })
		}
	}
	static async deleteItem(req, res) {
		try {
			console.log('deleting')
			let id = req.params.id
			const deletedItem = await Item.findByIdAndDelete(id)
			return res
				.status(200)
				.json({ message: `Товар ${deletedItem.name} удален` })
		} catch (error) {
			console.log('Произошла ошибка при удалении товара: ', error.message)
			return res.status(500).json({ message: error.message })
		}
	}
	static async updateItem(req, res) {
		try {
			if (!checkInvalidFields({ ...req.body }))
				return res.status(500).json({ message: 'Лишние поля' })
			let id = req.params.id
			const item = await Item.findByIdAndUpdate(
				id,
				{ ...req.body },
				{ runValidators: true }
			)
			return res.status(200).json({ message: 'Товар успешно изменен' })
		} catch (error) {
			console.log('Произошла ошибка при изменении товара: ', error.message)
			return res.status(500).json({ message: error.message })
		}
	}
}
