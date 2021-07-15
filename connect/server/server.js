let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
let bodyParser = require('body-parser');
const path = require('path');
const expbhs = require('express-handlebars');
let database = require('./database/db');
let user = require('./models/user-schema');
let verifyrole = require('./models/verified_schema')
let posts = require('./models/post-schema')
const createError = require('http-errors');
const userRoute = require('./routes/user.routes');
const jwt = require('jsonwebtoken');
const {verifyAccessToken,verifyAccessTokenWithRestriction} = require('./helpers/jwt_helper');
const {promisify} = require('util');
const AppError = require('./utils/appError');
const catchAsync = require('./utils/catchAsync');
const globalErrorHandler = require('./controllers/errorController');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require("./database/db");
const nodemailer = require('nodemailer');
const creds = require('./config');
const { getMaxListeners, events } = require('./models/user-schema');
const { verify } = require('crypto');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const sharp = require('sharp');
const morgan = require('morgan');
const stripe = require('stripe')('sk_test_51IAaigBmRJgBiaQCSrt5hDUoBpCHdeRb77Zw5Lg6mB5JjrjGnLjweOOMTqmlSt59o3QAmH8zB0yBHFyk6BwcwuQZ00nEQfBtW3');

const app = express();


const YOUR_DOMAIN = 'http://localhost:5000';


// Global Middleware

// Limit Requests from same API

const limiter = rateLimit({
    max:100,
    windowMs: 60*60*1000, //100 Requests from same IP in one hour
    message : 'Too many request from this IP , please try again in an hour!'
});


// Setting security HTTP headers
    app.use(helmet()); 

// EXCEPTION HANDLING
process.on('uncaughtException',err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down ...');
    console.log(err.name,err.message);
    server.close(() => {
        process.exit(1);
    });
});
// BodyParser middleware 
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));

// app.engine('handlebars',expbhs({
//     // extname: "handlebars",
//     defaultLayout: false,
//     // layoutsDir: path.join(__dirname, "views")
//   }));
// app.set('view engine', 'handlebars');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))  

// Serving statis files

// app.use(express.static(path.join(__dirname,'public')));

app.use('/public',express.static(path.join(__dirname, "public")));

app.get('/welcome',(req,res) => {
    res.render('welcome');
})

app.use(express.json()); // To Parse the JSON Data to the API of the server and without it , it won't be able to get theJSON data

// Data sanitization against : NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(hpp());

app.use(cookieParser());

app.use(cors({credentials : true ,origin : 'http://localhost:3000'}));   // It is to give the other host to actually access this REST API


// Template routes

app.get('/hola',(req,res) => {
    res.render('base');
});

// app.use('/api',userRoute);

// const SignToken = id => {
//     return jwt.sign({id} , process.env.JWT_SECRET,{
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// }

const SignToken = (id,uname,Role) => {
    return jwt.sign({
        "uid" : id,
        "uname" : uname,
        "Role": Role
    } , process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
// Email verification

app.use('/send', (req, res) => {
    const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Verification OTP : ${otp} </li>
      </ul>
      <h3>Message</h3>
    `;
    console.log(output);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'mail.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: creds.USER, // generated ethereal user
        pass: creds.PASS  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("error");
    } else {
        console.log('All works fine, congratz!');
    }
    });

let mailOptions = {
    from: '"Nodemailer Contact" <ouconnect5@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.json({
            msg: 'fail'
        })
    } else {
        res.json({
            msg: 'success',
            otp: otp
        })
    }
    })
});

app.use('/api',userRoute)

// Different App Routes
app.use('/users', function(req,res) {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({createdAt:-1})
    
})

app.use('/verifyroles',(req,res,next) => {
    verifyrole.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

app.post('/create-checkout-session', async (req, res) => {
    const params = {
        payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: req.body.eventname,
            //   images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: req.body.eventcost,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/public/cancel.html`,
    }
    const session = await stripe.checkout.sessions.create( params );
    res.redirect(303, session.url)
  });

app.use('/verifyusers',(req,res,next) => {
    verifyrole.find((err,data) => {
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })
})


app.use('/casual',(req,res) => {
    console.log("hola");
    res.send("true");
})
// app.use('/createpost',(req,res,next) => {
//     posts.create(req.body, (error, data) => {
//         if (error) 
//             return next(error)
//          else {
//             console.log(data);
//             res.json(data);
//         }
//         });
// })

// Used bcrypt(Blowfish Cypher) algorithm for password hashing
// Added JWT Token to SignUp
app.use('/create', (req, res, next) => {
    
    bcrypt.hash(req.body.Password, saltRounds, catchAsync(async function(err, hash) {
        req.body.Password = hash;
        // const check = await user.findOne({Email:req.body.email});
        // if(check)
            // return next(new AppError('User Account already exists',404))
        // else {
        // const newUser = await user.create(req.body);
        user.create(req.body, (error, data) => {
        if (error) 
            return next(error)
         else {
            console.log(data);
            res.json(data);
        }
        });
        // user.find
        // const token = SignToken(newUser._id);
        // res.status(201).json({
        //     status:"success",
        //     token,
        //     data :{
        //         user : newUser
        //     }
        // })
    
})
    )
})
// }))
// });

app.post('/search',(req,res) => {
    var text = req.body.text
    user.find({
        "Name" : {
            $regex : new RegExp("^" + text)
        }
    },(err,data) => {
        if(err) {
            return next(err)
        }
        else {
            res.json(data)
        }
    })
})

app.get('/userdetails',verifyAccessToken, catchAsync(async (req,res,next) => {
    var user = req.user 
    res.json(user)
}))

// Added JWT token to login

app.use('/login',limiter, async (req, res,next) => {
    // console.log(req.body)
    const {enterpass,retpass,email} = req.body;
    bcrypt.compare(req.body.enterpass,req.body.retpass, catchAsync(async function(err,result) {
        if(err){
            return next(err)
        } else {
            // const {email} = req.body;
            const newuser = await user.findOne({Email : req.body.email});
            // console.log(newuser)
            const token = SignToken(newuser._id,newuser.Name,newuser.Role);
            const cookieOptions = {
                    expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                    // secure:true,
                    httpOnly:true //So that the cookie cannot be accessed or modified anyway by the browser
                } 
            // res.cookie('jwt',token , cookieOptions);
              
            // console.log(token);
            if(result){
            await res.status(200).json({
                status : 'success',
                token,
                jwt,
                result,
                data : {
                    user : newuser
                }
            })}
            else{
                await res.status(401).json({
                    status : 'fail',
                    result
                })}
        } 
            // res.json(result)
    }))

});

// app.get('/createcookie',(req,res) => {
//     res.status(202).cookie('jwt',token,{
//         path :'/',
//         httpOnly : true,
//         // secure:true,
//         expires : new Date(new Date().getTime()  +  24 * 60 * 60 * 1000)
//     }).send('Cookie is initialised');
// })

// app.get('/deletecookie',(req,res) => {
//     res.status(202).clearCookie('jwt').send('Cookie cleared');
// })


app.get('/token',verifyAccessToken, catchAsync(async (req,res,next) => {
    
    // console.log(req.payload);
    // console.log("hello");
    res.send("true");
   
        // res.json(req.payload);
}))

app.get('/token/restriction',verifyAccessTokenWithRestriction, catchAsync(async (req,res,next) => {
    
    console.log(req.payload);
    // console.log("hello");
    res.send("true");
        // res.json(req.payload);
}))

app.use('/checkpwd',verifyAccessToken, catchAsync(async (req,res,next) => {
    const user = req.user 
    const moduser = {
        id : user._id,
        check : ''
    }
    bcrypt.compare(req.body.oldpwd,user.Password, catchAsync(async function(err,result) {
        if(err){
            return next(err)
        } else {
            if(result){
                moduser.check = true
                res.json(moduser)
            }
            else{
                moduser.check = false
                res.json(moduser)
            }
        }
}))
}))


app.use('/bycryptit',(req,res) => {
    var content = req.body.content 
    bcrypt.hash(content, saltRounds, catchAsync(async function(err, hash) {
        content = hash;
        res.json(content)
})
    )
})


app.use('/find',(req,res,next) => {
        user.find(req.body, (error,data) => {
        if (error)
            return next(error)
        else {
            console.log(data)
            res.json(data)
        }
    })
})

app.use('/find/restriction',verifyAccessTokenWithRestriction,(req,res,next) => {
    user.find(req.body, (error,data) => {
    if (error)
        return next(error)
    else {
        console.log(data)
        res.json(data)
    }
})
})
// })

app.use('/delete/:id' , catchAsync(async (req,res,next) => {
    // user.findByIdAndRemove(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(new AppError('User not found',404))
    //     } else {
    //         res.status(200).json({
    //             msg: data
    //         })
    //     }
    // })
    const User =  await user.findByIdAndRemove(req.params.id);
    if(!User)
        return next(new AppError('User not found',404))
    else{
        res.status(200).json({
            status:'success',
            msg: User
        })
    }
}));

// const upload = multer({dest : 'public/img/users'});
const upload = multer({
    
    storage:multer.memoryStorage(),
    fileFilter:(req,file,cb) => {
            if(file.mimetype.startsWith('image')) {
                cb(null,true);
            }
            else{
                cb(new AppError('Not an image! Please Upload only image.',400),false);
            }
        }
});


const resizePhoto = (req,res,next) => {
    if(!req.file)
        return next();
    req.file.filename = `user - ${req.params.id}.jpeg`;

    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality:90})
    .toFile(`public/img/users/${req.file.filename}`);

    next();
};

app.use('/updatephoto/:id' , upload.single('Photo'),resizePhoto,(req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    
    user.findByIdAndUpdate(req.params.id, {
        $set: {
        Photo :req.file.filename,
    }
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })

   
})

//  Photo UPLOAD

const uploadpic = multer({
    storage:multer.memoryStorage(),
    fileFilter:(req,file,cb) => {
            if(file.mimetype.startsWith('image')) {
                cb(null,true);
            }
            else{
                cb(new AppError('Not an image! Please Upload only image.',400),false);
            }
        }
});


const resizepic = (req,res,next) => {
    if(!req.file)
        return next();
    req.file.filename = `useruploadedpost - ${req.params.content}.jpeg`;

    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality:90})
    .toFile(`public/img/users/${req.file.filename}`);

    next();
};

app.use('/uploadpic/:name/:content' , uploadpic.single('Photo'),resizepic,(req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    
    posts.updateOne({authorName : req.params.name,content : req.params.content},
        {
            $set: {
                Photo: req.file.filename
            }
        }
    , (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})


// PDF UPLOAD

const uploadpost = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'public/img/users');
        },
        filename(req, file, cb) {
          cb(null, `${file.originalname}`);
        }}),
        // limits: {
        //     fileSize: 1000000 // max file size 1MB = 1000000 bytes
        //   },
        fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
            return cb(
            new Error(
                'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
            )
            );
        }
        cb(undefined, true); 
    }
});


app.use('/uploadpost/:name/:content', uploadpost.single('post'),async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    console.log(req.params.name);
    posts.updateOne({authorName : req.params.name,content : req.params.content},
    {
        $set: {
            post: req.file.filename
        }
    },
    (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('User updated successfully !!')
            }
        }
    )

  },(req, res, next) => {
    console.log(req.file);
    console.log(req.body);
})


app.get('/getAllFiles', async (req, res) => {
    try {
      const files = await File.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });
  
app.get('/download/:id', async (req, res) => {
    try {
      const file = await posts.findById(req.params.id);
    //   res.set({
    //     'Content-Type': file.file_mimetype
    //   });    
        console.log(file);
        console.log("s");
      res.sendFile(path.join(__dirname,'public','img','users',file.post));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  });


    //  EVENT PIC UPLOAD

const uploadeventpic = multer({
    storage:multer.memoryStorage(),
    fileFilter:(req,file,cb) => {
            if(file.mimetype.startsWith('image')) {
                cb(null,true);
            }
            else{
                cb(new AppError('Not an image! Please Upload only image.',400),false);
            }
        }
});


const resizeeventpic = (req,res,next) => {
    if(!req.file)
        return next();
    req.file.filename = `usereventpic - ${req.params.content}.jpeg`;

    sharp(req.file.buffer)
    // .resize(500,500)
    .toFormat('jpeg')
    .jpeg({ quality:90})
    .toFile(`public/img/users/${req.file.filename}`);

    next();
};

app.use('/uploadeventpic/:name/:content' , uploadeventpic.single('Photo'),resizeeventpic,(req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    
    events.updateOne({authorName : req.params.name,content : req.params.content},
        {
            $set: {
                Photo: req.file.filename
            }
        }
    , (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})


app.use('/update/:id' ,(req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

app.all('*',(req,res,next) => {
    // res.status(404).json({
    //     status:'fail',
    //     message:`Can't find ${req.originalUrl} on this server`
    // })

    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;
    // next(err);
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})
const port = process.env.PORT || 5000; 


const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
// app.use((req, res, next) => {
//     next(createError(404));
// });

// Global Error Handler
app.use(globalErrorHandler)

process.on('uncaughtRejection',err => {
    console.log('UNCAUGHT REJECTION! Shutting down ...');
    console.log(err.name,err.message);
    server.close(() => {
        process.exit(1);
    });
});
 