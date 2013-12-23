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
