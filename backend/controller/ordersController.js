const Order = require("../model/ordersModel");


const getAllOrders = async (req, res) => {
    try {
        console.log("Handling getAllOrders request");
        // Populate the user_id and product_id fields
        const orders = await Order.find({})
        res.json(orders);
    } catch (err) {
        console.error("Error in getAllOrders:", err);
        res.status(500).json({
            err: "Internal Server Error",
            details: err.message 
        });
    }
};


module.exports = {
    getAllOrders,
}