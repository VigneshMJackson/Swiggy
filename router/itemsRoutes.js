const express = require('express');
const router = express.Router();
const itemsController = require('../controller/itemsController');

router.post('/createFoodItem', itemsController.createFoodItem);
router.get('/getAllFoodItems', itemsController.getAllFoodItems);
router.get('/getFoodItemById/:id', itemsController.getFoodItemById);
router.put('/updateFoodItemById/:id', itemsController.updateFoodItemById);
router.delete('/deleteFoodItemById/:id', itemsController.deleteFoodItemById);

module.exports = router
