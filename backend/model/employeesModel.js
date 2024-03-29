const mongoose = require("mongoose");

const employeesSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Position: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    HireDate: {
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
    Salary: {
        type: Number,
        required: true,
    },
});

const Employee = mongoose.model("Employee", employeesSchema, "Employees");

module.exports = Employee;