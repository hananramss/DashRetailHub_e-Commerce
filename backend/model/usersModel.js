const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        match: /^[0-9]+$/,
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
    verified:{
        type: Boolean,
        required: true,
    },
});

const User = mongoose.model("User", usersSchema, "Users");

module.exports = User;