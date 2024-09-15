const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  beds: Number,
  baths: Number,
  safetyScore: Number,
  inclusivityFeatures: [String],
  location: {
    address: String,
  },
  imageUrl: String,
  images: [String],
  reviews: [
    {
      author: String,
      subject: String,
      comment: String,
      rating: Number,
    },
  ],
});

// Create a virtual property `id` that's computed from `_id`
propertySchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialized
  propertySchema.set('toJSON', {
    virtuals: true,
  });

  module.exports = mongoose.model('Property', propertySchema);
