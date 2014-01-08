var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  uid: Number,
  answer: String
});
mongoose.model('Answer', answerSchema);

var uristring =
process.env.MONGOHQ_URL ||
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/test';


mongoose.connect(uristring);
