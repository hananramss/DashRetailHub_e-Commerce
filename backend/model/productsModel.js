const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    // image: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    pricePHP: {
        type: Number,
        required: true,
    },
    producer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation function to check if the date is in ISO format
                return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value.toISOString());
            },
            message: props => `${props.value} is not in the expected date format!`
        }
    },
    inStock:{
        type: Boolean,
        required: true,
    },
});

const Product = mongoose.model("Product", productsSchema, "Products");

module.exports = Product;