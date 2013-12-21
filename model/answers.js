var mongoose = require('mongoose');

exports.answerlist = function answerlist(uid, callback){

  var Answer = mongoose.model('Answer');
  /*
  var answer = new Answer({ 
  		uid: '2',
  		answer: 'fudge'
  	});
	answer.save(function (err) {
	  if (err) // ...
	  console.log('meow');
	});
	*/
  console.log(uid);
  Answer.findOne({uid:uid}, function(err, answers) {
    if(err){
      console.log(err);
    } else {
      console.log(answers);
      callback("", answers);
    }
  })
}
