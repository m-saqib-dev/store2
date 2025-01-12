const Product = require("./productSchema");
const getAllProducts = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};
const getProductById = async (id) => {
    console.log(id)
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error fetching product by id: ' + error.message);
    };
};
const createProduct = async (productData) => {
    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

const updateProduct = async (id, productData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error('Product not found');
        }
        return deletedProduct;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};


