var answerdata = require('../model/answers');
/*
 * GET home page.
 */

exports.index = function(req, res){
  answerdata.answerlist(function(err, answerlist){
    res.render('index', { 
      title: 'Answer Keys' ,
      answers: answerlist
    });
  });
};
