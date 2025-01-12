const ProductService = require('./productService');
const validator = require('validator')

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        return products
    } catch (error) {
         console.error("Error in getAllProducts controller:", error);
        throw error;
    }
};
const getProductById = async (req, res) => {
  
    try {
        const products = await ProductService.getProductById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createProduct = async (req, res) => {
    try {
      const { name, description, price, category, stock, imageUrl } = req.body;
  
      // Validation using validator.js
      if (validator.isEmpty(name)) {
        return res.status(400).json({ message: 'Name is required' });
      }
      if (!validator.isLength(name, { max: 255 })) {
        return res.status(400).json({ message: 'Name must be less than 256 characters' });
      }
      if (validator.isEmpty(description)) {
        return res.status(400).json({ message: 'Description is required' });
      }
      if (validator.isEmpty(String(price)) || !validator.isFloat(String(price), { min: 0 })) {
        return res.status(400).json({ message: 'Price must be a positive number' });
      }
      if (validator.isEmpty(category)) {
        return res.status(400).json({ message: 'Category is required' });
      }
      if (validator.isEmpty(String(stock)) || !validator.isInt(String(stock), { min: 0 })) {
          return res.status(400).json({ message: 'Stock must be a non-negative integer' });
        }
      if (validator.isEmpty(imageUrl)) {
        return res.status(400).json({ message: 'Image URL is required' });
      }
      if (!validator.isURL(imageUrl)) {
          return res.status(400).json({ message: 'Invalid Image URL' });
      }
  
      // If validation passes, proceed with product creation
      const product = await ProductService.createProduct({ name, description, price, category, stock, imageUrl });
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: error.message });
    }
  };
  

const updateProduct = async (req, res) => {
    try {
        const product = await ProductService.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await ProductService.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
