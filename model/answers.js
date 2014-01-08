var mongoose = require('mongoose');

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

exports.answershow = function answerlist(uid, callback){
  var Answer = mongoose.model('Answer');
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

exports.answerShowById = function answerShowById(uid, callback){
  var Answer = mongoose.model('Answer');
  console.log(uid);
  Answer.findOne({uid:Number(uid)}, function(err, answers) {
    if(err){
      console.log(err);
    } else {
      console.log(answers);
      callback("", answers);
    }
  })
}


exports.createAndRefresh = function createAndRefresh(payload, callback){
  var Answer = mongoose.model('Answer');

  //console.log(payload);

  var keys = Object.keys(payload);
  var l = keys.length;
  for(var i = 0; i < l; i++){
    var uid = keys[i];
    var answer = payload[uid];
   
    //console.log(uid + ':' + answer);
    var a = new Answer({
      uid:uid,
      answer:answer
    });
    //console.log(a);

    Answer.update({uid: Number(uid)}, {$set: { answer: answer}}, {upsert: true}, function (err) {
      if(err) {
        console.log('error not saved');
      } else {
        console.log(uid + " " + answer);
        callback("", answer);
      }
    });
  }
}

exports.createanswer = function createanswer(uid, answer, callback){


    var Answer = mongoose.model('Answer');

    var a = new Answer({
      uid:uid,
      answer:answer
    });

    Answer.update({uid: Number(uid)}, {$set: { answer: answer}}, {upsert: true}, function (err) {
      if(err) {
        console.log('error not saved');
      } else {
        console.log(uid + " " + answer);
        callback("", answer);
      }
    });
    /*
    a.save(function(err){
      if(err) {
        console.log('error not saved');
      } else {
        console.log(uid + " " + answer);
        callback("", answer);
      }
    });
  */
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
