const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
let postSchema = new Schema({
  title:{ 
    type : String
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
    type: Date,
  }
},{

    collection: 'events',
  })

module.exports = mongoose.model('events',postSchema)