const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005

router.get('/', (req, res) => {
    res.json({
        'All Products': `http://localhost:${PORT}/api/products`
    })
})

router.use('/products', require('./api/productsRoutes'))

module.exports = router