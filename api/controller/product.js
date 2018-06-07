const Product = require('../model/db').Product
const ProductImage = require('../model/db').ProductImage
const routeproduct = require('express').Router();
const sequelize = require('../model/db');

routeproduct.post('/insert', (req, res) => {
    var genid = '1';
    Product.count('productid').then((max) => {
        genid = "PD" + (max + 1);
    }).then((product) => {
        const productData = {
            productid: genid,
            productname: req.body.productname,
            price: req.body.price,
            detail: req.body.detail,
            typeproduct: req.body.typeProduct,
            //categoryid: req.body.style,
            statusid: req.body.status
        };
        Product.create(productData, (req, res) => {
        }).then((product) => {
            createProductImages(req.body.productImg, 0, () => {
                console.log('End');
                /*res.json({
                    status: '1'
                })*/
            });
        })
    }).then((image) => {
        res.send({
            status: "1"
        })
    }).catch((err) => {
        console.log(err)
        res.send({
            status: "0"
        })
    });
    //สร้างfunction เรียกตัวมันเอง
    function createProductImages(data, index, func) {
        let img = data[index];
        if (img === null || img === undefined) {
            func.call(this);
            return;
        }

        var dataImage = img.substring(img.lastIndexOf(","));
        var typeImage = img.substring(0, img.lastIndexOf(","));
        var originaldata = new Buffer(dataImage, 'base64');

        let genidimg = '1';
        ProductImage.count('productimgid').then((max) => {
            genidimg = "IMG-" + (max + 1);

        }).then((imgid) => {
            const imageData = {
                productimgid: genidimg,
                productimgname: originaldata,
                typeimage: typeImage,
                productid: genid,
            };
            console.log(genid)
            console.log(imageData);
            ProductImage.create(imageData, (req, res) => {
            }).then((image) => {
                createProductImages(data, ++index, func);
            })
        })

    }
})

module.exports = routeproduct