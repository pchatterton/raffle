var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    Description: DataTypes.STRING(1234),
    Location: DataTypes.STRING,
    startNumVotes: DataTypes.INTEGER,
    maxNumVotes: DataTypes.INTEGER,
    votesVisible: {type: Sequelize.INTEGER, defaultValue: 1},
    adminID: DataTypes.INTEGER
  })

  return Admin
}
