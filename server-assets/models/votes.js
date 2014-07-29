var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    userID: DataTypes.INTEGER,
    prizeID: DataTypes.INTEGER,
    votes: DataTypes.INTEGER
  })

  return Vote
}