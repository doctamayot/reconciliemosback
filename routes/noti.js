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
  notisCount,
} = require('../controllers/noti');

// routes
router.post('/noti', /* authCheck, adminCheck, */ create);
router.get('/notis/total', notisCount);

router.get('/notis/:count', listAll); // notis/100
router.delete('/noti/:slug', authCheck, adminCheck, remove);
router.get('/noti/:slug', read);
router.put('/noti/:slug', authCheck, adminCheck, update);

router.post('/notis', list);

module.exports = router;
