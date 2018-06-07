const Category = require('../model/db').Category
const routeCategory = require('express').Router()
const sequelize = require('../model/db')

routeCategory.get('/', (req, res) => {
    Category.findAll({
        order: [
            ['categoryid', 'ASC'],
        ],
    }).then((category) => {
        res.json(category)
        console.log(category)
    }).catch((err) => {
        res.status(500).json({
            status: '0'
        })
        console.log(err)
    })
});

routeCategory.post('/insert/id', (req, res) => {
    let category = '1';
    Category.count('categoryid').then((max) => {
        genidcategory = "CG-" + (max + 1);
    }).then((category) => {
        const categoryData = {
            categoryid: genidcategory,
            categoryname: req.body.addcategory
        }
        Category.create(categoryData, (res, result) => {
        }).then((category) => {
            console.log(category)
            res.status(201).json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).json({
                status: '0'
            })
        })
    })
});
routeCategory.post('/update/:id', (req, res) => {
    Category.update({
        id: req.body.categoryid
    }, {
            where: {
                categoryname: req.body.categoryname
            }
        }).then((category) => {
            console.log(category)
            res.json({
                status: '1'
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                status: '0'
            })
        })
});
routeCategory.delete('/delete/id', (req, res) => {
    /* Category.findById({
        categoryid: req.body.id
    }).then((category) => {*/
    Category.destroy({
        categoryname: req.body.categoryname
    }, {
            where: {
                categoryid: req.body.categoryid
            }
        }).then((category) => {

            /* const updateData = {
 
             }
             Category.create(updateData, (req, res) => {
             }).then((category) => {*/
            res.json({
                status: '1'
            })
        }).then((err) => {
            res.json({
                status: '0'
            })
        })
    /*res.json({
        status: '1'
    })
}).then((err) => {
    res.json({
        status: '0'
    })
})*/
    //})
})

module.exports = routeCategory
