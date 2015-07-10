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
      res.render('quizes/show', { quiz: req.quiz, errors: []});
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
      where: ["pregunta like ?", "%" + req.query.search.replace(/\s/g,"%") + "%"],
      order: ['pregunta']
    }).then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, title: 'Quiz', errors: []});
    });
  }else{
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index.ejs', {quizes: quizes, title: 'Quiz', errors: []});
    });
  }
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === req.quiz.respuesta){
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcta', title: 'Quiz', errors: []});
    }else{
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecta', title: 'Quiz', errors: []});
    }
  });
};

//GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build(//crea objeto quiz
      {pregunta: "Pregunta", respuesta: "Respuesta"}
    );
    res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(function(err){
    if(err){
      res.render("quizes/new", {quiz: quiz, errors:err.errors});
    }
    else{
      //guarda en DB los campos pregunta y respuesta de quiz
      quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
          res.redirect('/quizes');
      }); //Redirección HTTP (URL relativo) lista de preguntas
    }
  });
};

//GET /quizes/:id/edit
exports.edit = function(req, res){
  var quiz = req.quiz; // autoload de instancia de quiz

  res.render("quizes/edit", {quiz: quiz, errors:[]});
};

//PUT /quizes/:id/
exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz.validate().then(function(err){
    if(err){
        res.render("quizes/edit", {quiz: req.quiz, errors: err.errors});
    }else{
      //save: guarda campos pregunta y respuesta en DB
      req.quiz.save( {fields: ["pregunta", "respuesta"]}).then(function(){
        res.redirect('/quizes');
      });
    }
  });
};

//DELETE /quizes/:id
exports.destroy = function(req, res){
  req.quiz.destroy().then(function(){
      res.redirect('/quizes');
  }).catch(function(error){next(error)})
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
