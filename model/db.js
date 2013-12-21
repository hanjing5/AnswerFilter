var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  uid: Number,
  answer: String
});
mongoose.model('Answer', answerSchema);

mongoose.connect('mongodb://localhost/test');
