const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
    InvoiceNo: {
        type: Number,
        required: true,
    },
    InvoiceDate: {
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
    DayOfWeek:{
        type: String,
        required: true,
    },
    StockCode:{
        type: String,
        required: true,
    },
    Description:{
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    UnitPrice: {
        type: Number,
        required: true,
    },
    CustomerID: {
        type: Number,
        required: true,
    },
});

const Sales = mongoose.model("Sales", salesSchema, "SalesTransactions");

module.exports = Sales;