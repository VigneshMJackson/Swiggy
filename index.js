const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./router/userRoutes');
const itemsRoutes = require('./router/itemsRoutes');


const app = express();
const PORT = process.env.PORT || 7003

// middleWare
app.use(bodyParser.json());
app.use(cors());

// connectToMongoDB
mongoose.connect('mongodb+srv://UserLogin:UserLogin@cluster0.zeroe3h.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongodb database connected');
});

// ** Routes **
// user router 
app.use('/users', userRoutes);

// food item router 
app.use('/items', itemsRoutes);

// startTheServer
app.listen(PORT, ()=>{
    console.log(`Server is running on port;${PORT}`)
});



