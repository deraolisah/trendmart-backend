import express from 'express';
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

const productRouter = express.Router();

// Define routes
productRouter.post('/add', addProduct); // Add a new product
productRouter.get('/get', getProducts); // Get all products
productRouter.get('/get/:id', getProductById); // Get a single product by ID
productRouter.put('/update/:id', updateProduct); // Update a product by ID
productRouter.delete('/delete/:id', deleteProduct); // Delete a product by ID

export default productRouter;