export const fillData = (cont, items) => {
	for (let item of items) {
		!item.onSale
			? cont.insertAdjacentHTML(
					'beforeend',
					`
		<div id="${item._id}" class="item"><span>${item.name}</span> <span>${item.price}$</span></div>
		`
			  )
			: cont.insertAdjacentHTML(
					'beforeend',
					`
		<div id="${item._id}"  class="item onsale"><span>${
						item.name
					}</span> <span><span class="oldPrice">${
						item.price
					}$</span>    <span class="newPrice">${(item.price * 0.75).toFixed(
						2
					)}$</span></span></div>
		`
			  )
	}
}
