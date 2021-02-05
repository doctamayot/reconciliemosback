const Acta = require('../models/acta');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newActa = await new Acta(req.body).save();
    res.json(newActa);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let actas = await Acta.find({})
    .limit(parseInt(req.params.count))
    .populate('products')
    /* .populate('subs') */
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(actas);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Acta.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('acta delete failed');
  }
};

exports.read = async (req, res) => {
  const acta = await Acta.findOne({ slug: req.params.slug })
    .populate('product')
    /* .populate('subs') */
    .exec();
  res.json(acta);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Acta.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log('acta UPDATE ERROR ----> ', err);
    // return res.status(400).send("acta update failed");
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
    const actas = await acta.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(actas);
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

    const actas = await Acta.find({})
      .skip((currentPage - 1) * perPage)
      .populate('products')
      /* .populate('subs') */
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(actas);
  } catch (err) {
    console.log(err);
  }
};

exports.actasCount = async (req, res) => {
  let total = await Acta.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
