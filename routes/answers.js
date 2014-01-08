var answerdata = require('../model/answers');
/*
 * GET home page.
 */

exports.create = function(req, res){
  var myId =req.params.id;
  var answer = req.params.answer;
  answerdata.createanswer(myId, answer, function(err, answerlist){
  	console.log('index.js: ' + myId);
    res.redirect('/');
  });
};

exports.list = function(req, res){
  answerdata.answerlist(function(err, answerlist){
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(answerlist));
  });
}

exports.createAndRefresh = function(req, res){
  var payload = req.body;
  answerdata.createAndRefresh(payload, function(err, answerlist){
    //res.redirect('/');
  });
};

exports.new = function(req, res) {
  res.render('new', {
    title: 'new answer'
  });
};

exports.show = function(req, res) {
  var start = req.params.id;
  var limit = 1;
  answerdata.showanswer(start, limit, function(err, answer){
    res.render('show', {
      title:'Answer',
      answer: answer[0],
      next_uid: Number(start)+1
    });
  });
};

exports.delete = function(req, res) {
  var uid = req.params.id;
  answerdata.deleteanswer(uid, function(err, result){
    res.redirect("/");
  });
};

exports.deleteAll = function(req, res){
  answerdata.deleteallanswers(function(err, result){
    res.redirect("/");
  });
}