//Definición del modelo de Comment con validación
module.exports= function(sequelize, DataTypes){
  return sequelize.define('Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tipo: {
        type: DataTypes.ENUM('Humanidades', 'Ocio', 'Ciencia', 'Tecnología', 'Otro'),
        validate: {
          notEmpty: {msg: "-> Falta Tipo"},
          isIn: {
            args: [['Humanidades', 'Ocio', 'Ciencia', 'Tecnología', 'Otro']],
            msg: "Debe estar en el rango 'Humanidades', 'Ocio', 'Ciencia', 'Tecnología', 'Otro'"
          }
        }
      }
    });
}
