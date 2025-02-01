import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Example of a required field
  },
  description: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    min: 0, // Ensure old price is not negative
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure new price is not negative
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100, // Ensure discount is between 0 and 100
  },
  hot: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  images: {
    type: [String],
    default: [], // Default to an empty array if no images are provided
  },
  // vendor: {
  //   type: String,
  //   required: true,
  // },
  type: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [], // Default to an empty array if no tags are provided
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);
export default Product;