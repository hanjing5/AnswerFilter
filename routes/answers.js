var answerdata = require('../model/answers');
/*
 * GET home page.
 */

exports.create = function(req, res){
  var myId =2;
  var answer = 'foo';
  answerdata.createanswer(myId, answer, function(err, answerlist){
  	console.log('index.js: ' + myId);
    res.redirect('/');
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
      title:' show answer',
      answer: answer[0]
    });
  });
};
