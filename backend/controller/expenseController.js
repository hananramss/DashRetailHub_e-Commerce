const Expense = require("../model/expenseModel")


const getAllExpenses = async (req, res) => {
    try {
        console.log("Handling getAllExpenses request");
        const expense = await Expense.find();
        res.json(expense);
    } catch (err) {
        console.error("Error in getAllExpenses:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};



module.exports = {
    getAllExpenses,
}