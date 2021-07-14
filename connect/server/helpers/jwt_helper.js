const jwt = require('jsonwebtoken')
const createError = require('http-errors');
const AppError = require('../utils/appError');
const {promisify} = require('util');
const catchAsync = require('../utils/catchAsync');
const user = require('../models/user-schema');


module.exports = {

    verifyAccessToken:catchAsync(async(req,res,next) => {

    // Checking whether user is logged in or not
    let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }
    if(!token){
        localStorage.removeItem('token');
        return next(new AppError('You are not logged in! Please log in',401));
    }
    // console.log(req.headers);
    // console.log(token);
    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // console.log(decoded);
    
    // 3) Checking if user still exists
    const freshUser = await user.findById(decoded.uid);
    // console.log(freshUser);
    if(!freshUser) {
        return next(new AppError('The User belonging to this token no longer exists!',401));
    }
    req.user = freshUser;
    // console.log(req.body);
    req.payload = decoded;
    // res.send(decoded);
    next();
    }),
    
    verifyAccessTokenWithRestriction:catchAsync(async(req,res,next) => {
        
    // Checking whether user is logged in or not
    let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }
    if(!token){
        localStorage.removeItem('token');
        return next(new AppError('You are not logged in! Please log in',401));
    }
    // console.log(req.headers);
    console.log(token);
    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    console.log(decoded);
    
    // 3) Checking if user still exists
    const freshUser = await user.findById(decoded.uid);
    // console.log(freshUser);
    if(!freshUser) {
        return next(new AppError('The User belonging to this token no longer exists!',401));
    }
    req.user = freshUser;
    // 4) Restriction to StarUsers

    if(!req.user.Role.includes('Professor') && !req.user.Role.includes('Admin') && !req.user.Role.includes('CR') ) {
            return next(new AppError('You do not have permission to perform this action',403));
    }
    // console.log(req.body);
    req.payload = decoded;
    // res.send(decoded);
    next();
    }) 
    
}