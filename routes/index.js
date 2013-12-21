var answerdata = require('../model/answers');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var myId =2;
  answerdata.answerlist(myId, function(err, answerlist){
  	console.log('index.js: ' +myId);


    res.render('index', { 
      title: 'Express' ,
      myId: myId,
      answers: answerlist
    });
  });
};
