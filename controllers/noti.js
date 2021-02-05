const Noti = require('../models/noti');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newNoti = await new Noti(req.body).save();
    res.json(newNoti);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let notis = await Noti.find({})
    .limit(parseInt(req.params.count))
    .populate('products')
    /* .populate('subs') */
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(notis);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Noti.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Noti delete failed');
  }
};

exports.read = async (req, res) => {
  const noti = await Noti.findOne({ slug: req.params.slug })
    .populate('product')
    /* .populate('subs') */
    .exec();
  res.json(noti);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Noti.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log('Noti UPDATE ERROR ----> ', err);
    // return res.status(400).send("Noti update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

//SIN PAGINACION
/* exports.list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const Notis = await Noti.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(Notis);
  } catch (err) {
    console.log(err);
  }
}; */

exports.list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const notis = await Noti.find({})
      .skip((currentPage - 1) * perPage)
      .populate('products')
      /* .populate('subs') */
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(notis);
  } catch (err) {
    console.log(err);
  }
};

exports.notisCount = async (req, res) => {
  let total = await Noti.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
