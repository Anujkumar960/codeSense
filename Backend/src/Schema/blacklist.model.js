const {sequelize} = require("../Config/connectToDB")
const {DataTypes} = require("sequelize")

const blacklistModel = sequelize.define('blacklist', {
    token: { type: DataTypes.STRING, allowNull: false },
  }, { timestamps: false });
  

module.exports={blacklistModel};