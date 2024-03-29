const Product = require("../model/productsModel")


const getAllProducts = async (req, res) => {
    try {
        console.log("Handling getAllProducts request");
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("Error in getAllProducts:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const createProducts = async (req, res) => {
    try { 
        console.log("Request Body:", req.body);
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch(err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const updateProductsById = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        res.json(updateProduct);
    }catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const deleteProductsById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json(deletedProduct)
    } catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    } 
};

module.exports = {
    getAllProducts,
    createProducts,
    updateProductsById,
    deleteProductsById,
}