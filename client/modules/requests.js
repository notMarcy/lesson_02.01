export const getItems = url => {
	return new Promise((res, rej) =>
		fetch(url)
			.then(data => data.json())
			.then(data => res(data))
			.catch(err => rej(err.message))
	)
}

export const addItem = async (url, item) => {
	const resp = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(item),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})
	let data
	try {
		data = await resp.json()
	} catch (err) {
		data = null
	}
	return { status: resp.status, ok: resp.ok, data: data }
}

export const updateItem = (url, item) => {
	return new Promise((res, rej) =>
		fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(item),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
			.then(data => data.json())
			.then(data => res(data))
			.catch(err => rej(err.message))
	)
}

export const deleteItem = url => {
	return new Promise((res, rej) =>
		fetch(url, {
			method: 'DELETE',
		})
			.then(data => data.json())
			.then(data => res(data))
			.catch(err => rej(err.message))
	)
}
