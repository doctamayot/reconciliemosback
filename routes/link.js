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
  linksCount,
} = require('../controllers/link');

// routes
router.post('/link', authCheck, adminCheck, create);
router.get('/links/total', linksCount);

router.get('/links/:count', listAll); // links/100
router.delete('/link/:slug', authCheck, adminCheck, remove);
router.get('/link/:slug', read);
router.put('/link/:slug', authCheck, adminCheck, update);

router.post('/links', list);

module.exports = router;
