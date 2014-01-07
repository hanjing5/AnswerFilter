var mongoose = require('mongoose');
var fs = require('fs');

var filesource = 'https://raw.github.com/unparallellogical/AnswerFilter/master/data/data.csv';
//var filesource = '/Users/hjing/Documents/Code/side/GMAT/vocab/AnswerFilter/data/data.csv';

var http = require('http');
var client = http.createClient(443, filesource);

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
  var request = require('request');
  request(filesource, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      console.log('sourceifle body:' + data) // Print the google web page.
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
    }
  })
}

/*
exports.answerlist = function answerlist(callback){

  fs.readFile(filesource, 'utf8', function (err,data) {
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
*/

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
/*
exports.showanswer = function showanswer(start, limit, callback) {
  var Answer = mongoose.model('Answer');

  Answer.find({}, {}, { skip: start, limit: limit, sort: {uid:1}}, function(err, results) {
    console.log(results);
    callback("", results);
  });
}
*/

exports.showanswer = function showanswer(start, limit, callback){
  fs.readFile(filesource, 'utf8', function (err,data) {
      console.log('reading record from flatfile');
      if (err) {
        return console.log(err);
      }
      console.log(data);
      var answer = {};
      var counter = 1;
      for (i=0;i<data.length;i++){
        console.log(i);
        if (data[i] == '\n')
          continue;
        answer = {
          uid: counter,
          answer: data[i]
        };
        console.log(answer);
        if (counter == start)
          break;
        counter++;
      }
      console.log("befor callback" + answer);
      callback("", [answer]);
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
