const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET all properties with optional filters
router.get('/', async (req, res) => {
  try {
    let query = {};

    const { maxPrice, inclusivity } = req.query;

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    if (inclusivity) {
      const inclusivityArray = Array.isArray(inclusivity) ? inclusivity : [inclusivity];
      query.inclusivityFeatures = { $all: inclusivityArray };
    }

    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
