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
  actasCount,
} = require('../controllers/acta');

// routes
router.post('/acta', /* authCheck, adminCheck, */ create);
router.get('/actas/total', actasCount);

router.get('/actas/:count', listAll); // actas/100
router.delete('/acta/:slug', authCheck, adminCheck, remove);
router.get('/acta/:slug', read);
router.put('/acta/:slug', authCheck, adminCheck, update);

router.post('/actas', list);

module.exports = router;
