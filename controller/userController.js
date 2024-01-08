const User = require('../model/user');

const bcrypt = require('bcryptjs')

// register new user

exports.registerUser = async(req,res) => {
    try {
        const {userName, userEmail, userPassword} = req.body;

        // check if the user with same email or username already exist 
        const existingUser = await User.findOne({$or:[{userName}, {userEmail}]});
        if (existingUser) {
            return res.status(400).json({message:'User with this email or User name Already exist'})
        }

        // hash the password before saving it to the database 
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({message:'You have registered successfully'})

    } catch (error) {
        res.status().json({error:error.message})
    }
};

// login User

exports.loginUser = async(req,res) => {
    try {
        const {userEmail, userPassword} = req.body

        // find the user with userEmail 
        const user = await User.findOne({userEmail});
        
        // if the user not found returns error 
        if (!user) {
            return res.status(404).json({message:'User not found'});
        }

        // compare the given password with the database 
        // const isPasswordValid = await User.findOne({hashedPassword}) 
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

        // if the password is not valid retrun an error 
        if(!isPasswordValid) {
            return res.status(401).json({message:'Invalid Password'});
        }

        // set a variable to indicate that the user is authenticate 
        req.userId = user._id 
        res.status(200).json({message:'You are logged In Successfully'})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

// CRUD operation for the user 

// get all the users
exports.getAllUsers = async(req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
} 
};

// get user by Id 
exports.getUserById = async(req,res) =>{
    try {
        // console.log('userId', req.params)
        const userById = await User.findById(req.params.id);
        // console.log("found user", user)
        if(!userById){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json(userById);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};


// Update the user by Id 
exports.updateUserById = async(req,res) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updateUser){
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
};

// Deleting the user by Id 
exports.deleteUserById = async(req,res) =>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User has been deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};




