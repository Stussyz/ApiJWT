const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
// Middleware dengan async function yang akan menangani apabila terjadi duplikasi data (email) yang akan didaftarkan
exports.signup = async (req, res, next) => {
 try {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
        return next(new createError('User already exists!', 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    
    const newUser = await User.create({  
    ...req.body,
    password: hashedPassword,
    });

// JSON WEB TOKEN
// Pembuatan JSON Web Token. payload yang disimpan '_id' token akan expired dalam 90 hari
    const token = jwt.sign({_id: newUser._id }, 'secretkey123', {
        expiresIn: '90d',
    });
// Apabila sukses maka akan menampilkan response (201), dengan menampilkan beberapa data inputan user 
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        token,
        user: {
            name: newUser.name,
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        },
    });
// apabila terjadi error maka akan dilempar ke middleware error
    } catch (error) {
        next(error);
    }
 };

 //LOGGING USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) return next(new createError('User not found!', 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return next(new createError('Invalid email or password', 401));
        }

        const token = jwt.sign({ id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status:'success',
            token,
            message: 'Logged in successfully',
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};