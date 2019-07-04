const Product = require('../models/product');
const Category = require('../models/category');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


function getOrder(sort) {
  switch (sort) {
    case '1':
      return [['price', 'ASC']];
    case '2':
      return [['price', 'DESC']];
    case '3':
      return [['createdAt', 'ASC']];
    case '4':
      return [['createdAt', 'DESC']];
    default:
      return [['id', 'ASC']];
  }
}

exports.getProducts = (req, res, next) => {

  const order = getOrder(req.query.order);
  const limit = Number(req.query.limit) || 5;
  const page = req.query.page || 1;
  const offset = limit * (page - 1);
  const where = req.query.categoryId ? { categoryId: req.query.categoryId } : {};
  if (req.query.filter) {
    where.title = {
      [Op.substring]: req.query.filter
    };
  }
  console.log(where);


  Product.findAndCountAll({
    order, limit, offset, where
  }).then(result => {
    const products = result.rows;
    const page_all = Math.ceil(result.count / limit)
    res.status(200).json({ products, page_all });
  }).catch(err => {
    next(new Error(err));
  });
};

exports.getCategories = (req, res, next) => {
  Category.findAll().then(categories => {
    res.status(200).json(categories);
  }).catch(err => {
    next(new Error(err));
  });
};

exports.getSingleProduct = (req, res, next) => {
  Product.findByPk(req.params.productId).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      error = new Error();
      error.message = "Product not found";
      error.statusCode = 410;
      next(error);
    }
  })
};
