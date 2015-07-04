var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load=function(req, res, next, quizId){
  models.Quiz.findById(quizId).then(function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }else{
        next (new Error('No existe quizId=' + quizId));
      }
  }).catch(function(error){ next(error);});
};

//GET /quizes/:id
exports.show=function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
      res.render('quizes/show', { quiz: req.quiz});
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
  if(req.query.search){
    models.Quiz.findAll({
      where: ["pregunta like ?", "%" + req.query.search.replace("' '?","%") + "%"],
      order: ['pregunta']
    }).then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, title: 'Quiz'});
    });
  }else{
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, title: 'Quiz'});
    });
  }
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === req.quiz.respuesta){
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcta', title: 'Quiz'});
    }else{
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecta', title: 'Quiz'});
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
