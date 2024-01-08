const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    
    itemImage: {
        type: String,
        required: true,
        unique: true
    },

    itemPrice:{
        type: Number,
        required: true,
    },

    itemOffer:{
        type: Number,
        required: true
    },

    itemDescription:{
        type: String,
        required: true
    },
    
    itemCategory:{
        type: String,
        enum:['Vegetarian', 'Non-Vegetarian'],
        required: true
        
    }

});

const Items = mongoose.model('Items', itemSchema);
module.exports = Items;



