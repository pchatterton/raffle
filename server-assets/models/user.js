var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    EventID: DataTypes.INTEGER,
    role: {type: Sequelize.STRING, defaultValue: 'user'}
  })

  return User
}
