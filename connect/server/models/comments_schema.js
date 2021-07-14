const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const commentSchema = new Schema({
  content: {
    type: String
  },  // html
  authorId: {
    type: String
  },
  authorName: {
    type: String
  },
  postId: {
    type: String
  },
  time: {
    type: Date
  }
});

module.exports = mongoose.model('comments',commentSchema)