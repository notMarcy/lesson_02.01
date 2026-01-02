import express from 'express'
import ItemController from '../controllers/controller.js'

const router = express.Router()

router.get('/', ItemController.getItems)
router.get('/onsale', ItemController.getItemsOnSale)
router.post('/', ItemController.addItem)
router.delete('/:id', ItemController.deleteItem)
router.patch('/:id', ItemController.updateItem)

export default router
