const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const FoodItem = require('../models/FoodItem');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Restaurant Routes
router.post('/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json({ message: 'Restaurant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Food Item Routes
router.post('/food-items', async (req, res) => {
    try {
        const foodItem = new FoodItem(req.body);
        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/food-items', async (req, res) => {
    try {
        const foodItems = await FoodItem.find().populate('restaurant');
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id).populate('restaurant');
        if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
        res.json(foodItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/food-items/:id', async (req, res) => {
    try {
        const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
        if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
        res.json({ message: 'Food item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 