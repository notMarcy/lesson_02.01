import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
	{
		name: { type: String, required: [true, 'Вы не указали name'] },
		price: {
			type: Number,
			required: [true, 'Вы не указали price'],
		},
		onSale: { type: Boolean, required: true },
	},
	{ strictQuery: true, strict: true, timestamps: true }
)

const Item = new mongoose.model('item', itemSchema)
export default Item
