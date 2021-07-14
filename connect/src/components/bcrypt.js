const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt';
const saltRounds = 10;


const password = "ssssaiprasad";

async function hashit(password){
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(password, salt);
}
hashit(password);

async function compareIt(password){
    const validPassword = await bcrypt.compare(password, hash);
  }
compareIt(password);


// bcrypt.compare(password,hash,(err,result) =>{
//     if(result)
//         console.log("passwor");
//     else    
//         console.log(hash);
// })

module.exports = bcrypt;
// console.log(hash);


// const bcrypt = require ('bcrypt'); // require bcrypt

// const saltRounds = 10;  //  Data processing speed
// var password = "Fkdj^45ci@Jad";  // Original Password
// var password2 = "djlfhjd(456";
// bcrypt.hash(password, saltRounds, function(err, hash) { // Salt + Hash
//   bcrypt.compare(password2, hash, function(err, result) {  // Compare
//     // if passwords match
//     if (result) {
//           console.log("It matches!")
//     }
//     // if passwords do not match
//     else {
//           console.log("Invalid password!");
//     }
//   });
// });