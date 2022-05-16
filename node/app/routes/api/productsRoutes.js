const express = require('express')
const router = express.Router()

const {productsDao: dao} = require('../../daos/dao')

//api/products
router.get('/', (req, res) => {
    dao.findAll(res, dao.table)
})

//api/products/count
router.get('/count', (req, res) => {
    dao.countAll(res, dao.table)
})

//api/category/:category
router.get('/category/:category', (req, res) => {
    dao.findByCategory(res, req.params.category)
})

//api/products/:id
router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})

//create a product
//api/product/create
router.post('/create', (req, res) => {
    dao.create(req, res)
})

//update product
//api/product/update/:id
router.patch('/update/:id', (req, res) => {
    dao.update(req, res)
})

module.exports = router