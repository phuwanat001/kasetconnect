const Rental = require('./rental.model');

const createRental = async (req, res) => {
    try {
        const newOrder = new Rental(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error creating rental:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createRental
};