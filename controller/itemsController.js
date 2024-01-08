const Items = require("../model/itemSchema");

// create a new food item

exports.createFoodItem = async (req, res) => {
  try {
    const newFoodItem = new Items(req.body);
    const savedFoodItem = await newFoodItem.save();
    res.status(201).json(savedFoodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
  // Get all food items
  exports.getAllFoodItems = async (req, res) => {
    try {
      const foodItems = await Items.find();
      res.status(200).json(foodItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get a specific food item by ID
exports.getFoodItemById = async (req, res) => {
  try {
    const foodItem = await Items.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific food item by ID
exports.updateFoodItemById = async (req, res) => {
  try {
    const updatedFoodItem = await Items.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFoodItem) {
      return res.status(404).json({ message: "Food item not found"});
    }
    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific food item by ID

exports.deleteFoodItemById = async (req, res) => {
  try {
    const deletedFoodItem = await Items.findByIdAndDelete(req.params.id);
    if (!deletedFoodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
