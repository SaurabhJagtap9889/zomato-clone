const express = require('express');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        // TODO: Implement restaurant fetching from database
        res.json({
            success: true,
            data: [
                {
                    id: 1,
                    name: "McDonald's",
                    cuisine: "Fast Food",
                    rating: 4.2,
                    deliveryTime: "35 min",
                    image: "https://i.ibb.co/YTK0HqsG/mc-Donalds.jpg"
                },
                {
                    id: 2,
                    name: "Burger King",
                    cuisine: "Fast Food",
                    rating: 4.0,
                    deliveryTime: "43 min",
                    image: "https://i.ibb.co/Lzy81WPF/burgerking.png"
                }
            ]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single restaurant
router.get('/:id', async (req, res) => {
    try {
        // TODO: Implement single restaurant fetching
        res.json({
            success: true,
            data: {
                id: req.params.id,
                name: "McDonald's",
                cuisine: "Fast Food",
                rating: 4.2,
                deliveryTime: "35 min",
                menu: [
                    {
                        id: 1,
                        name: "Big Mac",
                        price: 199,
                        description: "Classic burger with special sauce",
                        image: "https://example.com/bigmac.jpg"
                    }
                ]
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 