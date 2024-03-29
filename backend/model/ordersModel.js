const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    username: {
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
    status:{
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model("Order", ordersSchema, "Orders");

module.exports = Order;
