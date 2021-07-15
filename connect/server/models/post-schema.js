const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
let postSchema = new Schema({
  title:{ 
    type : String
  },
  categories:
  {
    type : [String]
  },
  content: {
      type: String
  },
  authorId: {
      type: String
  },
  authorName: {
      type: String
  },
  time: {
      type: Date
  },
  post : {
    type : String
  },
  Photo : {
    type : String
  },
  file_path: {
    type: String,
    // required: true
  },
  file_mimetype: {
    type: String,
    // required: true
  }
},{

  collection: 'posts',
});

module.exports = mongoose.model('posts',postSchema)