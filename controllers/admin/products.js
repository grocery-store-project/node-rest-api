const Product = require('../../models/product');
const { validationResult } = require('express-validator/check');
exports.addProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    req.query.imageUrl = req.file.location;
    Product.create(req.query).then(product => {
        res.status(201).json({ message: 'Product was added successfully' });
    }).catch(err => {
        next(new Error(err));
    });
};

exports.editProduct = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    req.query.imageUrl = req.file.location;
    Product.update(req.query, { where: { id: req.params.productId } }).then(product => {
        res.status(201).json({ message: 'Product was edited successfully' });
    }).catch(err => {
        next(new Error(err));
    });
};

exports.deleteProduct = (req, res, next) => {
    Product.destroy({ where: { id: req.params.productId } }).then(() => {
        res.status(200).json({ message: 'Product was deleted successfully' });
    }).catch(err => {
        next(new Error(err));
    });
}
