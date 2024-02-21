import  User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken';

// sign up user
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
      ) {
       return next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      const user = await newUser.save();
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
};

// sign in user 
export const signin = async (req,res,next) => {
    const {email, password} = req.body

    if(!email || !password || email === "" || password === ""){
        return next(errorHandler(404, "All fields are required"))
    }
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "User not found"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, "Wrong credential"))
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
        const {password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour
        res.cookie("access_token", token, {
            httpOnly: true,
            expiries : expiryDate
        })
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}

// sign out

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!')
}