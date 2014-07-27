var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    votesRemain: DataTypes.INTEGER,
    EventID: DataTypes.INTEGER,
    role: {type: Sequelize.STRING, defaultValue: 'user'}
  })

  return User
}
