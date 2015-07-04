var models = require('../models/models.js');

//GET /quizes/:id
exports.show=function(req, res){
  console.log(req.params.quizId);
  models.Quiz.findById(req.params.quizId).then(function(quiz){
      res.render('quizes/show', { quiz: quiz});
  })
};
//GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().then(function(quiz){
    res.render('quizes/question', {pregunta: quiz[0].pregunta, title: 'Quiz'});
  });
};

//GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes, title: 'Quiz'});
  });
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === quiz.respuesta){
      res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcta', title: 'Quiz'});
    }else{
      res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecta', title: 'Quiz'});
    }
  });
};

//GET /quizes/answer
/*exports.answer = function(req, res){
  models.Quiz.findAll().then(function(quiz){
    if(req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', {respuesta: 'Correcta', title: 'Quiz'});
    }else{
      res.render('quizes/answer', {respuesta: 'Incorrecta', title: 'Quiz'});
    }
  });
};*/
