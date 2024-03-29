const User = require("../model/usersModel");


const getAllUsers = async (req, res) => {
    try {
        console.log("Handling getAllUsers request");
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Error in getAllUsers:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const createUsers = async (req, res) => {
    try { 
        console.log("Request Body:", req.body);
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const updateUsersById = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        res.json(updateUser);
    }catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};

const deleteUsersById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser)
    } catch (err) {
        res.status(500).json ({
            err: "Internal Server Error",
            details: err.message 
        });
    } 
};


module.exports = {
    getAllUsers,
    createUsers,
    updateUsersById,
    deleteUsersById,
}