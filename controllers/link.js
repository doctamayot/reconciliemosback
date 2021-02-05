const Link = require('../models/link');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newLink = await new Link(req.body).save();
    res.json(newLink);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let links = await Link.find({})
    .limit(parseInt(req.params.count))
    .populate('products')
    /* .populate('subs') */
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(links);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Link.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Link delete failed');
  }
};

exports.read = async (req, res) => {
  const link = await Link.findOne({ slug: req.params.slug })
    .populate('product')
    /* .populate('subs') */
    .exec();
  res.json(link);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Link.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log('Link UPDATE ERROR ----> ', err);
    // return res.status(400).send("Link update failed");
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
    const Links = await Link.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(Links);
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

    const Links = await Link.find({})
      .skip((currentPage - 1) * perPage)
      .populate('products')
      /* .populate('subs') */
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(links);
  } catch (err) {
    console.log(err);
  }
};

exports.linksCount = async (req, res) => {
  let total = await Link.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

/* exports.listRelated = async (req, res) => {
  const Link = await Link.findById(req.params.LinkId).exec();

  const related = await Link.find({
    _id: { $ne: Link._id },
    category: Link.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec();

  res.json(related);
}; */

// SERACH / FILTER

/* const handleQuery = async (req, res, query) => {
  const Links = await Link.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(Links);
};

const handleCategory = async (req, res, category) => {
  try {
    let Links = await Link.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(Links);
  } catch (err) {
    console.log(err);
  }
};

const handleSub = async (req, res, sub) => {
  const Links = await Link.find({ subs: sub })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(Links);
};

const handleTipo = async (req, res, tipo) => {
  const Links = await Link.find({ tipo })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(Links);
};

exports.searchFilters = async (req, res) => {
  const { query, category, sub, tipo } = req.body;

  if (query) {
    console.log('query --->', query);
    await handleQuery(req, res, query);
  }

  if (category) {
    console.log('category ---> ', category);
    await handleCategory(req, res, category);
  }

  if (sub) {
    console.log('sub ---> ', sub);
    await handleSub(req, res, sub);
  }

  if (tipo) {
    console.log('tipo ---> ', tipo);
    await handleTipo(req, res, tipo);
  }

  if (brand) {
    console.log('brand ---> ', brand);
    await handleBrand(req, res, brand);
  }
}; */
