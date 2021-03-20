const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsId = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }]
    });
    res.status(200).json(tagsId);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsId = await Tag.findOne(req.params.id, {

      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ]
    });
    if (!tagsId) {
      res.status(404).json({ message: 'No Tags found with that id!' });
      return;
    }
    res.status(200).json(tagsId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagsId = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagsId);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsId = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    if (!tagsId) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagsId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
