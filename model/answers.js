var mongoose = require('mongoose');
var fs = require('fs');

/*
* not used
exports.answerlist = function answerlist(callback){
  var Answer = mongoose.model('Answer');
  Answer.find({}, {},{sort: {uid:1}},function(err, answers) {
    if(err){
      console.log(err);
    } else {
      console.log(answers);
      callback("", answers);
    }
  })
}
*/

exports.answerlist = function answerlist(callback){
  fs.readFile('/Users/hjing/Documents/Code/side/GMAT/vocab/AnswerFilter/data/data.csv', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    var Answers = [];

    var counter = 1;
    for (i=0;i<data.length;i++){
      if (data[i] == '\n')
        continue;
      var answer = {
        uid: counter,
        answer: data[i]
      };
      console.log(answer);
      Answers.push(answer);
      counter++;
    }
    callback("", Answers);
  });
}

exports.answershow = function answerlist(uid, callback){
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

exports.createanswer = function createanswer(uid, answer, callback){
  var Answer = mongoose.model('Answer');

  var a = new Answer({
    uid:uid,
    answer:answer
  });

  a.save(function(err){
    if(err) {
      console.log('error not saved');
    } else {
      console.log(uid + " " + answer);
      callback("", answer);
    }
  });
}

exports.deleteanswer = function deleteanswer(uid, callback){
  var Answer = mongoose.model('Answer');

  Answer.findOne({uid:uid}, function(err, result) {
    console.log(result);
    result.remove();
    callback("", result);
  });
}

exports.showanswer = function showanswer(start, limit, callback) {
  var Answer = mongoose.model('Answer');

  Answer.find({}, {}, { skip: start, limit: limit, sort: {uid:1}}, function(err, results) {
    console.log(results);
    callback("", results);
  });
}

exports.deleteallanswers = function deleteallanswers(callback){
  var Answer = mongoose.model('Answer');

  Answer.find({}, function(err, results) {
    console.log("all results" + results);
    for (i = 0; i < results.length; i++) {
      console.log("each result: " + results[i]);
      results[i].remove();
    }
    callback("", results);
  });
}
