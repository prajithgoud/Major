const User = require('../models/user-schema');

// Create a  new user without email activation
// exports.signup = (req,res) => {
//     console.log(req.body);
//     const {Name,Email,Password} = req.body;
//     User.findOne({Email}).exec((err,user) => {
//         if(user) {
//             return res.status(400).json({error:"User already exists"});
//         }
//         let newUser = new User({Name,Email,Password});
//         newUser.save((err,success) => {
//             if(err) {
//                 console.log("Error in signup: ",err);
//                 return res.status(400).json({error : err})
//             }
//             res.json({
//                 message : "Signup Success"
//             })
//         })
//     });
// }


exports.signup = (req,res) => {
    console.log(req.body);
    const {Name,Email,Password} = req.body;
    User.findOne({Email}).exec((err,user) => {
        if(user) {
            return res.status(400).json({error:"User already exists"});
        }
        let newUser = new User({Name,Email,Password});
        newUser.save((err,success) => {
            if(err) {
                console.log("Error in signup: ",err);
                return res.status(400).json({error : err})
            }
            res.json({
                message : "Signup Success"
            })
        })
    });
}

// exports.Delete = (req,res,next) => {
//     user.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error+"delete");
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
// })
// }
