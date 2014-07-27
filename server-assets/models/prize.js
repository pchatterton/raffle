var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Prize = sequelize.define('Prize', {
    prizeName: DataTypes.STRING,
    prizeDescription: DataTypes.STRING(1234),
    prizeUrl: DataTypes.STRING,
    status: DataTypes.INTEGER,
    numVotes: DataTypes.INTEGER,
    eventID: DataTypes.INTEGER
  })

  return Prize;
}
