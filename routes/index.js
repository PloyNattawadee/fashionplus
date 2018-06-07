const route = require('express').Router()

route.use('/account', require('../api/controller/register'))
route.use('/category', require('../api/controller/category'))
route.use('/product', require('../api/controller/product'))
route.use('/productImg', require('../api/controller/productimage'))

module.exports = {
    route
}
