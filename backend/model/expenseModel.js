const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
    ExpenseDate: {
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
    ExpenseCategory:{
        type: String,
        required: true,
    },
    Description:{
        type: String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
});

const Expense = mongoose.model("Expense", expensesSchema, "Expenses");

module.exports = Expense;