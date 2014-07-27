var Sequelize  = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    Description: DataTypes.STRING(1234),
    Location: DataTypes.STRING,
    startNumVotes: DataTypes.INTEGER,
    // maxNumVotes: DataTypes.INTEGER, //IMPLEMENT LATER
    // votesVisible: {type: Sequelize.INTEGER, defaultValue: 1}, //IMPLEMENT LATER
    active: {type: Sequelize.INTEGER, defaultValue: 0},
    adminID: DataTypes.INTEGER
  })

  return Event
}
