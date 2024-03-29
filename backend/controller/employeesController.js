const Employee = require("../model/employeesModel")


const getAllEmployees = async (req, res) => {
    try {
        console.log("Handling getAllEmployees request");
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        console.error("Error in getAllEmployees:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};



module.exports = {
    getAllEmployees,
}