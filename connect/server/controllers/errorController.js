const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
     const message = `Invalid ${err.path}: ${err.value}.`;
     return new AppError(message,400);
}

const handleDuplicateFieldsDB = err => {
    // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    // console.log(value);
    const message = `Duplicate field value : ${value},Please use another value`;
    return new AppError(message,400);
};

const handleValidationError = err => {

    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors,join('. ')}`;
    return new AppError("Duplicate User",400);
}


const handleJWTError = () => new AppError('Invalid token.Please log in again!',401);

const handleJWTExpiredError = () => new AppError('Your Token has expired! Please log in Again!',401);

const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        statusCode:err.statusCode,
        stack:err.stack
    });
};

const sendErrorProd = (err,res) => {
    // Operational , trusted error send message to client
    if(err.isOperational) {
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        statusCode:err.statusCode,
        error:err,
        stack:err.stack
    });
    // Programming or other unknown error: don't leak error status
    }
    else {
        // 1) Log error
        console.error('ERROR',err);
        // 2) Send generic message
        res.status(500).json({
            status:'error',
            message:'Something went wrong!'
        });
    }
};
 

module.exports = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err,res);
    }
    else if(process.env.NODE_ENV ==='production'){
    let error = { ...err };

    if(error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.code === 11000) error = handleDuplicateFieldsDB(error);
    if(error.name === 'ValidationError') error = handleValidationError(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError();
    if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error,res);
    }
        // let error = { ...err };

    // if(err.name === 'CastError') error = handleCastErrorDB(error);
    // if(err.code === 11000) error = handleDuplicateFieldsDB(error);
    // if(err.name === 'ValidationError') error = handleValidationError(error);
    // if(err.name === 'JsonWebTokenError') error = handleJWTError();
    // if(err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    // res.status(error.statusCode).json({
    //     status:error.status,
    //     message:error.message,
    //     // error:error,
    //     stack:error.stack
    // });
};