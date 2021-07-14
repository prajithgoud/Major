// module.exports = {
//     db: 'mongodb://localhost:27017/connect'
// };
require('dotenv').config({path : '.env'}); //to use env variables

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log('DataBase connected sucessfully !')
},
    error => {
        console.log('DataBase could not be connected : ' + error)
})