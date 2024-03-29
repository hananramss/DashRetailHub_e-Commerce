const Sales = require("../model/salesModel")


const getAllSales = async (req, res) => {
    try {
        console.log("Handling getAllSales request");
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        console.error("Error in getAllSales:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};



module.exports = {
    getAllSales,
}