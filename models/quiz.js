//Definición del modelo de Quiz
module.exports= function(sequelize, Datatype){
  return sequelize.define('Quiz',
    { pregunta: DataTypes.STRING,
      respuesta: DataTypes.STRING
    });
}
