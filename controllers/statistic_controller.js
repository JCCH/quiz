var models = require('../models/models.js');

//GET /quizes/statistics
exports.getStatistics = function(req, res){
  var statistics = {};
  models.Quiz.count().then(function(count){
    statistics.questions = count;
    complete();
  });

  models.Comment.count({
      where: [ {publicado: true}]
  }).then(function(count){
    statistics.comments = count;
    complete();
  });

  models.Quiz.count({
    distinct: 'id',
    include: [
       { model: models.Comment, as: 'Comments', required: true, where: [{publicado: true}]}
    ]
  }).then(function(count){
    statistics.questionsWithComments = count;
    complete();
  });

  function complete() {
    if(statistics.questions && statistics.comments && statistics.questionsWithComments){
      if(statistics.questions !== 0 && statistics.comments !==0){
        statistics.avgComments = statistics.comments/statistics.questions;
      }else{
        statistics.avgComments = 0;
      }
      statistics.questionsWithoutComments = statistics.questions - statistics.questionsWithComments;
      res.render('statistics/index', { statistics: statistics, errors: []});
    }
  }

};
