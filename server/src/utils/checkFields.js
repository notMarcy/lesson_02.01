export const checkInvalidFields = user => {
	const fields = ['name', 'price', 'onSale']
	for (let key in user) {
		if (!fields.includes(key)) return false
	}
	return true
}
