const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  listRelated,
  searchFilters,
  expedientes,
  only,
} = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);
router.get('/expedientes', expedientes);

router.get('/products/:count', listAll); // products/100
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.get('/productonly/:slug', only);
router.put('/product/:slug', authCheck, adminCheck, update);

router.post('/products', list);

// related
router.get('/product/related/:productId', listRelated);
// search
router.post('/search/filters', searchFilters);

module.exports = router;
