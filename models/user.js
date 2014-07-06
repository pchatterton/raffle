module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  })
  
  return Admin
}
